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

function cadastrar() {
    limparErros();
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_confirmarSenha.value;
    var tokenVar = ipt_token.value;
    var mensagem_erro = document.getElementById('mensagem_erro');

    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == "" ||
        tokenVar == ""
    ) {
        mensagem_erro.innerHTML = "Preencha todos os campos.";
        return false;
    } else {
        setInterval(5000);
    }

    if (nomeVar.length < 1) {
        erro_nome.innerHTML = "Nome menor que 1 caractere.";
        erro_nome.style.display = 'block';
        return false;
    } if (!emailVar.includes('@')) {
        erro_email.innerHTML = "Email deve conter @.";
        erro_email.style.display = 'block';
        return false;
    } if (senhaVar.length < 6) {
        erro_senha.innerHTML = "A senha deve conter no mínimo 6 caracteres."
        erro_senha.style.display = 'block';
        return false;
    } if (senhaVar !== confirmacaoSenhaVar) {
        erro_confirmarSenha.innerHTML = "As senhas não coincidem.";
        erro_confirmarSenha.style.display = 'block';
        return false;
    } if (tokenVar.length < 3) {
        erro_token.innerHTML = "Token inválido.";
        erro_token.style.display = "block";
        return false;
    }
    else {
        setInterval(5000);
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            fkUnidadeServer: tokenVar
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