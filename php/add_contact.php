<?php

    require_once('./connection.php');

    $name = $_POST['name'];
    $number = $_POST['number'];
    $fav = $_POST['fav'];

    $query = $conn->prepare("INSERT INTO `contacts` SET `name` = ?, `number` = ?, `favorite` = ?");
    $query->execute(array($name, $number, $fav));
?>