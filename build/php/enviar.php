<?php
		parse_str($_POST['data'],$formdata);

		$nombre   = $formdata['nombre'];
		$email    = $formdata['email'];
		$tel      = $formdata['phone'];
		$men      = $formdata['mensaje'];


		$header = 'From: ' . $email ."\r\n";
		$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
		$header .= "Mime-Version: 1.0 \r\n";
		$header .= "Content-Type: text/plain";

		$mensaje = "Este mensaje fue enviado por " . $nombre ." \r\n";
		$mensaje .= "Télefono " . $tel . " \r\n";
		$mensaje .= "Mensaje " . $men . " \r\n";
		$mensaje .= "Enviado el " . date('d/m/Y', time());

		$para   = 'memo.0321@gmail.com';
		$asunto = 'Contacto';

		mail("$para,$para",$asunto,utf8_decode($mensaje),$header);

?>
