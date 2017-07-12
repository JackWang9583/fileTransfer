<?php
    header("Content-Type:application/json;charset=UTF-8");
    @$pageNum = $_REQUEST["n"];
    if($pageNum===null){
        $pageNum = 1;
    }else{
        $pageNum = intval($pageNum);
    }
    $output = [
        "recordCount" => 0,
        "pageSize" => 4,
        "pageCount" => 0,
        "pageNum" => $pageNum,
        "data" => null
    ];     
    require("1_init.php");
    $sql = "SELECT COUNT(*) FROM intro_hero";
    $result = mysqli_query($conn,$sql);
    $output["recordCount"] = intval(mysqli_fetch_row($result)[0]);
    $output["pageCount"] = ceil($output["recordCount"] / $output["pageSize"]);
    $start = ($output["pageNum"] - 1)*$output["pageSize"];
    $count = $output["pageSize"];
    $sql = "SELECT * FROM intro_hero LIMIT $start,$count";
    $result = mysqli_query($conn,$sql);
    $output["data"] = [];
    while(true){
        $row = mysqli_fetch_assoc($result);
        if(!$row){
            break;
        }else{
            $output["data"][] = $row;
        }
    }
    echo json_encode($output);
?>