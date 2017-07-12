<?php
  header("Content-Type:application/json");

  @$id = $_REQUEST['id'];
  if(empty($id))
  {
      echo '[]';
      return;
  }

  require('into_01.php');
  $sql = "select * from t_case where aid='$id'";
  $result = mysqli_query($conn,$sql);
  $output = [];
  $row = mysqli_fetch_assoc($result);
  if(empty($row))
  {
      echo '[]';
  }
  else
  {
      $output[] = $row;
      echo json_encode($output);
  }

  ?>