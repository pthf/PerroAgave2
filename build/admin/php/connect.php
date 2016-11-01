<?php
  require('/config.inc');
  class Connect{
    protected $connection;
    public function addConnection(){
      // $connection = mysqli_connect(HOSTNAME,USERNAME,PASSWORD,DATABASE);
      $this->connection = new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
    }
    public function removeConnection(){
      $this->connection->close();
    }
  }
