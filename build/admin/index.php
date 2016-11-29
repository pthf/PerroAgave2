<?php
  session_start();
  if(isset($_SESSION['idPAadmin']))
    header("Location: ./panel/index.php");
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>LOGIN PANEL</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link href="./src/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="./css/main.css">
</head>
<body>
  <div id="container">
    <div class="row loginpanel">
      <div class="info-status">
        <span><strong>PERRO AGAVE Panel:</strong><br>Please sign in to get access.</span>
      </div>
      <div class="panel-body">
        <form class="form-horizontal">
          <div class="form-group">
              <label for="username">Username: </label>
              <input type="text" class="form-control" id="username"></input>
          </div>
          <div class="form-group">
            <label for="password">Password: </label>
            <input type="password" class="form-control" id="password"></input>
          </div>
          <div class="form-group">
            <button class="btn btn-default btn-block" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <div class="alert alert-success welcome" role="alert"></div>
      <div class="alert alert-danger not_pass" role="alert"></div>
      <div class="footer-loginpanel">©<span class="year"></span> Perro Agave Website by PTHF</div>
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script>
    $(document).on('ready', function(){
      var d = new Date();
      $('.footer-loginpanel .year').html(d.getFullYear());
      function showError(name){
        $(name).css({'border-color':'red'});
        $('.not_pass').slideDown();
        setTimeout(function(){
          $(name).css({'border-color':'#CCC'});
          $('.not_pass').html('');
          $('.not_pass').slideUp();
        },2000);
      }
      $("form").submit(function(e){
        e.preventDefault();
        var namelength = $('#username').val().length;
        var passwordlength = $('#password').val().length;
        if(namelength != 0){
          if(passwordlength != 0){
            $.ajax({
              url: './php/access.php',
              type: 'POST',
              data: {
                name: $('#username').val(),
                password: $('#password').val()
              },
              success: function(result){
                alert(result);
                switch (result) {
                  case '1':
                    $('.welcome').html('Welcome '+$('#username').val());
                    $('.welcome').slideDown();
                    window.location.href = "./panel/index.php";
                    break;
                  case '-1':
                    $('.not_pass').html('the username does not exist.');
                    $('.not_pass').slideDown();
                    break;
                  case '0':
                    $('.not_pass').html('the password is incorrect.');
                    $('.not_pass').slideDown();
                    break;
                  default:
                    $('.not_pass').html('Sorry a server error has occurred.');
                    $('.not_pass').slideDown();
                    break;
                }
                setTimeout(function(){
                  $('.not_pass').slideUp();
                  $('.welcome').slideUp();
                },2000);
              },
              error: function(error){
                $('.not_pass').html('Sorry a server error has occurred.');
                $('.not_pass').slideDown();
              },
              complete: function(){},
      				timeout: 10000
            })
          }else{
            $('.not_pass').html('Please, enter a password.');
            showError('#password');
          }
        }else{
          $('.not_pass').html('Please, enter a valid name.');
          showError('#username');
        }
      });
    });
  </script>
</body>
</html>
