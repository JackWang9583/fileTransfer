<?php
    header("Content-Type:text/html;charset=utf8");
    @$num = $_REQUEST["num"] or die("num is protect");
    @$pid = $_REQUEST["pid"] or die("pid is protect");
    @$uid = $_REQUEST["uid"] or die("uid is protect");
    require("1_init.php");
    $sql = "SELECT cid FROM lol_cart WHERE userId=$uid";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_assoc($result);
    $cid = $list["cid"];
    $sql = "UPDATE lol_cart_detail SET count = $num WHERE cartId=$cid AND productId=$pid ";
    mysqli_query($conn,$sql);
?>