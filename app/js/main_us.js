jQuery(document).ready(function ($) {

    'use strict';


    $(".Modern-Slider").slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dots: true,
        fade: true,
        pauseOnDotsHover: true,
        cssEase: 'linear',
        // fade:true,
        draggable: false,
        prevArrow: '<button class="PrevArrow"></button>',
        nextArrow: '<button class="NextArrow"></button>',
    });

    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });


    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();

    })



    $(".box-video").click(function () {
        $('iframe', this)[0].src += "&amp;autoplay=1";
        $(this).addClass('open');
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    })



    var contentSection = $('.content-section, .main-banner');
    var navigation = $('nav');

    //when a nav link is clicked, smooth scroll to the section
    navigation.on('click', 'a', function (event) {
        event.preventDefault(); //prevents previous event
        smoothScroll($(this.hash));
    });
    function smoothScroll(target) {
        $('body,html').animate({
            scrollTop: target.offset().top
        }, 800);
    }


    $('.button a[href*=#]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 0 }, 500, 'linear');
    });

    ///arrays id links section area
    let idsection = ["mapa", "featured", "projects", "video", "blog", "contacto"];
    ///Ocultar todos las areas o secciones
    idsection.forEach(function (valor, indice, array) {
        if (indice > 0) {
            document.getElementById(valor).style.display = "none";
            document.getElementById(valor).style.visibility = "hidden";
            document.getElementById(valor).style.opacity = "0";
        };
    });


    ///click sobre los enlaces a secciones
    $("#links ul > li > a").click(function (event) {
        ///esconder menu colapsado
        $('.navbar-collapse.in').collapse('hide');
        ///remover la clase de cualquier link activo
        $('#links ul > li a').removeClass('active-section');
        ///agrego activo el link seleccionado
        $(this).addClass("active-section");

        ///obtengo el id del link a mostrar
        var idshow = $(this).attr("href").replace('#', '');
        ///escondo toda area 
        idsection.forEach(function (valor, indice, array) {
            document.getElementById(valor).style.display = "none";
            document.getElementById(valor).style.visibility = "hidden";
            document.getElementById(valor).style.opacity = "0";
        });
        ///nuestro solo el area seleccionada atravez del id del link seleccionado
        document.getElementById(idshow).style.display = "block";
        document.getElementById(idshow).style.visibility = "visible";
        document.getElementById(idshow).style.animation = "fade 1s";
        document.getElementById(idshow).style.opacity = "1";
    });
}); 