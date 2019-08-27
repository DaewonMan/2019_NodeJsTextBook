function waiterAccept(me, you) {
	//alert(me);
	// 팔로우하기
	$.ajax({
		url: "insert.follower",
		type:"post",
		data: {wf_id: me, wf_follower: you},
		success: function(result){
			if(result == "OK") {
				followerCnt(me); // 팔로워 수 업뎃
			}
		}
	});
	// waiter 목록 지우기
	$.ajax({
		url: "delete.waiter",
		type:"post",
		data: {wfw_id: me, wfw_follower: you},
		success: function(result){
			if(result == "OK") {
				$("#waiterTb_"+you).remove(); // 승인 취소한 waiter 삭제
			}
		}
	});
}

function waiterAcceptCancel(me, you) {
	//alert(me);
	// waiter 목록 지우기
	$.ajax({
		url: "delete.waiter",
		type:"post",
		data: {wfw_id: me, wfw_follower: you},
		success: function(result){
			if(result == "OK") {
				$("#waiterTb_"+you).remove(); // 승인 취소한 waiter 삭제
			}
		}
	});
}

function waitersForFollow(me) {
	// follower 조회
	$("#alarmWaiter").click(function() {
		$.ajax({
			url: "count.waitforme",
			data: {wfw_id: me},
			success: function(xml){
				var cnt = $(xml).find("waiter").length;
				
				$('#searchWaiterDiv').remove();
				$('#waiterDiv').remove();
				$('#closeDiv').remove();
				
				var displayDiv = $('<div></div>');
				var waiterDiv = $('<div></div>');
				var closeDiv = $('<div></div>').attr("id","closeDiv");
	
				if (cnt >= 1) {
					displayDiv.attr("id","searchWaiterDiv");
					waiterDiv.attr("id","waiterDiv");
					
					var idSpan;
					var nameSpan;
					var imgSpan;
					var okBnt;
					var delBnt;
					
					$(xml).find("waiter").each(function(i, e){
						var followerId = $(e).find('wfw_follower').text();
						var followerImg = "";
						var followerName = "";
						
						// id로 회원정보를 가져오는 아작스
						$.ajax({
							url : "member.id.check",
							data : {
								wm_id : followerId
							},
							success : function(xml2) {
								var fm = $(xml2).find('member');
								followerImg = fm.find('wm_img').text();
								followerName = fm.find('wm_name').text();									
									
								//var aTag = $('<a></a>').attr('class', 'dvsATag');
								
								//aTag.attr('href','follow.wave?wm_id='+followerId);
								
								var waiterTb = $('<table></table>').attr("class", "waiterTb").attr("id", "waiterTb_"+followerId);
								
								waiterTb.css("border-bottom", "1px #E0E0E0 solid");
					
								var tr = $('<tr></tr>');
								var td1 = $('<td></td>').css('width', '45px');
								var td2 = $('<td></td>');
								var td3 = $('<td></td>').attr('align', 'right');
									
								idImg = $('<img></img>').attr('class', 'searchIdImg').attr('src', 'resources/img/' + followerImg);
								td1.append(idImg);
									
								idSpan = $('<span></span>').attr("class", "searchIdSpan").text(followerId);
								nameSpan = $('<span></span>').attr("class", "searchIdNameSpan").text(followerName);
								td2.append(idSpan, '<br>', nameSpan);
								
								okBnt = $('<button></button>').attr("class", "followOkBnt").attr("onclick", "waiterAccept(\'" + me + "\',\'" + followerId + "\');").text("확인");
								delBnt = $('<button></button>').attr("class", "followDelBnt").attr("onclick", "waiterAcceptCancel(\'" + me + "\',\'" + followerId + "\');").text("취소");
								td3.append(okBnt, delBnt);
								
								tr.append(td1, td2, td3);
								waiterTb.append(tr);
								//aTag.append(waiterTb)
									
								waiterDiv.append(waiterTb);
							}
						});
							
						displayDiv.append(waiterDiv)
					});
					
				} else {
					displayDiv.attr("id","searchWaiterDiv");
					
					var noIdDiv = $("<div></div>").attr('class','noWaiterDiv').text("아무도 없습니다.");
					
					displayDiv.append(noIdDiv);
				}
				closeDiv.text('x');
				displayDiv.append(closeDiv);
				
				$('#loBd').append(displayDiv);
				
				// 닫기 버튼 누를 시
				$('#closeDiv').click(function(){
					//$('#closeDiv').remove();
					//$('#followDiv').remove();
					$('#searchWaiterDiv').hide();
					countWaitForMe(me); // 팔로우 신청한 사람 있을때 나타나는 임티 존재 여부
				});
			}
		});
		
	});
}

function countWaitForMe(me) {
	$.ajax({
		url: "count.waitforme",
		data: {wfw_id: me},
		success: function(xml){
			var cnt = $(xml).find("waiter").length;
			
			if(cnt > 0) {
				$("#alarmWaiter").css("visibility", "visible");
				
				$("#alarmCnt").text(cnt);
				
				var mok = 0;
				for(var i =10;i<=cnt;i*=10) {
					mok++;
				}
				
				$('#alarmImg').css('width', 80+(5*mok)+"px");
			} else {
				$("#alarmWaiter").css("visibility", "hidden");
			} 
		}
	});
}


function followerCnt(yId){
	$.ajax({
		url: "follower.cnt",
		data: {wf_id: yId},
		success: function(xml){
			var cnt = $(xml).find("follow").length;
			$('#followerCntSpan').text(cnt);
		}
	});
}

function followCnt(yId){
	$.ajax({
		url: "follow.cnt",
		data: {wf_follower: yId},
		success: function(xml){
			var cnt = $(xml).find("follow").length;
			$('#followCntSpan').text(cnt);
		}
	});
}

function followDo(id, me) {
var ok = confirm(id +"님을 팔로우 합니까?");
	
	if(ok) {
		$.ajax({
			url: "insert.follower",
			type:"post",
			data: {wf_id: id, wf_follower: me},
			success: function(result){
				if(result == "OK") {
					alert(id + "님을 팔로우 했습니다!!!");
					$("#followBnt").attr("id", "").attr("id", "followingBnt").text("팔로잉");
					$("#followingBnt").text("팔로잉");
					followerCnt(id); // 팔로워 수 업뎃
				}
			}
		});
	}
}

function unfollowDo(id, me) {
	var ok = confirm(id +"님을 언팔로우 합니까?");
	
	if(ok) {
		//href.location = "insert.follower";
		$.ajax({
			url: "delete.follower",
			type:"post",
			data: {wf_id: id, wf_follower: me},
			success: function(result){
				if(result == "OK") {
					alert(id + "님을 언팔로우 했습니다!!!");
					$("#followBnt").text("팔로우");
					$("#followingBnt").attr("id", "").attr("id", "followBnt").text("팔로우");
					followerCnt(id); // 팔로워 수 업뎃
				}
			}
		});
	}
}

// 팔로우 했는지 여부
function followOrNot(id, me){
	$.ajax({
		url: "follow.ornot",
		data: {wf_id: id, wf_follower: me},
		success: function(xml){
			var cnt = $(xml).find("follow").length;
			if(cnt > 0) {
				$("#followBnt").attr("id", "").attr("id", "followingBnt").text("팔로잉");
			}
		}
	});
}

function followWait(id, me) {
	var ok = confirm(id +"님을 팔로우 합니까?");
	
	if(ok) {
		$.ajax({
			url: "insert.waiter",
			type:"post",
			data: {wfw_id: id, wfw_follower: me},
			success: function(result){
				if(result == "OK") {
					alert(id + "님이 승인할 때까지 기다리세요...");
					$("#followBnt").attr("id", "").attr("id", "followWaitBnt").text("승인중");
					$("#followingBnt").attr("id", "").attr("id", "followWaitBnt").text("승인중");
				}
			}
		});
	}
}

function unFollowWaitDo(id, me) {
	var ok = confirm("승인 취소 합니까?");
	
	if(ok) {
		$.ajax({
			url: "delete.waiter",
			type:"post",
			data: {wfw_id: id, wfw_follower: me},
			success: function(result){
				if(result == "OK") {
					alert("승인 취소 했습니다!!");
					$("#followWaitBnt").attr("id", "").attr("id", "followBnt").text("팔로우");
					$("#followBnt").text("팔로우");
				}
			}
		});
	}
}

//승인중인지 여부
function followWaitOrNot(id, me){
	$.ajax({
		url: "followWait.ornot",
		data: {wfw_id: id, wfw_follower: me},
		success: function(xml){
			var cnt = $(xml).find("waiter").length;
			if(cnt > 0) {
				$("#followBnt").attr("id", "").attr("id", "followWaitBnt").text("승인중");
			}
			
			//return cnt;
		}
	});
}


// 팔로워 수 눌렀을 때 목록
function searchFollowerEvent(yId, meId) {
	
	// follower 조회
	$("#followerTd").click(function() {
		$.ajax({
			url : "follower.cnt",
			data : {
				wf_id : yId
			},
			success : function(xml) {
				var ok = $(xml).find("follow").length;
				
				$('#searchFollowerDiv').remove();
				$('#followDiv').remove();
				$('#closeDiv').remove();
				var displayDiv = $('<div></div>');
				var followDiv = $('<div></div>');
				var closeDiv = $('<div></div>').attr("id","closeDiv");
	
				if (ok >= 1) {
					displayDiv.attr("id","searchFollowerDiv");
					followDiv.attr("id","followDiv");
					
					var idSpan;
					var nameSpan;
					var imgSpan;
					
					$(xml).find("follow").each(function(i, e){
						var followerId = $(e).find('wf_follower').text();
						var followerImg = "";
						var followerName = "";
						
						// id로 회원정보를 가져오는 아작스
						$.ajax({
							url : "member.id.check",
							data : {
								wm_id : followerId
							},
							success : function(xml2) {
								var fm = $(xml2).find('member');
								followerImg = fm.find('wm_img').text();
								followerName = fm.find('wm_name').text();									
									
								var aTag = $('<a></a>').attr('class', 'dvsATag');
								if(followerId == meId) {
									aTag.attr('href','home.go');
								} else {
									aTag.attr('href','follow.wave?wm_id='+followerId);
								}
								
								var followTb = $('<table></table>').attr("class", "followTb");
								
								followTb.css("border-bottom", "1px #E0E0E0 solid");
					
								var tr = $('<tr></tr>');
								var td1 = $('<td></td>').css('width', '45px');
								var td2 = $('<td></td>');				
									
								idImg = $('<img></img>').attr('class', 'searchIdImg').attr('src', 'resources/img/' + followerImg);
								td1.append(idImg);
									
								idSpan = $('<span></span>').attr("class", "searchIdSpan").text(followerId);
								nameSpan = $('<span></span>').attr("class", "searchIdNameSpan").text(followerName);
								td2.append(idSpan, '<br>', nameSpan);
									
								tr.append(td1, td2);
								followTb.append(tr);
								aTag.append(followTb)
									
								followDiv.append(aTag);
							}
						});
							
						displayDiv.append(followDiv)
					});
					
				} else {
					displayDiv.attr("id","searchFollowerDiv");
					
					var noIdDiv = $("<div></div>").attr('class','noFollowDiv').text("아무도 없습니다.");
					
					displayDiv.append(noIdDiv);
				}
				closeDiv.text('x');
				displayDiv.append(closeDiv);
				
				$('#loBd').append(displayDiv);
				
				// 닫기 버튼 누를 시
				$('#closeDiv').click(function(){
					//$('#closeDiv').remove();
					//$('#followDiv').remove();
					$('#searchFollowerDiv').hide();
				});
			}
		});
		
	});
}

//팔로우 수 눌렀을 때 목록
function searchFollowEvent(yId, meId) {
	
	// follower 조회
	$("#followTd").click(function() {
		$.ajax({
			url : "follow.cnt",
			data : {
				wf_follower : yId
			},
			success : function(xml) {
				var ok = $(xml).find("follow").length;
				
				$('#searchFollowerDiv').remove();
				$('#followDiv').remove();
				$('#closeDiv').remove();
				var displayDiv = $('<div></div>');
				var followDiv = $('<div></div>');
				var closeDiv = $('<div></div>').attr("id","closeDiv");
	
				if (ok >= 1) {
					displayDiv.attr("id","searchFollowerDiv");
					followDiv.attr("id","followDiv");
					
					var idSpan;
					var nameSpan;
					var imgSpan;
					
					$(xml).find("follow").each(function(i, e){
						var followId = $(e).find('wf_id').text();
						var followImg = "";
						var followName = "";
						
						// id로 회원정보를 가져오는 아작스
						$.ajax({
							url : "member.id.check",
							data : {
								wm_id : followId
							},
							success : function(xml2) {
								var fm = $(xml2).find('member');
								followImg = fm.find('wm_img').text();
								followName = fm.find('wm_name').text();									
									
								var aTag = $('<a></a>').attr('class', 'dvsATag');
								if(followId == meId) {
									aTag.attr('href','home.go');
								} else {
									aTag.attr('href','follow.wave?wm_id='+followId);
								}
								var followTb = $('<table></table>').attr("class", "followTb");
								
								followTb.css("border-bottom", "1px #E0E0E0 solid");
					
								var tr = $('<tr></tr>');
								var td1 = $('<td></td>').css('width', '45px');
								var td2 = $('<td></td>');				
									
								idImg = $('<img></img>').attr('class', 'searchIdImg').attr('src', 'resources/img/' + followImg);
								td1.append(idImg);
									
								idSpan = $('<span></span>').attr("class", "searchIdSpan").text(followId);
								nameSpan = $('<span></span>').attr("class", "searchIdNameSpan").text(followName);
								td2.append(idSpan, '<br>', nameSpan);
									
								tr.append(td1, td2);
								followTb.append(tr);
								aTag.append(followTb)
									
								followDiv.append(aTag);
							}
						});
							
						displayDiv.append(followDiv)
					});
					
				} else {
					displayDiv.attr("id","searchFollowerDiv");
					
					var noIdDiv = $("<div></div>").attr('class','noFollowDiv').text("아무도 없습니다.");
					
					displayDiv.append(noIdDiv);
				}
				closeDiv.text('x');
				displayDiv.append(closeDiv);
				
				$('#loBd').append(displayDiv);
				
				// 닫기 버튼 누를 시
				$('#closeDiv').click(function(){
					//$('#closeDiv').remove();
					//$('#followDiv').remove();
					$('#searchFollowerDiv').hide();
				});
			}
		});
		
	});
}
