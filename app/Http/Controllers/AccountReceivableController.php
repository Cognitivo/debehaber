<?php

namespace App\Http\Controllers;

use App\AccountMovement;
use App\Transaction;
use App\TransactionDetail;
use App\Taxpayer;
use App\Cycle;
use App\Chart;
use App\Http\Resources\GeneralResource;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use DB;

class AccountReceivableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Taxpayer $taxPayer, Cycle $cycle)
    {
        $query = TransactionDetail::leftJoin('account_movements as am', 'am.transaction_id', 'transaction_details.transaction_id')
        ->join('transactions', 'transactions.id', 'transaction_details.transaction_id')
        ->where('transactions.taxpayer_id', $taxPayer->id)
        ->where('transactions.type', 2)
        ->where('transactions.sub_type', 1)
        ->where('transactions.payment_condition', '>', 0)
        ->having(DB::raw('COALESCE(sum(transaction_details.value * transactions.rate),0)'), '!=', 'COALESCE(sum(am.credit * am.rate),0)')
        ->select(
            DB::raw('max(transactions.id) as id'),
            DB::raw('max(transactions.date) as date'),
            DB::raw('max(transactions.partner_name) as partner_name'),
            DB::raw('max(transactions.partner_taxid) as partner_taxid'),
            DB::raw('max(transactions.number) as number'),
            DB::raw('COALESCE(sum(transaction_details.value * transactions.rate),0) as sales'),
            DB::raw('COALESCE(sum(am.credit * am.rate),0) as credit'),
            DB::raw('COALESCE(sum(transaction_details.value * transactions.rate),0)-COALESCE(sum(am.credit * am.rate),0) as balance')
        )
        ->groupBy('transactions.id');

        return GeneralResource::collection(
            QueryBuilder::for($query)
                ->allowedFilters('partner_name', 'partner_taxid', 'number')
                ->paginate(50)
            );

        // return GeneralResource::collection(TransactionDetail::leftJoin('account_movements as am', 'am.transaction_id', 'transaction_details.transaction_id')
        //     ->join('transactions', 'transactions.id', 'transaction_details.transaction_id')
        //     ->where('transactions.taxpayer_id', $taxPayer->id)
        //     ->where('transactions.type', 2)
        //     ->where('transactions.sub_type', 1)
        //     ->where('transactions.payment_condition', '>', 0)
        //     ->having(DB::raw('COALESCE(sum(transaction_details.value * transactions.rate),0)'), '!=', 'COALESCE(sum(am.credit * am.rate),0)')
        //     ->select(
        //         DB::raw('max(transactions.id) as id'),
        //         DB::raw('max(transactions.date) as date'),
        //         DB::raw('max(transactions.partner_name) as partner_name'),
        //         DB::raw('max(transactions.partner_taxid) as partner_taxid'),
        //         DB::raw('max(transactions.number) as number'),
        //         DB::raw('COALESCE(sum(transaction_details.value * transactions.rate),0) as sales'),
        //         DB::raw('COALESCE(sum(am.credit * am.rate),0) as credit'),
        //         DB::raw('COALESCE(sum(transaction_details.value * transactions.rate),0)-COALESCE(sum(am.credit * am.rate),0) as balance')
        //     )
        //     ->groupBy('transactions.id')->paginate(50));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Taxpayer $taxPayer, Cycle $cycle)
    {
        if ($request->payment_value > 0) {

            $accountMovement = AccountMovement::where('transaction_id', $request->id)->first() ?? new AccountMovement();
            $accountMovement->taxpayer_id = $taxPayer->id;
            $accountMovement->chart_id = $request->chart_account_id['id'];
            $accountMovement->date = $request->date;

            $accountMovement->transaction_id = $request->id > 0 ? $request->id : null;
            $accountMovement->currency = $request->currency;
            $accountMovement->rate = $request->rate ?? 1;
            $accountMovement->credit = $request->payment_value != '' ? $request->payment_value : 0;
            $accountMovement->comment = $request->comment;

            $accountMovement->save();

            return response()->json('ok', 200);
        }

        return response()->json('no value', 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AccountMovement  $accountMovement
     * @return \Illuminate\Http\Response
     */
    public function show(Taxpayer $taxPayer, Cycle $cycle, $transactionId)
    {
        return new GeneralResource(
            Transaction::MySales()
                ->where('id', $transactionId)
                ->with('details')
                ->with('accountMovements')
                ->first()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AccountMovement  $accountMovement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Taxpayer $taxPayer, Cycle $cycle, $transactionID)
    {
        // try
        // {
        //     //TODO: Run Tests to make sure it deletes all journals related to transaction
        //     AccountMovement::where('transaction_id', $transactionID)->delete();
        //     JournalTransaction::where('transaction_id',$transactionID)->delete();
        //     Transaction::where('id',$transactionID)->delete();
        //
        //     return response()->json('ok', 200);
        // }
        // catch (\Exception $e)
        // {
        //     return response()->json($e, 500);
        // }
    }

    public function generate_Journals($startDate, $endDate, $taxPayer, $cycle)
    {
        \DB::connection()->disableQueryLog();

        $journal = \App\Journal::where('cycle_id', $cycle->id)
            ->where('date', $endDate->format('Y-m-d'))
            ->where('is_automatic', 1)
            ->where('module_id', 5)
            ->with('details')->first() ?? new \App\Journal();

        //Clean up details by placing 0. this will allow cleaner updates and know what to delete.
        foreach ($journal->details()->get() as $detail) {
            $detail->credit = 0;
            $detail->debit = 0;
            $detail->save();
        }

        $comment = __('Payments Received', ['startDate' => $startDate->toDateString(), 'endDate' => $endDate->toDateString()]);

        $journal->cycle_id = $cycle->id;
        $journal->date = $endDate;
        $journal->comment = $comment;
        $journal->is_automatic = 1;
        $journal->module_id = 5;
        $journal->save();

        $chartController = new ChartController();

        $queryAccountMovements = AccountMovement::PaymentsRecieved($startDate, $endDate, $taxPayer->id);
        //2nd Query: Movements related to Credit Purchases. Cash Purchases are ignored.
        $listOfPayables = AccountMovement::PaymentsRecieved($startDate, $endDate, $taxPayer->id)->get();

        //run code for credit purchase (insert detail into journal)
        foreach ($listOfPayables as $row) {

            $localValue = $row->credit * $row->rate;

            if ($localValue == 0) {
                continue;
            }

            //First Accounts Receivables with localized currency localValue.
            $partnerChartID = $chartController->createIfNotExists_AccountsPayable($taxPayer, $cycle, $row->transaction->partner_taxid, $row->transaction->partner_name)->id;
            $detail = $journal->details()->firstOrNew(['chart_id' => $partnerChartID]);
            $detail->debit += $localValue;
            $detail->chart_id = $partnerChartID;
            $journal->details()->save($detail);

            //Second Accounts with same localized currency localValue.
            $detail = $journal->details()->firstOrNew(['chart_id' => $row->chart_id]);
            $detail->credit += $localValue;
            $detail->chart_id = $row->chart_id;
            $journal->details()->save($detail);

            //Third, Verify Transaction Currency Rate vs Payment Currency Rate to calculate profit or loss by exchange rate differences
            $invoiceRate = $row->transaction->rate;
            $paymentRate = $row->rate;
            $rateDifference = abs($invoiceRate - $paymentRate);

            if ($paymentRate < $invoiceRate) {
                //Gain by Exchange Rante Difference
                $detail = new \App\JournalDetail();
                $detail->debit = $row->debit * $rateDifference;
                $detail->credit = 0;
                $detail->chart_id = $chartController->createIfNotExists_IncomeFromFX($taxPayer, $cycle)->id;
                $journal->details()->save($detail);
            } else if ($paymentRate > $invoiceRate) {
                //Loss by Exchange Rante Difference
                $detail = new \App\JournalDetail();
                $detail->debit = 0;
                $detail->credit = $row->debit * $rateDifference;
                $detail->chart_id = $chartController->createIfNotExists_ExpenseFromFX($taxPayer, $cycle)->id;
                $journal->details()->save($detail);
            }
        }

        if ($journal->details()->count() == 0) {
            $journal->details()->delete();
            $journal->delete();
        }

        $queryAccountMovements->update(['journal_id' => $journal->id]);
    }
}
