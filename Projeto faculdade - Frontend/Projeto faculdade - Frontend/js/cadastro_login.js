// =====================
// FONT SIZE = BEGINNING
// =====================

const maxFontSize = 12;
const minFontSize = 8;

function changeFontSize(action) {
    $('html, body').each(function () {
        let size = parseInt($(this).css('font-size'));
        // Obtém o tamanho da fonte atual (convertido para número inteiro).

        if (action === 'aumentar' && size < maxFontSize) {
        // Se a ação for 'aumentar' e o tamanho da fonte for menor que o máximo permitido,

            $(this).css('font-size', size + 1);
            // aumenta o tamanho da fonte em 1 unidade.

        } else if (action === 'diminuir' && size > minFontSize) {
          // Se a ação for 'diminuir' e o tamanho da fonte for maior que o mínimo permitido,

            $(this).css('font-size', size - 1);
            // diminui o tamanho da fonte em 1 unidade.
        }
    });
}


$('#increase-font').click(function () {
    changeFontSize('aumentar');
    handleFontSizeChange();
});

$('#decrease-font').click(function () {
    changeFontSize('diminuir');
    handleFontSizeChange();
});

function handleFontSizeChange() {
// Função para ativar/desativar o ignoreScroll enquanto os botões de tamanho de texto são pressionados

    clearTimeout(scrollTimeout); 
    // Limpa o timeout anterior se o usuário continuar clicando

    ignoreScroll = true; 
    // Ignora o scroll enquanto os botões são clicados

    scrollTimeout = setTimeout(function () {
        ignoreScroll = false;
    }, 300);
    // Define um timeout para reativar o comportamento de scroll após 300 milisegundos de inatividade
}

// ===============
// FONT SIZE = END
// ===============


// ===============================
// DARK AND LIGHT MODE > BEGINNING
// ===============================

const iconDL = $('#mode-icon');
const htmlElement = $('html');

iconDL.on('click', function () {
    htmlElement.toggleClass("light");

    if (iconDL.hasClass('fa-moon')) {
        iconDL.removeClass('fa-moon').addClass('fa-sun');
    } else {
        iconDL.removeClass('fa-sun').addClass('fa-moon');
    }
});

// =========================
// DARK AND LIGHT MODE > END
// =========================