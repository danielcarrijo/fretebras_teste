<?php

namespace App\Models;

use App\Utilities\FilterBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
use Carbon\Carbon;
use DB;
class Invoice extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'start_date', 'end_date'];
    protected $appends = ['current', 'formatted_start_date', 'formatted_end_date', 'status', 'pay_date', 'scores'];

    public function payments() {
        return $this->hasMany(Payment::class); 
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('end_date', 'desc');
    }

    public function scopeFilterBy($query, $filters)
    {
        $namespace = 'App\Utilities\InvoiceFilters';
        $query = $query->where('user_id', Auth::user()->id);
        $filter = new FilterBuilder($query, $filters, $namespace);

        return $filter->apply();
    }

    public function getScoresAttribute() {
        return Payment::join('users', 'users.id', '=', 'payments.user_id')
                ->join('stores', 'stores.id', '=', 'payments.store_id')
                ->join('categories', 'categories.id', '=', 'stores.category_id')
                ->active()
                ->where('payments.invoice_id', $this->id)
                ->select(DB::raw('sum(categories.score_fee*payments.price) as total_scores'))->first()->total_scores;
    }

    public function getCurrentAttribute() {
        $now = Carbon::now();
        $start_date = Carbon::parse($this->start_date);
        $end_date = Carbon::parse($this->end_date)->addDays(10);
        return ($start_date <= $now && $now <= $end_date);
    }

    public function getStatusAttribute() {
        $now = Carbon::now();
        $end_date = Carbon::parse($this->end_date);
        $start_date = Carbon::parse($this->start_date);
        if(!$this->current) {
            return ($start_date < $now && $now > $end_date ? 'prev' : 'next');
        }else {
            $pay_date = Carbon::parse($this->end_date)->addDays(10);
            return ($now > $end_date && $now <= $pay_date) ? 'closed' : 'open';
        }
    }
    public function getFormattedStartDateAttribute() {
        return Carbon::parse($this->start_date)->format('d/m/Y');
    }

    public function getFormattedEndDateAttribute() {
        return Carbon::parse($this->end_date)->format('d/m/Y');
    }

    public function getPayDateAttribute() {
        return Carbon::parse($this->end_date)->addDays(10)->format('d/m/Y');
    }
}
