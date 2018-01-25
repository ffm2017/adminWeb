// var browserVersion = window.navigator.userAgent.toUpperCase();
// var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
// var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
// var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
// var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
// var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
// var isIE9More = (! -[1, ] == false);
// function reinitIframe(iframeId, minHeight) {
//     try {
//         var iframe = document.getElementById(iframeId);
//         var bHeight = 0;
//         if (isChrome == false && isSafari == false)
//             bHeight = iframe.contentWindow.document.body.scrollHeight;
//         var dHeight = 0;
//         if (isFireFox == true)
//             dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
//         else if (isIE == false && isOpera == false)
//             dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
//         else if (isIE == true && isIE9More) {//ie9+
//             var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
//             if (heightDeviation == 0) {
//                 bHeight += 3;
//             } else if (heightDeviation != 3) {
//                 eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
//                 bHeight += 3;
//             }
//         }
//         else//ie[6-8]、OPERA
//             bHeight += 3;
//         var height = Math.max(bHeight, dHeight);
//         if (height < minHeight) height = minHeight;
//         iframe.style.height = height + "px";
//         console.log(height);
//     } catch (ex) { }
// }
// function startInit(iframeId, minHeight) {
//     eval("window.IE9MoreRealHeight" + iframeId + "=0");
//     window.setInterval("reinitIframe('" + iframeId + "'," + minHeight + ")",100);
// }
<!--框架高度自适应-->
<!--内容变化框架高度自适应-->
function iframeHeight(dom){
    var timer,
        height=0;
    timer=setInterval(function(){
        height=$(dom).contents().find("body").outerHeight();
        $(dom).css("height",height+"px");
    },100);
}
function keyEventFun(dom){
    var ifm=document.getElementById(dom);
    if(ifm.attachEvent){
        ifm.attachEvent("onreadystatechange",function(){
            if(ifm.readyState=="loaded" || ifm.readyState=="complete"){
                keyEvents();
                ifm.detachEvent("onreadystatechange",arguments.callee);
            }
        });
    }else{
        ifm.addEventListener("load",function(){
            keyEvents();
            this.removeEventListener("load",arguments.callee,false);
        },false);
    }
    function keyEvents(){
        var ifmBody=ifm.contentWindow.document.body||ifm.contentWindow.document.documentElement;
        ifmBody.addEventListener("keydown",function(event){
            var ifmbtnSubmit= $(this).find("[type='submit']");
            if(event.keyCode==13){
                ifmbtnSubmit.click();
            }
        });
    }

}
//新闻公告字体长度限制
function newsLimit(obj,num){
    var word,
        num=parseInt(num);
    $.each($(obj),function(){
        word=$.trim($(this).html());
        $(this).attr("title",word);
        if(word.length>=num){
            $(this).html(word.substring(0,num)+"...");
        }
    })
}
function ifmPage(a,ifm){
    $("body").on("click",a,function(event){
        if(event && event.preventDefault){
            event.preventDefault();
            event.stopPropagation();
        }else{
            window.event.returnValue=false;
        }
        if($(this).hasClass("mall")){
            var timer,
                width=0;
            timer=setInterval(function(){
                width=$(ifm).contents().find("body").outerWidth();
                $(ifm).css("min-width",width);
            },100);
        }
        var url=$(this).attr("href");
        $(ifm).attr("src",url);
    });
}
function siteEsc(obj){
    var esc=$(obj),
        r;
    esc.click(function(e){
        r=confirm("确定退出网站？");
        e=event||window.event;
        e.stopPropagation();
        if(r==false){
            if ( e && e.preventDefault )
                e.preventDefault();
            else
                window.event.returnValue = false;
        }
    });
}
function ifmOpenLeftBar(btn){
    $(btn).click(function(){
        parent.leftBarOn();
    });
}
function refreshPage(btn){
    $(btn).click(function(){
        window.location.reload();
    });
}
function btnToggleOnAndOff(btn){
    $.each($(btn),function(key,val){
        var str=$(val).find(".txt").attr("data-txt").split("|");
        if($(val).find(".ipt_hides").is(":checked")){
            $(val).addClass("on");
            $(val).find(".txt").html(str[0]);
        }else{
            $(val).removeClass("on");
            if($(val).find(".ipt_hides").prop("disabled")){
                $(val).find(".txt").html("禁止");
            }else{
                $(val).find(".txt").html(str[1]);
            }
        }
    });
    $(btn).find(".ipt_hides").click(function(){
        var txt=$(this).siblings(".txt");
        var x=txt.attr("data-txt").split("|");
        if($(this).is(":checked")){
            $(this).parents(btn).addClass("on active");
            txt.html(x[0]);
        }else{
            $(this).parents(btn).removeClass("on active");
            txt.html(x[1]);
        }
        tipDivShow("修改成功");
    });
}
function radioToggleOnAndOff(btn){
    $(btn).find(".ipt_hides").click(function(){
        var name=$(this).prop("name");
        $("input[name='"+name+"']").parents(btn).removeClass("on");
        if($(this).is(":checked")){
            $(this).parents(btn).addClass("on");
        }

        tipDivShow("修改成功");
    });
}
function AllcheckboxToggle(all,btn){
    var init={
        AllFuc:function(){
            var $box=$(all).parents(".ipt_box");
            $.each($box,function(key,val){
                var init_len=$(val).find(".ipt_hides").not(":disabled").length,
                    checked_len=$(val).find(".ipt_hides:checked").not(":disabled").length;
                if(init_len<=checked_len){
                    $(val).find(all).prop("checked",true);
                    $(val).find(all).parent().addClass("on");
                }else{
                    $(val).find(all).prop("checked",false);
                    $(val).find(all).parent().removeClass("on");
                }
                $(val).find(".ipt_hides:checked").parent().addClass("on");
                $(val).find(".ipt_hides:disabled").siblings(".btn").html("");
                // console.log("init_len:"+init_len+",checked_len:"+checked_len);
            });
        }
    };
    init.AllFuc();
    $(all).click(function(){
        var x=$(this).is(":checked"),
            ipt=$(this).parents(".ipt_box").find(btn).find(".ipt_hides").not(":disabled");
        $(this).parent().toggleClass("on");
        if(x){
            ipt.prop("checked",true);
            ipt.parents(btn).addClass("on");
        }else{
            ipt.prop("checked",false);
            ipt.parents(btn).removeClass("on");
        }
    });
    $(btn).click(function(){
        var ipt=$(this).find(".ipt_hides");
        init.AllFuc();
        if(ipt.is(":checked")){
            $(this).addClass("on");
        }else{
            $(this).removeClass("on");
        }
        tipDivShow("修改成功");
    });
}
function checkboxToggle(btn){
    $.each($(btn).find(".ipt_hides"),function(key,val){
        if($(val).is(":checked")){
            $(val).parent().addClass("on");
        }else{
            if($(val).is(":disabled")){
                $(val).siblings(".btn").html("");
            }
            $(val).parent().removeClass("on");
        }
    });
    $(btn).click(function(){
        var ipt=$(this).find(".ipt_hides");
        if(ipt.is(":checked")){
            $(this).addClass("on");
        }else{
            $(this).removeClass("on");
        }
        tipDivShow("修改成功");
    });
}
function tipDivShow(word){
    var dom=document.createElement("div"),
        box=document.createElement("div");
    box.style.cssText="position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;text-align:center;display:flex;align-items:center;justify-content:center;display:-webkit-flex;-webkit-align-items:center;-webkit-justify-content:center;";
    dom.style.cssText="margin:auto;padding:25px 70px;background-color:rgba(0,0,0,.6);color:#fff;font-size:16px;border-radius:8px;";
    dom.innerHTML=word;
    box.appendChild(dom);
    window.parent.document.getElementsByTagName("body")[0].appendChild(box);
    var timer=setTimeout(function(){
        box.style.display="none";
    },800);
}



function  btmShowInfo(obj){
    $(obj).on("mouseenter",function(){
        $(this).find(".show").removeClass("active");
        $(this).find(".hide_content").show();
    }).on("mouseleave",function(){
        $(this).find(".show").addClass("active");
        $(this).find(".hide_content").hide();
    });
}
function hideSomeModule(mdl){
    $(mdl).on("click",".close",function(){
        $(mdl).hide();
    });
}
function setCookie(cname,cvalue){
    // var d=new Date();
    // d.setTime(d.getTime()+(exdays*24*60*60*1000));
    // var expires="expires="+d.toGMTString();
    document.cookie=cname+"="+cvalue+";";
}
function getCookie(cname){
    var name=cname+"=";
    var ca=document.cookie.split(";");
    for(var i=0;i<ca.length;i++){
        var c=ca[i].trim();
        if(c.indexOf(name)==0){
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

