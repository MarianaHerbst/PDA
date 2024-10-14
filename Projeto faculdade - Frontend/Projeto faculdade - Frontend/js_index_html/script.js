
// ======================================
// INCREASE AND DECREASE FONT > BEGINNING
// ======================================

const maxFontSize = 12; 
// Tamanho máximo

const minFontSize = 8; 
// Tamanho mínimo

function changeFontSize(action) {


$('html, body').each(function() {
// Seleciona os elementos 'html' e 'body' e itera sobre eles

    let size = parseInt($(this).css('font-size'));
    // Obtém o tamanho atual da fonte em pixels

    if (action === 'aumentar' && size < maxFontSize) {
    // Verifica se a ação é 'aumentar' e se o tamanho da fonte é menor que o máximo permitido (maxFontSize)

        $(this).css('font-size', size + 1);
        // Aumenta o tamanho da fonte em 1 pixel
    } 

    else if (action === 'diminuir' && size > minFontSize) {
    // Verifica se a ação é 'diminuir' e se o tamanho da fonte é maior que o mínimo permitido (minFontSize)

        $(this).css('font-size', size - 1);
        // Diminui o tamanho da fonte em 1 pixel
    }
});

ignoreScroll = true;
// Impede o scroll automático quando a função é executada    

setTimeout(() => ignoreScroll = false, 1000);
// Após 1 segundo (1000 ms), libera o scroll novamente definindo ignoreScroll como false
}

$('#increase-font').click(function() {
    changeFontSize('aumentar');
    handleFontSizeChange();
});

$('#decrease-font').click(function() {
    changeFontSize('diminuir');
    handleFontSizeChange();
});

// ================================
// INCREASE AND DECREASE FONT > END
// ================================


// ===============================
// DARK AND WHITE MODE > BEGINNING
// ===============================

const iconDL = $('#mode-icon');
const html = $('html');

iconDL.on('click', function() { 
// Adiciona um evento de clique ao elemento iconDL

    html.toggleClass("light"); 
    // Alterna a classe "light" no elemento html, mudando o tema

    updateSliderImages(); 
    // Atualiza as imagens do slider, possivelmente para refletir o novo tema

    if (iconDL.hasClass('fa-moon')) { 
    // Verifica se o ícone atual é a lua

        iconDL.removeClass('fa-moon').addClass('fa-sun'); 
        // Troca o ícone de lua para sol

    } else { 
    // Caso contrário, se o ícone não for a lua

        iconDL.removeClass('fa-sun').addClass('fa-moon'); 
        // Troca o ícone de sol para lua
    }
});


// =========================
// DARK AND WHITE MODE > END
// =========================


// ==========================
// LOGGED IN USER > BEGINNING
// ==========================


    // =====================
    // USER MENU > BEGINNING
    // =====================

$('.container_section_five').hide(); 
// Esconde a seção cinco inicialmente

let menu_logado = $('.menu-logado'); 
// Seleciona o menu logado

let userLogado = JSON.parse(localStorage.getItem('userLogado')); 
// Obtém e parseia os dados do usuário logado do armazenamento local


let logado = document.querySelector('#logado'); 
// Seleciona o elemento que exibirá o nome do usuário

logado.innerHTML = 'Olá, ' + userLogado.nome; 
// Define o conteúdo do elemento com o nome do usuário

if (localStorage.getItem('token') != null) { 
    // Verifica se há um token no armazenamento local

    $('#link_cadastrar').css('display', 'none'); 
    // Esconde o link de cadastro

    $('.user_logado').css('display', 'flex'); 
    // Exibe o elemento para o usuário logado

    $('#cde').hide(); 
    // Esconde o elemento com ID "cde"
    
    $('#cdf').show();
    // Mostra o elemento com ID "cdf"
}

$('.user_logado').on('click', function() { 
    // Alterna a visibilidade do menu logado

    if (menu_logado.css('opacity') == 0) { 
        // Verifica se o menu está invisível

        menu_logado.css({'opacity': '1', 'visibility': 'visible'}); 
        // Torna o menu visível

    } else { 
        menu_logado.css({'opacity': '0','visibility': 'hidden'}); 
        // Torna o menu invisível
    }

    if ($('#arrow_icon').hasClass('fa-arrow-turn-up')) { 
        // Verifica se o ícone é uma seta para cima

        $('#arrow_icon').removeClass('fa-arrow-turn-up').addClass('fa-arrow-turn-down'); 
        // Muda para seta para baixo

    } else {
        $('#arrow_icon').removeClass('fa-arrow-turn-down').addClass('fa-arrow-turn-up'); 
        // Muda para seta para cima
    }
});


$(document).on('click', function(event) {
    // Verifica se o clique foi fora do menu logado ou do usuário logado

    if (!$(event.target).closest('.menu-logado, .user_logado').length) { 
        $('.menu-logado').css({'opacity': '0', 'visibility': 'hidden'}); 
        // Torna o menu invisível

        $('#arrow_icon').removeClass('fa-arrow-turn-down').addClass('fa-arrow-turn-up'); 
        // Restaura o ícone da seta para cima
    }
});

    // =====================
    // USER MENU > BEGINNING
    // =====================


    // ========================================
    // EMPLOYEE REGISTRATION BUTTON > BEGINNING
    // ========================================

$('.click-disappear').on('click', function(event) {
    event.preventDefault(); 
    // Impede o comportamento padrão do link
    
    const target = $(this).attr('href'); 
    // Obtém o alvo do link clicado

    $('.container_section_five').fadeOut(500, function() {
        // Executa após o fadeOut da seção 4

        $('.container:not(header .container, main .container_section_five)').fadeIn(500, function() {
        // Executa após o fadeIn das outras seções


            setTimeout(() => {
            // Aguarda um pequeno tempo para garantir a finalização completa das animações

                if ($(target).length) {
                // Verifica se o alvo existe antes de rolar
                    $('html, body').animate({
                        scrollTop: $(target).offset().top 
                        // Rola suavemente até o alvo

                    }, 800); 
                    // Duração de 800ms para a rolagem
                }
            }, 100); 
            // 100 milissegundos de atraso (você pode ajustar)
        });
    });
});

    // ==================================
    // EMPLOYEE REGISTRATION BUTTON > END
    // ==================================


    // ==========================
    // LOG OUT BUTTON > BEGINNING
    // ==========================

$('#sairBtn').on('click', function() { 
    // Adiciona um evento de clique ao botão de sair

    localStorage.removeItem('token'); 
    // Remove o token do armazenamento local

    localStorage.removeItem('userLogado');
    // Remove o usuário logado do armazenamento local

    window.location.href = '/html/login.html'; 
    // Redireciona para a página de login
});


$('.container:not(header .container, main .container_section_five)').show(); 
// Mostra containers que não são cabeçalho ou seção cinco

$('.container_section_five').hide(); 
// Esconde a seção cinco inicialmente

$('.cdf').on('click', function() { 
    // Adiciona um evento de clique ao elemento com classe "cdf"

    menu_logado.css({'opacity': '0','visibility': 'hidden'}); 
    // Altera a opacidade e a visibilidade do menu logado

    $('.container:not(header .container, main .container_section_five)').fadeOut(500, function() { 
        // Faz os containers restantes desaparecerem

        $('.container_section_five').fadeIn(500); 
        // Faz a seção cinco aparecer

        $('html, body').animate({ 
            // Anima a rolagem da página

            scrollTop: $('#section_five').offset().top 
            // Rola até o topo da seção cinco
        }, 500);
    });
});

    // ====================
    // LOG OUT BUTTON > END
    // ====================


// ====================
// LOGGED IN USER > END
// ====================