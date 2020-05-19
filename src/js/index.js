$(function() {
    $('.gnb > ul>li').on('mouseover', function() {
        $('header .gnb-area .menu-wrap').css({});
    });

    $('.gnb-list').on('mouseout', function() {
        $('header .gnb-area').css({});
    });

    // 슬라이드
});