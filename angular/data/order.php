<?php
header("content-type:application/json");
@$start=$_REQUEST['start'];
if(empty($start)){
$start=0;
}
$user_id=$_REQUEST['user_id'];
if(empty($user_id)){
echo '[]';
return;
}
require('into_01.php');
$sql="select a.*,b.* from t_case as a,t_order as b where b.user_id='$user_id' and a.aid=b.case_id limit $start,4";
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