<?php
  header("Content-Type:application/json,charset=UTF-8");
  @$uid = $_REQUEST["uid"] or die("{'code':1,'msg':'uid is needed'}");
  require("1_init.php");
  $sql = "SELECT * FROM lol_cart WHERE userId = $uid";
  $result = mysqli_query($conn,$sql);
  $list = mysqli_fetch_assoc($result);
  if($list===null){
    $output = ["msg"=>"empty"];
  }else{
    $cid = $list["cid"];
    $sql = "SELECT * FROM lol_cart_detail WHERE cartId = $cid";
    $result = mysqli_query($conn,$sql);
    $output = [];
    while(true){
        $row = mysqli_fetch_assoc($result);
        if(!$row){
          break;
        }else{
          $pid = $row["productId"];
          $sql = "SELECT * FROM lol_product WHERE pid = $pid";
          $result_1 = mysqli_query($conn,$sql);
          $list = mysqli_fetch_assoc($result_1);
          $output[] = $list;
        }
    }
    if($output===[]){
      $output = ["msg"=>"empty"];
    }
  }
  echo json_encode($output);
?>