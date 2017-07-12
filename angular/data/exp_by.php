<?php
header("content-type:application/json");
@$gid=$_REQUEST['id'];
if(empty($gid)){
echo '[]';
return;
}
require('into_01.php');
$sql="select b.uname,b.uphoto,a.* from t_exp as a,t_user as b where gid=$gid and a.user_id=b.uid";

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