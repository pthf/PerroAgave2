<?php
        
        include('utilFunctions.php');
        include('paypalFunctions.php');
        require('./../admin/php/connect.php');
        class Services extends Connect{
                function __construct($namefunction){
                        $this->addConnection();
                        $this->$namefunction();
                        $this->removeConnection();
                }
                private function processPayment(){
                        /*
                		* Contains call to create payment object and receive Approval URL to which user is then redirected to.
                	*/
                	// if (session_id() == "")
        		      session_start();
                        $cancelUrl= "http://localhost/www/PerroAgave2/build/php/cancelado.php"; //cancel.php
                        $payUrl = "http://localhost/www/PerroAgave2/build/php/aprobado.php"; //pay.php
                        // $placeOrderUrl = "http://localhost/www/PerroAgave2/build/php/placeOrder.php";

                        $shipping = $_POST['costoEnvio'];
                        // $total = 0;
                        $subtotal = 0;
                        for ($i=0; $i < count($_SESSION['shoppingPA']); $i++) { 
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
                                    "return_url":"'.$payUrl.'"
                                }
                        }';

                	$access_token = getAccessToken();
                	$_SESSION['access_token'] = $access_token;

                        // echo "<pre>";
                        // print_r($_SESSION);
                        // print_r($_POST);
                        $ordershippingcost = $_POST['costoEnvio'];
                        if (isset($_SESSION['paCouponStore'])) {
                                $discountCupon = $_SESSION['paCouponStore']['cuponesdes'];
                        } else {
                                $discountCupon = 0;
                        }
                        $ordername = $_SESSION['ShoppingUserAddress']['name'];
                        $ordertelefono = $_SESSION['ShoppingUserAddress']['phone'];
                        $ordercity = $_SESSION['ShoppingUserAddress']['city'];
                        $orderstate = $_SESSION['ShoppingUserAddress']['state'];
                        $orderaddress = $_SESSION['ShoppingUserAddress']['address'];
                        $orderreferences = $_SESSION['ShoppingUserAddress']['addressdescription'];
                        $orderzipcode = $_SESSION['ShoppingUserAddress']['postalcode'];
                        $orderstatuspay = 0;
                        $orderstatusfacture = 0;
                        $orderstatusentrega = 0;
                        $date = date('Y-m-d');
                        $iduser = $_SESSION['idPaUser'];

                        $query = "INSERT INTO padb.order VALUES(null,'S/N','".$ordershippingcost."','".$discountCupon."','".$ordername."','".$ordertelefono."','".$ordercity."',
                                '".$orderstate."','".$orderaddress."','".$orderreferences."','".$orderzipcode."','".$orderstatuspay."','".$orderstatusfacture."','".$orderstatusentrega."','".$date."','".$iduser."')";
                        $result = $this->connection->query($query);

                        $query = "SELECT MAX(idorder) AS id FROM padb.order";
                        $result = $this->connection->query($query);
                        if ($row = mysqli_fetch_row($result)) {
                                $idorder = trim($row[0]);
                                $ordernumber = "PAYPA".$idorder.date("Y").date("m").date("d");
                                $query = "UPDATE padb.order SET ordernumber = '".$ordernumber."' WHERE idorder = '".$idorder."'";
                                $result = $this->connection->query($query);
                                $_SESSION['ordernumber'] = $ordernumber;

                                $subtotal = 0;
                                for ($x=0; $x < count($_SESSION['shoppingPA']); $x++) { 
                                        $idproduct = $_SESSION['shoppingPA'][$x]['idproduct']; 
                                        $orderquantity = $_SESSION['shoppingPA'][$x]['quantity'];
                                        $ordersubtotal = $_SESSION['shoppingPA'][$x]['productrealprice'] * $orderquantity;
                                        $ordersubtotaldiscount = $_SESSION['shoppingPA'][$x]['productdiscountprice'] * $orderquantity;
                                        $query = "INSERT INTO order_has_product VALUES('".$idorder."','".$idproduct."','".$orderquantity."','".$ordersubtotal."','".$ordersubtotaldiscount."')";
                                        $result = $this->connection->query($query);
                                }

                        }
                    // echo "<pre>";
                    // print_r($_SESSION);
                    // exit();
                	if(isset($_SESSION)){
                               $approval_url = getApprovalURL($_SESSION['access_token'], $_SESSION['expressCheckoutPaymentData']);
                	       //redirect user to the Approval URL
                	       header("Location:".$approval_url);
                	} else {
                	      die('Session expired');
                	}
                }
        }
        new Services('processPayment');

?>