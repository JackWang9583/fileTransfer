<?php
    header("Content-Type:text/plain;charset=UTF-8");
    $pid = $_REQUEST["pid"];
    $uid = $_REQUEST["uid"];
    require("1_init.php");
    $sql = "SELECT cid FROM lol_cart WHERE userId=$uid";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_assoc($result);
    $cid = $list['cid'];
    $sql = "DELETE FROM lol_cart_detail WHERE cartId=$cid AND productId=$pid";
    mysqli_query($conn,$sql);
?>