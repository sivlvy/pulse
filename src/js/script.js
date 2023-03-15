$(document).ready(function(){
   $('.carousel__inner').slick({
      speed: 1000,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="../img/solid/arrow_left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../img/solid/arrow_right.svg"></button>',
      responsive: [
         {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: true
            }
         },
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
                     dots: true,
                     slidesToShow: 1,
                     slidesToScroll: 1
                  }
               },
               {
                  breakpoint: 425,
                  settings: {
                     dots:true,
                     slidesToShow: 1,
                     slidesToScroll: 1,
                     arrows: false
                  }
               },
               {
                  breakpoint: 375,
                  settings: {
                     dots:true,

                  }
               }
      ]
      
   });

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });

   
   function toggleSlide(item) {
      $(item).each(function(i) {
         $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         })
      });
   };

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

   //Modal//

   $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn();
   });
   $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #thanks, #order').fadeOut('fast')
   });
   $('.button_mini').on('click', function() {
      $('.overlay, #order').fadeIn();
   });

   function validateForms(form){
      $(form).validate({
         rules: {
            name: {
                  required: true,
                  minlength: 2
            },
            phone: "required",
            email: {
                  required: true,
                  email: true
            }
         },
         messages: {
            name: {
               required: "Пожалуйста, введите свое имя",
                  minlength: jQuery.validator.format("Введите {0} символа!")
               },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
               required: "Пожалуйста, введите свою почту",
               email: "Неправильно введен адрес почты"
            }
         }
      });
};
validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form')

$('input[name=phone]').mask("+38 (999) 999-99-99");

$('form').sumbit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
         return;
      }


      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function() {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');
         
         $('form').trigger('reset');
      });
      return false;
   });
});