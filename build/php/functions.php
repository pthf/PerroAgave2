<?php
  require('/../admin/php/connect.php');    
  class Functions extends Connect{
    function __construct($namefunction){
      $this->addConnection();
      $this->$namefunction();
      $this->removeConnection();
    }
    private function loginUser(){
      $email = $_POST['email'];
      $password = $_POST['password'];
      $query = "SELECT userpassword, iduser FROM user WHERE useremail = '$email'";
      $result = $this->connection->query($query);
      if(mysqli_num_rows($result)>0){
        $line = mysqli_fetch_array($result);
        if(password_verify($password, $line['userpassword'])){
          session_start();
          $_SESSION['idPaUser'] = $line['iduser'];
          echo 1;
        } else
          echo 0;
      }else{
        echo 0;
      }
    }
    private function logoutUser(){
      session_start();
      session_destroy();
    }
    private function addUser(){
      $nombre = $_POST['nombre'];
      $lastname = $_POST['lastname'];
      $email = $_POST['email'];
      $password = $_POST['password'];
      $passwordhash = password_hash($password, PASSWORD_DEFAULT);
      $newsletter = $_POST['newsletter'];
      if($newsletter) $newsletter = 1; else $newsletter = 0;
      $query = "INSERT INTO user (username, userlastname, useremail, userpassword, userstatusnewsletter)
                VALUES ('$nombre', '$lastname', '$email', '$passwordhash', $newsletter)";
      $result = $this->connection->query($query);
      $idUser = mysqli_insert_id($this->connection);
      session_start();
      $_SESSION['idPaUser'] = $idUser;
      echo $idUser;
    }
    private function editUserData(){
      $name = $_POST['name'];
      $lastname = $_POST['lastname'];
      $email = $_POST['email'];
      $phone = $_POST['phone'];
      $state = $_POST['state']; if(strlen($state)>6) $state = 0;
      $city = $_POST['city']; if(strlen($city)>6) $city = 0;
      $address = $_POST['address'];
      $postalcode = $_POST['postalcode']; if(strlen($postalcode)<1) $postalcode = "NULL";
      $id = $_POST['id'];
      $query = "UPDATE user SET username = '$name', userlastname = '$lastname', useremail = '$email', userphonenumber = '$phone', userstate = $state, usercity = $city, useraddress = '$address', userzipcode = $postalcode WHERE iduser = $id";
      $result = $this->connection->query($query);
    }
    private function verifyPassword(){
      $password = $_POST['password'];
      $iduser = $_POST['iduser'];
      $query = "SELECT userpassword FROM user WHERE iduser = $iduser";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      if(password_verify($password, $line['userpassword']))
        echo 1;
      else
        echo 0;
    }
    private function changePassword(){
      $idUser = $_POST['id'];
      $password = $_POST['pass'];
      $passwordhash = password_hash($password, PASSWORD_DEFAULT);
      $query = "UPDATE user SET userpassword = '$passwordhash' WHERE iduser = $idUser";
      $result = $this->connection->query($query);
    }
    private function recoveryPassword(){
      $email = $_POST['email'];
      $query = "SELECT iduser, username FROM user WHERE useremail = '$email'";
      $result = $this->connection->query($query);
      if(mysqli_num_rows($result)>0){
        $line = mysqli_fetch_array($result);
        $iduser = $line['iduser'];
        $username = $line['username'];
        $data = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-)(.:,;*'/|}{][&^%$#@?}";
        $datalen = strlen($data) - 1;
        $password = "";
        for($i = 0; $i<12; $i++)
          $password = $password.substr($data, rand(0,$datalen), 1);
        $passwordhash = password_hash($password, PASSWORD_DEFAULT);
        $query = "UPDATE user SET userpassword = '$passwordhash' WHERE iduser = $iduser";
        $result = $this->connection->query($query);
        $titulo    = 'Password Recovery - Perro Agave';
        $mensaje   = 'Hola '.$username.' tu nueva contraseña es: '.$password;
        $cabeceras = 'From: info@perroagave.com' . 'X-Mailer: PHP/' . phpversion();
        mail($email, $titulo, $mensaje, $cabeceras);
        echo 1;
      }else{
        echo 0;
      }
    }
    private function addProduct(){
      session_start();
      $idproduct = $_POST['idproduct'];
      if(isset($_SESSION['shoppingPA'])){
        $query = "SELECT * FROM product WHERE idproduct = ".$idproduct;
        $result = $this->connection->query($query);
        $line = mysqli_fetch_array($result);
        $dif = $line['productrealprice'] - $line['productdiscountprice'];
        $dec = $dif/$line['productrealprice'];
        $dis = round($dec*100);
        $found = false;
        foreach ($_SESSION['shoppingPA'] as $key => $value) {
          if($value['idproduct'] == $idproduct){
            $found = true;
            $productstock = $line['productstock'];
            if(($value['quantity'] + 1)<=$productstock){
              $_SESSION['shoppingPA'][$key]['quantity'] = $value['quantity'] + 1;
              print_r(1);
            }else{
              print_r("Producto agotado.");
            }
          }
        }
        if(!$found){
          $_SESSION['shoppingPA'][] = array(
            'idproduct' => $idproduct,
            'productname' => $line['productname'],
            'productquantity' => $line['productquantity'],
            'productrealprice' => $line['productrealprice'],
            'productdiscountprice' => $line['productdiscountprice'],
            'productimage' => $line['productimage'],
            'quantity' => 1,
            'discount' => $dis
          );
          print_r(1);
        }
      }else{
        $query = "SELECT * FROM product WHERE idproduct = ".$idproduct;
        $result = $this->connection->query($query);
        $line = mysqli_fetch_array($result);
        $dif = $line['productrealprice'] - $line['productdiscountprice'];
        $dec = $dif/$line['productrealprice'];
        $dis = round($dec*100);
        $productstock = $line['productstock'];
        if($productstock > 0){
          $data[] = array(
            'idproduct' => $idproduct,
            'productname' => $line['productname'],
            'productquantity' => $line['productquantity'],
            'productrealprice' => $line['productrealprice'],
            'productdiscountprice' => $line['productdiscountprice'],
            'productimage' => $line['productimage'],
            'quantity' => 1,
            'discount' => $dis
          );
          $_SESSION['shoppingPA'] = $data;
          print_r(1);
        }else{
          print_r("Producto agotado.");
        }
      }
    }
    private function increaseProduct(){
      session_start();
      $idproduct = $_POST['idproduct'];
      foreach ($_SESSION['shoppingPA'] as $key => $value) {
        if($value['idproduct'] == $idproduct){
          $query = "SELECT * FROM product WHERE idproduct = ".$idproduct;
          $result = $this->connection->query($query);
          $line = mysqli_fetch_array($result);
          $productstock = $line['productstock'];
          if(($value['quantity'] + 1)<=$productstock){
            $_SESSION['shoppingPA'][$key]['quantity'] = $value['quantity'] + 1;
            print_r(1);
          }else{
            print_r("Producto agotado.");
          }
        }
      }
    }
    private function decreaseProduct(){
      session_start();
      $idproduct = $_POST['idproduct'];
      foreach ($_SESSION['shoppingPA'] as $key => $value) {
        if($value['idproduct'] == $idproduct){
          $query = "SELECT * FROM product WHERE idproduct = ".$idproduct;
          $result = $this->connection->query($query);
          $line = mysqli_fetch_array($result);
          $productstock = $line['productstock'];
          if(($value['quantity'] - 1) != 0){
            $_SESSION['shoppingPA'][$key]['quantity'] = $value['quantity'] - 1;
            print_r(1);
          }else{
            unset($_SESSION['shoppingPA'][$key]);
            print_r(1);
          }
        }
      }
    }
    private function addDirectiontoCart(){
      session_start();

      $name  = $_POST['name'];
      $phone  = $_POST['phone'];
      $state  = $_POST['state'];
      $city  = $_POST['city'];
      $address  = $_POST['address'];
      $addressdescription  = $_POST['addressdescription'];
      $postalcode  = $_POST['postalcode'];

      if(strlen($name)>0 && strlen($phone)>0 && strlen($state)>0 && strlen($city)>0 && strlen($address)>0 && strlen($addressdescription)>0 && strlen($postalcode)>0){
        $data = array(
          'name' => $name,
          'phone' => $phone,
          'state' => $state,
          'city' => $city,
          'address' => $address,
          'addressdescription' => $addressdescription,
          'postalcode' => $postalcode
        );
        $_SESSION['ShoppingUserAddreess'] = $data;
        print_r(json_encode($_SESSION));
      }else{
        print(-1);
      }

      

      
    }
  }
  new Functions($_POST['namefunction']);
