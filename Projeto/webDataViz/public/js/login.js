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

function acessar() {
    limparErros();

    var emailCorreto = 'iceblood@gmail.com';
    var senhaCorreta = 'iceblood123';

    var email = document.getElementById('iptEmail').value;
    var senha = document.getElementById('iptSenha').value;

    var erroEmail = document.getElementById('erro_email_login');
    var erroSenha = document.getElementById('erro_senha_login');

    var erro = 0;

    if (email == '' || !email.includes('@') || !email.includes('.')) {
        erroEmail.innerHTML = 'Insira um e-mail válido.';
        erroEmail.style.display = 'block';
        erro = 1;
    }
    if (senha == '') {
        erroSenha.innerHTML = 'Preencha o campo senha.';
        erroSenha.style.display = 'block';
        erro = 1;
    }
    if (senha.length < 6) {
        erroSenha.innerHTML = 'Insira uma senha válida.';
        erroSenha.style.display = 'block';
        erro = 1;
    }
    if (erro == 0) {
        if (senha == senhaCorreta && email == emailCorreto) {
            window.location.href = '../pages/macroDash.html';
        }
        else {
            erroSenha.innerHTML = 'Senha ou email incorretos';
            erroSenha.style.display = 'block';
            erroEmail.innerHTML = 'Senha ou email incorretos';
            erroEmail.style.display = 'block';
        }
    }
}