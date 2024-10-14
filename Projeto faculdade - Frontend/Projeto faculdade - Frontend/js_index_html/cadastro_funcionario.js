// =======================
// INPUT MASKS > BEGINNING
// =======================

$('#cpf').mask('000.000.000-00');
$('#rg').mask('00.000.000-0');
$('#data_nasc').mask('00/00/0000');
$('#cep').mask('00000-000');
$('#numero').mask('00000');

// =================
// INPUT MASKS > END
// =================


// ===========================
// FORM VALIDATION > BEGINNING
// ===========================

$('#nome_funcionario').on('input', function () {
    let value = $(this).val();
    $(this).val(value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''));
});
// Campo nome só aceita letras e letras acentuadas

$('input, select, textarea').on('keyup change', function () {
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
        case 'nome_funcionario':
            if (value.length === 0) {
                errorMsg = 'Nome do funcionário é obrigatório.';
            } else if (value.length < 15) {
                errorMsg = 'Nome do funcionário deve ter no mínimo 15 caracteres';
            }
            break;

        case 'rg':
            const rgPattern = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
            if (value.length === 0) {
                errorMsg = 'RG é obrigatório.';
            } else if (!rgPattern.test(value)) {
                errorMsg = 'RG inválido. Formato esperado: 00.000.000-0';
            }
            break;

        case 'cpf':
            if (value.length === 0) {
                errorMsg = 'CPF é obrigatório.';
            } else if (!validateCPF(value)) {
                errorMsg = 'CPF inválido.';
            }
            break;

        case 'data_nasc':
            const dataPattern = /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/]\d{4}$/;
            if (value.length === 0) {
                errorMsg = 'Data de Nascimento é obrigatória.';
            } else if (!dataPattern.test(value)) {
                errorMsg = 'Data de Nascimento inválida. Formato esperado: DD/MM/AAAA';
            }
            break;

        case 'turno':
            if (value.length === 0) {
                errorMsg = 'Turno Disponível é obrigatório.';
            }
            break;

        case 'grau_escolaridade':
            if (value.length === 0) {
                errorMsg = 'Grau de Escolaridade é obrigatório.';
            }
            break;

        case 'sexo':
            if (value.length === 0) {
                errorMsg = 'Sexo é obrigatório.';
            }
            break;

        case 'cep':
            const cepPattern = /^\d{5}-\d{3}$/;
            if (value.length === 0) {
                errorMsg = 'CEP é obrigatório.';
            } else if (!cepPattern.test(value)) {
                errorMsg = 'CEP inválido. Formato esperado: 00000-000';
            }
            break;

        case 'numero':
            if (value.length === 0) {
                errorMsg = 'Número é obrigatório.';
            }
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
    // Impede o envio padrão do formulário .

    let isValid = true; 
    // Inicializa a variável isValid como verdadeira para rastrear a validade dos campos.

    $('input, select').each(function () {
        // Itera sobre cada campo de entrada e seleção no formulário

        if (!validateField(this)) {
            isValid = false; 
            // Se a validação do campo falhar, define isValid como falso.
        }
    });

    $('.spans').each(function () {
        // Verifica se as mensagens de erro estão vazias
        if ($(this).text() !== '') {
            isValid = false; 
            // Se houver uma mensagem de erro visível, define isValid como falso.
        }
    });

    if (isValid) {

        let listaFuncionarios = JSON.parse(localStorage.getItem('listaFuncionarios') || '[]');

        // Obtendo os valores dos campos com jQuery
        let nomeFuncionario = $('#nome_funcionario').val();
        let rg = $('#rg').val();
        let cpf = $('#cpf').val();
        let dataNasc = $('#data_nasc').val();
        let turno = $('#turno').val();
        let grauEscolaridade = $('#grau_escolaridade').val();
        let sexo = $('#sexo').val();
        let cep = $('#cep').val();
        let rua = $('#rua').val();
        let bairro = $('#bairro').val();
        let cidade = $('#cidade').val();
        let numero = $('#numero').val();
        let complemento = $('#complemento').val();

        
        let cpfExists = listaFuncionarios.some(func => func.cpf === cpf);
        // Verifica se o CPF já está cadastrado

        if (cpfExists) {
            $('#successMessage').text('CPF já cadastrado!').css('color', 'red').show();
            // Se o CPF já existir, exibe uma mensagem de erro em vermelho informando que o CPF já está cadastrado.

            return; 
            // Interrompe a execução da função para evitar cadastro duplicado.
        }
        
        listaFuncionarios.push({
            nomeFuncionario: nomeFuncionario,
            rg: rg,
            cpf: cpf,
            dataNasc: dataNasc,
            turno: turno,
            grauEscolaridade: grauEscolaridade,
            sexo: sexo,
            cep: cep,
            rua: rua,
            bairro: bairro,
            cidade: cidade,
            numero: numero,
            complemento: complemento
        });
        // Adiciona um novo funcionário à lista de funcionários com os dados fornecidos

        localStorage.setItem('listaFuncionarios', JSON.stringify(listaFuncionarios));
        // Armazena a lista de funcionários no localStorage, convertendo o array em uma string JSON        

        $('#successMessage').text('Cadastro realizado com sucesso!').css('color', 'green').show(); 
        // Exibe a mensagem de sucesso

        $('#form')[0].reset(); 
        // Limpa todos os inputs

        setTimeout(function () {
            $('#successMessage').hide();
        }, 3000); 
        // 3000 milissegundos = 3 segundos

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
    $('#form')[0].reset(); // Limpa todos os inputs
    $('.spans').text(''); // Limpa todas as mensagens de erro
    $('#successMessage').text('').hide(); // Esconde a mensagem de sucesso
});

// =======================
// CLEAR FORM FIELDS > END
// =======================