/**
 * Created by miss on 2018-01-31.
 */
$(function(){
    //轮播图
    var nowIndex=0;
    $(".p_cont>span").click(function(){
        nowIndex=$(this).index();
        banner(nowIndex)
    });
    $(".banner_wrap .next").click(function(){
        nowIndex++;
        if(nowIndex>$(".banner").length-1){
            nowIndex=0;
        }
        banner(nowIndex)
    });
    $(".banner_wrap .prev").click(function(){
        nowIndex--;
        if(nowIndex<0){
            nowIndex=$(".banner").length-1;
        }
        banner(nowIndex)
    });
    function banner(nowIndex){
        $(".banner:eq("+nowIndex+")").fadeIn(200)
            .siblings(".banner").fadeOut(200);
        $(".p_cont>span").eq(nowIndex).addClass("now").siblings().removeClass("now")
    }


    //主要产品
    var cont=$('#works .r_cont'),
        btn=$('.w_btn'),
        index= 0,
        prev=$('.w_line .prev'),
        next=$('.w_line .next'),
        len=cont.length;
    prev.click(function(){
        index--;
        if(index<0){
            index=len-1;
        }
        left()
    });
    next.click(function(){
        index++;
        if(index>len-2){
            index=0
        }
        right()
    });
    function left(){
        cont.removeClass('fadeInRight').addClass("animated fadeInLeft");
        com();
    }
    function right(){
        cont.removeClass('fadeInLeft').addClass("animated fadeInRight");
        com();
    }
    function com(){
        cont.fadeOut(0).eq(index).fadeIn(400);
        btn.removeClass('now').eq(index).addClass('now')
    }
    btn.click(function(){
        var i=$(this).index();
        if(i>index){
            right()
        }else if(i<index){
            left();
        }
        index=i;
        com()
    });

    //业务范围
    var oDiv=$('.ywcont');
    var aCenterimgs=oDiv.find(".yw_img");
    var aIcons=oDiv.find(".yw_icon");
    var aDitails=oDiv.find(".yw_ditail");
    var yIndex=0;
    aCenterimgs.hover(function(){
        $(this).addClass("animated tada")
    },function(){
        $(this).removeClass("animated tada")
    });
    aIcons.hover(function(){
        $(this).addClass("animated tada")
    },function(){
        $(this).removeClass("animated tada")
    });
    aIcons.click(function(){
        yIndex=aIcons.index($(this));
        doSlide();
    });
    aCenterimgs.click(function(){
        yIndex=aCenterimgs.index($(this));
        doSlide()
    });
    function doSlide(){
        if(aIcons.eq(yIndex).hasClass("zhankai")){
            aDitails.stop().slideUp(300);
            aIcons.removeClass("zhankai")
        }else{
            aDitails.stop().slideUp(300).eq(yIndex).slideDown(300);
            aIcons.removeClass("zhankai").eq(yIndex).addClass("zhankai")
        }
    }


    //团队介绍
    //团队介绍
    var tSpan=$('.team_wrap .p_cont span');
    var tPrev=$('.team_wrap .prev');
    var tNext=$('.team_wrap .next');
    var tMove=$('.team_move');
    var ww=$('.move_box').width();
    var leng=$('.move_box').length;
    var tIndex=0;
    var fa=true;
    var timer=null;
    var timer1=null;
    function mNext(){
        if(fa){
            fa=false;
            tIndex++;
            if(tIndex>leng-1){
                tIndex=1;
                tMove.css({left:0});
            }
            move();
        }
    }
    function move(){
        tMove.animate({left:-tIndex*ww},1000,"backIn",function(){
            fa=true;
        });
        if(tIndex>=leng-1){
            tSpan.removeClass('now').eq(0).addClass('now');
        }else{
            tSpan.removeClass('now').eq(tIndex).addClass('now');
        }
    }
    //点击下一张
    tNext.click(function(){
        clearInterval(timer);
        mNext();

    });
    //点击上一张
    tPrev.click(function(){
        clearInterval(timer);
        if(fa){
            fa=false;
            tIndex--;
            if(tIndex<0){
                tIndex=leng-2;
                tMove.css({left:-(leng-1)*ww});
            }
            move();
        }
    });

    tSpan.hover(function(){
        var that=this;
        clearTimeout(timer1);
        timer1=setTimeout(function(){
            tIndex=$(that).index();
            move();
        },200);
    });

    timer=setInterval(mNext,3000);
    $('.team_wrap').hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(mNext,3000);
    });

});
