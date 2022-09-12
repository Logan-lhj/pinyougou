$(function () {
    var currentHover = 0
    //节流阈
    var flag = true;
    var toolTop = $(".recom_hd").offset().top
    function toogel() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    function getCurrent() { 
        var li = document.querySelectorAll(".fixedtool li");
        for (let index = 0; index < li.length; index++) {
            if (li[index].classList.contains("current")) { 
                currentHover = index
            }
        }
    }
    function getCurrentli() {
        if (flag) { 
            $(".floor .w").each(function (index, element) {
                if ($(document).scrollTop()>=$(element).offset().top-1) { 
                    $(".fixedtool li").eq(index).addClass("current").siblings().removeClass("current");
                    if ($(".fixedtool li").hasClass("current")) {
                        currentHover = $(this).index()
                    }
                }
                
            });
        }
    }
    toogel()
    getCurrentli()
   

    $(".fixedtool li").hover(function () {
        getCurrent()
        $(this).addClass("current").siblings().removeClass("current");
    }, function () {
        $(this).removeClass("current")
        $(".fixedtool li").eq(currentHover).addClass("current");
    });
    $(window).scroll(function () { 
        toogel();
        getCurrentli()
        
    });
    var dianqiTop = $(".floor").eq(0).offset().top;
    var height = $(".floor").eq(1).offset().top - dianqiTop
    $(".fixedtool li").each(function (index, element) {
        if ($(this).hasClass("current")) {
            currentHover = index
        }
        var current = index * height + dianqiTop
        $(element).click(function () {
            flag = false
            
            // console.log(11);
            $(this).addClass("current").siblings().removeClass("current");
            $("body,html").stop().animate({
                scrollTop: current
            }, () => flag = true)
            currentHover = $(this).index()
        });
    });


})