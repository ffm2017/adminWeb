function inputing(ipt){
    $(ipt).on("focus",function(){
        var txt=$(this).attr("placeholder");
        $(this).attr("placeholder"," ").siblings().html(txt);
    }).on("blur",function(){
        var txt=$(this).siblings().html();
        $(this).attr("placeholder",txt).siblings().html("");
    })
}
function keyEvents(){
    document.body.addEventListener("keydown",function(event){
        var  e=event||window.event;
        if(e.keyCode==13){
            document.querySelector(".submits").click();
        }
    });
}