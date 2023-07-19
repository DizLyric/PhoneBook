<?php

    require_once('./connection.php');

    $id = $_POST['id'];

    $query = $conn->prepare("DELETE FROM `contacts` WHERE `id` = :id");
    $query->execute(array('id' => $id));

?>