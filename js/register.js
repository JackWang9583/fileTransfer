    var isSub = [0,0,0,0];
    //生成验证码
    var w = parseFloat($("#canvas").css("width"));
    var h = parseFloat($("#canvas").css("height"));
    var htmlCanvas = "";
    var ctx = canvas.getContext("2d");
    //背景阴影线
    function draw(){
        html = [];
        ctx.clearRect(0,0,w,h);
        function randomNum(min,max){
            return Math.floor(Math.random()*(max-min)+min);
        }
        for(var i=0;i<12;i++) {
            var x1 = randomNum(0,w);
            var x2 = randomNum(0,w);
            var y1 = randomNum(0,h);
            var y2 = randomNum(0,h);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            +function () {
                var r = randomNum(0,256);
                var g = randomNum(0,256);
                var b = randomNum(0,256);
                ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
            }();
            ctx.stroke();
        }
        //验证码
        var str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789凤凰网办法卡还款的看法苦辣话费卡不能付款拉风";
        str = str.split("");
        var len = str.length;
        var text="";
        ctx.font = "40px simHei";
        ctx.textBaseline = "top";
        for(var i=0;i<4;i++) {
            var n = randomNum(0,len);
            text = str[n];
            html.push(text);
            var r = randomNum(0,256);
            var g = randomNum(0,256);
            var b = randomNum(0,256);
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillText(text,0+i*25,0);
        }
        htmlCanvas = html.join("");     
    }    
    draw();
    $("#canvas").click(function(){
        draw();
    });
    var msg = [
        {"empty":"*账号不能为空*","exist":"*账号已存在*","erro":"*账号格式错误：输入6到12位大小写组合的英文*"},
        {"empty":"*密码不能为空*","erro":"*密码格式错误：输入6到12位字母及数字，第一位为大写字母*"},
        {"empty":"*请重复输入密码*","erro":"*两次密码输入不一致*"},
        {"empty":"*请输入验证码*","erro":"*验证码输入错误，请重试*"}
    ];
    var reg = [
        /^[a-zA-Z]{6,12}$/i,
        /^[A-Z][a-z0-9A-Z]{5,11}$/,
        "",
        ""
    ];
    var prompt = [
        "*请输入6到12位大小写组合的英文*",
        "*请输入6到12位字母及数字组合，第一位为大写英文字母*",
        "*请重复输入密码*",
        "*点击图片切换验证码*"
    ];
    var pMsg = document.querySelectorAll("p");
    var border = document.querySelectorAll(".container");
    var iImg = document.querySelectorAll(".container i");
    $(".container input").each(function(i,v){
        $(this).focus(function(){
            $(border[i]).addClass("active");
            $(border[i]).removeClass("danger");
            $(pMsg[i]).html(prompt[i]);
            $(pMsg[i]).removeClass("danger");
        });
        $(this).blur(function(){
            var str = $(this).val();
            if(i===2)
                var str1 = $("#userPwd input").val();
            if(str===""){
                $(pMsg[i]).html(msg[i].empty);
                $(pMsg[i]).addClass("danger"); 
                $(border[i]).addClass("danger");
                if(i!==3){
                    $(iImg[i]).addClass("exist").removeClass("succ");
                }
            }else if(i===0 && reg[i].test(str)){
                var data = "uname="+str;
                $.ajax({
                    type:"POST",
                    url:"php/3_check_uname.php",
                    data:data,
                    success:function(result){
                        if(result==="succ"){
                            $(iImg[i]).addClass("succ").removeClass("exist");
                            isSub[i] = 1;
                        }else{
                            $(pMsg[i]).html(msg[i].exist);
                            $(pMsg[i]).addClass("danger");
                            $(border[i]).addClass("danger");
                            $(iImg[i]).addClass("exist").removeClass("succ");
                        }
                    },
                    erro:function(){
                        console.log("验证用户名出错："+arguments);
                    }
                });
            }else if(
                (i===1 && reg[i].test(str)) ||
                ( i===2 && str===str1 ) ||
                (i===3 && str===htmlCanvas)
            ){
                $(iImg[i]).addClass("succ").removeClass("exist");
                isSub[i] = 1;
            }else{
                $(pMsg[i]).html(msg[i].erro);
                $(pMsg[i]).addClass("danger");
                $(border[i]).addClass("danger");
                if(i!=3)
                $(iImg[i]).addClass("exist").removeClass("succ");
            }
        });
    });
    $("#bt-register").click(function(){
        $.each(isSub,function(i,v){
            if(v===0){
                $(pMsg[i]).html(msg[i].erro);
                $(pMsg[i]).addClass("danger"); 
                $(border[i]).addClass("danger");
                if(i!==3)
                    $(iImg[i]).addClass("exist").removeClass("succ");
            }
        })
        var n = parseFloat(isSub.join(""));
        if(n===1111){
            var data = "uname="+$("#userName input").val()+"&upwd="+$("#userPwd input").val();
            $.ajax({
                type:"POST",
                url:"php/3_user_register.php",
                data:data,
                success:function(result){
                    if(result==="succ"){
                        open("mall.html");
                    }else{
                        console.log("sql语句出错");
                    }
                },
                erro:function(){
                    console.log("注册出错："+arguments);
                }
            });
        }
    });
