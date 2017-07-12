$("#header").load("php/1_header.php");
$("#footer").load("php/1_footer.php");
$("#leader .car").click(function(){
    open("cart.html");
});
$(function(){//弹出框
    var $leaUl = $("#leader ul");
    $("#leader ul li:first-child").addClass("active");
    $leaUl.on("mouseover","li",function(){
        $(this).addClass("active").siblings().removeClass("active");
    }).mouseleave(function(){
        $("#leader ul li").removeClass("active");
    });
    /**/
    //click 事件
    /**/
    var $banUl = $("#banner>ul");
    var $tanchu_box = $("#banner .tanchu");
    var tanchu = document.querySelectorAll("#banner .tanchu div");
    $banUl.on("mouseover","li",function(){
        $tanchu_box.addClass("active");
        $(this).addClass("active").siblings().removeClass("active");
        var n = $("#banner>ul>li").index(this);
        $(tanchu[n]).addClass("active").siblings().removeClass("active");
    });
    $("#banner").mouseleave(function(){
        $tanchu_box.removeClass("active");
        $("#banner>ul li").removeClass("active");
        $("#banner .tanchu div").removeClass("active");
    });
    $("#banner .tanchu div").mouseleave(function(){
        $tanchu_box.removeClass("active");
        $("#banner>ul li").removeClass("active");
        $("#banner .tanchu div").removeClass("active");
    });
});
$(function(){//轮播
    var $imgList = $("#banner .img_list");
    var $imgIndex = $("#banner .img_index ");
    var timer = null;
    var isgoOn = true;
    var isOver = false;
    var isStop = false;
    var n = 0;
    function move(){
        timer = setTimeout(function(){
            isOver = false;
            n++;
            $imgList.animate({
                left:-n*100+"%"
            },500,function(){
                isOver  = true;
                if(n===5){
                    $imgList.css("left",0);
                    n = 0;
                }
                $imgIndex.children(":eq("+n+")").addClass("active")
                    .siblings().removeClass("active");
                if(isgoOn)
                    move();
            });
        },2000)
    }
    move();
    $("#banner .img_box").mousemove(function(){
        if(isOver){
            clearTimeout(timer);
            isStop = true;
            isgoOn = false;
        }
    }).mouseleave(function(){
        if(isStop){
            isStop = false;
            isgoOn = true;
            move();
        }
    });
    $imgIndex.on("mouseover","li",function(){
        $(this).addClass("active").siblings().removeClass("active");
        var m = $("#banner .img_index>li").index(this);
        n = m;
        $imgList.animate({
            left:-n*100+"%"
        },100);
    });
});
$(function () {//分页加载
    var n = 1;
    var pageCount = null;
    function add(){
        var html = "";
        var data = "n="+n;
        $.ajax({
            type:"POST",
            url:"php/4_product_select.php",
            data:data,
            success:function(result){
                console.log(result);
                pageCount = result.pageCount;
                $.each(result.data,function(i,v){
                    html += `
                <div class="product">
                    <img src="${v.pic}" alt=""/>
                    <p>微信价：${v.pname}</p>
                    <p>Q币价格：${v.price} Q币</p>
                    <input type="button" value="添加到购物车" name = "${v.pid}"/>
                </div>
                `;
                });
                if(n===1){
                    html += `
                    <div class="page">
                        <button class="add">下一页</button>
                    </div>
                    `;
                }else if(n===pageCount){
                    html += `
                    <div class="page">
                        <button class="reduce">上一页</button>
                    </div>
                    `;
                }else{
                    html += `
                    <div class="page">
                        <button class="reduce">上一页</button>
                        <button class="add">下一页</button>
                    </div>
                    `;
                }
                $(".middle_box").html(html);
                $(".add").click(function(){
                    n++;
                    add();
                });
                $(".reduce").click(function(){
                    n--;
                    add();
                });
                $(".product input").click(function(){//添加到购物车
                    var uid = sessionStorage.getItem("uid");
                    var pid = $(this).attr("name");
                    var data = "uid="+uid+"&pid="+pid;
                    $.ajax({
                        type:"POST",
                        url:"php/4_add_cart.php",
                        data:data,
                        success:function(result){
                            if(result.msg==="succ"){
                                alert("1");
                            }
                        },
                        erro:function(){
                            console.log("添加失败："+arguments);
                        }
                    });
                });
            },
            erro:function(){
                console.log("分页加载出问题："+arguments);
            }
        });
    }
    add();
});
$(function(){//倒计时
    var $day = $(".time .day");
    var $hour = $(".time .hour");
    var $min = $(".time .min");
    var $second = $(".time .second");
    if(!sessionStorage.getItem("data"))
        sessionStorage.setItem("data",208800);
    var data = parseFloat(sessionStorage.getItem("data"));
    var timer = null;
    timer = setInterval(function(){
        data--;
        sessionStorage.setItem("data",data);
        var second = data%60;
        var min = (data-second)/60%60;
        var hour = ((data-second)/60 - min)/60%24;
        var day = (((data-second)/60 - min)/60 - hour)/24;
        $day.html(day);$hour.html(hour);$min.html(min);$second.html(second);
        if(data===0){
            clearInterval(timer);
        }
    },1000)
});
$(function () {//猜你喜欢
    var data = "uid="+sessionStorage.getItem("uid");
    var html = "";
    $.ajax({
        type:"POST",
        url:"php/4_like_list.php",
        data:data,
        success:function(result){
            console.log(result);
            if(result["msg"]==="empty"){
                html += `
                <li>
                    <img src="img/skin/1.jpg" alt=""/>
                    <span><b>光辉女郎</b></span>
                    <span>Q币价格：35.00 Q币</span>
                    <span>微信价：￥33.25</span>
                </li>
                <li>
                    <img src="img/skin/2.jpg" alt=""/>
                    <span><b>光辉女郎</b></span>
                    <span>Q币价格：35.00 Q币</span>
                    <span>微信价：￥33.25</span>
                </li>
                <li>
                    <img src="img/skin/3.jpg" alt=""/>
                    <span><b>光辉女郎</b></span>
                    <span>Q币价格：35.00 Q币</span>
                    <span>微信价：￥33.25</span>
                </li>
                `;
            }else if(result.length===1){
                html += `
                <li>
                    <img src="${result[0].pic}" alt=""/>
                    <span><b>${result[0].pname}</b></span>
                    <span>Q币价格：${result[0].price} Q币</span>
                    <span>微信价：￥${result[0].price*0.95}</span>
                </li>
                <li>
                    <img src="img/skin/2.jpg" alt=""/>
                    <span><b>光辉女郎</b></span>
                    <span>Q币价格：35.00 Q币</span>
                    <span>微信价：￥33.25</span>
                </li>
                <li>
                    <img src="img/skin/3.jpg" alt=""/>
                    <span><b>光辉女郎</b></span>
                    <span>Q币价格：35.00 Q币</span>
                    <span>微信价：￥33.25</span>
                </li>
                `;
            }else if(result.length===2){
                for(var i=0;i<2;i++){
                    html += `
                    <li>
                        <img src="${result[i].pic}" alt=""/>
                        <span><b>${result[i].pname}</b></span>
                        <span>Q币价格：${result[i].price} Q币</span>
                        <span>微信价：￥${result[i].price*0.95}</span>
                    </li>
                    `;
                }
                html += `
                <li>
                    <img src="img/skin/3.jpg" alt=""/>
                    <span><b>光辉女郎</b></span>
                    <span>Q币价格：35.00 Q币</span>
                    <span>微信价：￥33.25</span>
                </li>
                `;
            }else if(result.length>=3){
                for(var i=0;i<3;i++){
                    html += `
                    <li>
                        <img src="${result[i].pic}" alt=""/>
                        <span><b>${result[i].pname}</b></span>
                        <span>Q币价格：${result[i].price} Q币</span>
                        <span>微信价：￥${result[i].price*0.95}</span>
                    </li>
                    `;
                }    
            }
            $(".likeList").html(html);
        },
        erro: function () {
            console.log("喜爱加载错误："+arguments);
        }
    });
});
$(function(){
    var result;
    var data = [];
    $.each(result,function(i,v){
        data[i] = [];
        data[i].push(v.a);
        data[i].push(v.b);
        data[i].push(v.c);
        data[i].push(v.d);
        data[i].push(v.e);
    });
    var html = "";
    function fun(data){
        var n = 0;
        for(var i=0;i<data.length;i++){
            if(n%2 === 0){
                html += `<tr role="row" class="odd">`;
            }else{
                html += `<tr role="row" class="even">`;
            }
            for(var j=0;j<data[i].length;j++){
                html += `<td>${data[i][j]}</td>`;
            }
            html += `</tr>`
        }
        n++;
    }
    fun(data);
    console.log(html);
});

//
