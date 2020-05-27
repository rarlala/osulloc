$(function() {

  // 메뉴 n번째 선택 시 해당하는 ul의 색상 변경 [미완료]

  // var $gnbList = $('.gnb-list li'),
  //   $subMenu = $('.sub-menu-area li');

  // $gnbList
  //   .on('mouseover', function() {
  //     $gnbList.filter('.active').removeClass('active');
  //     $(this).find('a').css({
  //       color: '#daf100'
  //     })
  //     $(this).parent().parent().find('.sub-menu-area').find('.active').removeClass('active');

  //     $(this).addClass('active');
  //     $listNum = $(this).index();
  //     $(this).parent().parent().find('.sub-menu-area').find('ul').eq($listNum).addClass('active');
  //   })

  // $subMenu.on('mouseover', function() {
  //   $(this).parent().parent().parent().parent().find('.gnb-list').css({
  //     background: 'red'
  //   })
  // })

  // -------------------------------------------------------------------------

  // weekly-best 내 li hover 효과
  // 1. list-style: none; [미완료]
  // 2. 이미지 바꾸기 [완료]
  // 3. 리뷰보기 | 장바구니 표시 [완료]

  var $weeklyList = $('.weekly-best .rank-container li .image-wrap');

  $weeklyList
    .on('mouseover', function() {
      var img_src = $(this).find('img').attr("src");
      var new_img_src = img_src.split('.')[1];
      $(this).find('img').css('opacity', '0').stop().attr("src", '.' + new_img_src + '-1.png').animate({
        opacity: 1
      }, 500);
      $(this).find('.detail').removeClass('hidden');
    })
    .on('mouseout', function() {
      var img_src = $(this).find('img').attr("src");
      var new_img_src = img_src.split('-')[0];

      $(this).find('img').css('opacity', '0').stop().attr("src", new_img_src + '.png').animate({
        opacity: 1
      }, 500);
      $(this).find('.detail').addClass('hidden');
    })

  // -------------------------------------------------------------------------

  // weekly-best 내 tab 기능
  // 1. 리뷰순, 판매순 선택 시 active class 추가로 h3 color 확인
  // 2. 해당하는 영역의 class를 가져다가 이미지 변경하기


  var $weeklyBest = $('.weekly-best .wrap'),
    $reviewTab = $('.weekly-best .wrap h3.review-tab'),
    $saleTab = $('.weekly-best .wrap h3.sale-tab');

  $reviewTab.on('click', function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $saleTab.removeClass('active');
    }

    if (!$weeklyBest.find('.review > .rank-container.review').hasClass('active')) {
      $weeklyBest.find('.review > .rank-container.review').addClass('active');
      $weeklyBest.find('.sale > .rank-container.sale').removeClass('active');
    }

    if (!$weeklyBest.find('.review > .arrow-area').hasClass('active')) {
      $weeklyBest.find('.review > .arrow-area').addClass('active');
      $weeklyBest.find('.sale > .arrow-area').removeClass('active');
    }

    if (!$weeklyBest.find('.review > .progressBar').hasClass('active')) {
      $weeklyBest.find('.review > .progressBar').addClass('active');
      $weeklyBest.find('.sale > .progressBar').removeClass('active');
    }
  });

  $saleTab.on('click', function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $reviewTab.removeClass('active');
    }

    if (!$weeklyBest.find('.sale > .rank-container.review').hasClass('active')) {
      $weeklyBest.find('.sale > .rank-container.sale').addClass('active');
      $weeklyBest.find('.review > .rank-container.review').removeClass('active');
    }

    if (!$weeklyBest.find('.sale > .arrow-area').hasClass('active')) {
      $weeklyBest.find('.sale > .arrow-area').addClass('active');
      $weeklyBest.find('.review > .arrow-area').removeClass('active');
    }

    if (!$weeklyBest.find('.sale > .progressBar').hasClass('active')) {
      $weeklyBest.find('.sale > .progressBar').addClass('active');
      $weeklyBest.find('.review > .progressBar').removeClass('active');
    }
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
    $teaWareRight = $('.tea-ware-shop .arrow-area .next')
  $teaWareProgress = $('.tea-ware-shop .progressBar .progress');

  $teaWareLeft.on('click', function() {
    $(this).css({
      filter: 'invert(80%)'
    })
    $teaWareRight.css({
      filter: 'invert(0)'
    })
    $teaWareArea.stop(true).animate({
      marginLeft: '',
    })
    $teaWareProgress.stop(true).animate({
      width: '50%'
    })
  })

  $teaWareRight.on('click', function() {
    $(this).css({
      filter: 'invert(80%)'
    })
    $teaWareLeft.css({
      filter: 'invert(0)'
    })
    $teaWareArea.stop(true).animate({
      marginLeft: '-1050px',
    })
    $teaWareProgress.stop(true).animate({
      width: '100%'
    })
  })

  // -------------------------------------------------------------------------

  // shop list hover 효과 [완료]

  var $shopList = $('.shop .item-list li img');

  $shopList
    .on('mouseover', function() {
      var img_src = $(this).attr("src");
      var new_img_src = img_src.split('.')[1];
      $(this).css('opacity', '0').stop().attr("src", '.' + new_img_src + '-1.png').animate({
        opacity: 1
      }, 500);
      $(this).find('.detail').removeClass('hidden');
    })
    .on('mouseout', function() {
      var img_src = $(this).attr("src");
      var new_img_src = img_src.split('-')[0];

      $(this).css('opacity', '0').stop().attr("src", new_img_src + '.png').animate({
        opacity: 1
      }, 500);
      $(this).find('.detail').addClass('hidden');
    })

  // -------------------------------------------------------------------------

  // md-pick-list hover 시 이미지 변경 [완료]

  var $mdPickList = $('.md-pick-right .md-pick-list li');

  $mdPickList.find('a')
    .on('mouseover', function() {
      var img_src = $(this).find('img').attr("src");
      var new_img_src = img_src.split('0')[0];
      $(this).find('img').css('opacity', '0').stop().attr("src", new_img_src + '-hover.png').animate({
        opacity: 1
      }, 500);
    })
    .on('mouseout', function() {
      var $num = $(this).parent().index();
      var img_src = $('.md-pick-list li').eq($num).find('img').attr("src");
      var new_img_src = img_src.split('-hover')[0];

      $(this).find('img').css('opacity', '0').stop().attr("src", new_img_src + '0' + ($num + 1) + '.png').animate({
        opacity: 1
      }, 500);
    })

  // -------------------------------------------------------------------------

  // md-pick 슬라이드 처리

  var $mdPickArea = $('.md-pick-right .md-pick-list'),
    $mdPickLeft = $('.md-pick-right .arrow-area .prev'),
    $mdPickRight = $('.md-pick-right .arrow-area .next'),
    $mdPickProgress = $('.md-pick-right .progressBar .progress');

  $mdPickLeft.on('click', function() {
    $(this).css({
      filter: 'invert(80%)'
    })
    $mdPickRight.css({
      filter: 'invert(0)'
    })
    $mdPickArea.stop(true).animate({
      marginLeft: '',
    })
    $mdPickProgress.stop(true).animate({
      width: '50%'
    })
  })

  $mdPickRight.on('click', function() {
    $(this).css({
      filter: 'invert(80%)'
    })
    $mdPickLeft.css({
      filter: 'invert(0)'
    })
    $mdPickArea.stop(true).animate({
      marginLeft: '-340px',
    })
    $mdPickProgress.stop(true).animate({
      width: '100%'
    })
  })

  // -------------------------------------------------------------------------

  // visual-slide

  // 1. n초마다 아래 'slide-select-area' 영역의 배경이 채워져야한다. [완료]
  // 2. n초마다 이미지가 바뀌어야한다. [완료]
  // 3. 특정 'slide-select-area' 클릭 시 해당하는 영역의 배경이 나타나야한다. [완료]
  // 4. 일시정지 버튼 클릭 시 시작버튼으로 바뀌어야한다.[완료]
  // 5. 일시정지 버튼 클릭 시 움직이던 시간을 멈춰야한다.[완료]

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
    $(this).parent().find('.active').toggleClass('paused')

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
    $(this).parent().parent().parent().find('.imag-slide .active').removeClass('active');

    $newSelectNum = $(this).index();
    $(this).addClass('active');
    $(this).parent().parent().parent().find('.img-slide a').eq($newSelectNum).addClass('active');

    $nowSelect = ($newSelectNum) % $slideNum;
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

  // scroll event

  // 고정 헤더 [완료]
  // top button 클릭 시 맨 위로 움직이게 하기 [완료]

  var $window = $(window),
    $btnTop = $('.btn-top');

  var $logoArea = $('header .logo-area'),
    $gnbArea = $('header .gnb-area'),
    $gnb = $gnbArea.find('.gnb'),
    $gnbLogo = $('header .gnb-area .gnb h3'),
    $addMenu = $('.addmenu-list >li');

  $window.scroll(function() {
    if ($window.scrollTop() === 0) {
      $logoArea.css({
        display: 'block',
      });
      $gnbArea.css({
        position: 'relative',
        background: '#67625d',
      });
      $gnb.css({
        background: '#67625d',
      });
      $gnb.find('.gnb-list li a').css({
        color: '#fff',
        marginLeft: '0',
      });
      $gnb
        .find('.gnb-list li a')
        .on('mouseover', function() {
          $(this).css({
            color: '#daf100',
          });
        })
        .on('mouseout', function() {
          $(this).css({
            color: '#fff',
          });
        });
      $gnbLogo.css({
        display: 'none',
      });

      $addMenu.filter('.btn-search').addClass('top');
      $addMenu.filter('.cart').addClass('top');
      $addMenu.filter('.add').addClass('top');

      $btnTop.stop(true).animate({
        right: '-100px'
      }, 300);
    } else if ($window.scrollTop() > 0 && $window.scrollTop() <= 300) {
      $btnTop.stop(true).animate({
        right: '-100px'
      }, 300);

      $logoArea.css({
        display: 'none',
      });
      $gnbArea.css({
        position: 'fixed',
        background: '#fff',
        borderBottom: '1px solid #ccc'
      });
      $gnb.css({
        background: '#fff',
        width: '1400px',
        margin: '0 auto',
      });
      $gnb.find('.gnb-list li a').css({
        marginLeft: '-70px',
        color: '#000',
      });
      $gnb
        .find('.gnb-list li a')
        .on('mouseover', function() {
          $(this).css({
            color: '#6c801a',
          });
        })
        .on('mouseout', function() {
          $(this).css({
            color: '#000',
          });
        });
      $gnbLogo.css({
        display: 'inline-block',
      });

      $addMenu.filter('.btn-search').removeClass('top');
      $addMenu.filter('.cart').removeClass('top');
      $addMenu.filter('.add').removeClass('top');

      $addMenu.filter('.btn-search').css({
        background: 'url(../src/img/header/ico_search2_off.png) no-repeat center'
      });
      $addMenu.filter('.cart').css({
        background: 'url(../src/img/header/ico_gnbBucket2_off.png) no-repeat center'
      });
      $addMenu.filter('.add').css({
        background: 'url(../src/img/header/ico_gnbMore2_off.png) no-repeat center'
      });
    } else if ($window.scrollTop() > 300) {
      $btnTop.stop(true).animate({
        right: '10px',
      }, 300);
    }
  });

  $btnTop.on('click', function() {
    $('html').animate({
      scrollTop: 0
    }, 500);
  });

  $window.trigger('scroll');
});