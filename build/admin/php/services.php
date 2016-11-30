<?php
  require('./connect.php');
  class Functions extends Connect{
    function __construct($namefunction){
      $this->addConnection();
      $this->$namefunction();
      $this->removeConnection();
    }
    private function getProducts(){
      $query = "SELECT * FROM product p INNER JOIN productcategory pc ON pc.idproductcategory = p.idproductcategory";
      $result = $this->connection->query($query);
      $arrayProducts = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idproduct' => $line['idproduct'],
          'productname' => $line['productname'],
          'productdescription' => $line['productdescription'],
          'productquantity' => $line['productquantity'],
          'productrealprice' => $line['productrealprice'],
          'productdiscountprice' => $line['productdiscountprice'],
          'productimage' => $line['productimage'],
          'productstock' => $line['productstock'],
          'productweight' => $line['productweight'],
          'productcategoryname' => $line['productcategoryname']
        );
        array_push($arrayProducts, $data);
      }
      print_r(json_encode($arrayProducts));
    }
    private function getProductItem(){
      $query = "SELECT * FROM product p INNER JOIN productcategory pc ON pc.idproductcategory = p.idproductcategory WHERE idproduct = '".$_GET['idProduct']."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      $data = array(
          'idproduct' => $line['idproduct'],
          'productname' => $line['productname'],
          'productdescription' => $line['productdescription'],
          'productquantity' => $line['productquantity'],
          'productrealprice' => $line['productrealprice'],
          'productdiscountprice' => $line['productdiscountprice'],
          'productimage' => $line['productimage'],
          'productstock' => $line['productstock'],
          'productweight' => $line['productweight'],
          'idproductcategory' => $line['idproductcategory'],
          'productcategoryname' => $line['productcategoryname']
        );
      print_r(json_encode($data));
    }
    private function getEvents(){
      $query = "SELECT * FROM event ev INNER JOIN ciudades c ON c.idCiudades = ev.eventcity INNER JOIN estados e ON e.idEstados = ev.eventstate";
      $result = $this->connection->query($query);
      $arrayEvents = array();
      while ($line = mysqli_fetch_array($result)) {
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
          'eventstatus' => $line['eventstatus']
        );
        array_push($arrayEvents, $data);
      }
      print_r(json_encode($arrayEvents));
    }
    private function getEventItem(){
      $query = "SELECT * FROM event ev INNER JOIN ciudades c ON c.idCiudades = ev.eventcity INNER JOIN estados e ON e.idEstados = ev.eventstate WHERE ev.idevent = '".$_GET['idEvent']."'";
      $result = $this->connection->query($query);
      $arrayDataEvent = array();
      $arrayDataImageEvent = array();
      while($line = mysqli_fetch_array($result)){
        $queryImageEvent = "SELECT * FROM eventimagegallery_has_event ehe INNER JOIN eventimagegallery eig ON eig.ideventimagegallery = ehe.ideventimagegallery WHERE ehe.idevent = ".$line['idevent'];
        $resultImage = $this->connection->query($queryImageEvent);
        if (!$resultImage) { // add this check.
            die('Invalid query: ' . mysql_error());
        }
        while($lineImages = mysqli_fetch_array($resultImage)){
          $lineImageName = $lineImages['eventimagegalleryimage'];
          array_push($arrayDataImageEvent, $lineImageName);
          unset($lineImageName);
        }
        $date = explode('-', $line['eventdate']);
        $dataAux = array(
          'idevent' => $line['idevent'],
          'eventCover' => $line['eventCover'],
          'eventname' => $line['eventname'],
          'eventdescription' => $line['eventdescription'],
          'eventdate' => $line['eventdate'],
          'eventDay' => $date['2'],
          'eventMonth' => $date['1'],
          'eventYear' => $date['0'],
          'eventscheduledescription' => $line['eventscheduledescription'],
          'eventaddress' => $line['eventaddress'],
          'eventcity' => $line['nombreCiudad'],
          'eventidcity' => $line['idCiudades'],
          'eventstate' => $line['nombreEstado'],
          'eventidstate' => $line['idEstados'],
          'eventneighborhood' => $line['eventneighborhood'],
          'eventzipcode' => $line['eventzipcode'],
          'eventphonenumer' => $line['eventphonenumer'],
          'eventstatus' => $line['eventstatus'],
          'imagenes' => $arrayDataImageEvent
        );

        array_push($arrayDataEvent, $dataAux);
        unset($dataAux);
        unset($arrayDataImageEvent);
        $arrayDataImageEvent = array();

      }
      print_r(json_encode($arrayDataEvent));
    }
    private function getEventImages(){
      $query = "SELECT * FROM eventimagegallery_has_event ehe INNER JOIN eventimagegallery eig ON eig.ideventimagegallery = ehe.ideventimagegallery WHERE ehe.idevent = '".$_GET['idEvent']."'";
      $result = $this->connection->query($query);
      $arrayImages = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idevent' => $line['idevent'],
          'ideventimagegallery' => $line['ideventimagegallery'],
          'eventimagegalleryimage' => $line['eventimagegalleryimage']
        );
        array_push($arrayImages, $data);
      }
      print_r(json_encode($arrayImages));
    }
    private function getCategories(){
      $query = "SELECT * FROM productcategory";
      $result = $this->connection->query($query);
      $arrayCategories = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idproductcategory' => $line['idproductcategory'],
          'productcategoryname' => $line['productcategoryname']
        );
        array_push($arrayCategories, $data);
      }
      print_r(json_encode($arrayCategories));
    }
    private function statesList(){
      $query = "SELECT * FROM estados";
      $result = $this->connection->query($query);
      $arrayCategories = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idEstados' => $line['idEstados'],
          'nombreEstado' => $line['nombreEstado']
        );
        array_push($arrayCategories, $data);
      }
      print_r(json_encode($arrayCategories));
    }
    private function citiesList(){
      $query = "SELECT * FROM ciudades";
      $result = $this->connection->query($query);
      $arrayCategories = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idCiudades' => $line['idCiudades'],
          'nombreCiudad' => $line['nombreCiudad'],
          'Estados_idEstados' => $line['Estados_idEstados']
        );
        array_push($arrayCategories, $data);
      }
      print_r(json_encode($arrayCategories));
    }
    private function getNewsletter(){
      $query = "SELECT * FROM user WHERE userstatusnewsletter = 1";
      $result = $this->connection->query($query);
      $arrayNewsletter = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'iduser' => $line['iduser'],
          'username' => $line['username'],
          'userlastname' => $line['userlastname'],
          'useremail' => $line['useremail']
        );
        array_push($arrayNewsletter, $data);
      }
      print_r(json_encode($arrayNewsletter));
    }
    private function getOrders(){
      $query = "SELECT * FROM padb.order ord INNER JOIN estados es ON es.idEstados = ord.ordercity INNER JOIN ciudades ci ON ci.idCiudades = ord.orderstate";
      $result = $this->connection->query($query);
      $arrayOrders = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idorder' => $line['idorder'],
          'ordernumber' => $line['ordernumber'],
          'ordershippingcost' => $line['ordershippingcost'],
          'ordertelefono' => $line['ordertelefono'],
          'ordercity' => $line['nombreCiudad'],
          'orderstate' => $line['nombreEstado'],
          'orderaddress' => $line['orderaddress'],
          'orderreferences' => $line['orderreferences'],
          'orderzipcode' => $line['orderzipcode'],
          'orderstatuspay' => $line['orderstatuspay']
        );
        array_push($arrayOrders, $data);
      }
      print_r(json_encode($arrayOrders));
    }
    private function getOrderItem(){
      $query = "SELECT * FROM order_has_product op INNER JOIN product p ON p.idproduct = op.idproduct WHERE op.idorder = '".$_GET['idOrder']."'";
      $result = $this->connection->query($query);
      $arrayImages = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idproduct' => $line['idproduct'],
          'orderquantity' => $line['orderquantity'],
          'ordersubtotal' => $line['ordersubtotal'],
          'productname' => $line['productname'],
          'productrealprice' => $line['productrealprice'],
          'productdiscountprice' => $line['productdiscountprice'],
          'productimage' => $line['productimage']
        );
        array_push($arrayImages, $data);
      }
      print_r(json_encode($arrayImages));
    }
    private function getOrderInfoItem(){
      $query = "SELECT * FROM padb.order o 
                  INNER JOIN user u ON u.iduser = o.iduser 
                  INNER JOIN estados e ON e.idEstados = o.orderstate
                  INNER JOIN ciudades c ON c.idCiudades = o.ordercity
                  WHERE o.idorder = '".$_GET['idOrder']."'";
      $result = $this->connection->query($query);
      $arrayImages = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idorder' => $line['idorder'],
          'ordernumber' => $line['ordernumber'],
          'ordershippingcost' => $line['ordershippingcost'],
          'ordertelefono' => $line['ordertelefono'],
          'orderaddress' => $line['orderaddress'],
          'orderreferences' => $line['orderreferences'],
          'orderzipcode' => $line['orderzipcode'],
          'nombreEstado' => $line['nombreEstado'],
          'nombreCiudad' => $line['nombreCiudad'],
          'username' => $line['username'],
          'userlastname' => $line['userlastname'],
          'useremail' => $line['useremail'],
          'useraddress' => $line['useraddress'],
          'userphonenumber' => $line['userphonenumber']
        );
        array_push($arrayImages, $data);
      }
      print_r(json_encode($arrayImages));
    }
    private function getTabulatorPrices(){
      $query = "SELECT * FROM tabulator_prices tp INNER JOIN estados_tabulador e ON e.idestadosTab = tp.tabulatorstate";
      $result = $this->connection->query($query);
      $arrayPrices = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idtabulator' => $line['idtabulator'],
          'tabulatorVol' => $line['tabulatorVol'],
          'tabulatorcost' => $line['tabulatorcost'],
          'tabulatorstate' => $line['tabulatorstate'],
          'estados' => $line['estados']
        );
        array_push($arrayPrices, $data);
      }
      print_r(json_encode($arrayPrices));
    }
    private function getCupones(){
      $query = "SELECT * FROM cupones";
      $result = $this->connection->query($query);
      $arrayCupones = array();
      while ($line = mysqli_fetch_array($result)) {
        $data = array(
          'idcupones' => $line['idcupones'],
          'cuponesname' => $line['cuponesname'],
          'cuponesdes' => $line['cuponesdes'],
          'cuponesdatestart' => $line['cuponesdatestart'],
          'cuponesdateend' => $line['cuponesdateend']
        );
        array_push($arrayCupones, $data);
      }
      print_r(json_encode($arrayCupones));
    }
  }
  new Functions($_GET['namefunction']);