<?php
	header("Content-Type:text/html;charset=utf8");
?>
<div id="header_box" class="container">
    <div class="idxLoad">
        <img src="img/banner/Logo.png" alt="">
        <a href="index.html">首页</a>
    </div>
    <ul class="load_list">
        <li>
            <a href="hero_list.html">背景介绍</a>
        </li>
        <li>
            <a href="hero_list.html">英雄介绍</a>
        </li>
        <li>
            <a href="cart.html">购物车</a>
        </li>
        <li>
            <a href="mall.html">道具城</a>
        </li>
        <li class="login">
            您还未登录，请<a href="#" class="dlu">登陆</a>
        </li> 
    </ul>
</div>
<div id="login">
    <div class="login_box">
        <div id="myAlert">
            <span href="#" class="myClose">&times;</span>
            <b>警告！</b><span class="myMsg"></span>。
        </div>
        <h2 class="col-xs-12">请登陆</h2>
        <form id="login-form">
            <span class="col-sm-3 col-xs-12">用户名</span>
            <input type="text" class="col-sm-9 col-xs-12 myZH" name="uname" placeholder="请输入账号">
            <br>
            <span class="col-sm-3 col-xs-12">密码</span>
            <input type="password" class="col-sm-9 col-xs-12 myMM" name="upwd" placeholder="请输入密码">
            <div class="col-xs-12 btnbox">
                <input type="button" class="subBtn" value="登录">
            </div>
        </form>
        <a href="#" class="close_box">取消登录</a>
        <a href="register.html" class="register">立即注册</a>
    </div> 
</div>
<script>
    var $ZH = $(".myZH");
    var $MM = $(".myMM");
    var $btn = $(".subBtn");
    var $alert = $("#myAlert");
    function control_1(){
        $ZH.attr("disabled",true); 
        $MM.attr("disabled",true); 
        $btn.attr("disabled",true);
    }
    $alert.hide();
    $(".myClose").click(function(){
       $alert.hide(); 
       $ZH.removeAttr("disabled"); 
       $MM.removeAttr("disabled"); 
       $btn.removeAttr("disabled");
    });
    $ZH.focus(function(){
        $ZH.removeClass("danger");
        $ZH.addClass("active");
    });
    $ZH.blur(function(){
        var str = $ZH.val();
        if(str===""){
            $ZH.addClass("danger");
            $("#myAlert .myMsg").html("账号不能为空");
            $alert.show();
            control_1();
        }
    });
    $MM.focus(function(){
        $MM.removeClass("danger");
        $MM.addClass("active");
    });
    $MM.blur(function(){
        var str = $MM.val();
        if(str===""){
            $MM.addClass("danger");
            $("#myAlert .myMsg").html("密码不能为空");
            $alert.show();
            control_1();
        }
    });
    $btn.click(function(){
        var data = $("#login-form").serialize();
        $.ajax({
            type:"POST",
            url:"php/1_login.php",
            data:data,
            success:function(result){
                if(result.code!==1){
					$("#myAlert .myMsg").html("用户名或者密码错误");
                    $alert.show();
                    control_1();
					return;
				}
				$("#login").hide();
				var loginUname = result.uname;
                sessionStorage.setItem('uname',loginUname);
                sessionStorage.setItem('upwd',result.upwd);
                sessionStorage.setItem('uid',result.uid);
				$('#header .login').html("欢迎回来："+loginUname+"  <a href='#' class='dlu-reset'> 注销 </a>");
				$("a.dlu-reset").click(function(e){
                    e.preventDefault();
					sessionStorage.setItem('uname',"");
					sessionStorage.setItem('upwd',"");
					sessionStorage.setItem('uid',"");
                    $('#header .login').html("您还未登录，请"+"<a href='#' class='dlu'> 登录</a>");
                    $("#header .dlu").click(function(e){
                        e.preventDefault();
                        $("#login").show();
                    });
				});
                 location.replace(location.href);
            },
            erro:function(){
                console.log("登录响应有问题"+arguments);
            }
        });
    });
    $("#header .dlu").click(function(e){
        e.preventDefault();
        $("#login").show();
    });
    $(".close_box").click(function(e){
        e.preventDefault();
        $("#login").hide();
    });
    function denlu(){
        var loginUname = sessionStorage.getItem('uname');
        if(loginUname && loginUname!==""){
            $("#login").hide();
            $('#header .login').html("欢迎回来："+loginUname+"  <a href='#' class='dlu-reset'> 注销 </a>");
			$("a.dlu-reset").click(function(e){
                e.preventDefault();
				sessionStorage.setItem('uname',"");
				sessionStorage.setItem('upwd',"");
				sessionStorage.setItem('uid',"");
                $('#header .login').html("您还未登录，请"+"<a href='#' class='dlu'> 登录</a>");
                $("#header .dlu").click(function(e){
                    e.preventDefault();
                    $("#login").show();
                });
			});
        }
    }
    document.onload = denlu();
</script>