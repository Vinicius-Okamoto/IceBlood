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

        if (emailVar == "" || senhaVar == "") {
            erro_senha_login.innerHTML = "(Mensagem de erro para todos os campos em branco)";
            return false;
        }
        else {
            setInterval(5000)
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

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;

                    // if (emailVar == `suporte@gmail.com` || emailVar == `suporte2@gmail.com`) {
                    //     setTimeout(function () {
                    //     window.location = "./dashboard/bobIA.html";
                    // }, 1000);
                    // } else {
                    //     setTimeout(function () {
                        
                    //     window.location = "./dashboard/macroDash.html";
                    // }, 1000);
                    // }

                    setTimeout(function () {
                        
                        window.location = "./dashboard/macroDash.html";
                    }, 1000);

                });

            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
}