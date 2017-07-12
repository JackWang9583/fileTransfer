$("#header").load("php/1_header.php");
$("#footer").load("php/1_footer.php");
var n = 1;
var pageCount = 0;
var ulBox = document.querySelector("#section");
function addHTML(data){
    var data = "n="+n;
    $.ajax({
        type:"POST",
        url:"php/2_hero_list.php",
        dataType: "json",
        data:data,
        success:function(result){
            console.log(result);
            var html = "";
            console.log(result["data"]);
            pageCount = result["pageCount"];
            $.each(result.data,function(i,v){
                html += `
                    <li>
                        <p>${v.name}</p>
                        <img src="${v.pic}" alt="">
                        <span>${v.msg}</span>
                    </li>
                    `
            });
            ulBox.innerHTML += html;
        }
    });
}
addHTML();
$("#add_more").click(function(){
    n++;
    addHTML();
    if(n===pageCount){
        $("#add_more").hide();
    }
});