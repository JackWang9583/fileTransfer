$("#header").load("php/1_header.php");
$("#footer").load("php/1_footer.php");
$(function(){
    var data = "uid="+sessionStorage.getItem("uid");
    var html = ``;
    $.ajax({
        type:"POST",
        url:"php/5_cart_select.php",
        data:data,
        success:function(result){
            $.each(result,function(i,v){
                html += `
                <li class="list">
                    <span class="choose_box"></span>
                    <div class="col-xs-3">
                        <img src="${v.pic}" alt="">
                    </div>
                    <div class="col-xs-2">
                        ${v.pname}
                    </div>
                    <div class="col-xs-2" class="danjia">
                        ${v.price}Q币
                    </div>
                    <div class="col-xs-2">
                        <span class="reduce">－</span>
                        <input type="text" class="count" value="${v.count}">
                        <span class="add">＋</span>
                    </div>
                    <div class="col-xs-2 zongjia">
                        ${(v.price*v.count).toFixed(2)}Q币
                    </div>
                    <div class="col-xs-1">
                        <button name="${v.pid}" class="my-delet">删除</button>
                    </div>
                </li>
                `;
            })
            document.querySelector("#product").innerHTML += html;
            doResponce();
        }
    });
});
function doResponce(){
    var $price = $("#section .price");
    var $ZJ = $("#product .zongjia");
    function caculate(){//计算全部总价
        var num = 0;
        $ZJ.each(function(){
            if($(this).parent().attr("class")!=="list")
                num += parseFloat($(this).html());   
        });
        $price.html(num.toFixed(2)+"Q币");
    }
    caculate();
    var $choose = $(".list .choose_box")
    var $allChoose = $(".list_head .choose_box");
    $choose.click(function(){//点击选择
        var isAll = true;
        var str = $(this).html();
        if(str===""){
            $(this).html("√");
            $(this).parent().addClass("active");
            $choose.each(function(){
                var str = $(this).html();
                if(str==="")
                    isAll = false;   
            });
            if(isAll)
                    $allChoose.html("√"); 
        }else{
            $(this).html("");
            $(this).parent().removeClass("active");
            $allChoose.html("");
        }
        caculate();
    });
    $allChoose.click(function(){//点击全选
        var str = $(this).html();
        if(str===""){
            $(this).html("√");
            $choose.html("√");
            $choose.parent().addClass("active");
        }else{
            $(this).html("");
            $choose.html("");
            $choose.parent().removeClass("active");
        }
        caculate();
    });
    var $count = $("#product .count");
    function changePHP(data){
        $.ajax({
            type:"POST",
            url:"php/5_updata_car.php",
            data:data,
            success:function(){
                console.log("执行成功");
            },
            erro:function(){
                console.log("跟新执行失败："+arguments);
            }
        });
    }
    function countZJ(num,a){
        var pri = parseFloat($(a).parent().prev().html());
        $(a).parent().next().html((pri*num).toFixed(2)+"Q币");
        caculate();
        var data = "num="+num+"&pid="+$(a).parent().next().next().children(":eq(0)").attr("name")+"&uid="+sessionStorage.getItem("uid");
        changePHP(data);
    }
    $("#product .reduce").click(function(){//减少商品
        var a = this;
        var num = $(this).next().val();
        num--;
        if(num<1)
            num = 1;
        $(this).next().val(num);
        countZJ(num,a);
    });
    $("#product .add").click(function(){//添加商品
        var a = this;
        var num = $(this).prev().val();
        num++;
        $(this).prev().val(num);
        countZJ(num,a);
    });
    $count.each(function(){//手动输入数量
        var timer = null;
        $(this).focus(function(){
            timer = setInterval(function(){
                var str = $(this).val();
                if(isNaN(str)){
                    str = parseInt($(this).val());
                    if(isNaN(str))
                        str = 1;
                    $(this).val(str);
                }else if(str===""){
                    str = 1;
                    $(this).val(str);
                }
            }.bind(this),50);
        }).blur(function(){
            clearInterval(timer);
            timer = null;
            var a = this;
            var num = $(this).val();
            countZJ(num,a);
        });
    });
    $("#product .my-delet").click(function(){//点击删除
        var data = "uid="+sessionStorage.getItem("uid")+"&pid="+$(this).attr("name");
        $(this).parent().parent().hide();
        $.ajax({
            type:"POST",
            url:"php/5_delet_cart.php",
            data:data,
            success:function(){
                console.log("删除操作成功");
            },
            erro:function(){
                console.log("删除操作失败："+arguments);
            }
        });
    });
}
