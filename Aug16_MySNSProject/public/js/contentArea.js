$(function(){
		
    // 댓글 수
    $(".postTd").mouseenter(function(){
        var ele = $(this).children(); // 하위 a 태그 받기
        var ele2 = ele.children(); // 하위 img div
        var ele3 = ele2.eq(1).children(); // 하위 span들
        var ele4 = ele3.eq(0); // .likeCntSpan
        var ele5 = ele3.eq(1); // .repleCntSpan
        var targetPno = ele3.eq(2); // 숨겨져있는 input tag
        //alert(ele4.text());
        
        //var eleNo = ele.attr("href").replace("/post/show?id=", "").replace("&wp_id=" + post[index].wp_id + "&wave_id=" + waveUser.wm_id, ""); // a태그의 속성인 href값의 댓글수만 남기고 공백으로
        var eleNo = targetPno.val();
        eleNo *= 1; // 숫자로 변환
        
        // 댓글 갯수
        $.ajax({
            url: "/post/reple/count",
            data: {wr_pno: eleNo},
            success: function(xml){
                ele5.empty();
                var cnt = 0;
                $(xml).find("reple").each(function(e){
                    cnt++;
                });
                ele5.text(cnt);
            }
        });
        
        // 좋아요 갯수
        $.ajax({
            url: "/post/like/count",
            data: {wlb_pno: eleNo},
            success: function(xml){
                ele4.empty();
                var cnt = $(xml).find("like").length;
                ele4.text(cnt);
            }
        });
    });
    
});