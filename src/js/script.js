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
  });