<?php

namespace App\Utilities\PaymentFilters;

use App\Utilities\FilterContract;
use App\Utilities\QueryFilter;
use Carbon\Carbon;
use Auth;
use Illuminate\Database\Eloquent\Builder;

class Store extends QueryFilter implements FilterContract
{
    public function handle($value): void
    {
        $this->query->whereHas('store', function (Builder $query) use($value){
            $query->where('name', 'like', '%' . $value . '%') ;
        });
    }
}