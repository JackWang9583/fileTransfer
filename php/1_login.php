<?php
	header("Content-Type:application/json;charset=UTF-8");
	@$uname = $_REQUEST['uname'] or die('{"code":4,"msg":"uname is protect"}');
	@$upwd = $_REQUEST["upwd"] or die('{"code":3,"msg":"upwd is protect"}');
	require("1_init.php");
	$sql = "SELECT * FROM lol_user WHERE uname='$uname' AND upwd='$upwd'";
	$result = mysqli_query($conn,$sql);
	$list = mysqli_fetch_assoc($result);
	if($list===null){
		$output = ['code'=>2,'msg'=>'用户名或密码错误'];
	}else{
		$output = ['code'=>1,'uname'=>$uname,'upwd'=>$list['upwd'],'uid'=>$list['uid']];
	}
	echo json_encode($output);
?>