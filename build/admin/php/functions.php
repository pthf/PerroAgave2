<?php
  require('./connect.php');
  class Functions extends Connect{
    function __construct($namefunction){
      $this->addConnection();
      $this->$namefunction();
      $this->removeConnection();
    }
    private function addNewProduct(){
      parse_str($_POST['data'], $data);    
      foreach ($_FILES['productImageCover']["name"] as $key => $value) {     
        $fileName = $_FILES["productImageCover"]["name"][$key];
        $fileName = date("YmdHis").pathinfo($_FILES["productImageCover"]["type"][$key], PATHINFO_EXTENSION);
        $fileType = $_FILES["productImageCover"]["type"][$key];
        $fileTemp = $_FILES["productImageCover"]["tmp_name"][$key];
        move_uploaded_file($fileTemp, "../src/images/Products/".$fileName);
        $query = "INSERT INTO product VALUES (null,'".$data['productName']."','".$data['productDescription']."',
                                              '".$data['productQuantity']."','".$data['productRealPrice']."','".$data['productDiscountPrice']."',
                                              '".$fileName."','".$data['productStock']."','".$data['productWeight']."','".$data['productCategory']."')";           
        $result = $this->connection->query($query);
      }   
    }
    private function editProduct(){
      parse_str($_POST['data'], $data); 
      if (isset($_FILES['productImageCover'])) {   
        $fileName = $_FILES["productImageCover"]["name"][0];
        $fileName = date("YmdHis").pathinfo($_FILES["productImageCover"]["type"][0], PATHINFO_EXTENSION);
        $query = "SELECT productimage FROM product WHERE idproduct = '".$data['productId']."'";
        $result = $this->connection->query($query);
        $line = mysqli_fetch_array($result);
        unlink("../src/images/Products/".$line['productimage']);
        $fileType = $_FILES["productImageCover"]["type"][0];
        $fileTemp = $_FILES["productImageCover"]["tmp_name"][0];
        move_uploaded_file($fileTemp, "../src/images/Products/".$fileName);
        $query = "UPDATE product SET productname='".$data['productName']."',productdescription='".$data['productDescription']."',productquantity='".$data['productQuantity']."',
                                    productrealprice='".$data['productRealPrice']."',productdiscountprice='".$data['productDiscountPrice']."',productimage='".$fileName."',
                                    productstock='".$data['productStock']."',productweight='".$data['productWeight']."',idproductcategory='".$data['productCategory']."' WHERE idproduct='".$data['productId']."'";         
        $result = $this->connection->query($query); 
      } else {
        $query = "UPDATE product SET productname='".$data['productName']."',productdescription='".$data['productDescription']."',productquantity='".$data['productQuantity']."',
                                    productrealprice='".$data['productRealPrice']."',productdiscountprice='".$data['productDiscountPrice']."',
                                    productstock='".$data['productStock']."',productweight='".$data['productWeight']."',idproductcategory='".$data['productCategory']."' WHERE idproduct='".$data['productId']."'";         
        $result = $this->connection->query($query);
      }
    }
    private function deleteProduct(){
      $query = "SELECT productimage FROM product WHERE idproduct = '".$_POST['idProduct']."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      unlink("../src/images/Products/".$line['productimage']);
      $query = "DELETE FROM product WHERE idproduct = '".$_POST['idProduct']."'";
      $result = $this->connection->query($query);
    }
    private function addNewCategory() {
      parse_str($_POST['data'], $data);
      $query = "SELECT * FROM productcategory WHERE productcategoryname = '".$data['categoryName']."'";
      $result = $this->connection->query($query);
      $rowcount=mysqli_num_rows($result);
      if ($rowcount == 0) {
        $query = "INSERT INTO productcategory VALUES(null,'".$data['categoryName']."')";
        $result = $this->connection->query($query);
      }
    }
    private function deleteCategory(){
      $query = "DELETE FROM productcategory WHERE idproductcategory = '".$_POST['idCategory']."'";
      $result = $this->connection->query($query);
    }
    private function addNewEvent(){
      parse_str($_POST['data'], $data);  
      $eventurl = scanear_string(strtolower($data['eventName']));
      $eventurl = explode(" ", $eventurl);
      $eventurl = array_filter($eventurl);
      $eventurl = implode("-", $eventurl);
      $eventdate = $data['eventYear'].'-'.$data['eventMonth'].'-'.$data['eventDay'];
      foreach ($_FILES['eventImageCover']["name"] as $key => $value) {     
        $fileName = $_FILES["eventImageCover"]["name"][$key];
        $fileName = date("YmdHis").pathinfo($_FILES["eventImageCover"]["type"][$key], PATHINFO_EXTENSION);
        $fileType = $_FILES["eventImageCover"]["type"][$key];
        $fileTemp = $_FILES["eventImageCover"]["tmp_name"][$key];
        move_uploaded_file($fileTemp, "../src/images/CoverEvents/".$fileName);
        $query = "INSERT INTO event VALUES (null,'".$fileName."','".$data['eventName']."','".$eventurl."','".$data['eventDescription']."',
                                              '".$eventdate."','".$data['eventProgramDescription']."','".$data['eventAddress']."','".$data['eventCity']."',
                                              '".$data['eventState']."','".$data['eventNeighborhood']."','".$data['eventZipCode']."','".$data['eventPhoneNumber']."','".$data['eventStatus']."')";           
        $result = $this->connection->query($query);
      }   
        $idEvent = $this->connection->insert_id;

      foreach ($_FILES['eventImages']["name"] as $key => $value) {     
        $fileName = $_FILES["eventImages"]["name"][$key];
        // $fileName = date("YmdHis").pathinfo($_FILES["eventImages"]["type"][$key], PATHINFO_EXTENSION);
        $fileType = $_FILES["eventImages"]["type"][$key];
        $fileTemp = $_FILES["eventImages"]["tmp_name"][$key];
        move_uploaded_file($fileTemp, "../src/images/galleryEvents/".$fileName);
        $query = "INSERT INTO eventimagegallery VALUES (null,'".$fileName."')";           
        $result = $this->connection->query($query);
        $idImageGallery = $this->connection->insert_id;
        $query = "INSERT INTO eventimagegallery_has_event VALUES ('".$idImageGallery."','".$idEvent."')";           
        $result = $this->connection->query($query);
      } 
    }
    private function editEvent(){
      parse_str($_POST['data'], $data); 
      $eventurl = scanear_string(strtolower($data['eventName']));
      $eventurl = explode(" ", $eventurl);
      $eventurl = array_filter($eventurl);
      $eventurl = implode("-", $eventurl);
      $eventdate = $data['eventYear'].'-'.$data['eventMonth'].'-'.$data['eventDay']; 
      if (isset($_FILES['eventImageCover'])) {
        $fileName = $_FILES["eventImageCover"]["name"][0];
        $fileName = date("YmdHis").pathinfo($_FILES["eventImageCover"]["type"][0], PATHINFO_EXTENSION);
        $query = "SELECT eventCover FROM event WHERE idevent = '".$data['eventId']."'";
        $result = $this->connection->query($query);
        $line = mysqli_fetch_array($result);
        unlink("../src/images/CoverEvents/".$line['eventCover']);
        $fileType = $_FILES["eventImageCover"]["type"][0];
        $fileTemp = $_FILES["eventImageCover"]["tmp_name"][0];
        move_uploaded_file($fileTemp, "../src/images/CoverEvents/".$fileName);
        $query = "UPDATE event SET eventCover='".$fileName."',eventname='".$data['eventName']."',eventurl='".$eventurl."',
                                    eventdescription='".$data['eventDescription']."',eventdate='".$eventdate."',eventscheduledescription='".$data['eventProgramDescription']."',
                                    eventaddress='".$data['eventAddress']."',eventcity='".$data['eventCity']."',eventstate='".$data['eventState']."',
                                    eventneighborhood='".$data['eventNeighborhood']."',eventzipcode='".$data['eventZipCode']."',eventphonenumer='".$data['eventPhoneNumber']."',
                                    eventstatus='".$data['eventStatus']."' WHERE idevent='".$data['eventId']."'";         
        $result = $this->connection->query($query);
      } else {
        $query = "UPDATE event SET eventname='".$data['eventName']."',eventurl='".$eventurl."',
                                    eventdescription='".$data['eventDescription']."',eventdate='".$eventdate."',eventscheduledescription='".$data['eventProgramDescription']."',
                                    eventaddress='".$data['eventAddress']."',eventcity='".$data['eventCity']."',eventstate='".$data['eventState']."',
                                    eventneighborhood='".$data['eventNeighborhood']."',eventzipcode='".$data['eventZipCode']."',eventphonenumer='".$data['eventPhoneNumber']."',
                                    eventstatus='".$data['eventStatus']."' WHERE idevent='".$data['eventId']."'";        
        $result = $this->connection->query($query);
      }   
    }
    private function addImagesEvent(){
      parse_str($_POST['data'], $data);
      $idEvent = $data['eventId'];
      foreach ($_FILES['eventImages']["name"] as $key => $value) {   
        $fileName = $_FILES["eventImages"]["name"][$key];
        $fileType = $_FILES["eventImages"]["type"][$key];
        $fileTemp = $_FILES["eventImages"]["tmp_name"][$key];
        move_uploaded_file($fileTemp, "../src/images/galleryEvents/".$fileName);
        $query = "INSERT INTO eventimagegallery VALUES (null,'".$fileName."')";           
        $result = $this->connection->query($query);
        $idImageGallery = $this->connection->insert_id;
        $query = "INSERT INTO eventimagegallery_has_event VALUES ('".$idImageGallery."','".$idEvent."')";           
        $result = $this->connection->query($query);
      } 
    }
    private function deleteImageEvent(){
      $idEvent = $_POST['idEvent'];
      $idImageEvent = $_POST['idImageEvent'];
      $query = "DELETE FROM eventimagegallery_has_event WHERE ideventimagegallery = '".$idImageEvent."' AND idevent = '".$idEvent."'";
      $result = $this->connection->query($query);
      $query = "SELECT eventimagegalleryimage FROM eventimagegallery WHERE ideventimagegallery = '".$idImageEvent."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      unlink("../src/images/galleryEvents/".$line['eventimagegalleryimage']);
      $query = "DELETE FROM eventimagegallery WHERE ideventimagegallery = '".$idImageEvent."'";
      $result = $this->connection->query($query);
    }
    private function deleteEvent(){
      $idEvent = $_POST['idEvent'];
      $query = "SELECT * FROM eventimagegallery_has_event WHERE idevent = '".$idEvent."'";
      $result = $this->connection->query($query);
      while ($line = mysqli_fetch_array($result)) {
        $query = "DELETE FROM eventimagegallery_has_event WHERE ideventimagegallery = '".$line['ideventimagegallery']."'";
        $result = $this->connection->query($query);
        $query = "SELECT eventimagegalleryimage FROM eventimagegallery WHERE ideventimagegallery = '".$line['ideventimagegallery']."'";
        $result = $this->connection->query($query);
        $line1 = mysqli_fetch_array($result);
        unlink("../src/images/galleryEvents/".$line1['eventimagegalleryimage']);
        $query = "DELETE FROM eventimagegallery WHERE ideventimagegallery = '".$line['ideventimagegallery']."'";
        $result = $this->connection->query($query);
      }
      $query = "SELECT eventCover FROM event WHERE idevent = '".$idEvent."'";
      $result = $this->connection->query($query);
      $line = mysqli_fetch_array($result);
      unlink("../src/images/CoverEvents/".$line['eventCover']);
      $query = "DELETE FROM event WHERE idevent = '".$idEvent."'";
      $result = $this->connection->query($query);
    }
    private function addPrice() {
      $query = "TRUNCATE TABLE tabulator_prices";
      $result = $this->connection->query($query);
      require_once './Excel/reader.php';
      $fileName = $_FILES['tabulatorValues']['tmp_name'][0];
      $data = new Spreadsheet_Excel_Reader(); 
      $data->setOutputEncoding('CP1251');
      $data->read($fileName);
      header('Content-type: application/vnd.ms-excel');
          header("Content-Disposition: attachment; filename=excelenphp.xls");
          header("Pragma: no-cache");
          header("Expires: 0");   
      for ($i=1; $i <= $data->sheets[0]['numRows']; $i++) { 
        print_r($data->sheets[0]['cells'][$i]);
        $state = $data->sheets[0]['cells'][$i][1];
        $volumen = $data->sheets[0]['cells'][$i][2];
        $cost = $data->sheets[0]['cells'][$i][3];
        $query = "INSERT INTO tabulator_prices VALUES(null,'".$state."','".$volumen."','".$cost."')";
        $result = $this->connection->query($query);
      }

      // parse_str($_POST['data'], $data);
      // $query = "SELECT * FROM tabulator_prices";
      // $result = $this->connection->query($query);
      // $bandera = array();
      // while ($row = mysqli_fetch_array($result)) {
      //   if (($data['tabulatorKgmin'] >= $row['tabulatorkgmin']) && ($data['tabulatorKgmin'] <= $row['tabulatorkgmax'])) {
      //     $bandera[] = 1;
      //   }
      //   if (($data['tabulatorKgmax'] <= $row['tabulatorkgmax']) && ($data['tabulatorKgmax'] >= $row['tabulatorkgmin'])) {
      //     $bandera[] = 2;
      //   } 
      //   if ($data['tabulatorPrice'] == $row['tabulatorcost']) {
      //     $bandera[] = 3;
      //   }
      // }
      // // print_r(json_encode($bandera,true));
      // if ($bandera == null) {
      //   $query = "INSERT INTO tabulator_prices VALUES(null,'".$data['tabulatorKgmin']."','".$data['tabulatorKgmax']."','".$data['tabulatorPrice']."','".$data['tabulatorState']."')";
      //   $result = $this->connection->query($query);
      //   $bandera[] = 0;
      // }
      // $result_error = json_encode($bandera,true);
      // print_r($result_error);
    }
    private function deletePrice(){
      $query = "DELETE FROM tabulator_prices WHERE idtabulator = '".$_POST['idTabulatorPrice']."'";
      $result = $this->connection->query($query);
    }
    private function addNewCupon(){
      parse_str($_POST['data'], $data);
      $fechaInicio = $data['cuponStartYear'].'-'.$data['cuponStartMonth'].'-'.$data['cuponStartDay'];
      $fechaFin = $data['cuponEndYear'].'-'.$data['cuponEndMonth'].'-'.$data['cuponEndDay'];
      $query = "SELECT * FROM cupones WHERE cuponesname = '".$data['cuponName']."'";
      $result = $this->connection->query($query);
      $numRows = mysqli_num_rows($result);
      if ($numRows == 0) {
        $query = "INSERT INTO cupones VALUES (null,'".$data['cuponName']."','".$data['cuponDiscount']."','".$fechaInicio."','".$fechaFin."')";
        $result = $this->connection->query($query); 
      } else {
        echo 1;
      }
    }
    private function deleteCupon(){
      $query = "DELETE FROM cupones WHERE idcupones = '".$_POST['idCupon']."'";
      $result = $this->connection->query($query);
    }
    private function changeStatusOrder(){
      parse_str($_POST['data'], $data);
      $query = "UPDATE padb.order SET orderstatusfacture = '".$data['orderStatus']."' WHERE idorder = '".$data['orderId']."'";
      $result = $this->connection->query($query); 
    }
  }
  new Functions($_POST['namefunction']);

  function scanear_string($string)
    {

        $string = trim($string);

        $string = str_replace(
            array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
            array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
            $string
        );

        $string = str_replace(
            array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
            array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
            $string
        );

        $string = str_replace(
            array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
            array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
            $string
        );

        $string = str_replace(
            array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
            array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
            $string
        );

        $string = str_replace(
            array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
            array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
            $string
        );

        $string = str_replace(
            array('ñ', 'Ñ', 'ç', 'Ç'),
            array('n', 'N', 'c', 'C',),
            $string
        );

        //Esta parte se encarga de eliminar cualquier caracter extraño
        $string = str_replace(
            array('¨', 'º', '-', '~',
                 '#', '@', '|', '!', '"',
                 "·", "$", "%", "&", "/",
                 "(", ")", "?", "'", "¡",
                 "¿", "[", "^", "<code>", "]",
                 "+", "}", "{", "¨", "´",
                 ">", "<", ";", ",", ":",
                 "."),
            '',
            $string
        );


        return $string;
    }