<?php
header("content-type:application/json");
@$start=$_REQUEST['start'];
if(empty($start)){
$start=0;
}
require('into_01.php');
$sql="select * from t_case where aclass=1 limit  $start,4";
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