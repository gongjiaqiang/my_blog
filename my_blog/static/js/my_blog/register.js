/**
 * Created by python on 18-11-29.
 */
function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

function generateUUID() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// // 生成一个图片验证码的编号，并设置页面中图片验证码img标签的src属性
// function generateImageCode() {
//     // 生成一个编号
//     // 使用uuid保证编号唯一
//     imageCodeId = generateUUID();
//
//     // 设置页面中图片验证码img标签的src属性
//     var imageCodeUrl = "/api/v1.0/imagecode/" + imageCodeId;
//     $(".image-code>img").attr("src", imageCodeUrl);
// }

//
// function sendSMSCode() {
//     // 校验参数，保证输入框有数据填写
//     $(".phonecode-a").removeAttr("onclick");
//     var mobile = $("#mobile").val();
//     if (!mobile) {
//         $("#mobile-err span").html("请填写正确的手机号！");
//         $("#mobile-err").show();
//         $(".phonecode-a").attr("onclick", "sendSMSCode();");
//         return;
//     }
//     var imageCode = $("#imagecode").val();
//     if (!imageCode) {
//         $("#image-code-err span").html("请填写验证码！");
//         $("#image-code-err").show();
//         $(".phonecode-a").attr("onclick", "sendSMSCode();");
//         return;
//     }
//
//     // 通过ajax方式向后端接口发送请求，让后端发送短信验证码
//     var req = {
//         text: imageCode, // 用户填写的图片验证码
//         id: imageCodeId // 图片验证码的编号
//     }
//     // $.get(url,data,function(data,status))
//     // $.post(url,data,type,function(data))
//     // $.ajax()可以实现更精确的控制,dataType返回的数据格式,contentType:发送后端的数据格式,headers:{csrf}
//     $.get("/api/v1.0/smscode/"+mobile, req, function (resp) {
//         // 表示后端发送短信成功
//         if (resp.errno == "0") {
//             // 倒计时60秒，60秒后允许用户再次点击发送短信验证码的按钮
//             var num = 60;
//             // 设置一个计时器
//             var t = setInterval(function () {
//                 if (num == 1) {
//                     // 如果计时器到最后, 清除计时器对象
//                     clearInterval(t);
//                     // 将点击获取验证码的按钮展示的文本回复成原始文本
//                     $(".phonecode-a").html("获取验证码");
//                     // 将点击按钮的onclick事件函数恢复回去
//                     $(".phonecode-a").attr("onclick", "sendSMSCode();");
//                 } else {
//                     num -= 1;
//                     // 展示倒计时信息
//                     $(".phonecode-a").html(num+"秒");
//                 }
//             }, 1000, 60)
//         } else {
//             // 表示后端出现了错误，可以将错误信息展示到前端页面中
//             $("#phone-code-err span").html(resp.errmsg);
//             $("#phone-code-err").show();
//             // 将点击按钮的onclick事件函数恢复回去
//             $(".phonecode-a").attr("onclick", "sendSMSCode();");
//         }
//
//     }, "json");
//
// }

$(document).ready(function() {
    // generateImageCode();  // 生成一个图片验证码的编号，并设置页面中图片验证码img标签的src属性
    // $("#mobile").focus(function(){
    //     $("#mobile-err").hide();
    // });
    // $("#imagecode").focus(function(){
    //     $("#image-code-err").hide();
    // });
    // $("#phonecode").focus(function(){
    //     $("#phone-code-err").hide();
    // });
    // $("#password").focus(function(){
    //     $("#password-err").hide();
    //     $("#password2-err").hide();
    // });
    // $("#password2").focus(function(){
    //     $("#password2-err").hide();
    // });
    $(".signup_form_form").submit(function(e){
        // 阻止浏览器对于表单的默认行为，即阻止浏览器把表单的数据转换为表单格式kye=val&key=val的字符串发送到后端
        e.preventDefault();
        var mobile = $("#signup_email").val();
        var phoneCode = $("#signup_username").val();
        var passwd = $("#signup_password").val();
        var passwd2 = $("#signup_confirm_password").val();
        if (!mobile) {
            // $("#mobile-err span").html("请填写正确的手机号！");
            // $("#mobile-err").show();
            console.log("请填写邮箱!")
            return;
        }
        if (!phoneCode) {
            console.log("请填写用户名!")
            return;
        }
        if (!passwd) {
            console.log("请填写密码!")
            return;
        }
        if (passwd != passwd2) {
            console.log("请填写密码!")
            return;
        }

        // 构造发送到后端的数据
        var req = {
            "mobile": mobile,
            "password": passwd
        };

        // 向后端发送注册请求,$.ajax在需要指定headers的情况下使用。
        $.ajax({
            url: "register",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(req),
            headers: {
                "X-CSRFToken": getCookie("csrf_token") // 后端开启了csrf防护，所以前端发送json数据的时候，需要包含这个请求头
            },
            dataType: "json",
            success: function(resp){
                if (resp.errno == "0") {
                    // 表示注册成功,跳转到主页
                    location.href = "/login.html";
                } else if (resp.errno == "4101") {
                    // 表示用户注册成功，但是用户的登录状态后端未保存，所以跳转到登录页面
                    location.href = "/login.html";
                } else {
                    // 在页面中展示错误信息

                }
            }
        });
    });
})