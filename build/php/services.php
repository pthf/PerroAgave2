<?php
  require('/../admin/php/connect.php');
  class Services extends Connect{
    function __construct($namefunction){
      $this->addConnection();
      $this->$namefunction();
      $this->removeConnection();
    }
    private function getUserConnection(){
      session_start();
      if(isset($_SESSION['idPaUser'])) print_r($_SESSION['idPaUser']); else print_r(0);
      session_destroy();
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
      $query = "SELECT * FROM event WHERE eventstatus = 0 ORDER BY idevent";
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
          'eventphonenumer' => $line['eventphonenumer']
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
          'eventimagegallerydescription' => $line2['eventimagegallerydescription'],
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
  }
  new Services($_GET['namefunction']);
