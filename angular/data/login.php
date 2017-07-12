<?php
    @$uname=$_REQUEST['name'];
    @$upwd=$_REQUEST["pwd"];
    if(empty($uname) ||empty($upwd)){
    echo "[]";
    return;
    }
    header("content-type:application/json");
    require('into_01.php');
    $sql="select * from t_user where uname='$uname' and upwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    if($row){
        echo json_encode($row);
    }else{
        echo 0;
    }?>
