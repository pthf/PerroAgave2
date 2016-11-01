<?php
  require('./connect.php');
  class Access extends Connect{
    function __construct(){
      $this->addConnection();
      $this->login($_POST['name'],$_POST['password']);
      $this->removeConnection();
    }
    private function login($name, $password){
      $query = "SELECT * FROM admin WHERE adminusername = '$name'";
      // $result = mysqli_query($this->connection,$query);
      $result = $this->connection->query($query);
      if(mysqli_num_rows($result)>0){
        $found = false;
        while($line = mysqli_fetch_array($result)){
          if(password_verify($password, $line['adminuserpassword'])){
            date_default_timezone_set('America/Mexico_City');
            $currentdate = date("Y-m-d H:i:s");
            $query = "UPDATE admin SET adminlastconnection = '$currentdate' WHERE idadmin = ".$line['idadmin'];
            $this->connection->query($query);
            session_start();
            $data[] = array(
              'idadmin' => $line['idadmin'],
              'adminusername' => $line['adminusername'],
              'adminlastconnection' => $line['adminlastconnection']
            );
            $_SESSION['idPAadmin'] = $data;
            $found = true;
            break;
          }
        }
        if($found) print(1); else print(0);
      }else
        print(-1);
    }
  }
  new Access();
