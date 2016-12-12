
<?php 
	error_reporting(E_ALL);
	// print_r($_GET);

	include('utilFunctions.php');
    include('paypalFunctions.php');

	$ch = curl_init();
	$clientId = "AZ_yEN28k2NFLtfpvX0VcU7mxTVKioAxC3Lxt6jzkNQH8hHIeR4JzXfgRTx7i6KyPDO7crvcqUbBgNtU";
	$secret = "EGCm9JocifrHqT665ImmHlwYQSR8ARFDfCJ476lCV2HZwnnFC8L8yVwmLAR9_WTTaGchC36t9RdmYssI";

	curl_setopt($ch, CURLOPT_URL, "https://api.sandbox.paypal.com/v1/oauth2/token");
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
	curl_setopt($ch, CURLOPT_USERPWD, $clientId.":".$secret);
	curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

	$result = curl_exec($ch);

	if(empty($result))die("Error: No response.");
	else
	{
	    $json = json_decode($result);
	    $token = $json->access_token;
	    print_r($token);
	}

	curl_close($ch);

	// $lookUpPaymentInfo = lookUpPaymentDetails($_GET['paymentId'], $token);
	echo "<pre>";
 //    print_r($lookUpPaymentInfo);

    // $transactionAmountUpdateArray = $lookUpPaymentInfo['transactions'][0];
    // $transactionAmountUpdateArray = json_encode($transactionAmountUpdateArray);
    // print_r($transactionAmountUpdateArray);

    $response = detailPayment($_GET['paymentId'], $_GET['PayerID'], $token);
    print_r($response);
?>

<!-- OBTENER EL TOKEN -->
<!-- curl -v https://api.sandbox.paypal.com/v1/oauth2/token \
  -H "Accept: application/json" \
  -H "Accept-Language: en_US" \
  -u "AZ_yEN28k2NFLtfpvX0VcU7mxTVKioAxC3Lxt6jzkNQH8hHIeR4JzXfgRTx7i6KyPDO7crvcqUbBgNtU:EGCm9JocifrHqT665ImmHlwYQSR8ARFDfCJ476lCV2HZwnnFC8L8yVwmLAR9_WTTaGchC36t9RdmYssI" \
  -d "grant_type=client_credentials" -->

<!-- EXPERINCE PROFILE -->
<!-- curl -v POST https://api.sandbox.paypal.com/v1/payment-experience/web-profiles \
-H 'Content-Type:application/json' \
-H 'Authorization: Bearer A101.wECo9ip8e1gEbYiX56lz9iVIulwfU9Vvaz-X2DDR8fp37SZtT7UCbVi6ta-WUEYk.bdgeZjGY9eYqDGtllSxUfkpfz6C' \
-d '{
  "name": "YeowZa! T-Shirt Shop",
  "presentation": {
    "brand_name": "YeowZa! Paypal",
    "logo_image": "http://www.yeowza.com",
    "locale_code": "US"
  },
  "input_fields": {
    "no_shipping": 0,
    "address_override": 1
  },
  "flow_config": {
    "landing_page_type": "billing",
    "bank_txn_pending_url": "http://www.yeowza.com"
  }
}' -->

<!-- INICIAR UN PAGO -->
<!-- curl -v https://api.sandbox.paypal.com/v1/payments/payment \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer A101.wECo9ip8e1gEbYiX56lz9iVIulwfU9Vvaz-X2DDR8fp37SZtT7UCbVi6ta-WUEYk.bdgeZjGY9eYqDGtllSxUfkpfz6C' \
  -d '{
  "intent": "sale",
  "experience_profile_id":"XP-GVPJ-AZCF-EYE4-SZB2",
  "redirect_urls":
  {
    "return_url": "http://return-url",
    "cancel_url": "http://cancel-url"
  },
  "payer":
  {
    "payment_method": "paypal"
  },
  "transactions": [
  {
    "amount":
    {
      "total": "4.00",
      "currency": "USD",
      "details":
      {
        "subtotal": "2.00",
        "shipping": "1.00",
        "tax": "2.00",
        "shipping_discount": "-1.00"
      }
    },
    "item_list":
    {
      "items": [
      {
        "quantity": "1",
        "name": "item 1",
        "price": "1",
        "currency": "USD",
        "description": "item 1 description",
        "tax": "1"
      },
      {
        "quantity": "1",
        "name": "item 2",
        "price": "1",
        "currency": "USD",
        "description": "item 2 description",
        "tax": "1"
      }]
    },
    "description": "The payment transaction description.",
    "invoice_number": "merchant invoice",
    "custom": "merchant custom data"
  }]
}' -->

<!-- MOSTRAR DETALLES DEL PAGO -->
<!-- curl -v -X GET https://api.sandbox.paypal.com/v1/payments/payment/PAY-4YY32057CR048061NLBFP2KQ \
  -H "Content-Type:application/json" \
  -H "Authorization: Bearer A101.wECo9ip8e1gEbYiX56lz9iVIulwfU9Vvaz-X2DDR8fp37SZtT7UCbVi6ta-WUEYk.bdgeZjGY9eYqDGtllSxUfkpfz6C" -->

<!-- EJECUTAR EL PAGO -->
<!-- curl -v https://api.sandbox.paypal.com/v1/payments/payment/PAY-39T04685EC957391TLBFO45I/execute/ \
  -H "Content-Type:application/json" \
  -H "Authorization: Bearer A101.RNKkq4DckySCM0CUEeHgnpJyHRdauXW4jNTdIvltbzkrR0G47BjhdG4dWwGsvc2h.n8ii0t9BtXRZQC8baf90P93wh38" \
  -d '{
  "payer_id": "WNH5JB5HRVWWW"
}' -->

