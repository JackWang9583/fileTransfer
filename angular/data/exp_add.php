<?php
header("Content-Type:text/html;charset=utf-8");
    $user_id=$_REQUEST['user_id'];
    $g_content=$_REQUEST['g_content'];
    if(empty($user_id)||empty($g_content)){
    echo '[]';
    return;
    }
    require('into_01.php');
    $sql="insert into t_exp values(null,$user_id,now(),'$g_content')";
    $result=mysqli_query($conn,$sql);
    if($result){
    echo 1;
    }else{
    echo 0;
    }

?>