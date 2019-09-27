function login() {
	$("#l_Submit").click(function(){
		var l_id = $("#l_id").val();
		var l_pw = $("#l_pw").val();
		
		var url = "http://localhost:3000/login.do";
		url += '?wtm_id=' + l_id;
		url += '&wtm_pw=' + l_pw;
		url += '&callback=?'; //callback=?는 jquery문법
		
		$.getJSON(url, function(json){
			if(Object.keys(json).length == 0) {
				// 회원정보가 없으면
				alert("회원정보가 없습니다!!");
				$("#l_id").val("");
				$("#l_pw").val("");
			} else {
				location.href = "#mainPage";
			}
		});
	});
}

function join() {
	// 아이디 중복검사
	$('#j_id').keyup(function(e){
		var j_id = $("#j_id").val();
		
		var url = "http://localhost:3000/join.check";
		url += '?wtm_id=' + j_id;
		url += '&callback=?'; //callback=?는 jquery문법
				
		$.getJSON(url, function(json){
			//alert(Object.keys(json).length);
			//alert(json._id.length);
			if(j_id == "") {
				$("#idCheck").text("[ID입력]").css("color", "black");
			} else if(Object.keys(json).length == 1) {
				// 아이디 중복
				$("#idCheck").text("[사용불가]").css("color", "red");
			} else {
				// 아이디 사용 가능
				$("#idCheck").text("[사용가능]").css("color", "green");
			}
		});
				
	});
	
	// 회원가입 하기
	$('#j_submit').click(function(){
		var j_id = $("#j_id").val();
		var j_pw = $("#j_pw").val();
		
		var url = "http://localhost:3000/join.do";
		url += '?wtm_id=' + j_id;
		url += '&wtm_pw=' + j_pw;
		url += '&callback=?'; //callback=?는 jquery문법
		
		$.getJSON(url, function(json){
			//alert(Object.keys(json).length);
			//alert(json._id.length);
		});
		
		$("#j_id").val("");
		$("#j_pw").val("");
		
		alert(j_id + "님 환영합니다!!");
		location.href = "#loginPage";
	});
}