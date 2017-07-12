<?php
header("content-type:application/json");
@$start=$_REQUEST['start'];
if(empty($start)){
$start=0;
}
require('into_01.php');
$sql="select b.uname,b.uphoto,a.* from t_exp as a,t_user as b where a.user_id=b.uid limit $start,3";

$result=mysqli_query($conn,$sql);
$output=[];
while(true){
    $row=mysqli_fetch_assoc($result);
    if(!$row){
    break;
    }
    $output[]=$row;
}
echo json_encode($output);
?>