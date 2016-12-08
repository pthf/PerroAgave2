<?php
  // session_start();
  // session_destroy();
  require('./../admin/php/connect.php');
  class Services extends Connect{
    function __construct($namefunction){
      $this->addConnection();
      $this->$namefunction();
      $this->removeConnection();
    }
    private function getStateCity(){
      $container = array();
      $states = array();
      $query = "SELECT * FROM estados";
      $result = $this->connection->query($query);
      while($line = mysqli_fetch_array($result)){
        $data = array(
          "idEstados" => $line['idEstados'],
          "nombreEstado" => $line['nombreEstado']
        );
        array_push($states, $data);
      }
      array_push($container, $states);
      $cities = array();
      $query = "SELECT * FROM ciudades";
      $result = $this->connection->query($query);
      while($line = mysqli_fetch_array($result)){
        $data = array(
          "idCiudades" => $line['idCiudades'],
          "nombreCiudad" => $line['nombreCiudad'],
          "Estados_idEstados" => $line['Estados_idEstados'],
        );
        array_push($cities, $data);
      }
      array_push($container, $cities);
      print_r(json_encode($container));
    }
    private function getUserConnection(){
      session_start();
      if(isset($_SESSION['idPaUser'])) print_r($_SESSION['idPaUser']); else print_r(0);
    }
    private function getUserData(){
      $idUser = $_GET['idUser'];
      $query = "SELECT * FROM user WHERE iduser = $idUser";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      $data = array(
        'iduser' => $line['iduser'],
        'username' => $line['username'],
        'userlastname' => $line['userlastname'],
        'useremail' => $line['useremail'],
        'userphonenumber' => $line['userphonenumber'],
        'userstate' => $line['userstate'],
        'usercity' => $line['usercity'],
        'useraddress' => $line['useraddress'],
        'userzipcode' => $line['userzipcode'],
        'userstatusnewsletter' => $line['userstatusnewsletter'],
      );
      print_r(json_encode($data));
    }
    private function getAddressData(){
      session_start();
      if(isset($_SESSION['ShoppingUserAddress'])){
        $data = array(
          'cartshop' => 1,
          'name' => $_SESSION['ShoppingUserAddress']['name'],
          'phone' => $_SESSION['ShoppingUserAddress']['phone'],
          'state' => $_SESSION['ShoppingUserAddress']['state'],
          'city' => $_SESSION['ShoppingUserAddress']['city'],
          'address' => $_SESSION['ShoppingUserAddress']['address'],
          'addressdescription' => $_SESSION['ShoppingUserAddress']['addressdescription'],
          'postalcode' => $_SESSION['ShoppingUserAddress']['postalcode']
        );
        print_r(json_encode($data));
      }else{
        $iduser = $_GET['idUser'];
        $query = "SELECT * FROM user WHERE iduser = ".$iduser;
        $result = $this->connection->query($query);
        $line = mysqli_fetch_array($result);
        $data = array(
          'cartshop' => 0,
          'name' => $line['username'],
          'phone' => $line['userphonenumber'],
          'state' => $line['userstate'],
          'city' => $line['usercity'],
          'address' => $line['useraddress'],
          'postalcode' => $line['userzipcode']
        );
        print_r(json_encode($data));
      }
    }
    private function getEmailUser(){
      $useremail = $_GET['useremail'];
      $query = "SELECT iduser FROM user WHERE useremail = '".$useremail."'";
      $result = $this->connection->query($query);
      if(mysqli_num_rows($result)==0) echo 0; else echo 1;
    }
    private function getProducts(){
      $query = "SELECT * FROM product
                INNER JOIN productcategory
                ON product.idproductcategory = productcategory.idproductcategory
                ORDER BY idproduct";
      $result = $this->connection->query($query);
      $groupProducts = array(); $productos = array(); $item = 0;
      while($line = mysqli_fetch_array($result)){
        $dif = $line['productrealprice'] - $line['productdiscountprice'];
        $dec = $dif/$line['productrealprice'];
        $dis = round($dec*100);
        $item++;
        $data = array(
          'idproduct' => $line['idproduct'],
          'productname' => $line['productname'],
          'productdescription' => $line['productdescription'],
          'productquantity' => $line['productquantity'],
          'productrealprice' => $line['productrealprice'],
          'productdiscountprice' => $line['productdiscountprice'],
          'discount' => $dis,
          'productimage' => $line['productimage'],
          'productstock' => $line['productstock'],
          'productcategoryname' => $line['productcategoryname']
        );
        array_push($productos, $data);
        if($item==5){
          array_push($groupProducts, $productos);
          $productos = array();
          $item=0;
        }
      }
      if($item!=5)
        array_push($groupProducts, $productos);
      print_r(json_encode($groupProducts));
    }
    private function getNextEvents(){
      $query = "SELECT * FROM event
                INNER JOIN ciudades ON ciudades.idCiudades = event.eventcity
                INNER JOIN estados ON estados.idEstados = event.eventstate
                WHERE eventstatus = 0 ORDER BY idevent";
      $result = $this->connection->query($query);
      $groupEvents = array(); $events = array(); $item = 0;
      while($line = mysqli_fetch_array($result)){
        $item++;
        $data = array(
          'idevent' => $line['idevent'],
          'eventCover' => $line['eventCover'],
          'eventname' => $line['eventname'],
          'eventdescription' => $line['eventdescription'],
          'eventdate' => $line['eventdate'],
          'eventscheduledescription' => $line['eventscheduledescription'],
          'eventaddress' => $line['eventaddress'],
          'eventcity' => $line['eventcity'],
          'eventstate' => $line['eventstate'],
          'eventneighborhood' => $line['eventneighborhood'],
          'eventzipcode' => $line['eventzipcode'],
          'eventphonenumer' => $line['eventphonenumer'],
          'eventurl' => $line['eventurl'],
        );
        array_push($events, $data);
        if($item==4){
          array_push($groupEvents, $events);
          $events = array();
          $item=0;
        }
      }
      if($item!=4)
        array_push($groupEvents, $events);
      print_r(json_encode($groupEvents));
    }
    private function getFinishedEvents(){
      $query = "SELECT * FROM event
                INNER JOIN ciudades ON ciudades.idCiudades = event.eventcity
                INNER JOIN estados ON estados.idEstados = event.eventstate
                WHERE eventstatus = 1 ORDER BY idevent";
      $result = $this->connection->query($query);
      $groupEvents = array(); $events = array(); $item = 0;
      while($line = mysqli_fetch_array($result)){
        $query2 = "SELECT * FROM eventimagegallery_has_event
                   INNER JOIN eventimagegallery
                   ON eventimagegallery.ideventimagegallery = eventimagegallery_has_event.ideventimagegallery
                   WHERE eventimagegallery_has_event.idevent = ".$line['idevent'];
        $result2 = $this->connection->query($query2);
        $listGalleryEvent = array();
        while($line2 = mysqli_fetch_array($result2)){
          $data = array(
            'ideventimagegallery' => $line2['ideventimagegallery'],
            'eventimagegalleryimage' => $line2['eventimagegalleryimage']
          );
          array_push($listGalleryEvent, $data);
        }
        $item++;
        $data = array(
          'idevent' => $line['idevent'],
          'eventCover' => $line['eventCover'],
          'eventname' => $line['eventname'],
          'eventdescription' => $line['eventdescription'],
          'eventdate' => $line['eventdate'],
          'eventscheduledescription' => $line['eventscheduledescription'],
          'eventaddress' => $line['eventaddress'],
          'eventcity' => $line['eventcity'],
          'eventstate' => $line['eventstate'],
          'eventneighborhood' => $line['eventneighborhood'],
          'eventzipcode' => $line['eventzipcode'],
          'eventphonenumer' => $line['eventphonenumer'],
          'listGalleryEvent' => $listGalleryEvent,
          'eventurl' => $line['eventurl'],
        );
        array_push($events, $data);
        if($item==4){
          array_push($groupEvents, $events);
          $events = array();
          $item=0;
        }
      }
      if($item!=4)
        array_push($groupEvents, $events);
        print_r(json_encode($groupEvents));
    }
    private function getSimpleEventsList(){
      $query = "SELECT * FROM event
                INNER JOIN ciudades ON ciudades.idCiudades = event.eventcity
                INNER JOIN estados ON estados.idEstados = event.eventstate
                WHERE eventstatus = 1 ORDER BY idevent";
      $result = $this->connection->query($query);
      $events = array();
      while($line = mysqli_fetch_array($result)){
        $query2 = "SELECT * FROM eventimagegallery_has_event
                   INNER JOIN eventimagegallery
                   ON eventimagegallery.ideventimagegallery = eventimagegallery_has_event.ideventimagegallery
                   WHERE eventimagegallery_has_event.idevent = ".$line['idevent'];
        $result2 = $this->connection->query($query2);
        $listGalleryEvent = array();
        while($line2 = mysqli_fetch_array($result2)){
          $data = array(
            'ideventimagegallery' => $line2['ideventimagegallery'],
            'eventimagegalleryimage' => $line2['eventimagegalleryimage']
          );
          array_push($listGalleryEvent, $data);
        }
        $data = array(
          'idevent' => $line['idevent'],
          'eventCover' => $line['eventCover'],
          'eventname' => $line['eventname'],
          'eventdescription' => $line['eventdescription'],
          'eventdate' => $line['eventdate'],
          'eventscheduledescription' => $line['eventscheduledescription'],
          'eventaddress' => $line['eventaddress'],
          'eventcity' => $line['eventcity'],
          'eventstate' => $line['eventstate'],
          'eventneighborhood' => $line['eventneighborhood'],
          'eventzipcode' => $line['eventzipcode'],
          'eventphonenumer' => $line['eventphonenumer'],
          'listGalleryEvent' => $listGalleryEvent,
          'eventurl' => $line['eventurl'],
        );
        array_push($events, $data);
      }
      print_r(json_encode($events));
    }
    private function getEvent(){
      $idevent = $_GET['idevent'];
      $query = "SELECT * FROM event
                INNER JOIN ciudades ON ciudades.idCiudades = event.eventcity
                INNER JOIN estados ON estados.idEstados = event.eventstate
                WHERE idevent = ".$idevent;
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      $query2 = "SELECT * FROM eventimagegallery_has_event
                 INNER JOIN eventimagegallery
                 ON eventimagegallery.ideventimagegallery = eventimagegallery_has_event.ideventimagegallery
                 WHERE eventimagegallery_has_event.idevent = ".$idevent;
      $result2 = $this->connection->query($query2);
      $listGalleryEvent = array();
      while($line2 = mysqli_fetch_array($result2)){
        $data = array(
          'ideventimagegallery' => $line2['ideventimagegallery'],
          'eventimagegalleryimage' => $line2['eventimagegalleryimage']
        );
        array_push($listGalleryEvent, $data);
      }
      $data = array(
        'idevent' => $line['idevent'],
        'eventCover' => $line['eventCover'],
        'eventname' => $line['eventname'],
        'eventdescription' => $line['eventdescription'],
        'eventdate' => $line['eventdate'],
        'eventscheduledescription' => $line['eventscheduledescription'],
        'eventaddress' => $line['eventaddress'],
        'eventcity' => $line['nombreCiudad'],
        'eventstate' => $line['nombreEstado'],
        'eventneighborhood' => $line['eventneighborhood'],
        'eventzipcode' => $line['eventzipcode'],
        'eventphonenumer' => $line['eventphonenumer'],
        'eventurl' => $line['eventurl'],
        'eventGallery' => $listGalleryEvent
      );
      print_r(json_encode($data));
    }
    private function getEventData(){
      $name_url = $_GET['name_url'];
      $query = "SELECT * FROM event
                INNER JOIN ciudades ON ciudades.idCiudades = event.eventcity
                INNER JOIN estados ON estados.idEstados = event.eventstate
                WHERE eventurl = '".$name_url."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      $query2 = "SELECT * FROM eventimagegallery_has_event
                 INNER JOIN eventimagegallery
                 ON eventimagegallery.ideventimagegallery = eventimagegallery_has_event.ideventimagegallery
                 WHERE eventimagegallery_has_event.idevent = ".$line['idevent'];
      $result2 = $this->connection->query($query2);
      $listGalleryEvent = array();
      while($line2 = mysqli_fetch_array($result2)){
        $data = array(
          'ideventimagegallery' => $line2['ideventimagegallery'],
          'eventimagegalleryimage' => $line2['eventimagegalleryimage']
        );
        array_push($listGalleryEvent, $data);
      }
      $data = array(
        'idevent' => $line['idevent'],
        'eventCover' => $line['eventCover'],
        'eventname' => $line['eventname'],
        'eventdescription' => $line['eventdescription'],
        'eventdate' => $line['eventdate'],
        'eventscheduledescription' => $line['eventscheduledescription'],
        'eventaddress' => $line['eventaddress'],
        'eventcity' => $line['nombreCiudad'],
        'eventstate' => $line['nombreEstado'],
        'eventneighborhood' => $line['eventneighborhood'],
        'eventzipcode' => $line['eventzipcode'],
        'eventphonenumer' => $line['eventphonenumer'],
        'eventurl' => $line['eventurl'],
        'eventstatus' => $line['eventstatus'],
        'eventGallery' => $listGalleryEvent
      );
      print_r(json_encode($data));
    }
    private function getShoppingCartElements(){
      session_start();
      $shoppingCartList = array();
      if(isset($_SESSION['shoppingPA'])){
        foreach ($_SESSION['shoppingPA'] as $key => $value) {
          $data = array(
            'idproduct' => $_SESSION['shoppingPA'][$key]['idproduct'],
            'productname' => $_SESSION['shoppingPA'][$key]['productname'],
            'productquantity' => $_SESSION['shoppingPA'][$key]['productquantity'],
            'productrealprice' => $_SESSION['shoppingPA'][$key]['productrealprice'],
            'productdiscountprice' => $_SESSION['shoppingPA'][$key]['productdiscountprice'],
            'productimage' => $_SESSION['shoppingPA'][$key]['productimage'],
            'quantity' => $_SESSION['shoppingPA'][$key]['quantity'],
            'discount' => $_SESSION['shoppingPA'][$key]['discount']
          );
          array_push($shoppingCartList, $data);
        }
      }
      print_r(json_encode($shoppingCartList));
    }
    private function getCoupon(){
      session_start();
      if(isset($_SESSION['paCouponStore'])){
        print_r(json_encode($_SESSION['paCouponStore']));
      }else{
        echo -1;
      }
    }
    private function getShippingCost(){
      session_start();
      $dataShopping = $_SESSION['shoppingPA'];
      $dataAddress = $_SESSION['ShoppingUserAddress'];
      $state = $dataAddress['state'];
      $totalShippingCost = 0.0;

      foreach ($dataShopping as $key => $value) {
        $idproduct = $value['idproduct'];
        $quantity = $value['quantity'];
        $query = "SELECT productweight FROM product WHERE idproduct = $idproduct ";
        $result = $this->connection->query($query);
        $line = mysqli_fetch_array($result);
        $productweight = $line['productweight'];
        $query = "SELECT tabulatorcost FROM tabulator_prices WHERE tabulatorstate = $state AND $productweight >= tabulatorVol ORDER BY tabulatorVol DESC LIMIT 1";
        $result = $this->connection->query($query);
        while($line = mysqli_fetch_array($result)){
          $tabulatorcost = $line['tabulatorcost'];
          $cost = $line['tabulatorcost'];
          $subtotal = $quantity * $cost;
          $totalShippingCost = $totalShippingCost + $subtotal;
        }
      }
      echo $totalShippingCost;
    }
    private function getInformationPurchase(){
      $idUser = $_GET['idUser'];
      $query = "SELECT * FROM padb.order
                INNER JOIN user ON padb.order.iduser = user.iduser 
                INNER JOIN estados ON padb.order.ordercity = estados.idEstados
                INNER JOIN ciudades ON padb.order.ordercity = ciudades.idCiudades
                WHERE padb.order.iduser = $idUser AND padb.order.orderstatuspay = 1";
      $result = $this->connection->query($query);
      $dataPurchase = array();
      while($line = mysqli_fetch_array($result)){
        $idorder = $line['idorder'];
        $query = "SELECT * FROM order_has_product
                  INNER JOIN product ON product.idproduct = order_has_product.idproduct
                  WHERE order_has_product.idorder = $idorder";
        $result2 = $this->connection->query($query);
        $products = array();
        $sumtotal = 0.0;
        $sumdiscount = 0.0;
        while($line2 = mysqli_fetch_array($result2)){
          $product = array(
            'idproduct' => $line2['idproduct'],
            'orderquantity' => $line2['orderquantity'],
            'ordersubtotal' => $line2['ordersubtotal'],
            'ordersubtotaldiscount' => $line2['ordersubtotaldiscount'],
            'productimage' => $line2['productimage'],
            'productquantity' => $line2['productquantity'],
            'productname' => $line2['productname']
          );
          array_push($products, $product);
          $sumtotal = $line2['ordersubtotal'] + $sumtotal;
          $sumdiscount = $line2['ordersubtotaldiscount'] + $sumdiscount;
        }

        $dataAddress = array(
          'ordernumber' => $line['ordernumber'],
          'ordershippingcost' => $line['ordershippingcost'],
          'orderdiscountcupon' => $line['orderdiscountcupon'],
          'ordername' => $line['ordername'],
          'ordertelefono' => $line['ordertelefono'],
          'ordercity' => $line['nombreCiudad'],
          'orderstate' => $line['nombreEstado'],
          'orderaddress' => $line['orderaddress'],
          'orderreferences' => $line['orderreferences'],
          'orderzipcode' => $line['orderzipcode'],
          'orderstatusfacture' => $line['orderstatusfacture'],
          'orderdate' => $line['orderdate'],
          'username' => $line['username'],
          'userlastname' => $line['userlastname'],
          'useremail' => $line['useremail'],
          'useraddress' => $line['useraddress'],
          'usercity' => $line['usercity'],
          'userstate' => $line['userstate'],
          'userzipcode' => $line['userzipcode'],
          'userphonenumber' => $line['userphonenumber'],
          'sumtotal' => $sumtotal,
          'sumdiscount' => $sumdiscount,
          'products' => $products
        );
        array_push($dataPurchase, $dataAddress);
      }

      print_r(json_encode($dataPurchase));
    }
  }
  new Services($_GET['namefunction']);
