$(function(){
		
    $("#loginIdInput").focus(function(){
        $("#loginIdInput").css("border", "1px solid #9E9E9E");
    });
    $("#loginIdInput").focusout(function(){
        $("#loginIdInput").css("border", "1px solid #E0E0E0");
    });
    
    $("#loginPwInput").focus(function(){
        $("#loginPwInput").css("border", "1px solid #9E9E9E");
    });
    $("#loginPwInput").focusout(function(){
        $("#loginPwInput").css("border", "1px solid #E0E0E0");
    });
    
    /*로그인 border*/
    $("#loginTb").focusin(function(){
         $(this).css("border", "3px solid #795548");
    });
    $("#loginTb").focusout(function(){
        $(this).css("border", "1px solid #E0E0E0");
    });
    
    /* 로그인 정보 체크 관련 */
    
    // 비밀번호를 입력하면 아이디와 비밀번호정보를 db와 비교
    /*
    $("#loginPwInput").keyup(function(){
        var id = $("#loginIdInput").val();
        var pw = $("#loginPwInput").val()
        
        $.ajax({
            url : "member.info.check",
            data : {
                wm_id : id,
                wm_pw : pw
            },
            success : function(xml) {
                var ok = $(xml).find("member").length;
                
                if (ok == 0) {
                    $("#loginForm").attr("onsubmit", "return false;");
                } else if(ok > 0) {
                    $("#loginForm").attr("onsubmit", "return loginCheck();");
                }
            }
        });				
        
    });
    // 회원정보와 불일치시 처리
    $("#loginBtnInput").click(function(){
        var checkInfo = $("#loginForm").attr("onsubmit");
        
        if (checkInfo == "return false;") {
            alert("일치하는 회원 정보가 없습니다!!");
            $("#loginIdInput").val("");
            $("#loginPwInput").val("");
            $("#loginIdInput").focus();	
        }
    });
    */
});