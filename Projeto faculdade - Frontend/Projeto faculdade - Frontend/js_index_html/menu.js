// ===========================
// SCROLLING LINKS > BEGINNING
// ===========================

const header = $('header');
let ignoreScroll = false;
let lastScrollTop = 0;


const closeMenu = () => {
    $('.menu-button').removeClass('active');
    // Remove a classe 'active' do botão do menu, desativando o estado ativo

    $('#menu').removeClass('show');
    // Remove a classe 'show' do menu, escondendo-o
};


const smoothNavigateTo = target => {
// Função para navegar suavemente até um alvo especificado

    closeMenu();
    // Fecha o menu antes de iniciar a navegação
    
    ignoreScroll = true;
    // Previne o cabeçalho de aparecer durante a rolagem

    header.addClass('hidden');
    // Adiciona a classe 'hidden' ao cabeçalho, ocultando-o
    
    $('html, body').animate({
    // Anima a rolagem da página até a posição do alvo
        scrollTop: $(target).offset().top 
        // Calcula a posição do alvo

    }, 800, () => ignoreScroll = false); 
    // Após a animação, permite que o cabeçalho apareça novamente
};


$('.click-disappear').on('click', function(event) {
    event.preventDefault(); 
    // Previne o comportamento padrão do link (navegação)

    smoothNavigateTo(this.getAttribute('href'));
    // Chama a função de navegação suave usando o valor do atributo 'href' do elemento clicado
});


$(window).on('scroll', () => {
    if (!ignoreScroll) {
    // Verifica se a rolagem não está sendo ignorada

        const scrollTop = $(this).scrollTop(); 
        // Obtém a posição atual da rolagem

        header.toggleClass('hidden', scrollTop > lastScrollTop);

        // Adiciona ou remove a classe 'hidden' do cabeçalho com base na direção da rolagem

        lastScrollTop = scrollTop; 
        // Atualiza a última posição da rolagem
    }
});


// =====================
// SCROLLING LINKS > END
// =====================



// =======================
// BUTTON MENU > BEGINNING
// =======================

const btnMenu = $('.menu-button');
const menu = $('#menu');

btnMenu.on('click', function(e) {
    $(this).toggleClass('active'); 
    // Alterna a classe 'active' no botão, que pode ser usada para estilizar o botão quando ele está ativo

    menu.toggleClass('show'); 
    // Alterna a classe 'show' no menu, mostrando ou escondendo o menu

    e.stopPropagation(); 
    // Impede a propagação do evento de clique para elementos pai, evitando que outros manipuladores de eventos sejam acionados
});


// =================
// BUTTON MENU > END
// =================


// ===============================================
// CLOSE THE MENU IF YOU CLICK OUTSIDE > BEGINNING
// ===============================================

$(document).on('click', function(e) {
    const clickMenu = menu.is(e.target) || menu.has(e.target).length > 0; 
    // Verifica se o elemento clicado é o menu ou se está dentro do menu

    const clickButton = btnMenu.is(e.target) || btnMenu.has(e.target).length > 0; 
    // Verifica se o elemento clicado é o botão do menu ou se está dentro do botão

    if (!clickMenu && !clickButton) { 
        // Se o clique não foi no menu nem no botão do menu

        menu.removeClass('show'); 
        // Remove a classe 'show' do menu, escondendo-o

        btnMenu.removeClass('active'); 
        // Remove a classe 'active' do botão do menu, revertendo seu estado
    }
});


// =========================================
// CLOSE THE MENU IF YOU CLICK OUTSIDE > END
// =========================================
