<?php
Class Connect{
	protected $server;
	protected $database;
	protected $username;
	protected $password;
	protected $conn;
	function __construct(){
		$this->server="localhost";
		$this->database="anisong";
		$this->username="root";
		$this->password="";
	}
	function connect(){
		try{
			$this->conn=new PDO("mysql:host=$this->server;dbname=$this->database",$this->username,$this->password);
		}
		catch(PDOException $e){
			echo $e->getMessage();
		}
	}
}
?>