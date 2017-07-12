<?php
header("content-type:application/json");
@$kw=$_REQUEST['kw'];
if(empty($kw)){
    echo '[]';
    return;
}
    require('into_01.php');
    $sql="select * from t_case where caption like '%$kw%' or acontent like '%$kw%'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($row);
?>