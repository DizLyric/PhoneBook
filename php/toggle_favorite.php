<?php

    require_once('./connection.php');

    $id = $_POST['id'];
    $fav = $_POST['fav'];

    $query = $conn->prepare("UPDATE `contacts` SET `favorite` = :fav WHERE `id` = :id");
    $query->execute(array('fav' => $fav, 'id' => $id));

?>