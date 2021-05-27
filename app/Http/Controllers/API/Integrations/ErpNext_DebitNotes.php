<?php

namespace App\Http\Controllers\API\Integrations;

use App\Taxpayer;
use App\Cycle;
use App\Transaction;
use App\TransactionDetail;
use App\Http\Controllers\API\IntegrationController;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;

class ErpNext_DebitNotes extends Controller
{

	 const take = 20;
	 public $url = '{{url}}/api/resource/Purchase%20Invoice/?limit_start={{pageStart}}&limit_page_length={{pageLength}}&fields=["name","supplier_name","tax_id"]&filters=[["Purchase Invoice","posting_date", ">=","{{startDate}}"],["Purchase Invoice","posting_date", "<=","{{endDate}}"],["Purchase Invoice","is_return", "=","1"]]';
	 public $header = [
		 				'headers' => [
		 					'Authorization'     => 'token {{key}}:{{secret}}'
		 				]
					 ];


	public function pre_get(Request $request, Taxpayer $taxPayer, Cycle $cycle,$url)
	{
		$collection = collect();
		$debitnoteCollection = collect();
		$errorCollection = collect();

		$debitnoteurl = $this->url;
		$debitnoteurl = str_replace('{{pageStart}}', $request->limit_Start, $debitnoteurl);
		
		$data = (new IntegrationController())->get($debitnoteurl, $this->header);
		$data = json_decode($data->getBody()->getContents());
		$data = collect($data->data);

		// $customers='';
		// foreach ($data as $row)
		// {
		// 	$customers = $customers . $row->customer_name . ",";
		// }
		// $customers=substr_replace($customers ,"",-1);

		//$customerData = (new IntegrationController())->get($url . '/api/resource/Customer/?fields=["name","tax_id"]&filters=[["Customer","name", "in","'. $customers . '"]]', $this->header);

		//$customerData = json_decode($customerData->getBody()->getContents());
		//$customerData = collect($customerData->data);
		foreach ($data as $row)
		{

			$debitnoteData = (new IntegrationController())->get($url . '/api/resource/Purchase Invoice/'.  $row->name . '/?fields=["name","supplier_name","tax_id","posting_date","due_date","currency","conversion_rate","items"]', $this->header);
			$debitnoteData = json_decode($debitnoteData->getBody()->getContents());
			$debitnoteData = collect($debitnoteData->data);
			// if(isset($debitnoteData['tax_id']))
			// {
				$debitnoteData = $this->map($taxPayer,$cycle,$debitnoteData);
				$debitnoteCollection->add($debitnoteData);
			// }
			// else {
			// 	$errorData = $debitnoteData['posting_date'] . ' Invoice#:' . $debitnoteData['name'] . ' Supplier:' . $debitnoteData['supplier_name'];
			// 	$errorCollection->add($errorData);
			// }

		}

         $collection['sales'] = $debitnoteCollection;
		 $collection['error'] = $errorCollection;
		return $collection;
	}


	public function map(Taxpayer $taxPayer, Cycle $cycle,$row)
	{

		    //$customer = $customers->where('name',$row['customer_name'])->first();

			$model = new \App\Transaction();
			$model->Type = 1;
			$model->SubType = 2;
			$model->CustomerName = $taxPayer->name; 
			$model->CustomerTaxID = $taxPayer->taxid;
			$model->SupplierName =  $row['supplier_name'];
			$model->SupplierTaxID =  $row['tax_id'];
			$model->Date = $row['posting_date'];
			$model->Number =  str_replace(Carbon::now()->format('Y') . '-', '',$row['name']) ;
			$model->Code = '';
			$model->CodeExpiry = '';
			$datetime1 = new DateTime($row['posting_date']);
			$datetime2 = new DateTime($row['due_date']);
			$interval = $datetime1->diff($datetime2);
			$days = $interval->format('%a');//now do whatever you like with $days
			$model->PaymentCondition = $days;
			$model->CurrencyCode = $row['currency'];
			$model->CurrencyRate = $row['conversion_rate'];
			$model->Comment = '';

			$details = collect();
			foreach ($row['items'] as $data)
			{
				$data = collect($data);
				$detail = new \App\TransactionDetail();

				//  if	($salesitem != null)
				//  {
				// 	if ($salesitem->is_stock_item == 1) {
						$detail->Type = 2;
						$detail->Name = 'Product';
					//  }
					//  elseif ($salesitem->is_fixed_asset == 0) {
					// 	$detail->Type = 1;
					// 	$detail->Name = 'Service';

					//  }
					//  else {
					// 	$detail->Type = 3;
					// 	$detail->Name = 'Fixed Asset';
					//  }

					$detail->Value = $data['amount'] * -1;
					$detail->Cost = 0;

					$detail->VATPercentage = $row['taxes']!=null?$row['taxes'][0]->rate * 1:0;
					$details->add($detail);
				//  }
			}
			$model['Details'] = $details;
		return $model;
	}


}
