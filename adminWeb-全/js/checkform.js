function getCheckCode(btn){
    $(btn).click(function(){
        var timer=null,
            i=60,speed=1000;
        that=$(this);
        timer=setInterval(function(){
            i--;
            that.val(i+"s(已发送)");
            if(i<=0){
                i=60;
                clearInterval(timer);
                that.val("获取验证码");
                that.removeAttr("disabled");
            }
        },speed);
        that.attr("disabled","disabled");
    });
}
/*以下是添加了ajax*/
function sureSubmitAjax(btn ,item,url){
    function ipt(ipt_name){
        var ipt=document.getElementsByName(ipt_name);
        return ipt;
    }
    function luhmCheck(bankno){
        if (bankno.length < 16 || bankno.length > 19) {
            alert("银行卡号长度必须在16到19之间");
            return false;
        }
        var num = /^\d*$/; //全数字
        if (!num.exec(bankno)) {
            alert("银行卡号必须全为数字");
            return false;
        }
//开头6位
        var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(bankno.substring(0, 2))== -1) {
            alert("银行卡号开头6位不符合规范");
            return false;
        }
        var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
        var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){ //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array(); //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9
        var arrOuShu=new Array(); //偶数位数组
        for(var j=0;j<newArr.length;j++){
            if((j+1)%2==1){//奇数位
                if(parseInt(newArr[j])*2<9)
                    arrJiShu.push(parseInt(newArr[j])*2);
                else
                    arrJiShu2.push(parseInt(newArr[j])*2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }
        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
            jishu_child1.push(parseInt(arrJiShu2[h])%10);
            jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }
        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
            sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }
        for(var n=0;n<arrOuShu.length;n++){
            sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }
        for(var p=0;p<jishu_child1.length;p++){
            sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
            sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }
//计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
//计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
        var luhm= 10-k;
        if(lastNum!=luhm){
            alert("请输入正确的银行卡号");
            return false;
        }else{
            return true;
        }
    };
    $(btn).click(function(event){
        var e=event || window.event;
        e.preventDefault();
        var x=true,
            card_reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 15/18位身份证验证
            // card_reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 15/18位身份证验证
            mobile_reg=/^1[3|4|5|7|8][0-9]{9}$/,  // 手机号码验证
            user_reg=/^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/;
        jsonary="{"; // 中午姓名（卡尔·马克思）验证
        $.each($(item),function(){
            var name=$(this).attr("name"),
                val=$(this).val(),
                hint=$(this).parents(".form_inputs").siblings("label");
            if(hint.hasClass("need") && val==""){
                alert(hint.html()+"不能为空");
                x=false;
                return x;
            }else{
                if(name=="cardno" && card_reg.test(val)==false){
                    alert("请输入正确的身份证号码！");
                    x=false;
                    return x;
                }
                if(name=="mobile_phone" && mobile_reg.test(val)==false){
                    alert("请输入正确的手机号码！");
                    x=false;
                    return x;
                }
                if(name=="bank_user" &&  user_reg.test(val)==false){
                    alert("请输入正确的开户人姓名!");
                    x=false;
                    return x;
                }
                if(name=="bank_code"){
                    if(!luhmCheck(val)){
                        x=false;
                        return x;
                    }
                }
            }
            if(ipt("new_pwd")[0] && ipt("new_pwd")[1] && ipt("new_pwd")[0].value!="" && ipt("new_pwd")[1].value!="" && ipt("new_pwd")[0].value!=ipt("new_pwd")[1].value){
                alert("两次登录密码不一致！");
                x=false;
                return x;
            }
            if(ipt("save_pwd")[0] && ipt("save_pwd")[1] && ipt("save_pwd")[0].value!="" && ipt("save_pwd")[1].value!="" && ipt("save_pwd")[0].value!=ipt("save_pwd")[1].value){
                alert("两次安全密码不一致！");
                x=false;
                return x;
            }
            if(typeof(name)!="undefined" && val!=" "){
                jsonary+='"'+name.trim()+'":"'+val.trim()+'",'
            }
        });
        jsonary=jsonary.substring(0,jsonary.length-1);
        jsonary+="}";
        // console.log(jsonary);
        var jsonObj=JSON.parse(jsonary);
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
                $.ajax({
                    url:url,
                    data:jsonObj,
                    type:"post",
                    dataType:"json",
                    success:function(data){

                    }
                })
            }
        }
    });
}
// function sureSubmitAjax(obj1 ,obj2,url){
//     function ipt(ipt_name){
//         var ipt=document.getElementsByName(ipt_name);
//         return ipt;
//     }
//     function luhmCheck(bankno){
//         if (bankno.length < 16 || bankno.length > 19) {
//             alert("银行卡号长度必须在16到19之间");
//             return false;
//         }
//         var num = /^\d*$/; //全数字
//         if (!num.exec(bankno)) {
//             alert("银行卡号必须全为数字");
//             return false;
//         }
// //开头6位
//         var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
//         if (strBin.indexOf(bankno.substring(0, 2))== -1) {
//             alert("银行卡号开头6位不符合规范");
//             return false;
//         }
//         var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
//         var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
//         var newArr=new Array();
//         for(var i=first15Num.length-1;i>-1;i--){ //前15或18位倒序存进数组
//             newArr.push(first15Num.substr(i,1));
//         }
//         var arrJiShu=new Array(); //奇数位*2的积 <9
//         var arrJiShu2=new Array(); //奇数位*2的积 >9
//         var arrOuShu=new Array(); //偶数位数组
//         for(var j=0;j<newArr.length;j++){
//             if((j+1)%2==1){//奇数位
//                 if(parseInt(newArr[j])*2<9)
//                     arrJiShu.push(parseInt(newArr[j])*2);
//                 else
//                     arrJiShu2.push(parseInt(newArr[j])*2);
//             }
//             else //偶数位
//                 arrOuShu.push(newArr[j]);
//         }
//         var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
//         var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
//         for(var h=0;h<arrJiShu2.length;h++){
//             jishu_child1.push(parseInt(arrJiShu2[h])%10);
//             jishu_child2.push(parseInt(arrJiShu2[h])/10);
//         }
//         var sumJiShu=0; //奇数位*2 < 9 的数组之和
//         var sumOuShu=0; //偶数位数组之和
//         var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
//         var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
//         var sumTotal=0;
//         for(var m=0;m<arrJiShu.length;m++){
//             sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
//         }
//         for(var n=0;n<arrOuShu.length;n++){
//             sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
//         }
//         for(var p=0;p<jishu_child1.length;p++){
//             sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
//             sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
//         }
// //计算总和
//         sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
// //计算Luhm值
//         var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
//         var luhm= 10-k;
//         if(lastNum!=luhm){
//             alert("请输入正确的银行卡号");
//             return false;
//         }else{
//             return true;
//         }
//     };
//     $(obj1).click(function(){
//         var x=true,
//             card_reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 15/18位身份证验证
//             mobile_reg=/^1[3|4|5|7|8][0-9]{9}$/,  // 手机号码验证
//             user_reg=/^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/;
//         jsonary="{"; // 中午姓名（卡尔·马克思）验证
//         $(obj2).each(function(){
//             var name=$(this).find(".write").attr("name"),
//                 val=$(this).find(".write").val(),
//                 hint=$(this).find("label").html();
//             if($(this).find("label").hasClass("need") && val==""){
//                 alert(hint+"不能为空");
//                 x=false;
//                 return x;
//             }else{
//                 if($(this).find(ipt("cardno")[0]).length>0 && card_reg.test(ipt("cardno")[0].value)==false){
//                     alert("请输入正确的身份证号码！");
//                     x=false;
//                     return x;
//                 }
//                 if($(this).find(ipt("mobile_phone")[0]).length>0 && mobile_reg.test(ipt("mobile_phone")[0].value)==false){
//                     alert("请输入正确的手机号码！");
//                     x=false;
//                     return x;
//                 }
//                 if($(this).find(ipt("bank_user")[0]).length>0 &&  user_reg.test(ipt("bank_user")[0].value)==false){
//                     alert("请输入正确的开户人姓名!");
//                     x=false;
//                     return x;
//                 }
//                 if($(this).find(ipt("bank_code")[0]).length>0){
//                     if(!luhmCheck(ipt("bank_code")[0].value)){
//                         x=false;
//                         return x;
//                     }
//                 }
//             }
//             if(ipt("new_pwd")[0] && ipt("new_pwd")[1] && ipt("new_pwd")[0].value!="" && ipt("new_pwd")[1].value!="" && ipt("new_pwd")[0].value!=ipt("new_pwd")[1].value){
//                 alert("两次登录密码不一致！");
//                 x=false;
//                 return x;
//             }
//             if(ipt("save_pwd")[0] && ipt("save_pwd")[1] && ipt("save_pwd")[0].value!="" && ipt("save_pwd")[1].value!="" && ipt("save_pwd")[0].value!=ipt("save_pwd")[1].value){
//                 alert("两次安全密码不一致！");
//                 x=false;
//                 return x;
//             }
//             if(typeof(name)!="undefined"&& val!=""){
//                 jsonary+='"'+name.trim()+'":"'+val.trim()+'",'
//             }
//
//         });
//         jsonary=jsonary.substring(0,jsonary.length-1);
//         jsonary+="}";
//         var jsonObj=JSON.parse(jsonary);
//         console.log(jsonObj);
//
//         if(x){
//             r=confirm("确定提交吗？");
//             e=event||window.event;
//             e.stopPropagation();
//             if(r==false){
//                 if ( e && e.preventDefault )
//                     e.preventDefault();
//                 else
//                     window.event.returnValue = false;
//             }else{
//                 $(obj1).html("正在提交中...").addClass("active");
//                 $(obj1).attr("disabled","disabled");
//                 $.ajax({
//                     url:url,
//                     data:jsonObj,
//                     type:"post",
//                     dataType:"json",
//                     success:function(data){
//
//                     }
//                 })
//             }
//         }
//     });
// }

/*以下是只提示不为空*/
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
