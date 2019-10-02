function join() {
	// ���̵� �ߺ��˻�
	$('#j_id').keyup(function(e){
		var j_id = $("#j_id").val();

		$.ajax({
			url: "/member/join/check",
			data: {id: j_id}, 
			success: function(result){
				if(j_id == "") {
					$("#idCheck").text("[ID입력]").css("color", "black");
				} else if(result == "NO") {
					$("#idCheck").text("[ID중복]").css("color", "red");
				} else {
					$("#idCheck").text("[사용가능]").css("color", "green");
				}
			}
		});
	});
	
	// ȸ������ �ϱ�
	$('#j_submit').click(function(){
		var j_id = $("#j_id").val();
		var j_pw = $("#j_pw").val();
		
		$.ajax({
			url: "/member/join/do",
			data: {id: j_id, pw: j_pw}, 
			success: function(result){
				$("#j_id").val("");
				$("#j_pw").val("");

				if(result != "OK") {
					alert("회원가입 실패 ㅜㅠ");
				} else {
					alert(j_id + "님 회원가입 되셨어용!!");
					location.href = "#loginPage";
				}
				
			}
		});
	});
}

 /*************************************************************************** */
function login() {
	$("#l_Submit").click(function(){
		var l_id = $("#l_id").val();
		var l_pw = $("#l_pw").val();
		
		var url = "http://localhost:3000/login.do";
		url += '?wtm_id=' + l_id;
		url += '&wtm_pw=' + l_pw;
		url += '&callback=?'; //callback=?�� jquery����
		
		$.getJSON(url, function(json){
			if(Object.keys(json).length == 0) {
				// ȸ�������� ������
				alert("ȸ�������� �����ϴ�!!");
				$("#l_id").val("");
				$("#l_pw").val("");
			} else {
				location.href = "#mainPage";
			}
		});
	});
}