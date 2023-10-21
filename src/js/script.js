const { registry } = require("gulp");

$(document).ready(function(){
    $('.carousel__widget').slick({
        infinite: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><span class="icon-chevron-left-solid"></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="icon-chevron-right-solid"></span></button>'
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
                $('.item__view').eq(i).toggleClass('item__view_active');
                $('.item__info').eq(i).toggleClass('item__info_active');
            })
        });
    };

    toggleSlide('.item__link');
    toggleSlide('.item__info_return');
    
    $('[data-module=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');

    });

    $('.modal__close-icon').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.item__btn').each(function(i){
        $(this).on('click', function() {
            $('#order .modal__text').text($('.item__name').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    })

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[а-я-]+$/i.test(value);
      }, "Введите корректное имя"); 

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    lettersonly: true
                },
                phone: {
                    required: true,
                },
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
                phone: {
                    required: "Пожалуйста, введите свой номер телефона",
                    digits: "Введите корректный номер телефона"
                },
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };


    validateForms('.consultation__form');
    validateForms('#consultation .modal__form');
    validateForms('#order .modal__form');

    $('input[name=phone]').mask("+7 (999) 999-9999");

    $('form').submit(function(e) {
        e.preventDefault();
        if(!$(this).validate()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut('slow');
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });
  });