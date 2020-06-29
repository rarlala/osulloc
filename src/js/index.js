$(function() {
  preventDefaultAnchor();

  function preventDefaultAnchor() {
    $(document).on('click', 'a[href="#"]', function (e) {
      e.preventDefault();
    });
  }

  // -------------------------------------------------------------------------

  // imgChange
  function imgChange(selector, split1, split2, num1, num2, format1, format2) {
    selector
      .on('mouseenter focus', function() {
        var img_src = $(this).find('img').attr('src');
        var new_img_src = img_src.split(split1)[num1];

        $(this)
          .find('img')
          .css('opacity', '0')
          .attr('src', '.' + new_img_src + format1)
          .stop(true)
          .animate(
            {
              opacity: 1,
            },
            500
          );
        $(this).find('.detail').removeClass('hidden');
      })
      .on('mouseout focusout', function() {
        var img_src = $(this).find('img').attr('src');
        var new_img_src = img_src.split(split2)[num2];

        if (!new_img_src.match(format2)) {
          $(this)
            .find('img')
            .css('opacity', '0')
            .attr('src', new_img_src + format2)
            .stop(true)
            .animate(
              {
                opacity: 1,
              },
              500
            );
          $(this).find('.detail').addClass('hidden');
        }
      });
  }

  var $weeklyList = $('.weekly-best .rank-container li .image-wrap');
  imgChange($weeklyList, '.', '-', 1, 0, '-1.png', '.png');

  var $mdPickList = $('.md-pick-right .md-pick-list li a');
  imgChange($mdPickList, '.', '-1', 1, 0, '-1.png', '.png');

  var $shopList = $('.shop .item-list li');
  imgChange($shopList, '.', '-', 1, 0, '-1.png', '.png');

  // -------------------------------------------------------------------------

  // weekly-best 내 tab 기능

  var $weeklyBest = $('.weekly-best .wrap'),
    $reviewTab = $('.weekly-best .wrap h3.review-tab'),
    $saleTab = $('.weekly-best .wrap h3.sale-tab');

  function addRemove(select1, select2) {
    if (!$weeklyBest.find(select1).hasClass('active')) {
      $weeklyBest.find(select1).addClass('active');
      $weeklyBest.find(select2).removeClass('active');
    }
  }

  $reviewTab.on('click', function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $saleTab.removeClass('active');
    }

    addRemove('.review > .rank-container.review', '.sale > .rank-container.sale');
    addRemove('.review > .arrow-area', '.sale > .arrow-area');
    addRemove('.review > .progressBar', '.sale > .progressBar');
  });

  $saleTab.on('click', function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $reviewTab.removeClass('active');
    }

    addRemove('.sale > .rank-container.sale', '.review > .rank-container.review');
    addRemove('.sale > .arrow-area', '.review > .arrow-area');
    addRemove('.sale > .progressBar', '.review > .progressBar');
  });

  // -------------------------------------------------------------------------

  // weekly best arrow slide 처리 [완료]

  var $reviewRankContainer = $('.weekly-best .wrap .review .rank-container'),
    $reviewPrevArrow = $('.weekly-best .wrap .review .arrow-area .prev'),
    $reviewNextArrow = $('.weekly-best .wrap .review .arrow-area .next'),
    $reviewProgress = $('.weekly-best .wrap .review .progressBar .progress'),
    $reviewArrowClick = 0,
    $reviewMargin = 0,
    $r_progress = 16.66;

  $reviewPrevArrow.on('click', function() {
    if ($reviewArrowClick > 0) {
      $reviewArrowClick -= 1;
      $reviewMargin = $reviewArrowClick * -290;
      $r_progress -= 16.66;

      $reviewProgress.stop(true).animate({
        width: $r_progress + '%',
      });

      if ($reviewArrowClick === 0) {
        $reviewPrevArrow.css({
          filter: 'invert(80%)',
        });
      }

      if ($reviewArrowClick !== 5) {
        $reviewNextArrow.css({
          filter: 'invert(0%)',
        });
      }
    }

    // 오른쪽으로 이미지 이동
    $reviewRankContainer.stop(true).animate({
      marginLeft: $reviewMargin + 'px',
    });
  });

  $reviewNextArrow.on('click', function() {
    if ($reviewArrowClick < 5) {
      $reviewArrowClick += 1;
      $reviewMargin = $reviewArrowClick * -290;
      $r_progress = ($reviewArrowClick + 1) * 16.66;

      $reviewProgress.stop(true).animate({
        width: $r_progress + '%',
      });

      if ($reviewArrowClick === 5) {
        $reviewNextArrow.css({
          filter: 'invert(80%)',
        });
      }

      if ($reviewArrowClick !== 0) {
        $reviewPrevArrow.css({
          filter: 'invert(0%)',
        });
      }
    }

    // 왼쪽으로 이미지 이동
    $reviewRankContainer.stop(true).animate({
      marginLeft: $reviewMargin + 'px',
    });
  });

  var $saleRankContainer = $('.weekly-best .wrap .sale .rank-container'),
    $salePrevArrow = $('.weekly-best .wrap .sale .arrow-area .prev'),
    $saleNextArrow = $('.weekly-best .wrap .sale .arrow-area .next'),
    $saleProgress = $('.weekly-best .wrap .sale .progressBar .progress'),
    $saleMargin = 0,
    $saleArrowClick = 0,
    $s_progress = 16.66;

  $salePrevArrow.on('click', function() {
    if ($saleArrowClick > 0) {
      $saleArrowClick -= 1;
      $saleMargin = $saleArrowClick * -290;
      $s_progress -= 16.66;

      $saleProgress.stop(true).animate({
        width: $s_progress + '%',
      });

      if ($saleArrowClick === 0) {
        $salePrevArrow.css({
          filter: 'invert(80%)',
        });
      }

      if ($saleArrowClick !== 5) {
        $saleNextArrow.css({
          filter: 'invert(0%)',
        });
      }
    }

    // 오른쪽으로 이미지 이동
    $saleRankContainer.stop(true).animate({
      marginLeft: $saleMargin + 'px',
    });
  });

  $saleNextArrow.on('click', function() {
    if ($saleArrowClick < 5) {
      $saleArrowClick += 1;
      $saleMargin = $saleArrowClick * -290;
      $s_progress = ($saleArrowClick + 1) * 16.66;

      $saleProgress.stop(true).animate({
        width: $s_progress + '%',
      });

      if ($saleArrowClick === 5) {
        $saleNextArrow.css({
          filter: 'invert(80%)',
        });
      }

      if ($saleArrowClick !== 0) {
        $salePrevArrow.css({
          filter: 'invert(0%)',
        });
      }
    }

    // 왼쪽으로 이미지 이동
    $saleRankContainer.stop(true).animate({
      marginLeft: $saleMargin + 'px',
    });
  });

  // -------------------------------------------------------------------------

  // tea-ware-shop-right 탭으로 이미지 변경하기

  var $teaWareArea = $('.tea-ware-shop-right .wrap'),
    $teaWareLeft = $('.tea-ware-shop .arrow-area .prev'),
    $teaWareRight = $('.tea-ware-shop .arrow-area .next');
  $teaWareProgress = $('.tea-ware-shop .progressBar .progress');

  $teaWareLeft.on('click', function() {
    $(this).css({
      filter: 'invert(80%)',
    });
    $teaWareRight.css({
      filter: 'invert(0)',
    });
    $teaWareArea.stop(true).animate({
      marginLeft: '',
    });
    $teaWareProgress.stop(true).animate({
      width: '50%',
    });
  });

  $teaWareRight.on('click', function() {
    $(this).css({
      filter: 'invert(80%)',
    });
    $teaWareLeft.css({
      filter: 'invert(0)',
    });
    $teaWareArea.stop(true).animate({
      marginLeft: '-1050px',
    });
    $teaWareProgress.stop(true).animate({
      width: '100%',
    });
  });

  // -------------------------------------------------------------------------

  // md-pick 슬라이드 처리

  var $mdPickArea = $('.md-pick-right .md-pick-list'),
    $mdPickLeft = $('.md-pick-right .arrow-area .prev'),
    $mdPickRight = $('.md-pick-right .arrow-area .next'),
    $mdPickProgress = $('.md-pick-right .progressBar .progress');

  $mdPickLeft.on('click', function() {
    $(this).css({
      filter: 'invert(80%)',
    });
    $mdPickRight.css({
      filter: 'invert(0)',
    });
    $mdPickArea.stop(true).animate({
      marginLeft: '',
    });
    $mdPickProgress.stop(true).animate({
      width: '50%',
    });
  });

  $mdPickRight.on('click', function() {
    $(this).css({
      filter: 'invert(80%)',
    });
    $mdPickLeft.css({
      filter: 'invert(0)',
    });
    $mdPickArea.stop(true).animate({
      marginLeft: '-340px',
    });
    $mdPickProgress.stop(true).animate({
      width: '100%',
    });
  });

  // -------------------------------------------------------------------------

  // visual-slide

  var $visualSlide = $('.visual .img-slide'),
    $nowSlide = $visualSlide.find('.active').index(),
    $slideNum = $visualSlide.find('a').length;

  var $selectList = $('.visual .slide-select-area ul'),
    $nowSelect = $selectList.find('.active').index(),
    $selectNum = $selectList.find('li').length;

  var NextSlide = function() {
    $visualSlide.find('a').eq($nowSlide).removeClass('active');
    $nowSlide = ($nowSlide + 1) % $slideNum;
    $visualSlide.find('a').eq($nowSlide).addClass('active');

    $selectList.find('li').eq($nowSelect).removeClass('active');
    $nowSelect = ($nowSelect + 1) % $selectNum;
    $selectList.find('li').eq($nowSelect).addClass('active');
  };

  var repeat = setInterval(NextSlide, 5000);

  $('.visual .btn-slide-state').on('click', function() {
    $(this).parent().find('.active').toggleClass('paused');

    if ($(this).hasClass('stop')) {
      $(this).removeClass('stop');
      $(this).addClass('start');
      clearInterval(repeat);
    } else {
      $(this).removeClass('start');
      $(this).addClass('stop');
      repeat = setInterval(NextSlide, 5000);
    }
  });

  $selectList.find('li').on('click', function() {
    $(this).parent().find('.active').removeClass('active');
    $(this).parent().parent().parent().find('.img-slide .active').removeClass('active');

    var $newSelectNum = $(this).index();
    $(this).addClass('active');
    $(this).parent().parent().parent().find('.img-slide a').eq($newSelectNum).addClass('active');

    $nowSelect = $newSelectNum % $slideNum;
    $nowSlide = $newSelectNum % $slideNum;

    clearInterval(repeat);
    repeat = setInterval(NextSlide, 5000);
  });

  // -------------------------------------------------------------------------

  // 남은 시간 시계 [완료]

  var $timer = $('.today-price .timer');

  setInterval(function() {
    var nowTime = new Date();
    var hours = 23 - nowTime.getHours();
    var minutes = 59 - nowTime.getMinutes();
    var seconds = 59 - nowTime.getSeconds();

    var time = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

    $timer.text(time);
  }, 1000);

  // -------------------------------------------------------------------------

  // shop 동영상 슬라이드 [완료]

  var $shopSlideImg = $('.shop .slide-area .top ul'),
    $shopArrowPrev = $('.shop .slide-area .bottom .arrow-area .prev'),
    $shopArrowNext = $('.shop .slide-area .bottom .arrow-area .next'),
    $shopList = $('.shop .bottom ul li'),
    num = 0;

  $shopArrowPrev.on('click', function() {
    if (num > 0) {
      $shopList.eq(num).removeClass('active');
      num -= 1;

      $shopSlideImg.stop(true).animate({
        marginLeft: -927 * num + 'px',
      });
      $shopList.eq(num).addClass('active');
    }
  });

  $shopArrowNext.on('click', function() {
    if (num < 3) {
      $shopList.eq(num).removeClass('active');
      num += 1;

      $shopSlideImg.stop(true).animate({
        marginLeft: -927 * num + 'px',
      });
      $shopList.eq(num).addClass('active');
    }
  });

  $shopList.on('click', function() {
    var preVideoNum = $shopList.filter('.active').index();
    var preVideo = $shopSlideImg.find('li').eq(preVideoNum).find('video')[0];
    preVideo.pause();

    $shopList.filter('.active').removeClass('active');
    $(this).addClass('active');
    num = $(this).index();
    $shopSlideImg.stop(true).animate({
      marginLeft: -927 * num + 'px',
    });
    var nowVideo = $shopSlideImg.find('li').eq(num).find('video')[0];
    nowVideo.play();
  });

  // -------------------------------------------------------------------------

  // shop item list tab [완료]

  var $shopTab = $('.shop .item-list h3');

  $shopTab.on('click', function() {
    $shopTab.parent().filter('.active').removeClass('active');
    $(this).parent().addClass('active');
  });

  // -------------------------------------------------------------------------

  // header event

  $('.gnb-area').on('mouseenter focus', function() {
    $(this).addClass('open');
    $('#header').addClass('open');
  })

  $('#gnb li a').on('mouseenter focus', function() {
    $('.gnb-area').addClass('open');
    $('#header').addClass('open');
  })

  $('#header').on('mouseleave focusout', function() {
    $('.gnb-area').removeClass('open');
    $('#header').removeClass('open');
  })

  $('#gnb .gnb-list li')
    .on('mouseenter focus', function() {
      $(this).addClass('active')
    })
    .on('mouseleave', function() {
      $(this).removeClass('active')
    })

  // -------------------------------------------------------------------------

  // scroll event

  // 고정 헤더 [완료]
  // top button 클릭 시 맨 위로 움직이게 하기 [완료]

  var $window = $(window),
    $btnTop = $('.btn-top');

  var $logoArea = $('#header .logo-area'),
    $gnbArea = $('#header .gnb-area'),
    $addMenu = $('.addmenu-list > li');

  $window.scroll(function() {
    if ($window.scrollTop() === 0) {
      $logoArea.css({
        display: 'block',
      });

      $gnbArea.removeClass('scrolled');
      $addMenu.addClass('top');

      $btnTop.stop(true).animate(
        {
          right: '-100px',
        },
        300
      );
    } else if ($window.scrollTop() > 0 && $window.scrollTop() <= 300) {
      $btnTop.stop(true).animate({
          right: '-100px',
        },
        300
      );

      $logoArea.css({
        display: 'none',
      });

      $gnbArea.addClass('scrolled');
      $addMenu.removeClass('top');
    } else if ($window.scrollTop() > 300) {
      $btnTop.stop(true).animate({
          right: '10px',
        },
        300
      );
    }

    if ($window.scrollTop() > 3900) {
      var autoPlay = $shopSlideImg.find('li').eq(0).find('video')[0];
      autoPlay.play();
    }
  });

  $btnTop.on('click', function() {
    $('html').animate({
        scrollTop: 0,
      }, 500);
  });

  $window.trigger('scroll');
});