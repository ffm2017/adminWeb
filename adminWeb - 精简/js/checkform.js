function sureSubmitSimple(btn ,item){
    $(btn).click(function(event){
        var e=event || window.event;
        e.preventDefault();
        var x=true;
        jsonary="{"; // 中午姓名（卡尔·马克思）验证
        $.each($(item),function(){
            var name=$(this).attr("name"),
                val=$(this).val(),
                hint=$(this).parents(".form_inputs").siblings("label");
            if(hint.hasClass("need") && val==""){
                alert(hint.html()+"不能为空");
                x=false;
                return x;
            }
        });
        if(x){
            r=confirm("确定提交吗？");
            e=event||window.event;
            e.stopPropagation();
            if(r==false){
                if ( e && e.preventDefault )
                    e.preventDefault();
                else
                    window.event.returnValue = false;
            }else{
                $(btn).html("正在提交中...").addClass("active");
                $(btn).attr("disabled","disabled");
            }
        }
    });
}
