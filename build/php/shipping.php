<?php
	/*
		* Shipping Details page : part of the Proceed to Checkout/Mark flow. Buyer can enter shipping address information and choose shipping option on this page.
	*/
    if (session_id() == "")
        session_start();
    // echo "<pre>";
    // print_r($_SESSION);
    $cancelUrl= "http://localhost/www/PerroAgave2/build/php/cancelado.php"; //cancel.php
    $payUrl = "http://localhost/www/PerroAgave2/build/php/aprobado.php"; //pay.php
    $placeOrderUrl = "http://localhost/www/PerroAgave2/build/php/placeOrder.php";

    $shipping = $_POST['shippingCost'];
    // $total = 0;
    $subtotal = 0;
    for ($i=0; $i < count($_SESSION['shoppingPA']); $i++) { 
        // $total = $total + (($_SESSION['shoppingPA'][$i]['productdiscountprice'] * $_SESSION['shoppingPA'][$i]['quantity']) - $_SESSION['shoppingPA'][$i]['discount']);
        $items[] = array(
            "name" => $_SESSION['shoppingPA'][$i]['productname'],
            "quantity" => $_SESSION['shoppingPA'][$i]['quantity'],
            "price" => $_SESSION['shoppingPA'][$i]['productdiscountprice'],
            "sku" => $_SESSION['shoppingPA'][$i]['idproduct'],
            "currency" => 'MXN'
        );
        $subtotal = $subtotal + ($_SESSION['shoppingPA'][$i]['productdiscountprice'] * $_SESSION['shoppingPA'][$i]['quantity']);
    }
    $total = $subtotal + $shipping;
    $items = json_encode($items);

    $_SESSION['expressCheckoutPaymentData'] = '{
        "intent":"sale",
        "payer":
        {
            "payment_method":"paypal"
        },
        "transactions":
        [
            {
                "amount":{
                    "currency":"MXN",
                    "total":"'.$total.'",
                    "details":
                    {
                        "shipping":"'.$shipping.'",
                        "subtotal":"'.$subtotal.'"
                    }
                },
                "description":"Compra Perro Agave.",
                "custom":"Nouphal Custom",
                "item_list":
                {
                   "items": '.$items.'
                }
            }
        ],
        "redirect_urls":
        {
            "cancel_url":"'.$cancelUrl.'",
            "return_url":"'.$placeOrderUrl.'"
        }
    }';

    $_SESSION['markFlowPaymentData'] = '{
        "intent":"sale",
        "payer":
        {
          "payment_method":"paypal"
        },
        "transactions":
        [
            {
                "amount":
                {
                    "currency":"MXN",
                    "total":"'.$total.'",
                    "details":
                    {
                        "shipping":"'.$shipping.'",
                        "subtotal":"'.$subtotal.'"
                    }
                },
                "description":"This is the payment transaction description ---->.",
                "custom":"Nouphal Custom",
                "item_list":
                {
                    "items": '.$items.'
                }
            }
        ],
        "redirect_urls":
        {
            "return_url":"'.$payUrl.'",
            "cancel_url":"'.$cancelUrl.'"
        }
    }';

    include('paypalConfig.php');

        if(SANDBOX_FLAG) {
            $environment = SANDBOX_ENV;
        } else {
            $environment = LIVE_ENV;
        }
	
?>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <h4>
                Please provide your shipping information:

                <form action="startPayment.php" method="POST">
                	<!-- <input type="text" name="csrf" value="<?php echo($_SESSION['csrf']);?>" hidden readonly/> -->
                    <!-- <input type="text" name="markFlow" value="true" hidden></input> -->
                    <input type="text" name="idPaUser" value="<?php echo $_SESSION['idPaUser'];?>" hidden></input>
                    <button id="t1"  class="btn btn-primary">Place Order</button>
                </form>
            </h4>
            <br/>
        </div>
        <div class="col-md-4"></div>
    </div>

    <!-- PayPal In-Context Checkout script -->
    <script type="text/javascript">
        window.paypalCheckoutReady = function () {
            paypal.checkout.setup('<?php echo(MERCHANT_ID); ?>', {
                environment: '<?php echo($environment); ?>', //or 'production' depending on your environment
                button: ['t1']
            });
        };
    </script>
    <script src="//www.paypalobjects.com/api/checkout.js" async></script>
<?php
    // include('footer.php');
?>