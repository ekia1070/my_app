
function fn_logout() {
    location.href = "/logout";
}

function fn_ajax() {
    $.ajax({
        url:'/ajaxText',
        type:'POST',
        data:{testVal:$("input[name=id]").val()},
        success:function(res) {
            alert(res.result);
        },
        error:function(result) {
            alert(result);
        }
    });
}