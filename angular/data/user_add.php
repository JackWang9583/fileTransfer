<?php
   @$uname=$_REQUEST['name'];
   @$upwd=$_REQUEST['pwd'];
   @$uphoto=$_REQUEST['photo'];
   if(empty($uphoto)){
   $uphoto='img/moren.jpg';
   }
    if(empty($uname)||empty($upwd)){
        echo "[]";
        return;
    }
    require('into_01.php');
    $sql="select uname from t_user where uname='$uname'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    if(!$row[0]){
    $sql="insert into t_user values(null,'$uname','$upwd','$uphoto')";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo 1;
    }else{
        echo 0;
    }}else{
        echo 2;
    }
?>