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

function join() {
	// ���̵� �ߺ��˻�
	$('#j_id').keyup(function(e){
		var j_id = $("#j_id").val();
		
		var url = "http://localhost:3000/join.check";
		url += '?wtm_id=' + j_id;
		url += '&callback=?'; //callback=?�� jquery����
				
		$.getJSON(url, function(json){
			//alert(Object.keys(json).length);
			//alert(json._id.length);
			if(j_id == "") {
				$("#idCheck").text("[ID�Է�]").css("color", "black");
			} else if(Object.keys(json).length == 1) {
				// ���̵� �ߺ�
				$("#idCheck").text("[���Ұ�]").css("color", "red");
			} else {
				// ���̵� ��� ����
				$("#idCheck").text("[��밡��]").css("color", "green");
			}
		});
				
	});
	
	// ȸ������ �ϱ�
	$('#j_submit').click(function(){
		var j_id = $("#j_id").val();
		var j_pw = $("#j_pw").val();
		
		var url = "http://localhost:3000/join.do";
		url += '?wtm_id=' + j_id;
		url += '&wtm_pw=' + j_pw;
		url += '&callback=?'; //callback=?�� jquery����
		
		$.getJSON(url, function(json){
			//alert(Object.keys(json).length);
			//alert(json._id.length);
		});
		
		$("#j_id").val("");
		$("#j_pw").val("");
		
		alert(j_id + "�� ȯ���մϴ�!!");
		location.href = "#loginPage";
	});
}