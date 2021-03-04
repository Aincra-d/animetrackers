<?php
Class Anime extends Connect{
	function __construct(){
		parent::__construct();
		parent::connect();
	}

	function getAnime(){
		$st=$this->conn->prepare("SELECT ID,Title,MALImage,Episodes,Rating FROM anime_info LIMIT 10");
		$st->execute();
		return $st->fetchall();
	}
}
?>