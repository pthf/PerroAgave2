<?php
  session_start();
  if(!isset($_SESSION['idPAadmin']))
    header("Location: ./../index.php");
?>
<!DOCTYPE html>
<html ng-app="paPanel" lang="es">
<head>
  <title>PERRO AGAVE | Admin Panel</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link href="./../src/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="./../css/main.css">
</head>
<body>
  <div class="container">
    <div class="header-top">
      <div class="header-goto">
      </div>
      <div class="header-nameuser">
        <span class="title">Hello, <?=$_SESSION['idPAadmin'][0]['adminusername']?></span>
      </div>
    </div>
    <div class="body-panel">
      <div class="menu-nav">
        <menu-nav></menu-nav>
      </div>
      <div class="section-nav" ng-view>
      </div>
    </div>
  </div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-route.js"></script>
  <script src="./../js/app.js"></script>
  <script src="./../js/directives.js"></script>
  <!-- <script src="./../js/controllers.js"></script>
	<script src="./../js/services.js"></script> -->
</body>
</html>
