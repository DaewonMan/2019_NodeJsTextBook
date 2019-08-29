$(function(){
    //var postNum = "<%- postDetail.id %>"; // 게시물 번호
    var likeCnt = 0; // 좋아요 여부
    //var mId = "<%- user.wm_id %>";
    var likeBool = "";
    //var userId = "<%- user.wm_id %>";
    // 리플 수
    //checkRepleCnt(postNum);		
    
    /*
    // 게시물 눌렀을 때 좋아요 갯수; likeCnt는 0이 들어감
    $.ajax({
        url: "like.update",
        data: {wp_no: postNum, wp_like: likeCnt, wlb_id: mId, wlb_pno: postNum, wlb_bool: likeCnt},
        success: function(xml){
            
            // 하트여부
            likeBool = $(xml).find("likebool").find("wlb_bool").text();
            if(likeBool != ""){
                likeBool *= 1;						
            }
            if(likeBool == 1) {
                $(".likeBtn").text("♥");
                $(".likeBtn").css("color", "#D50000");
            } else {
                $(".likeBtn").text("♡");
                $(".likeBtn").css("color", "black");
            }					
        }
    });
    
    // 좋아요 갯수
    $.ajax({
        url: "like.cnt",
        data: {wp_no: postNum},
        success: function(xml){
            $(".likeCnt").empty();
            var cnt = $(xml).find("post").find("wp_like").text();
            $(".likeCnt").text(cnt);
        }
    });
    */
    /*============================================================*/
    
    // 댓글 추가하기
    $("#repleArea").keyup(function(e){
        //alert(e.keyCode); 13이 엔터
        if(e.keyCode == 13) {
            //$("#repleBtn").trigger("click");
            //post.reple.do
            // 댓글 달기
            var id = $('#repleIdArea').val();
            var pno = $('#replePnoArea').val();;
            var reple = $("#repleArea").val();
            $.ajax({
                url: "/post/reple/do",
                data: { 
                    wr_id: id,
                    wr_pno: pno,
                    wr_reple: reple
                
                },
                success: function(xml){
                    $(".DescRShowDiv").empty();
                    $(".commentCnt").empty();
                    var repleNum = 0;
                    $(xml).find("reple").each(function(i, e){
						var id2 = $(e).find('wr_id').text();
						var reple2 = $(e).find('wr_reple').text();
                        var no2 = $(e).find('id').text();
                        var pno2 = $(e).find('wr_pno').text();

                        var divTag = $('<div></div>').attr('class', 'eachReples' + no2);
                        var spanIdTag = $('<span></span>').attr('class', 'DescRShowId').text(id2 + ' : ');
                        var spanRepleTag = $('<span></span>').attr('class', 'DescRShowRep').text(reple2);
                        var stmtSpan = $('<span></span>').attr('class', 'repleXBtn').attr('onclick', 'repleDeleteDo(' + no2 + ',' + pno2 + ');').text('    x');
                        var pTag = $('<p>');

                        if(id == id2) {
                            divTag.append(spanIdTag).append(spanRepleTag).append(stmtSpan).append(pTag);
                        } else {
                            divTag.append(spanIdTag).append(spanRepleTag).append(pTag);
                        }
                        
                        $(".DescRShowDiv").append(divTag);
                        repleNum++;
                    });
                    $('#repleArea').val("");
                    $(".commentCnt").text(repleNum); // 댓글 수
                }
            });
        }
    });
    // 게시물 삭제 이미지
    $("#trashImg").mouseenter(function(){
        $(this).attr("src","/img/trash2.png");
    });
    $("#trashImg").mouseleave(function(){
        $(this).attr("src","/img/trash1.jpg");			
    });
    
    // 좋아요 버튼
    $(".likeBtn").click(function(){
        var hrt = $(this).text();
        if(hrt == "♡") {
            $(this).text("♥");
            $(this).css("color", "#D50000");
            likeCnt = 1;
        } else {
            $(this).text("♡");
            $(this).css("color", "black");
            likeCnt = -1;
        }
        // 좋아요 버튼 누른 후 좋아요 갯수; likeCnt는 1 or -1이 들어감
        $.ajax({
            url: "like.update",
            data: {wp_no: postNum, wp_like: likeCnt, wlb_id: mId, wlb_pno: postNum, wlb_bool: likeCnt},
            success: function(){
                // 좋아요 갯수
                $.ajax({
                    url: "like.cnt",
                    data: {wp_no: postNum},
                    success: function(xml){
                        $(".likeCnt").empty();
                        var cnt = $(xml).find("post").find("wp_like").text();
                        $(".likeCnt").text(cnt);
                    }
                });
            }
        });
    });
    
    // 좋아요 클릭시 크기 변화
    $(".likeBtn").mousedown(function(){
        $(this).css("font-size", "40pt");
    });
    $(".likeBtn").mouseup(function(){
        $(this).css("font-size", "30pt");
    });
    
});