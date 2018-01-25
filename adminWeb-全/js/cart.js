// function changeNum(obj){
//     var $num=$(obj).find(".num"),
//         num=parseInt($num.val());
//     $(obj).on("click",".add",function(){
//         num++;
//         getNum();
//     }).on("click",".delete",function(){
//         if(num==0){
//             num==0;
//         }else{
//             num--;
//         }
//         getNum();
//     });
//     function getNum(){
//         $num.val(num);
//     }
//
// }

function changeNum(obj){
    $(obj).on("click",".add",function(){
        var $num=$(this).siblings(".num"),
            a=parseInt($num.val());
        a++;
        $num.val(a);
    }).on("click",".delete",function(){
        var $num=$(this).siblings(".num"),
            a=parseInt($num.val());
        if(a==0){
            a=0;
        }else{
            a--;
        }
        $num.val(a);
    });
}