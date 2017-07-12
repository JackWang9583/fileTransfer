<?php
    header("Content-Type:text/plain;charset=UTF-8");
    @$uname = $_REQUEST['uname'] or die ("uname is protected");
    @$upwd = $_REQUEST['upwd'] or die ("upwd is protected");
    require("1_init.php");
    $sql = "INSERT INTO lol_user VALUES(null,'$uname','$upwd')";
    mysqli_query($conn,$sql);
    $sql = "SELECT * FROM lol_user WHERE uname='$uname' AND upwd='$upwd'";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_row($result);
    if($list===null){
        echo "sql语法错误";
    }else{
        echo "succ";
    }
?>