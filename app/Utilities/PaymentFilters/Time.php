<?php

namespace App\Utilities\PaymentFilters;

use App\Utilities\FilterContract;
use App\Utilities\QueryFilter;
use Carbon\Carbon;
use Auth; 

class Time extends QueryFilter implements FilterContract
{
    public function handle($value): void
    {
        $user = Auth::user();
        if($this->isThisMonth()) {
            $startDate = $user->limit->addMonth($value-1)->subDays(9)->format('Y-m-d') . ' 00:00:00';
            $endDate = $user->limit->addMonth($value)->subDays(10)->format('Y-m-d') . ' 23:59:59';
        }else{
            $startDate = $user->limit->addMonth($value)->subDays(9)->format('Y-m-d') . ' 00:00:00';
            $endDate = $user->limit->addMonth($value+1)->subDays(10)->format('Y-m-d') . ' 23:59:59';
        }
        $this->query->where('time', '>', $startDate)->where('time', '<=', $endDate);
    }

    private function isThisMonth() {
        $date = Auth::user()->pay_date;
        return $date >= Carbon::now()->day;
    }
}