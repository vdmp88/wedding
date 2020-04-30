const body = document.body;
const hamburger = document.body.querySelector(".hamburger");
const activeNav = document.body.querySelector(".navigation");
const $sliderServices = $(".slider.slider--services");
const $sliderCouches = $(".slider.slider--coaches");
const $sliderCounter = $(".slider-navigation__counter");

//wow init
new WOW({
  mobile: false,
}).init();

// menu
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("is__active");
  activeNav.classList.toggle("active-nav");
  body.classList.toggle("overflow-h");
});

// sliderServices
const settingSlider = {
  arrows: false,
  dots: true,
  infinite: false,
  slidesToShow: 1.2,
  rows: 0,
};

function slick_on_mobile(slider, settings) {
  $(window).on("load resize", function () {
    if ($(window).width() > 767) {
      if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
      }
      return;
    } else if (!slider.hasClass("slick-initialized")) {
      return slider.slick(settings);
    }
  });
}

slick_on_mobile($sliderServices, settingSlider);

// sliderCouches

$sliderCouches.on("init reInit afterChange", function (
  event,
  slick,
  currentSlide
) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  $sliderCounter.html(`<span> ${i} of ${slick.slideCount}</span>`);
});

$sliderCouches.slick({
  slidesToShow: 2,
  rows: 0,
  prevArrow: $(".slider-navigation__prev-arrow"),
  nextArrow: $(".slider-navigation__next-arrow"),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        infinite: false,
        slidesToShow: 1.1,
        dots: true,
      },
    },
  ],
});
