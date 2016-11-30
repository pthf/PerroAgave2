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
  <link rel="stylesheet" type="text/css" href="./../src/bootstrap/dist/css/bootstrap-datetimepicker.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
  <div class="container">
    <div class="header-top">
      <div class="header-goto">
      </div>
      <div class="header-nameuser">
        <div class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><span class="title">Hello, <?=$_SESSION['idPAadmin'][0]['adminusername']?></span>
          <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <!-- <li class="logout text-center" style="cursor:pointer"><span style="color:#23282d">Cerrar sesión</span></li> -->
            <li class="logout" style="cursor:pointer"><a>Cerrar sesión</a></li>
          </ul>
        </div>
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
  
  <script src="./../src/bootstrap/dist/js/bootstrap-datetimepicker.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-route.js"></script>
  <script src="./../js/app.js"></script>
  <script src="./../js/directives.js"></script>
  <script src="./../js/controllers.js"></script>
	<script src="./../js/services.js"></script>
  <script type="text/javascript">
    $('.logout').click(function(){
      console.log('Entramos');
      var namefunction = 'logoutUser';
      $.ajax({
        beforeSend: function(){
        },
        url: "./../../php/functions.php",
        type: "POST",
        data: {
          namefunction : namefunction
        },
        success: function(result){
          location.reload();
        },
        error: function(error){
        },
        complete: function(){
        },
        timeout: 10000
      });
    });
  </script>
</body>
</html>
