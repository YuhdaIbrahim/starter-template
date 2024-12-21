jQuery(document).ready(function () {
  var OSName = "unknown";
  if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
  if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
  if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
  if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
  jQuery("body").addClass(OSName);
});

function smoothscroll() {
  jQuery(".smoothscroll").on("click", function (e) {
    e.preventDefault();
    $target = jQuery(this.hash);
    $space = 180;
    jQuery("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top - $space,
        },
        500
      );
  });
}

var lastScrollTop = 0;
jQuery(window).scroll(function () {
  var scroll = jQuery(window).scrollTop();

  if (scroll > lastScrollTop) {
    if (scroll <= 99) {
      jQuery("header").removeClass("scrolled");
    }
    if (scroll >= 100) {
      jQuery("header").addClass("scrolled");
    }
    if (scroll <= 99) {
      jQuery(".home-hero").removeClass("scrolled");
      jQuery(".banner-fadeout").removeClass("start-fadeout");
    }
    if (scroll >= 100) {
      jQuery(".home-hero").addClass("scrolled");
      jQuery(".banner-fadeout").addClass("start-fadeout");
    }
  } else {
    jQuery("header").removeClass("scrolled");

    if (scroll <= 99) {
      jQuery(".home-hero").removeClass("scrolled");
      jQuery(".banner-fadeout").removeClass("start-fadeout");
    }
    if (scroll >= 100) {
      jQuery(".home-hero").addClass("scrolled");
      jQuery(".banner-fadeout").addClass("start-fadeout");
    }
  }
  lastScrollTop = scroll;
});

jQuery(window).on("load", function () {
  AOS.init({
    duration: 1400,
    once: true,
    anchorPlacement: "top-bottom",
  });

  smoothscroll();

  var scroll = jQuery(window).scrollTop();

  if (scroll <= 1) {
    jQuery("header").removeClass("scrolled");
  }

  if (scroll >= 10) {
    jQuery("header").addClass("scrolled");
  }

  jQuery(function () {
    let url = window.location.pathname.split("/").pop();

    // Add active nav class based on url
    jQuery(
      "header .header-container .navbar .navbar-collapse .navbar-nav .nav-item .nav-link"
    ).each(function () {
      if (
        jQuery(this).attr("href") == url ||
        jQuery(this).attr("href") == "" ||
        jQuery(this)
          .siblings(".dropdown-menu")
          .children("li")
          .children(".dropdown-item")
          .attr("href") == url
      ) {
        jQuery(this)
          .closest(".header-container .navbar-nav .nav-item .nav-link")
          .addClass("active");
      }
    });
  });

  if (window.outerWidth < 992) {
    jQuery("header .navbar-toggler").click(function () {
      if (jQuery("body").hasClass("scroll-lock")) {
        jQuery("body").removeClass("scroll-lock");
      } else {
        jQuery("body").addClass("scroll-lock");
      }
    });
  }

  if (document.querySelector(".partner .content_area .logo_slider")) {
    jQuery(".partner .content_area .logo_slider").slick({
      speed: 2500,
      autoplay: true,
      autoplaySpeed: 0,
      centerMode: false,
      cssEase: "linear",
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      infinite: true,
      focusOnSelect: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      useTransform: false,
    });
    function triggerScroll(targetObj) {
      let targetName = targetObj.attr("class"); //for console.log
      let targetFlag = false;
      let scrollTop = jQuery(window).scrollTop();
      let scrollBottom = scrollTop + jQuery(window).height();
      let targetTop = targetObj.offset().top;
      let targetBottom = targetTop + targetObj.height(); // while loading
      if (scrollBottom > targetTop && scrollTop < targetBottom) {
        if (!targetFlag) {
          console.log(targetName + " is in sight"); //for console.log
          targetObj.slick("slickPlay");
          jQuery(".partner .content_area .logo_slider").addClass("start");
          targetFlag = true;
        }
      } else {
        console.log(targetName + " is not in sight"); //for console.log
        targetObj.slick("slickPause");
        targetFlag = false;
      }

      jQuery(window).on("scroll", function () {
        scrollTop = jQuery(window).scrollTop();
        scrollBottom = scrollTop + jQuery(window).height();
        targetTop = targetObj.offset().top + 200;
        targetBottom = targetTop + targetObj.height();
        if (scrollBottom > targetTop && scrollTop < targetBottom) {
          // Start autoplay when entering the viewport
          if (!targetFlag) {
            console.log(targetName + " is in sight"); //確認用
            targetObj.slick("slickPlay");
            jQuery(".partner .content_area .logo_slider").addClass("start");
            targetFlag = true;
          }
        } else {
          // Stop autoplay when you get out of the viewport
          if (targetFlag) {
            console.log(targetName + " is not in sight"); //for console.log
            targetObj.slick("slickPause");
            jQuery(".partner .content_area .logo_slider").removeClass("start");
            targetFlag = false;
          }
        }
      });
    }
    // Execute function
    triggerScroll(jQuery(".partner .content_area .logo_slider"));
  }

  jQuery(document).on('click', '.faq .content_area .faq_area .left_area .faq_single', function(e){
    e.preventDefault();
    let data_open = jQuery(this).attr('data-open');
    if(data_open) {
      jQuery('.faq .content_area .faq_area .left_area .faq_single').not(jQuery(this)).removeClass('active');
      jQuery('.faq .content_area .faq_area .right_area .tab_content').not(`.faq .content_area .faq_area .right_area .tab_content[data-faq="${data_open}"]`).removeClass('active');
      jQuery(this).toggleClass('active');
      jQuery(`.faq .content_area .faq_area .right_area .tab_content[data-faq="${data_open}"]`).toggleClass('active');
    }
  })


  AOS.refresh();
});
