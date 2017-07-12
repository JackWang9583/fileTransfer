<?php
    header("Content-Type:application/json;charset=UTF-8");
    @$uid = $_REQUEST['uid'] or die('{"code":1,"msg":"uid is protect"}');
    require("1_init.php");
    //用uid找到购物车cid
    //用购物车cid找到购物车信息 pid count
    //用pid 找到pname 和 price
    //需要输出的数据为 pname price count pid
    $sql = "SELECT cid FROM lol_cart WHERE userId=$uid";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_assoc($result);
    $cid = $list["cid"];

    $sql = "SELECT * FROM lol_cart_detail WHERE cartId=$cid";
    $result = mysqli_query($conn,$sql);
    $list = [];
	while(true){
    	$row = mysqli_fetch_assoc($result);
        if(!$row){
            break;
        }else{
        	$list[] = $row;
        }
    }
    $output = [];
    $n = -1;
    foreach($list as $v){
        $n++;
        $output[$n]["count"] = $v["count"];
        $output[$n]["pid"] = $v["productId"];
        $pid = $v["productId"];
        $sql = "SELECT * FROM lol_product WHERE pid=$pid";
        $result =  mysqli_query($conn,$sql);
        $list_1 = mysqli_fetch_assoc($result);
        $output[$n]["pname"] = $list_1["pname"];
        $output[$n]["price"] = $list_1["price"];
        $output[$n]["pic"] = $list_1["pic"];
    }
    echo json_encode($output);
?>