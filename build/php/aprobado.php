
<?php 
	error_reporting(E_ALL);
  session_start();
	include('utilFunctions.php');
  include('paypalFunctions.php');
  require('./../admin/php/connect.php');
  class Services extends Connect{
    function __construct($namefunction){
      $this->addConnection();
      $this->$namefunction();
      $this->removeConnection();
    }
    private function aprovedPayment(){
  	// $ch = curl_init();
  	// $clientId = "AZ_yEN28k2NFLtfpvX0VcU7mxTVKioAxC3Lxt6jzkNQH8hHIeR4JzXfgRTx7i6KyPDO7crvcqUbBgNtU";
  	// $secret = "EGCm9JocifrHqT665ImmHlwYQSR8ARFDfCJ476lCV2HZwnnFC8L8yVwmLAR9_WTTaGchC36t9RdmYssI";

  	// curl_setopt($ch, CURLOPT_URL, "https://api.sandbox.paypal.com/v1/oauth2/token");
  	// curl_setopt($ch, CURLOPT_HEADER, false);
  	// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  	// curl_setopt($ch, CURLOPT_POST, true);
  	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
  	// curl_setopt($ch, CURLOPT_USERPWD, $clientId.":".$secret);
  	// curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

  	// $result = curl_exec($ch);

  	// if(empty($result))die("Error: No response.");
  	// else
  	// {
  	//     $json = json_decode($result);
  	//     $token = $json->access_token;
  	//     print_r($token);
  	// }

  	// curl_close($ch);

  	// $lookUpPaymentInfo = lookUpPaymentDetails($_GET['paymentId'], $token);
  	// echo "<pre>";
   //    print_r($lookUpPaymentInfo);

      // $transactionAmountUpdateArray = $lookUpPaymentInfo['transactions'][0];
      // $transactionAmountUpdateArray = json_encode($transactionAmountUpdateArray);
      // print_r($transactionAmountUpdateArray);

      $response = detailPayment($_GET['paymentId'], $_GET['PayerID'], $_SESSION['access_token']);
      // print_r($response);
      $items = $response['transactions'][0]['item_list']['items'];
      for ($i=0; $i < count($items); $i++) { 
        $query = "SELECT productstock FROM product";
        $result = $this->connection->query($query);
        $line = mysqli_fetch_array($result);
        $stocks = $line['productstock'];
        $total_stocks = $stocks - $items[$i]['quantity'];
        $query = "UPDATE product SET productstock = $total_stocks WHERE idproduct = '".$items[$i]['sku']."'";
        $result = $this->connection->query($query);
      }

      $ordenPedido = $_SESSION['ordernumber'];

      $query = "UPDATE padb.order SET orderstatuspay = 1 WHERE ordernumber = '".$ordenPedido."'";
      $result = $this->connection->query($query);

      // EMAIL ADMINISTRADOR
      $paraAdmin = 'jvazcruz28@gmail.com';
      // título
      $tituloAdmin = 'Compra PerroAgave';
      // mensaje
      $mensajeAdmin = '
      <html>
        <head>
          <title>Datos de compra</title>
        </head>
        <body>';
      $query = "SELECT * FROM padb.user us
                INNER JOIN padb.order ord ON ord.iduser = us.iduser
                INNER JOIN estados e ON e.idEstados = us.userstate
                INNER JOIN ciudades c ON c.idCiudades = us.usercity WHERE us.iduser = '".$_SESSION['idPaUser']."' AND ord.ordernumber = '".$ordenPedido."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      $mensajeAdmin .= 'Confirmación de Compra con Paypal';
      $mensajeAdmin .= '
          <h3>Datos de Usuario</h3>
          <span>Nombre:  '.$line['username'].' '.$line['userlastname'].'</span><br>
          <span>Email:  '.$line['useremail'].'</span><br>
          <span>Dirección:  '.$line['useraddress'].'</span><br>
          <span>Teléfono:  '.$line['userphonenumber'].'</span><br>
          <span>Estado: '.$line['nombreEstado'].' Ciudad: '.$line['nombreCiudad'].'</span><br>
          <span>Código Postal: '.$line['userzipcode'].'</span><br>
      ';

      $query1 = "SELECT * FROM estados WHERE idEstados = '".$_SESSION['ShoppingUserAddress']['state']."'";
      $result1 = $this->connection->query($query1);
      $rowState = mysqli_fetch_array($result1);
      $query2 = "SELECT * FROM ciudades WHERE idCiudades = '".$_SESSION['ShoppingUserAddress']['city']."'";
      $result2 = $this->connection->query($query2);
      $rowCity = mysqli_fetch_array($result2);
      $nombreEnvio = $_SESSION['ShoppingUserAddress']['name'];
      $telEnvio = $_SESSION['ShoppingUserAddress']['phone'];
      $estadoEnvio = $rowState['nombreEstado'];
      $ciudadEnvio = $rowCity['nombreCiudad'];
      $direccionEnvio = $_SESSION['ShoppingUserAddress']['address'];
      $referenciaEnvio = $_SESSION['ShoppingUserAddress']['addressdescription'];
      $cpEnvio = $_SESSION['ShoppingUserAddress']['postalcode'];
      $mensajeAdmin .= '
          <h3>Datos Envío</h3>
          <span>Nombre: '.$nombreEnvio.'</span><br>
          <span>Teléfono: '.$telEnvio.'</span><br>
          <span>Estado: '.$estadoEnvio.' Ciudad: '.$ciudadEnvio.'</span><br>
          <span>Dirección: '.$direccionEnvio.'</span><br>
          <span>Referencias: '.$referenciaEnvio.'</span><br>
          <span>Código Postal: '.$cpEnvio.'</span><br>
          <span>Id Orden: '.$ordenPedido.'</span><br>
      ';
      $mensajeAdmin .= "
          <h3>Detalle pedido</h3>
          <table>
            <tr>
              <th>Imágen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio real</th>
              <th>Precio descuento</th>
              <th>Subtotal</th>
            </tr>
        ";

      // $subtotal = 0;
      for ($a=0; $a < count($_SESSION['shoppingPA']); $a++) { 
        $productimage = $_SESSION['shoppingPA'][$a]['productimage'];
        $idproduct = $_SESSION['shoppingPA'][$a]['idproduct']; 
        $productname = $_SESSION['shoppingPA'][$a]['productname'];
        $productrealprice = $_SESSION['shoppingPA'][$a]['productrealprice'];
        $productdiscountprice = $_SESSION['shoppingPA'][$a]['productdiscountprice'];
        $quantity = $_SESSION['shoppingPA'][$a]['quantity'];
        $ordersubtotal = $_SESSION['shoppingPA'][$a]['productrealprice'] * $quantity;
        $ordersubtotaldiscount = $_SESSION['shoppingPA'][$a]['productdiscountprice'] * $quantity;
        $mensajeAdmin .= "
            <tr>
              <td><img src='http://localhost/www/PerroAgave2/build/admin/src/images/Products/".$productimage."' width='80px' height='auto'></td>
              <td>".$productname."</td>
              <td>".$quantity."</td>
              <td>".$productrealprice."</td>
              <td>".$productdiscountprice."</td>
              <td>".$ordersubtotaldiscount."</td>
            </tr>
        ";
      }
      $mensajeAdmin .="
          </table>
      ";
      $mensajeAdmin .= '
        </body>
      </html>';
      // Para enviar un correo HTML, debe establecerse la cabecera Content-type
      $cabecerasAdmin  = 'MIME-Version: 1.0' . "\r\n";
      $cabecerasAdmin .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
      // Cabeceras adicionales
      // $cabecerasAdmin .= 'To: Pepe <pepe@paratodohayfans.com>, José <jvazcruz28@gmail.com>' . "\r\n";
      $cabecerasAdmin .= 'From: Compra PerroAgave <perronuno@perroagave.com>' . "\r\n";
      mail($paraAdmin, $tituloAdmin, $mensajeAdmin, $cabecerasAdmin);
      // mail($paraAdmin, $tituloAdmin, 'Correo de prueba', $cabecerasAdmin);

      // EMAIL ALMACÉN
      $paraAlmacen = 'jvazcruz28@gmail.com';
      $tituloAlmacen = 'Compra PerroAgave';
      $mensajeAlmacen = '
      <html>
        <head>
          <title>Datos de compra</title>
        </head>
        <body>';
      $query = "SELECT * FROM padb.user us
                INNER JOIN padb.order ord ON ord.iduser = us.iduser
                INNER JOIN estados e ON e.idEstados = us.userstate
                INNER JOIN ciudades c ON c.idCiudades = us.usercity WHERE us.iduser = '".$_SESSION['idPaUser']."' AND ord.ordernumber = '".$ordenPedido."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      $mensajeAlmacen .= 'Confirmación de productos a entregar';
      $mensajeAlmacen .= '
          <h3>Datos de Usuario</h3>
          <span>Nombre:  '.$line['username'].' '.$line['userlastname'].'</span><br>
          <span>Email:  '.$line['useremail'].'</span><br>
          <span>Dirección:  '.$line['useraddress'].'</span><br>
          <span>Teléfono:  '.$line['userphonenumber'].'</span><br>
          <span>Estado: '.$line['nombreEstado'].' Ciudad: '.$line['nombreCiudad'].'</span><br>
          <span>Código Postal: '.$line['userzipcode'].'</span><br>
      ';

      $query1 = "SELECT * FROM estados WHERE idEstados = '".$_SESSION['ShoppingUserAddress']['state']."'";
      $result1 = $this->connection->query($query1);
      $rowState = mysqli_fetch_array($result1);
      $query2 = "SELECT * FROM ciudades WHERE idCiudades = '".$_SESSION['ShoppingUserAddress']['city']."'";
      $result2 = $this->connection->query($query2);
      $rowCity = mysqli_fetch_array($result2);
      $nombreEnvio = $_SESSION['ShoppingUserAddress']['name'];
      $telEnvio = $_SESSION['ShoppingUserAddress']['phone'];
      $estadoEnvio = $rowState['nombreEstado'];
      $ciudadEnvio = $rowCity['nombreCiudad'];
      $direccionEnvio = $_SESSION['ShoppingUserAddress']['address'];
      $referenciaEnvio = $_SESSION['ShoppingUserAddress']['addressdescription'];
      $cpEnvio = $_SESSION['ShoppingUserAddress']['postalcode'];
      $mensajeAlmacen .= '
          <h3>Datos Envío</h3>
          <span>Nombre: '.$nombreEnvio.'</span><br>
          <span>Teléfono: '.$telEnvio.'</span><br>
          <span>Estado: '.$estadoEnvio.' Ciudad: '.$ciudadEnvio.'</span><br>
          <span>Dirección: '.$direccionEnvio.'</span><br>
          <span>Referencias: '.$referenciaEnvio.'</span><br>
          <span>Código Postal: '.$cpEnvio.'</span><br>
          <span>Id Orden: '.$ordenPedido.'</span><br>
      ';
      $mensajeAlmacen .= "
          <h3>Detalle pedido</h3>
          <table>
            <tr>
              <th>Imágen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio real</th>
              <th>Precio descuento</th>
              <th>Subtotal</th>
            </tr>
        ";
      for ($b=0; $b < count($_SESSION['shoppingPA']); $b++) { 
        $productimage = $_SESSION['shoppingPA'][$b]['productimage'];
        $idproduct = $_SESSION['shoppingPA'][$b]['idproduct']; 
        $productname = $_SESSION['shoppingPA'][$b]['productname'];
        $productrealprice = $_SESSION['shoppingPA'][$b]['productrealprice'];
        $productdiscountprice = $_SESSION['shoppingPA'][$b]['productdiscountprice'];
        $quantity = $_SESSION['shoppingPA'][$b]['quantity'];
        $ordersubtotal = $_SESSION['shoppingPA'][$b]['productrealprice'] * $quantity;
        $ordersubtotaldiscount = $_SESSION['shoppingPA'][$b]['productdiscountprice'] * $quantity;
        $mensajeAlmacen .= "
            <tr>
              <td><img src='http://localhost/www/PerroAgave2/build/admin/src/images/Products/".$productimage."' width='80px' height='auto'></td>
              <td>".$productname."</td>
              <td>".$quantity."</td>
            </tr>
        ";
      }
      $mensajeAdmin .="
          </table>
      ";
      $mensajeAlmacen .= '
        </body>
      </html>';
      $cabecerasAlmacen  = 'MIME-Version: 1.0' . "\r\n";
      $cabecerasAlmacen .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
      // $cabecerasAlmacen .= 'To: Pepe <pepe@paratodohayfans.com>, José <jvazcruz28@gmail.com>' . "\r\n";
      $cabecerasAlmacen .= 'From: Compra PerroAgave <perronuno@perroagave.com>' . "\r\n";
      mail($paraAlmacen, $tituloAlmacen, $mensajeAlmacen, $cabecerasAlmacen);

      // EMAIL CLIENTE 
      $paraCliente = 'jvazcruz28@gmail.com';
      $tituloCliente = 'Compra PerroAgave';
      $mensajeCliente = '
      <html>
        <head>
          <title>Datos de compra</title>
        </head>
        <body>';
      $query = "SELECT * FROM padb.user us
                INNER JOIN padb.order ord ON ord.iduser = us.iduser
                INNER JOIN estados e ON e.idEstados = us.userstate
                INNER JOIN ciudades c ON c.idCiudades = us.usercity WHERE us.iduser = '".$_SESSION['idPaUser']."' AND ord.ordernumber = '".$ordenPedido."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      $mensajeCliente .= 'Confirmación de Compra con Paypal';
      $mensajeCliente .= '
          <h3>Datos de Usuario</h3>
          <span>Nombre:  '.$line['username'].' '.$line['userlastname'].'</span><br>
          <span>Email:  '.$line['useremail'].'</span><br>
          <span>Dirección:  '.$line['useraddress'].'</span><br>
          <span>Teléfono:  '.$line['userphonenumber'].'</span><br>
          <span>Estado: '.$line['nombreEstado'].' Ciudad: '.$line['nombreCiudad'].'</span><br>
          <span>Código Postal: '.$line['userzipcode'].'</span><br>
      ';
      $query1 = "SELECT * FROM estados WHERE idEstados = '".$_SESSION['ShoppingUserAddress']['state']."'";
      $result1 = $this->connection->query($query1);
      $rowState = mysqli_fetch_array($result1);
      $query2 = "SELECT * FROM ciudades WHERE idCiudades = '".$_SESSION['ShoppingUserAddress']['city']."'";
      $result2 = $this->connection->query($query2);
      $rowCity = mysqli_fetch_array($result2);
      $nombreEnvio = $_SESSION['ShoppingUserAddress']['name'];
      $telEnvio = $_SESSION['ShoppingUserAddress']['phone'];
      $estadoEnvio = $rowState['nombreEstado'];
      $ciudadEnvio = $rowCity['nombreCiudad'];
      $direccionEnvio = $_SESSION['ShoppingUserAddress']['address'];
      $referenciaEnvio = $_SESSION['ShoppingUserAddress']['addressdescription'];
      $cpEnvio = $_SESSION['ShoppingUserAddress']['postalcode'];
      $mensajeCliente .= '
          <h3>Datos Envío</h3>
          <span>Nombre: '.$nombreEnvio.'</span><br>
          <span>Teléfono: '.$telEnvio.'</span><br>
          <span>Estado: '.$estadoEnvio.' Ciudad: '.$ciudadEnvio.'</span><br>
          <span>Dirección: '.$direccionEnvio.'</span><br>
          <span>Referencias: '.$referenciaEnvio.'</span><br>
          <span>Código Postal: '.$cpEnvio.'</span><br>
          <span>Id Orden: '.$ordenPedido.'</span><br>
      ';
      $mensajeCliente .= "
          <h3>Detalle pedido</h3>
          <table>
            <tr>
              <th>Imágen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio real</th>
              <th>Precio descuento</th>
              <th>Subtotal</th>
            </tr>
        ";
      for ($c=0; $c < count($_SESSION['shoppingPA']); $c++) { 
        $productimage = $_SESSION['shoppingPA'][$c]['productimage'];
        $idproduct = $_SESSION['shoppingPA'][$c]['idproduct']; 
        $productname = $_SESSION['shoppingPA'][$c]['productname'];
        $productrealprice = $_SESSION['shoppingPA'][$c]['productrealprice'];
        $productdiscountprice = $_SESSION['shoppingPA'][$c]['productdiscountprice'];
        $quantity = $_SESSION['shoppingPA'][$c]['quantity'];
        $ordersubtotal = $_SESSION['shoppingPA'][$c]['productrealprice'] * $quantity;
        $ordersubtotaldiscount = $_SESSION['shoppingPA'][$c]['productdiscountprice'] * $quantity;
        $mensajeCliente .= "
            <tr>
              <td><img src='http://localhost/www/PerroAgave2/build/admin/src/images/Products/".$productimage."' width='80px' height='auto'></td>
              <td>".$productname."</td>
              <td>".$quantity."</td>
              <td>".$productrealprice."</td>
              <td>".$productdiscountprice."</td>
              <td>".$ordersubtotaldiscount."</td>
            </tr>
        ";
      }
      $mensajeAdmin .="
          </table>
      ";
      $mensajeCliente .= '
        </body>
      </html>';
      $cabecerasCliente  = 'MIME-Version: 1.0' . "\r\n";
      $cabecerasCliente .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
      $cabecerasCliente .= 'From: Compra PerroAgave <perronuno@perroagave.com>' . "\r\n";
      mail($paraCliente, $tituloCliente, $mensajeCliente, $cabecerasCliente);
      session_destroy();
      header( 'Location: ../#/gracias');
    }
  }
  new Services('aprovedPayment');
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

