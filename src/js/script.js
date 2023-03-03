$(document).ready(function(){
   $('.carousel__inner').slick({
      speed: 1000,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="../img/solid/arrow_left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../img/solid/arrow_right.svg"></button>',
      responsive: [
            {
               breakpoint: 992,
               settings: {
                  dots: true,
                  arrows: false
         }
            },
               {
                  breakpoint: 575,
                  settings: {
                     dots: false,
                     slidesToShow: 1,
                     slidesToScroll: 1
                  }
               }
      ]
      
   });
});