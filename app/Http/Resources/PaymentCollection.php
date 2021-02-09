<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Auth;
use Carbon\Carbon;
class PaymentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private $value;

    public function __construct($resource, $query)
    {
        
        $this->value = $query->active()->sum('price');
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        return[
            'data' => $this->collection,
            'value' => $this->value,
        ];
    }

}
