<?php

    require_once('./connection.php');

    $query = $conn->prepare("SELECT * FROM `contacts` ORDER BY `favorite` DESC, `name` ASC");
    $query->execute();
    $array = $query->fetchAll(PDO::FETCH_ASSOC);
    print_r( json_encode($array) );

?>