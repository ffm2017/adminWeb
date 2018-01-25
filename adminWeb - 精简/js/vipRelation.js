// 树图
function treeLine(obj){
    var obj_len=$(obj).length;
    for(var i=0;i<obj_len;i++) {
        var obj1=$(obj).eq(i).children(".out:first"),  /*获取节最左边节点*/
            obj2=$(obj).eq(i).children(".out:last"),  /*获取节最右边节点*/
            left_x=obj1.offset().left,                   /*计算节最左边节点到文档的距离*/
            left_w=obj1.width()/2,                       /*计算节最左边节点宽度一半*/
            right_x=obj2.offset().left,                  /*计算节最右边节点到文档的距离*/
            right_w=obj2.width()/2,                       /*计算节最右边节点宽度一半*/
            line_w= (right_x+right_w)-(left_x+left_w);   /*计算节最左边到最右边的距离*/
        $(obj).eq(i).children(".line").css({"width":line_w,"left":left_w});     /*设置横向辅助线的宽度*/
    }
}
function treeNodeColor(obj1,obj2){

    r":mbg});
        }
        if(mcolor){
            $(this).css({"color":mcolor});
        }
        if(mborder){
            $(this).css({"border":mborder});
        }
        if(scdbg){
            $(this).find(obj2).css({"background-color":scdbg});
        }
        if(scdcolor){
            $(this).find(obj2).css({"color":scdcolor});
        }
    })

}
// 推荐图