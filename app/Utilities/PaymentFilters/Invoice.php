<?php

namespace App\Utilities\PaymentFilters;

use App\Utilities\FilterContract;
use App\Utilities\QueryFilter;
use Carbon\Carbon;
use Auth; 

class Invoice extends QueryFilter implements FilterContract
{
    public function handle($value): void
    {
        $this->query->where('invoice_id', $value);
    }
}