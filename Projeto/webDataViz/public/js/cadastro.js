
function limparErros() {
    var erroNome = document.getElementById('erro_nome');
    var erroToken = document.getElementById('erro_token');
    var erroEmail = document.getElementById('erro_email');
    var erroSenha = document.getElementById('erro_senha');
    var erroConfirmarSenha = document.getElementById('erro_confirmar_senha');

    if (erroNome) {
        erroNome.innerHTML = '';
        erroNome.style.display = 'none';
    }
    if (erroToken) {
        erroToken.innerHTML = '';
        erroToken.style.display = 'none';
    }
    if (erroEmail) {
        erroEmail.innerHTML = '';
        erroEmail.style.display = 'none';
    }
    if (erroSenha) {
        erroSenha.innerHTML = '';
        erroSenha.style.display = 'none';
    }
    if (erroConfirmarSenha) {
        erroConfirmarSenha.innerHTML = '';
        erroConfirmarSenha.style.display = 'none';
    }
}

function validarCampos() {

    let valido = true;

    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_confirmarSenha.value;
    var tokenVar = ipt_token.value;

    if (nomeVar.length < 1) {
        document.getElementById('erro_nome').innerHTML = "Nome menor que 1 caractere.";
        document.getElementById('erro_nome').style.display = 'block';
        valido = false;
    }

    if (!emailVar.includes('@')) {
        document.getElementById('erro_email').innerHTML = "Email deve conter @.";
        document.getElementById('erro_email').style.display = 'block';
        valido = false
    }

    if (senhaVar.length < 6) {
        document.getElementById('erro_senha').innerHTML = "A senha deve conter no mínimo 6 caracteres.";
        document.getElementById('erro_senha').style.display = 'block';
        valido = false
    }

    if (senhaVar !== confirmacaoSenhaVar) {
        document.getElementById('erro_confirmar_senha').innerHTML = "As senhas não coincidem.";
        document.getElementById('erro_confirmar_senha').style.display = 'block';
        valido = false
    }

    if (tokenVar.length < 3) {
        document.getElementById('erro_token').innerHTML = "Token inválido.";
        document.getElementById('erro_token').style.display = 'block';
        valido = false;
    }
    return valido;
}

function cadastrar() {
    limparErros();

    if (!validarCampos()) {
        return false;
    }

    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var tokenVar = ipt_token.value;

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            tokenServer: tokenVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                setTimeout(() => {
                    window.location = "./login.html";
                }, "2000");
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}