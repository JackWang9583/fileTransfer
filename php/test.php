<?php
  header("Content-Type:application/json;charset=UTF-8");
  require("1_init.php");
  $uid = [
    1,2,3,4,5,6
    ];
  $uid = "1,2,3,4,5,6,7";
  $sql = "SELECT msg FROM banner WHERE id in($uid) ORDER BY msg LIMIT 6,9";
  $result = mysqli_query($conn,$sql);
  $output = [];
  while(true){
    $row = mysqli_fetch_row($result);
    if(!$row){
      break;
    }else{
      $output[] = $row;
    }
  }
  echo json_encode($output)
?>
