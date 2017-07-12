
function myDateTool(obj){
  // 创建日历
  var html = `   
    <div id="date_choose_box">
        <div class="date_header">
            <span class="reduce"> << </span>
            <span class="show_header">2017年7月</span>
            <span class="add"> >> </span>
        </div>
        <ul>
            <li class="week">日</li>
            <li class="week">一</li>
            <li class="week">二</li>
            <li class="week">三</li>
            <li class="week">四</li>
            <li class="week">五</li>
            <li class="week">六</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
            <li class="day">1</li>
        </ul>
    </div>
  `;
  $("body").append(html);
  var liList = document.querySelectorAll("#date_choose_box li.day");
  var myDate = new Date();
  var years = myDate.getFullYear();
  var months = myDate.getMonth() + 1;
  var days = myDate.getDate();
  var isyun = false;
  if(
    (years % 4 === 0 && years % 100 !==0) || years % 400 === 0
    )
  {
    isyun = true;
  }
  function addHtml(years,months,Day){
    $(".show_header").html(years+"年"+months+"月");
    var dt = new Date(years, months-1, 1);
    var weekDay = [7,1,2,3,4,5,6];
    var weeks = weekDay[dt.getDay()];
    for(var i=0;i<weeks;i++){
      if(
        (/^[1,3,5,7,8]$/.test(months-1)) || months-1 === 12 || months-1 === 10
        )
      {
        $(liList[i]).html(31 + i- weeks + 1);   
      }else if(months-1 === 2){
        $(liList[i]).html(28+isyun + i - weeks + 1);
      }else{
        $(liList[i]).html(30 + i - weeks + 1);
      }
      $(liList[i]).addClass("to_reduce").removeClass("really").removeClass("to_add"); 
    }
    for(var j=0;j<Day;j++){
      $(liList[j+weeks]).html(j + 1);
      $(liList[j+weeks]).addClass("really").removeClass("to_add").removeClass("to_reduce");
    }
    for(var k=0;k<(42-(Day+weeks));k++){
      $(liList[k+Day+weeks]).html(k + 1);
      $(liList[k+Day+weeks]).addClass("to_add").removeClass("really").removeClass("to_reduce");
    }
  }
  function createShow(){
    if(
        (/^[1,3,5,7,8]$/.test(months)) || months === 12 || months === 10
        )
    {
      var Day = 31;
      addHtml(years,months,Day);
    }else if(months === 2){
      var Day = 28 + isyun;
      addHtml(years,months,Day);
    }else{
      var Day = 30;
      addHtml(years,months,Day);
    }
  }
  createShow();
  // 点击显示 
  var isOnfouce = null;
  var isBlur = false;
  var isLeave = false;
  obj.focus(function(){
    isOnfouce = $(this);
    var top = parseFloat($(this).offset().top);
    var left = parseFloat($(this).offset().left);
    var height = parseFloat($(this).css("height"));
    var width = parseFloat($(this).css("width"));
    $("#date_choose_box").css({
      top: top + height,
      left: left,
      display: "block"
    });
  }).blur(function(){
    isBlur = true;
  });
  // 
  // 加减
  $("#date_choose_box .reduce").click(function(){
    months--;
    if(months === 0){
      years--;
      months = 12;
    }
    createShow();
  });
  $("#date_choose_box .add").click(function(){
    months++;
    if(months===13){
      years++;
      months = 1;
    }
    createShow();
  })
  // 
  // 点击确定日期
  $(".day").click(function(){
    var cl = $(this).attr("class");
    if(/^day to_reduce$/.test(cl)){
      var m = months - 1;
    }else if(/^day really$/.test(cl)){
      var m = months;
    }else if(/^day to_add$/.test(cl)){
      var m = months + 1;
    }
    var y = years;
    var d = $(this).html();
    isOnfouce.val(y + "-" + m + "-" + d);
    $("#date_choose_box").css("display","none");
  });
  // 
  // 移除隐藏
  $("#date_choose_box").mouseleave(function(){
    isLeave = true;
  });
}


