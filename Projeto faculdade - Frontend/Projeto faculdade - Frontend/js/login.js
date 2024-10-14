// =====================================
// CHECKS THE USER FILLED IN > BEGINNING
// =====================================

$('#loginForm').on('submit', function (e) {
    e.preventDefault(); 
    // Impede o envio padrão do formulário.

    let email = $('#loginEmail').val(); 
    // Obtém o valor do campo de email.

    let senha = $('#loginPassword').val(); 
    // Obtém o valor do campo de senha.

    if (email === '' || senha === '') {
    // Verifica se os campos de email ou senha estão vazios.
        $('#errorMessage').text('Usuário ou senha incorretos').show(); 
        // Exibe uma mensagem de erro se um dos campos estiver vazio.

        return; 
        // Interrompe a execução da função se houver erro.
    }

    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    // Obtém a lista de usuários armazenada no localStorage.

    let userValid = { nome: '', email: '', senha: '' };
    // Inicializa um objeto para armazenar dados do usuário válido.


    listaUser.forEach((item) => {
    // Procura pelo usuário com o email e senha fornecidos.

        if (email === item.emailCad && senha === item.senhaCad) {
            userValid = { nome: item.nomeCad, email: item.emailCad, senha: item.senhaCad };
            // Se encontrar um usuário correspondente, armazena os dados do usuário válido.
        }
    });


    if (email === userValid.email && senha === userValid.senha) {
    // Verifica se o usuário é válido com as credenciais fornecidas.

        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
        // Gera um token aleatório.

        localStorage.setItem('token', token); 
        // Armazena o token no localStorage.

        localStorage.setItem('userLogado', JSON.stringify(userValid)); 
        // Armazena os dados do usuário logado no localStorage.

        window.location.href = '/html/index.html'; 
        // Redireciona para a página inicial após login bem-sucedido.
    } else {
        $('#errorMessage').text('Usuário ou senha incorretos').show(); 
        // Exibe uma mensagem de erro se as credenciais forem inválidas.
    }
});

// ===============================
// CHECKS THE USER FILLED IN > END
// ===============================


// =============================
// CLEAR FILLED DATA > BEGINNING
// =============================

$('#clearLogin').on('click', function () {
    $('#loginForm')[0].reset(); 
    // Limpa todos os inputs do formulário de login.
    
    $('#errorMessage').text('').hide(); 
    // Limpa a mensagem de erro e a esconde.

    $('#loginMessage').text('').hide(); 
    // Limpa a mensagem de sucesso e a esconde.
});

// =======================
// CLEAR FILLED DATA > END
// =======================
