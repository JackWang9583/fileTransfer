<?php
    header("Content-Type:text/plain;charset=UTF-8");
    @$uname = $_REQUEST['uname'] or die("uname is protect");
    require("1_init.php");
    $sql = "SELECT * FROM lol_user WHERE uname='$uname'";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_assoc($result);
    if($list===null){
        echo "succ";
    }else{
        echo "exist";
    }
?>