/**
 * Created by python on 18-11-29.
 */
function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}
// 三元运算符:if a?1:2

$(document).ready(function() {
    $(".signup_forms_container").submit(function(e){
        // 阻止浏览器对于表单的默认提交行为
        // 事件冒泡
        e.preventDefault();
        var mobile = $("#signup_email").val();
        var passwd = $("#signup_password").val();
        if (!mobile) {
            console.log("请输入用户名！");
            return;
        }
        if (!passwd) {
            console.log("请输入密码！");
            return;
        }
        // 将表单的数据存放到对象data中
        // var data = {};
        // $(this).serializeArray().map(function(x){data[x.name] = x.value;});
        // // 将data转为json字符串
        // var jsonData = JSON.stringify(data);
        $.ajax({
            url:"login",
            type:"post",
            data: JSON.stringify({"name":mobile,"age":passwd}),//JSON.stringify(data);JSON.parse()
            contentType: "application/json",
            dataType: "json",
            headers:{
                "X-CSRFTOKEN":getCookie("csrf_token")
            },
            success: function (data) {
                if ("0" == data.errno) {
                    location.href = "/";
                    return;
                }
                else {
                    // 其他错误信息，在页面中展示
                    console.log("用户名或密码不正确");
                    return
                }
            }
        });
    });
})