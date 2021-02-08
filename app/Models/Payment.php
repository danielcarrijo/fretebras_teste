<?php

namespace App\Models;

use App\Utilities\FilterBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Auth;
class Payment extends Model
{
    use HasFactory;
    
    protected $with =  ['store'];
    protected $appends = ['formatted_date', 'score'];
    protected $fillable = ['invoice_id'];
    public function invoice() {
        return $this->belongsTo(Invoice::class);
    }

    public function store() {
        return $this->belongsTo(Store::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function scopeFilterBy($query, $filters)
    {
        $namespace = 'App\Utilities\PaymentFilters';
        $query = $query->where('user_id', Auth::user()->id);
        $filter = new FilterBuilder($query, $filters, $namespace);

        return $filter->apply();
    }

    public function getScoreAttribute() {
        return $this->price > 0 ? $this->price * $this->store->category->score_fee : 0;  
    }
    

    public function scopeChargeback($query) 
    {
        return $query->where('price', '<', '0');
    }

    public function scopeActive($query) 
    {
        return $query->where('price', '>', '0');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('time', 'desc');
    }

    public function getFormattedDateAttribute() {
        $date = $this->time;
        return Carbon::parse($date)->format('d/m');
    }
    
}
