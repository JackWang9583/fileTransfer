<?php
    header("Content-Type:application/json;charset=UTF-8");
    $userId = $_REQUEST['uid'];
    $pid = $_REQUEST['pid'];
    require("1_init.php");
    $sql = "SELECT * FROM lol_cart WHERE userId = $userId ";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_assoc($result);
    if($list===null){
        $sql = "INSERT INTO lol_cart VALUES(null,$userId)";
        mysqli_query($conn,$sql);
        $sql = "SELECT * FROM lol_cart WHERE userId = $userId ";
        $result = mysqli_query($conn,$sql);
        $list = mysqli_fetch_assoc($result);
    }
    $cid = $list["cid"];
    $sql = "SELECT * FROM lol_cart_detail WHERE cartId = $cid AND productId = $pid";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_assoc($result);
    if($list===null){
        $sql = "INSERT INTO lol_cart_detail VALUES(null,$cid,$pid,1)";
        mysqli_query($conn,$sql);
    }else{
        $num = intval($list["count"]) + 1;
        $sql = "UPDATE lol_cart_detail SET count = $num WHERE cartId = $cid AND productId = $pid ";
        mysqli_query($conn,$sql);
    }
    $output = ['msg'=>'succ'];
    echo json_encode($output);
?>

