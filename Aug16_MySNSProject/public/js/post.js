function goToMemberDisplay(id, me){
	if(id == me) {
		location.href = "home.go";				
	} else {
		location.href = "follow.wave?wm_id="+id;		
	}
}

function checkRepleCnt(postNum) {
	$.ajax({
		url: "reple.count",
		data: {wr_rno: postNum},
		success: function(xml){
			$(".commentCnt").empty();
			var cnt = 0;
			$(xml).find("reple").each(function(e){
				cnt = e + 1;
			});
			$(".commentCnt").text(cnt);
		}
	});
}

function postDeleteDo(no) {
	var ok = confirm("게시물을 삭제합니까?");
	
	if(ok) {
		// 게시물 삭제
		$.ajax({
			url: "post.delete",
			type:"post",
			data: {wp_no: no}, 
			success: function(result){
				if(result == "OK") {
					//$(".postATag"+ no).remove();
					location.href = "home.go";
				} else {
					alert("게시물 삭제 실패!!");
				}
			}
		});
	}
}

function repleDeleteDo(no, pNo) {
	var ok = confirm("댓글을 삭제합니까?");
	
	if(ok) {
		// 리플 삭제
		$.ajax({
			url: "reple.delete",
			type:"post",
			data: {wr_no: no}, 
			success: function(result){
				if(result == "OK") {
					//alert("댓글이 삭제 되었습니다!");
					checkRepleCnt(pNo);
					$(".eachReples"+ no).remove();
				} else {
					alert("댓글 삭제 실패!!");
				}
			}
		});
	}
	
}


function postCheck() { 
	var titleField = document.postForm.wp_title;
	var imgField = document.postForm.wp_img;
	
	if(isEmpty(titleField)) {
		alert("문구 다시");
		titleField.value = "";
		titleField.focus();
		return false;
	} else if(isEmpty(imgField) || isNotType(imgField, "jpg")
				&& isNotType(imgField, "png")
				&& isNotType(imgField, "gif")
				&& isNotType(imgField, "jpeg")) {
		alert("이미지 다시");
		imgField.value = "";
		imgField.focus();
		return false;
	} 
	
	return true;
}

// 팔로우 여부에 따라 게시물 허용
function followOrNot2(id, me){
	
	$.ajax({
		url: "follow.ornot",
		data: {wf_id: id, wf_follower: me},
		success: function(xml){
			var cnt = $(xml).find('follow').length;
			//alert(cnt);	
			if(cnt > 0) {
				$('#noPostDiv2').remove(); // 해당태그 삭제
				$('#postTb').show(); // 게시물 목록 표시
				$('#noPostDiv').show(); // 게시물 없음 표시
			} else {
				$('#postTb').hide(); // 게시물 목록 숨기기
				$('#noPostDiv').hide(); // 게시물 없음 표시 숨기기
				//nonOpenDiv.show();
				
				var nonOpenDiv = $('<div></div>').attr('id', 'noPostDiv2');
				var nonOpenImg = $('<img></img>').attr('src', 'resources/img/wonsta.jpg');
				var nonOpenSpan = $('<span></span>').text('비공개!');
				nonOpenDiv.append(nonOpenImg, '<p>', nonOpenSpan);
				$('.mainCttTd').append(nonOpenDiv);
			}
		}		
	});	
}