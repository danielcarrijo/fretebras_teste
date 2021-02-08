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
            'exp' => $this->getExpDate(),
        ];
    }

    protected function getExpDate() {
        $pay_date = Auth::user()->pay_date;
        $now = Carbon::now();
        if(isset(request()['time'])) {
            $now->addMonths(request()->time);
            if($now->format('d') > $pay_date) {
                return Carbon::parse($now->format('Y-m') . '-' . $pay_date)->addMonth()->format('d/m');
            }else{
                return Carbon::parse($now->format('Y-m') . '-' . $pay_date)->format('d/m');
            }
        }
    }

    // protected function getStatus() {
    //     $now = Carbon::now();
    //     $first_date = Carbon::parse($now->format('Y-m') . '-' . $pay_date . ' ' . $date->format('H:i:s'))->subDays(9);
    //     $now = Carbon::parse()->format('Y-m-d H:i:s');
    //     if(isset(request()['time'])) {
    //         if(request()->time == 0) {
    //             return 'open' : 'closed'
    //         }else if(request()->time < 0) {
    //             return 'closed';
    //         }else if(request()->time > 0) {
    //             return 'paid';
    //         }
    //     }
    // }
}
