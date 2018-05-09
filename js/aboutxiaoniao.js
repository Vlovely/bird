
var GLOBLE = GLOBLE || {};//命名空间
$(function(){
	
	$(".wrap_block, .main_wrap, .gaishu_block").css("height", ($(window).height()-50)+"px");//每屏高度-导航栏高度
	$(".gaishu_block").width($(window).width());
	
	$(window).resize(function(){
		$(".wrap_block, .main_wrap, .gaishu_block").css("height", ($(window).height()-50)+"px");
		$(".gaishu_block").width($(window).width());
		if(mainSlideIndex){
			if(GLOBLE.resizeTimer){
				clearInterval(GLOBLE.resizeTimer);
			}
			GLOBLE.resizeTimer = setTimeout(function(){
				mainSlideGoing = true;
				mainSlideGo();
				gaishuMove();
			},200)
		}

	});
	
	doWelcomeAnimate();
	
	function doWelcomeAnimate(){
		
		GLOBLE.welcomeAnimateTimer = setTimeout(function(){
			$(".welcome_content").animate({"top":"40%"},600)
			$(".welcome_content .welcome_animate").each(function(index, element) {
				var $this = $(this);
				setTimeout(function(){
					$this.show().addClass("animated  fadeInUp");
				},200*(index+1))
            });
			
			setTimeout(function(){
				$(".welcome_wrap").slideUp(600,"easeOutStrong",function(){
					GLOBLE.welcomeOver = true;
				});
			},2500);
		},4000);
		
	}
	var welcomeDBclick = false;
	$(".welcome_content").click(function(){
		if(welcomeDBclick){
			$(".welcome_wrap").slideUp(600,"easeOutStrong",function(){
				GLOBLE.welcomeOver = true;
			});
		}else{
			welcomeDBclick = true;
		}
		
	});
	var mainSlideIndex = 0;
	var mainSlideGoing = false;
	var mainSlideDelay = 0;
	var mainSlideTimer =  null;
	var scrollFunc = function (e) {  
        e = e || window.event;  
        if (e.wheelDelta) {
            if (e.wheelDelta > 0) {
				mainSlideUp();
            }  
            if (e.wheelDelta < 0) {
				!!GLOBLE.welcomeOver?mainSlideDown():'';
				
            }  
        } else if (e.detail) {
            if (e.detail> 0) {
				!!GLOBLE.welcomeOver?mainSlideDown():'';
				
            }  
            if (e.detail< 0) {
				mainSlideUp();
            }  
        }  
    }  ;
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);  
    }  
    window.onmousewheel = document.onmousewheel = scrollFunc;
	
	function mainSlideDown(){
		if(mainSlideDelay < 1){
			clearInterval(mainSlideTimer);
			mainSlideTimer = setTimeout(function(){
				mainSlideDelay++;
			},100)
			
		}else if(!mainSlideGoing){
			mainSlideGoing = true;
			mainSlideIndex++;
			if(mainSlideIndex> $(".wrap_block").length-2){
				mainSlideIndex = $(".wrap_block").length-2;
			}
			mainSlideGo();
			
		}
	}
	
	function mainSlideUp(){
		if(mainSlideDelay < 1){
			clearInterval(mainSlideTimer);
			mainSlideTimer = setTimeout(function(){
				mainSlideDelay++;
			},100)
			
		}else if(!mainSlideGoing){
			mainSlideGoing = true;
			mainSlideIndex--;
			if(mainSlideIndex<0){
				mainSlideIndex=0;
			}
			mainSlideGo();
		}
	}
	
	function mainSlideGo(){
		$(".main_slide").animate({"top":"-"+ $(".wrap_block").height()*mainSlideIndex +"px"},600,"easeBothStrong",function(){
			mainSlideGoing = false;
			mainSlideDelay = 0;
			if(mainSlideIndex == 0){
				
			}else if(mainSlideIndex == 4){
				$(".nav_piece").removeClass("now").eq(mainSlideIndex-1).addClass("now");
				$(".nav_piece").eq(mainSlideIndex).addClass("now");
			}else{
				$(".nav_piece").removeClass("now").eq(mainSlideIndex-1).addClass("now");
			}
		});
	}
	
	
	$(".nav_piece h1").click(function(){
        var navIndex = $(this).parent().index(".nav_piece");
		if(navIndex == 4){
			navIndex = 3;
		};
		if(navIndex != 5){
			mainSlideIndex = navIndex+1;
			mainSlideGo();
		}
		
    });
	
	$(".welcome2_content .donext").click(function(){
		mainSlideIndex = 1;
		mainSlideGo();
	});
	
var mainHash = window.location.hash.substring(1);

if(mainHash){
	if(mainHash == 0 || mainHash == 1 || mainHash == 2 || mainHash == 3|| mainHash == 4){
		$(".welcome_wrap").slideUp(0,function(){
			GLOBLE.welcomeOver = true;
		});
		mainSlideIndex = mainHash;
		mainSlideGo();
		gaishuMove();
		window.location.hash = "";
	}
}
	
	$(".gaishu_goright").mouseenter(function(){
		$(this).removeClass("nohover");
	})
	
	var gaishuIndex = 0;
	$(".gaishu_goleft").css("opacity",0.3);
	
	$(".gaishu_goright").click(function(){
		gaishuIndex++;
		if(gaishuIndex > 2){
			gaishuIndex = 2;
			$(".gaishu_goright").css("opacity",0.3);
		}else{
			gaishuMove();
		}
	});
	$(".gaishu_goleft").click(function(){
		gaishuIndex--;
		if(gaishuIndex < 0){
			gaishuIndex = 0;
			$(".gaishu_goleft").css("opacity",0.3);
		}else{
			gaishuMove();
		}
	});
	
	function gaishuMove(){
		$(".gaishu_goleft, .gaishu_goright").css("opacity",0.3);
		$(".gaishu_slider").animate({"left":"-"+ $(".gaishu_block").width()*gaishuIndex +"px"},600,function(){
			$(".gaishu_goleft, .gaishu_goright").css("opacity",1);
		});
	}
	
	setInterval(function(){
		$(".jiazhi_shineimg").fadeIn(1200,function(){
			$(".jiazhi_shineimg").delay(100).fadeOut(400);
		})
	},1900);
	
	$(".yunmove_btn_right").click(function(){
		$This = $(this);
		$(".yunmove_btn.now").animate({"left":"78px"},100,function(){
			$(".yunmove_btn.now").removeClass("now");
			$This.find(".yunmove_btn").animate({"left":"0px"},400).addClass("now");
		});
		
		$(".yun_slider").animate({"left":"-910px"},600)
	});
	
	$(".yunmove_btn_left").click(function(){
		$This = $(this);
		$(".yunmove_btn.now").animate({"left":"-78px"},100,function(){
			$(".yunmove_btn.now").removeClass("now");
			$This.find(".yunmove_btn").animate({"left":"0px"},400).addClass("now");
		});
		
		
		$(".yun_slider").animate({"left":"0px"},600)
	})
	
	
});

