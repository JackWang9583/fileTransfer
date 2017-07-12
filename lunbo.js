
function sliderBa(obj,imgs){
    var html = `
      <ul class="img_box">
      </ul>
      <ul class="img_index">          
      </ul>
      <div class="btn_left btn"><</div>
      <div class="btn_right btn">></div>
    `;
    obj.html(html);
    var imgs = imgs;
    html = "";
    var timer = null;
    var goOn = true;
    var isStop = false;
    var $img_box = $(".img_box");
    var $img_index = $(".img_index");
    for(var i=0;i<imgs.length;i++){
      if(i===0){
        html += `<li class="active"></li>`;
      }else{
        html += `<li></li>`;
      }
    }
    $img_index.html(html);
    html = "";
    var n = 0;
    function addImg(){
        html = "<li class='col-xs-2' style='z-index:-2'><img src='"+imgs[0][1]+"'></li>";
        for(var i=0;i<imgs.length;i++){
            html += "<li style='z-index:"+(imgs.length-i)+"'><img src='"+imgs[i][1]+"'></li>";
        }
    }
    addImg();
    function active(){
        timer = setTimeout(function(){
            n++;
            $img_box.children(":eq("+n+")").animate({
                opacity:0
            },800,function(){
                $img_box.children(":eq(1)").css({
                    zIndex:-1,
                    opacity:1
                });
                if(n===imgs.length){
                    $img_box.children(":eq(1)").css("zIndex",imgs.length);
                    $(".img_box li").css("opacity",1);
                    n = 0;
                }
                $img_index.children(":eq("+n+")").addClass("active").siblings().removeClass("active");
                if(goOn)
                    active();
            });
        },2000);
    }
    active();
    $("#banner").mousemove(function(){
        if(
            parseFloat($img_box.children(":eq("+n+")").css("opacity"))===0
        ){
            goOn = false;
            clearTimeout(timer);
            isStop = true;
        }
    }).mouseleave(function(){
        if(isStop){
            isStop = false;
            goOn = true;
            active();
        }
    });
    $img_index.on("click","li",function(){
        var idx = $(".img_index>li").index(this);
        n = idx;
        if(n===0){
            $img_box.children(":eq(1)").css("zIndex",imgs.length);
        }
        for(var i=0;i<=idx+1;i++){
            $img_box.children(":eq("+i+")").css("opacity",0); 
        }
        for(var j=idx+1;j<=imgs.length;j++){
            $img_box.children(":eq("+j+")").css("opacity",1); 
        } 
        $img_index.children(":eq("+n+")").addClass("active").siblings().removeClass("active");
    });
    $(".btn_left").click(function(){
        if(n>0){
            if(n===1){
                $img_box.children(":eq(1)").css("zIndex",imgs.length);
            }
            $img_box.children(":eq("+n+")").css("opacity",1);
            n--;
            $img_index.children(":eq("+n+")").addClass("active").siblings().removeClass("active");
        }else if(n===0){
            n = imgs.length-1;
            for(var i=1;i<=imgs.length-1;i++){
                $img_box.children(":eq("+i+")").css("opacity",0); 
            }
            $img_box.children(":eq(1)").css({
                zIndex:-1,
                opacity:1
            });
            $img_index.children(":eq("+n+")").addClass("active").siblings().removeClass("active");
        }
    });
    $(".btn_right").click(function(){
        if(n<imgs.length-1){
            n++;
            $img_box.children(":eq("+n+")").css("opacity",0);
            $img_index.children(":eq("+n+")").addClass("active").siblings().removeClass("active");
            $img_box.children(":eq(1)").css({
                opacity:1,
                zIndex:-1
            });
        }else if(n===imgs.length-1){
            n = 0;
            $(".img_box li").css("opacity",1);
            $img_box.children(":eq(1)").css("zIndex",imgs.length);
            $img_index.children(":eq("+n+")").addClass("active").siblings().removeClass("active");
        }
    });
    $img_box.html(html);
};
sliderBa();