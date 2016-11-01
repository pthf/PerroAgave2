<?php
  require('./connect.php');

  $connect = new Connect();
  $connection = $connect->addConnection();

  $username = 'Admin';
	$password = 'Admin';
	$passwordhash = password_hash($password, PASSWORD_DEFAULT);
	$query = "INSERT INTO admin (adminusername, adminuserpassword, adminlastconnection) VALUES ('$username', '$passwordhash', '0000-00-00 00:00:00')";
	mysqli_query($connection, $query);
