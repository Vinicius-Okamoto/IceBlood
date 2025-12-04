function limparErros() {
    var erroEmail = document.getElementById('erro_email_login');
    var erroSenha = document.getElementById('erro_senha_login');

    if (erroEmail) {
        erroEmail.innerHTML = '';
        erroEmail.style.display = 'none';
    }
    if (erroSenha) {
        erroSenha.innerHTML = '';
        erroSenha.style.display = 'none';
    }
}   

function entrar() {
    limparErros();

    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "") {
        document.getElementById('erro_email_login').innerHTML = "Preencha o campo email.";
        document.getElementById('erro_email_login').style.display = "block";
        return false;
    }

    if (senhaVar == "") {
        document.getElementById('erro_senha_login').innerHTML = "Preencha o campo senha.";
        document.getElementById('erro_senha_login').style.display = "block";
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

     fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        resposta.json().then(json => {
            console.log(json);
            console.log(JSON.stringify(json));

            if (resposta.ok) {
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.token = json.token;

                if (emailVar == `carlostevez@gmail.com` && senhaVar == `carlos123`) {
                    setTimeout(function () {
                        window.location = "./dashboard/macroDashSuporte.html";
                    }, 1000);
                } else {
                    setTimeout(function () {
                        window.location = "./dashboard/macroDash.html";
                    }, 1000);
                }

            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                console.error(json);
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    })
}