/**
 * Created by miss on 2018-02-01.
 */

$(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html")
    var ajax = $("#box");
    var start = 0;
    var num = 6;
    var b = 1;
    function get_data(start,num){
        $.get("js/listone.json",function(data){
            data = eval(data);
            //   data = JSON.parse(data);
            data = data["list"];
            console.log(data);
            var L = data.length;
            if ((start+num) > L){
                num = L - start;
                b = 0;
            }
            for(var i = start;i<(start+num);i++){
                var content = "";
                content = content + "<div class='content'>"+
                    "<div class='img_wrap'>" +
                    "<img src='"+data[i].coverImg+"'></div>"+
                    "<div class='cont_text'>" +
                    "<div class='title_small'>"+data[i].title+"</div>" +
                    "<div class='date'>"+data[i].creatAt+"</div>" +
                    "<p>"+data[i].describe+"</p></div>"+
                    "<img class='jian' src=''>"
                    +
                    "</div>";
                ajax.append(content);
            }
        });
        return start+num;
    }
    get_data(start,num);
    $(".list_more").click(function(){
        if(b == 0){
            $(".gomore").attr("src","img/list_gomore_bg_nomore.jpg");
        }else{
            start = get_data(start,num);
        }
    })
})
