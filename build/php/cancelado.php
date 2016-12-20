<?php 
	session_start();
	require('./../admin/php/connect.php');
  	class Services extends Connect{
	    function __construct($namefunction){
	      $this->addConnection();
	      $this->$namefunction();
	      $this->removeConnection();
	    }
    	private function cancelPayment(){
			echo "<pre>";
			print_r($_GET);
			print_r($_SESSION);
			$ordenPedido = $_SESSION['ordernumber'];

			// EMAIL ADMINISTRADOR
			$paraAdmin = 'jvazcruz28@gmail.com';
			// título
			$tituloAdmin = 'Compra cancelada PerroAgave';
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
			$mensajeAdmin .= 'Información de Compra con Paypal';
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
			session_destroy();
			header( 'Location: ../#/cancelado');
		}
	}
	new Services('cancelPayment');
?>