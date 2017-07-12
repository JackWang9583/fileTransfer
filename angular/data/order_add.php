<?php
    $user_id=$_REQUEST['user_id'];
    $case_id=$_REQUEST['case_id'];
    require('into_01.php');
    $sql="insert into t_order values(null,$user_id,now(),$case_id)";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo 1;
    }else{
        echo 0;
    }
?>