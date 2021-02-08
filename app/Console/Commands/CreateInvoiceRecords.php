<?php

namespace App\Console\Commands;

use App\Models\Invoice;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CreateInvoiceRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:create_records';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Atribui cada registro da tabela payments a tabela invoice';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $payments = Payment::all();
        foreach($payments as $payment) {
            $user = $payment->user;
            $pay_date = $user->pay_date;
            $date = Carbon::parse($payment->time);
            $first_date = Carbon::parse($date->format('Y-m') . '-' . $pay_date . ' ' . $date->format('H:i:s'))->subDays(9);
            if($first_date->format('d') > $date->format('d')) {
                $second_date = Carbon::parse($date->format('Y-m') . '-' . $pay_date . ' ' . $date->format('H:i:s'))->addMonth()->subDays(10);
                $invoice = Invoice::firstOrCreate([
                    'user_id' => $user->id,
                    'start_date' => $first_date->format('Y-m-d'),
                    'end_date' => $second_date->format('Y-m-d'). ' 23:59:59'
                ]);
            }else {
                $final_date = Carbon::parse($date->format('Y-m') . '-' . $pay_date . ' ' . $date->format('H:i:s'))->addMonth()->subDays(10);
                $start_date = Carbon::parse($date->format('Y-m') . '-' . $pay_date . ' ' . $date->format('H:i:s'))->subDays(9);
                $invoice = Invoice::firstOrCreate([
                    'user_id' => $user->id,
                    'start_date' => $start_date->format('Y-m-d'),
                    'end_date' => $final_date->format('Y-m-d') . ' 23:59:59'
                ]);
            }
            $payment->invoice_id = $invoice->id;
            $payment->save();
        }
    }
}
