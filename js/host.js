/********创建背景动画 */
function createBG(){
    var stop = null;
    function drawCanvas(){
        var w = window.innerWidth;
        var h = window.innerHeight;
        console.log(w,h);
        var html = "<canvas id='canvas' width='"+w+"' height='"+h+"' style='background:black'></canvas>";
        $("#bg_canvas").html(html);
        var tool = {//使用时：在data里面传入准确的参数
            /*
            * bx,by : 画线的起点坐标    
            * ex,ey : 画线的终止坐标   
            * cx,cy,cr : 画圆的圆心和半径   
            * bdeg,edeg : 画圆的起始角度   
            * width : 线宽   
            * style : 填充的方式（fill/stroke）   
            */
            ctx : "",
            data : {},
            createNumFloor : function(min,max){
                return Math.random() * (max - min) + min
            },
            createNumInt : function(min,max){
                return Math.floor(Math.random() * (max - min) + min);
            },
            createColor : function(){
                var r = this.createNumInt(0,257);
                var g = this.createNumInt(0,257);
                var b = this.createNumInt(0,257);
                return "rgb(" + r + "," + g + "," + b + ")";
            },
            createColorOpc : function(){
                var r = this.createNumInt(0,257);
                var g = this.createNumInt(0,257);
                var b = this.createNumInt(0,257);
                var a = Math.random();
                return "rgba(" + r + "," + g + "," + b + "," + a + ")";
            },
            drawLine : function(){
                this.ctx.beginPath();
                this.ctx.moveTo(this.data.bx,this.data.by);
                this.ctx.lineTo(this.data.ex,this.data.ey);
                this.ctx.lineWidth = this.data.width;
                this.ctx.strokeStyle = this.data.color;
                this.ctx.stroke();
            },
            drawCircle : function(){
                this.ctx.beginPath();
                this.ctx.arc(this.data.cx,this.data.cy,this.data.cr,this.data.bdeg * Math.PI / 180,this.data.edeg * Math.PI / 180);
                if(this.data.style === "fill"){
                    this.ctx.fillStyle = this.data.color;
                    this.ctx.fill();
                }else if(this.data.style === "stroke"){
                    this.ctx.lineWidth = this.data.width;
                    this.ctx.strokeStyle = this.data.color;
                    this.ctx.stroke();
                }
            }
        }
        var ctx = canvas.getContext("2d");
        tool.ctx = ctx;
        function Draw(){
            this.x = w/2;
            this.y = h/2;
            this.dot = [];
            this.num = 500;
            this.r = 1;
            this.speed = 1;
            this.direction = [-1,1];
            this.lineLength = 100;
            this.lineX = 0 , this.lineY = 0; 
        }
        Draw.prototype.creatDot = function(){
            var a = this;
            for(var i=0;i<a.num;i++){
                a.dot[i] = [];
                a.dot[i]["x"] = tool.createNumFloor(a.r,w-a.r);
                a.dot[i]["y"] = tool.createNumFloor(a.r,h-a.r);
                a.dot[i]["color"] = tool.createColorOpc();
                a.dot[i]["k"] = tool.createNumFloor(0.5,5);
                a.dot[i]["direction"] = a.direction[tool.createNumInt(0,2)]
            }
        }
        Draw.prototype.drawDot = function(){
            var a = this;
            ctx.clearRect(0,0,w,h);
            for(var i=0;i<a.dot.length;i++){
                tool.data = {
                    cx:a.dot[i].x,cy:a.dot[i].y,cr:a.r,bdeg:0,edeg:360,style:"fill",color:a.dot[i].color
                }
                tool.drawCircle();
            }
        }
        Draw.prototype.dotMove = function(){
            var a = this;
            for(var i=0;i<a.dot.length;i++){
                if(a.dot[i].x < a.r || a.dot[i].x > (w - a.r) || a.dot[i].y < a.r || a.dot[i].y > (h - a.r))
                    a.dot[i].k *= -1;
                if(a.dot[i].x < a.r || a.dot[i].x > (w - a.r))
                    a.dot[i].direction *= -1;
                a.dot[i].x += a.speed * a.dot[i].direction; 
                a.dot[i].y += a.speed * a.dot[i].direction * a.dot[i].k;
                //进行是否连线的判断
                var countx = Math.pow(a.lineX - a.dot[i].x,2);
                var county = Math.pow(a.lineY - a.dot[i].y,2);
                if((countx + county) <= Math.pow(a.lineLength,2)){
                    tool.data = {
                        bx:a.lineX,by:a.lineY,ex:a.dot[i].x,ey:a.dot[i].y,color:a.dot[i].color,width:a.r
                    }
                    tool.drawLine();
                }
            }
        }
        Draw.prototype.creatLine = function(){
            var a = this;
            window.addEventListener("mousemove",function(e){
                var to_top = $("body").scrollTop();
                a.lineX = e.pageX;
                a.lineY = e.pageY - to_top; 
            });
        }
        var start = new Draw();
        start.creatDot();
        start.creatLine();
        function move(){
            start.drawDot();
            start.dotMove();
            stop = requestAnimationFrame(move);
        }
        move();
    }
    drawCanvas();
    window.onresize = function(){
        cancelAnimationFrame(stop);
        stop = null;
        drawCanvas()
    }; 
};
createBG();
/********************固定导航条 */
function fixNav(){
    $nav = $("#nav .box");
    $(document).scroll(()=>{
        var y=$("body").scrollTop();
        if(y!=0){
            $nav.addClass("show");
        }else if(y===0){
            $nav.removeClass("show");
        }
    });
    var isShow = false;
    $("#nav .control-btn").click(function(){
        if(!isShow){
            isShow = true;
            $("#nav li").addClass("show");
        }else{
            isShow = false;
            $("#nav li").removeClass("show");
        }
    });
};
fixNav();
/********************皮肤驿站 */
function skinList(){
    var n = 0;
    var stop = null;
    function move(){
        n += 0.2;
        if(n >= 300){
            n = 0;
        }
        $(".skin_list ul").css("left",-n+"%");
        stop = requestAnimationFrame(move);
    }
    move();
};
skinList();
/****滑轮滚动事件 */
function mouseScroll(){
   var H = 0.3*window.innerHeight;
   var $bg = $("#intro_bg .describe"),
        $bgH = $bg.offset().top,
        $goOnBG = true;
   var $bg_ul = $("#intro_bg ul"),
        $bg_ulH = $bg_ul.offset().top,
        $goOnBGUL = true;
   var $hero = $("#intro_hero .describe"),
        $heroH = $hero.offset().top,
        $goOnHR = true;  
   var $heroUlL = $(".left_box"),
        $heroUlM = $(".middle_box"),
        $heroUlR = $(".right_box"),
        $heroUlLH = $heroUlL.offset().top,   
        $heroUlMH = $heroUlM.offset().top,   
        $heroUlRH = $heroUlR.offset().top,
        $goOnHUL = true,   
        $goOnHUM = true,   
        $goOnHUR = true;  
   var $photo = $("#photo_sea .describe"),
        $photoH = $photo.offset().top,
        $goOnP = true;
   var $Skin = $("#intro_skin .describe"),
        $SkinH = $Skin.offset().top,
        $goOnSk = true;
    $(document).scroll(function(){
        var y = $("body").scrollTop();
        if(y >= $bgH && $goOnBG){
            $goOnBG = false;
            $bg.addClass("show");
        }
        if(y >= $bg_ulH + H && $goOnBGUL){
            $goOnBGUL = false;
            $bg_ul.children(":eq(0)").animate({
                left:0
            },1000);
            $bg_ul.children(":eq(3)").animate({
                left:0
            },1000);
            $bg_ul.children(":eq(1)").animate({
                left:"25%"
            },1000).animate({
                left:"-10%"
            },800).animate({
                left:"-10%"
            },200).animate({
                left:0
            },500);
            $bg_ul.children(":eq(2)").animate({
                left:"-25%"                
            },1000).animate({
                left:"10%"
            },800).animate({
                left:"10%"
            },200).animate({
                left:0
            },500);
        }
        if(y >= $heroH + H && $goOnHR){
            $goOnHR = false;
            $hero.addClass("show");
        }
        if(y >= $heroUlLH + H && $goOnHUL){
            $goOnHUL = false;
            $heroUlL.addClass("show");
        }
        if(y >= $heroUlMH + H && $goOnHUM){
            $goOnHUM = false;
            $heroUlM.addClass("show");
        }
        if(y >= $heroUlRH + H && $goOnHUR){
            $goOnHUR = false;
            $heroUlR.addClass("show");
        }
        if(y >= $SkinH + H && $goOnSk){
            $goOnSk = false;
            $Skin.addClass("show");
        }
        if(y >= $photoH + H && $goOnP){
            $goOnP = false;
            $photo.addClass("show");
        }
    });
};
mouseScroll();
/*****************图片链接 */
$("#intro_bg img").click(function(){
    open("hero_list.html");
});
$("#intro_hero img").click(function(){
    open("hero_list.html");
});