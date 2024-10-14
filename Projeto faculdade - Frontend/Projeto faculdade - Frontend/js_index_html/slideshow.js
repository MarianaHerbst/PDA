// -----------------------------------
// SECTION_TWO > SLIDESHOW > BEGINNING
// -----------------------------------

    // -----------------------------------------------------
    // CHECK THE SCREEN SIZE AND TOGGLE THE MENU > BEGINNING
    // -----------------------------------------------------

function updateSliderImages() {
    var html = $('html');
    if ($(window).width() < 660) {
        if (html.hasClass('light')) {
            $('.slider1').attr('src', "/images/main_section_two/slideshow-mobile/slide_1_mobile_white.png");
            $('.slider2').attr('src', "/images/main_section_two/slideshow-mobile/slide_2_mobile_white.png");
            $('.slider3').attr('src', "/images/main_section_two/slideshow-mobile/slide_3_mobile_white.png");
            $('.slider4').attr('src', "/images/main_section_two/slideshow-mobile/slide_4_mobile_white.png");
        } else {
            $('.slider1').attr('src', "/images/main_section_two/slideshow-mobile/slide_1_mobile_black.png");
            $('.slider2').attr('src', "/images/main_section_two/slideshow-mobile/slide_2_mobile_black.png");
            $('.slider3').attr('src', "/images/main_section_two/slideshow-mobile/slide_3_mobile_black.png");
            $('.slider4').attr('src', "/images/main_section_two/slideshow-mobile/slide_4_mobile_black.png");
        }
    } else if ($(window).width() > 660) {
        if (html.hasClass('light')) {
            $('.slider1').attr('src', "/images/main_section_two/slideshow-desktop/slide_1_desktop_white.png");
            $('.slider2').attr('src', "/images/main_section_two/slideshow-desktop/slide_2_desktop_white.png");
            $('.slider3').attr('src', "/images/main_section_two/slideshow-desktop/slide_3_desktop_white.png");
            $('.slider4').attr('src', "/images/main_section_two/slideshow-desktop/slide_4_desktop_white.png");
        } else {
            $('.slider1').attr('src', "/images/main_section_two/slideshow-desktop/slide_1_desktop_black.png");
            $('.slider2').attr('src', "/images/main_section_two/slideshow-desktop/slide_2_desktop_black.png");
            $('.slider3').attr('src', "/images/main_section_two/slideshow-desktop/slide_3_desktop_black.png");
            $('.slider4').attr('src', "/images/main_section_two/slideshow-desktop/slide_4_desktop_black.png");
        }
    }
}

$(window).on('resize', updateSliderImages);
// Adiciona um listener ao evento resize

$(document).ready(updateSliderImages);
// Adiciona um listener ao evento DOMContentLoaded (quando a tela é totalmente carregada)

updateSliderImages();


    // -----------------------------------------------
    // CHECK THE SCREEN SIZE AND TOGGLE THE MENU > END  
    // -----------------------------------------------



    // ---------------------------------------------
    // AUTOMATIC SLIDESHOW AND BY BUTTON > BEGINNING
    // ---------------------------------------------

let direction_Slide = 0, slides = $('.chamada-single'), autoResumeDelay;
// autoResumeDelay: armazena o ID do temporizador de retomar a troca automática.

function initSlider() {
    // inicializa o slideshow.
    slides.hide().eq(direction_Slide).show(); 
    // Exibe o primeiro slide e esconde os outros.
}

function changeSlide() {
    // inicia a troca automatica de slides.
    autoChangeInterval = setInterval(() => navigateSlide('next'), 7000);
    // usa o setInterval para chamar a função navigateSlide a cada 7 segundos
}

function navigateSlide(direction) {
    // controla a navegação entre os slides se next ou prev.
    var currentSlide = slides.eq(direction_Slide); 
    // Seleciona o slide atual

    currentSlide.animate({ opacity: 0 }, 200, function() { 
        // Anima a opacidade para 0
        currentSlide.hide(); 
        // Oculta o slide após a animação

        direction_Slide = (direction_Slide + (direction === 'next' ? 1 : -1) + slides.length) % slides.length;
        // Atualiza a direção do slide com base na direção da navegação.
        
        var nextSlide = slides.eq(direction_Slide); 
        // Seleciona o próximo slide

        nextSlide.css({ opacity: 0 }).show().animate({ opacity: 1 }, 200); 
        // Define a opacidade do próximo slide como 0 
        // Mostra o próximo slide
        // Anima a opacidade do próximo slide para 1
    });

    resetAndResumeAutoChange(); // Reinicia a troca automática.
}



function resetAndResumeAutoChange() {
    // Pausa a troca automática e reinicia após um atraso.
    clearInterval(autoChangeInterval); 
    // Para a troca automática.
    clearTimeout(autoResumeDelay); 
    // Limpa o temporizador anterior.
    autoResumeDelay = setTimeout(changeSlide, 2000); 
    // Aguarda 2 segundos para retomar a troca automática.
}

initSlider(); 
changeSlide();

$('.next').on('click', () => navigateSlide('next'));
// chama a função resetAndResumeAutoChange e passa para o próximo slide

$('.prev').on('click', () => navigateSlide('prev'));
// chama a função resetAndResumeAutoChange e volta para o slide anterior

    // ---------------------------------------------
    // AUTOMATIC SLIDESHOW AND BY BUTTON > BEGINNING
    // ---------------------------------------------

// -----------------------------
// SECTION_TWO > SLIDESHOW > END
// -----------------------------
