<?php
$data=json_decode(file_get_contents("php://input"));
require("connect.php");
$connect=new Connect();
$connect->connect();
require("anime.php");
$anime=new Anime();
$anime_info=$anime->getAnime(),
foreach($anime_info as $key){
	echo json_encode($key[1]);
}
?>