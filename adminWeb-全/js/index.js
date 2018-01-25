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
        $(dom).css("min-height",height+"px");
    },100);
}
// <!--键盘（提交）事件-->
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
// function keyEvents(){
//     document.body.addEventListener("keydown",function(event){
//         var  e=event||window.event;
//         if(e.keyCode==13){
//             document.querySelector(".submits").click();
//         }
//     });
// }

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
function ifmPage(obj1,obj2){
    $(obj1).on("click",function(event){
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
                width=$(obj2).contents().find("body").outerWidth();
                $(obj2).css("min-width",width);
            },100);
        }
        var url=$(this).attr("href");
        $(obj2).attr("src",url);
    });
}
ifmPage("[data-role='ifmpage']","#outDoc");
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
function hideSomeModule(mdl){
    $(mdl).on("click",".close",function(){
        $(mdl).hide();
    });
}
function setCookie(cname,cvalue,exdays){
    var d=new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires="expires="+d.toGMTString();
    document.cookie=cname+"="+cvalue+";"+expires;
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
function checkCookie_tc(id){
    var tc=getCookie("tc");
    if(tc!=""){
        $(id).hide();
    }else{
        $(id).show();
        setCookie("tc","1",7);
    }
}

