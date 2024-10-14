// =======================================
// OBTAINING DATA FROM THE CEP > BEGINNING
// =======================================

$('#cep').on('blur', function () {
    const cep = $(this).val().replace(/\D/g, '');
    if (cep.length === 8) {
        $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
            if (!data.erro) {
                $('#rua').val(data.logradouro).trigger('keyup');
                $('#bairro').val(data.bairro).trigger('keyup');
                $('#cidade').val(data.localidade).trigger('keyup');
                $('#estado').val(data.uf).trigger('keyup');
                $('#cep').next('.spans').text('');
            } else {
                $('#rua, #bairro, #cidade, #estado').val('');
                $('#cep').next('.spans').text('CEP não encontrado.');
            }
        }).fail(function () {
            $('#rua, #bairro, #cidade, #estado').val('');
            $('#cep').next('.spans').text('Erro ao buscar o CEP.');
        });
    } else if (cep.length === 0) {
        $('#cep').next('.spans').text('CEP é obrigatório.');
        $('#rua, #bairro, #cidade, #estado').val('');
    } else {
        $('#cep').next('.spans').text('CEP inválido.');
        $('#rua, #bairro, #cidade, #estado').val('');
    }
});

// =================================
// OBTAINING DATA FROM THE CEP > END
// =================================


// ===========================
// CNPJ VALIDATION > BEGINNING
// ===========================

function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0, pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size += 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
};

// =====================
// CNPJ VALIDATION > END
// =====================