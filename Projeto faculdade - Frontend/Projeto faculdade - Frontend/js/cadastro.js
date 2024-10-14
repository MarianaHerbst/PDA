// ===================================
// SHOW OR HIDE THE HEADER > BEGINNING
// ===================================

const header = $('header');
let ignoreScroll = false;
let lastScrollTop = 0;
let scrollTimeout;

$(window).on('scroll', function () {
    if (ignoreScroll) return;
    // Se a variável "ignoreScroll" estiver definida, a função é interrompida, ignorando o evento de rolagem.

    const scrollTop = $(this).scrollTop();
    // Captura a posição atual da rolagem vertical da janela.

    header.toggleClass('hidden', scrollTop > lastScrollTop);
    // Se a rolagem for para baixo (scrollTop maior que lastScrollTop), a classe "hidden" será adicionada,
    // ocultando o header. Caso contrário, a classe é removida.

    lastScrollTop = scrollTop;
    // Atualiza o valor de "lastScrollTop" com a posição atual da rolagem para ser comparada na próxima iteração.
});


// =============================
// SHOW OR HIDE THE HEADER > END
// =============================


// =======================
// INPUT MASKS > BEGINNING
// =======================

$('#cep').mask('00000-000');
$('#telefone').mask('(00) 0000-0000');
$('#celular').mask('(00) 00000-0000');
$('#cnpj').mask('00.000.000/0000-00');
$('#numero').mask('00000');

// =================
// INPUT MASKS > END
// =================


// ===========================
// FORM VALIDATION > BEGINNING
// ===========================

$('#name').on('input', function () {
    let value = $(this).val();
    $(this).val(value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''));
});
// Campo nome só aceita letras e letras acentuadas


$('input').on('keyup', function () {
    validateField(this);
});
// Validação de campos do formulário assim que se digita algo


function validateField(field) {
    const value = $(field).val().trim(); 
    // Captura o valor do campo de entrada, remove espaços em branco no início e no final.
    
    const fieldName = $(field).attr('name'); 
    // Obtém o atributo 'name' do campo para identificar qual campo está sendo validado.
    
    let errorMsg = ''; 
    // Inicializa uma variável para armazenar a mensagem de erro caso o valor do campo não seja válido.
    

    switch (fieldName) {
        case 'name':
            errorMsg = value.length === 0 ? 'Nome da empresa é obrigatório.' : '';
            break;
        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errorMsg = value.length === 0 ? 'Email é obrigatório.' : !emailPattern.test(value) ? 'Email inválido.' : '';
            break;
        case 'password':
            errorMsg = value.length !== 8 ? 'A senha deve ter 8 caracteres.' : '';
            break;
        case 'password-confirm':
            errorMsg = value !== $('#password').val() ? 'As senhas não coincidem.' : '';
            break;
        case 'cnpj':
            errorMsg = value.length === 0 ? 'CNPJ é obrigatório.' : !validateCNPJ(value) ? 'CNPJ inválido.' : '';
            break;
        case 'cep':
            const cepPattern = /^\d{5}-\d{3}$/;
            errorMsg = value.length === 0 ? 'CEP é obrigatório.' : !cepPattern.test(value) ? 'CEP inválido. Formato esperado: 00000-000' : '';
            break;
        case 'numero':
            errorMsg = value.length === 0 ? 'Número é obrigatório.' : '';
            break;
        case 'telefone':
        case 'celular':
            const telefonePattern = fieldName === 'telefone' ? /^\(\d{2}\) \d{4}-\d{4}$/ : /^\(\d{2}\) \d{5}-\d{4}$/;
            errorMsg = value.length === 0 ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} é obrigatório.` :
                        !telefonePattern.test(value) ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} inválido.` : '';
            break;
        default:
            break;
    }

    $(field).next('.spans').text(errorMsg); 
    // Atualiza o texto do próximo elemento com a classe 'spans' que está após o campo, exibindo a mensagem de erro, se houver.
    
    return errorMsg.length === 0; 
    // Retorna true se não houver mensagens de erro, indicando que o campo é válido; caso contrário, retorna false.
    
}

// =====================
// FORM VALIDATION > END
// =====================


// =============================
// HANDLING THE FORM > BEGINNING
// =============================

$('#form').on('submit', function (e) {
    e.preventDefault(); 
    // Impede o comportamento padrão do evento
    
    let isValid = true; 
    // Inicializa uma variável isValid como verdadeira, que será usada para acompanhar se todos os campos são válidos.
    
    $('input').each(function () {
    // Itera sobre cada elemento de entrada (input) na página.

        if (!validateField(this)) {
        // Chama a função validateField para validar o campo atual. 

            isValid = false;
            // Se a validação falhar, define isValid como falso.
        }
    });
    
    // Verifica se as mensagens de erro estão vazias
    $('.spans').each(function () {
        // Itera sobre cada elemento com a classe 'spans' na página.
        if ($(this).text() !== '') {
            // Se a mensagem de erro (texto) não estiver vazia, define isValid como falso.
            isValid = false;
        }
    });
    

    if (isValid) {
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

        let formData = {
            nomeCad: $('#name').val(),
            emailCad: $('#email').val(),
            senhaCad: $('#password').val(),
            cnpjCad: $('#cnpj').val(),
            cepCad: $('#cep').val(),
            estadoCad: $('#estado').val(),
            cidadeCad: $('#cidade').val(),
            bairroCad: $('#bairro').val(),
            ruaCad: $('#rua').val(),
            numeroCad: $('#numero').val(),
            complementoCad: $('#complemento').val(),
            telefoneCad: $('#telefone').val(),
            celularCad: $('#celular').val()
        };
        // Obtendo os valores dos campos
        
        if (listaUser.some(user => user.emailCad === formData.emailCad)) {
            $('#emailError').text('Email já cadastrado!').css('color', 'red');
            return;
        }
        // Verifica se o email já está cadastrado

        listaUser.push(formData); 
        // Adiciona os dados do formulário (formData) ao array listaUser, que armazena informações de usuários.
        
        localStorage.setItem('listaUser', JSON.stringify(listaUser)); 
        // Converte o array listaUser em uma string JSON e armazena no localStorage com a chave 'listaUser', permitindo que os dados sejam persistidos no navegador.
        

        $('#successMessage').text('Cadastro realizado com sucesso!').css('color', 'green').show();
        $('#form')[0].reset(); 
        // Limpa o formulário

        $('.spans').text(''); 
        // Limpa as mensagens de erro

        setTimeout(function () {
            $('#successMessage').text('').hide(); 
            // Esconde a mensagem de sucesso
            window.location.href = "./login.html";
        }, 2000);
    } else {
        $('#successMessage').hide(); 
        // Oculta a mensagem de sucesso se houver erro
    }
});

// =======================
// HANDLING THE FORM > END
// =======================

// =============================
// CLEAR FORM FIELDS > BEGINNING
// =============================

$('#clearBtn').on('click', function () {
    $('#form')[0].reset(); 
    // Limpa todos os inputs

    $('.spans').text(''); 
    // Limpa todas as mensagens de erro

    $('#successMessage').text('').hide(); 
    // Esconde a mensagem de sucesso
});

// =======================
// CLEAR FORM FIELDS > END
// =======================
