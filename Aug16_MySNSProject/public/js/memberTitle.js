function followBtnOper(yourId, myId, yesOrNo, waverOpen) {
		
    if(yesOrNo == "팔로우") {
        // 비공개면 승인받아야함
        if(waverOpen == 'close') {
            followWait(yourId, myId);
        } else {
            followDo(yourId, myId);
        }
    } else if(yesOrNo == "승인중") {
        unFollowWaitDo(yourId, myId);
    } else {
        unfollowDo(yourId, myId);
    }
    
    // 팔로우, 팔로잉 버튼 누를 시 공개여부 즉각 반응
    //if(waverOpen == 'close') {
        //followOrNot2(yourId, myId);
    //}
}

$(function(){
    var myId = $("#mainUserID").val();
    var yourId = $("#mainwaveID").val();
    //var waverOpen = "${waveMember.wm_open}";

    /*
    // 팔로우 신청을 여부
    if(followWaitOrNot(yourId, myId) == 0) {
        // 팔로우 여부
        followOrNot(yourId, myId);				
    }*/
    
    // 팔로우 하기
    $('#followBnt').click(function(){
        var yesOrNo = $(this).text();
        followBtnOper(yourId, myId, yesOrNo, waverOpen);
    });
    
    // 언팔로우 하기
    $('#followingBnt').click(function(){
        var yesOrNo = $(this).text();
        followBtnOper(yourId, myId, yesOrNo, waverOpen);
    });
    
    // 승인중 취소하기
    $('#followWaitBnt').click(function(){
        var yesOrNo = $(this).text();
        followBtnOper(yourId, myId, yesOrNo, waverOpen);
    });
});