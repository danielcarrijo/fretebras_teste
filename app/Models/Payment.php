<?php

namespace App\Models;

use App\Utilities\FilterBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    public function invoice() {
        return $this->belongsTo(Invoice::class);
    }

    public function scopeFilterBy($query, $filters)
    {
        $namespace = 'App\Utilities\PaymentFilters';
        $filter = new FilterBuilder($query, $filters, $namespace);

        return $filter->apply();
    }

    public function scopeChargeBack($query) 
    {
        return $query->where('price', '<', '0');
    }
}
