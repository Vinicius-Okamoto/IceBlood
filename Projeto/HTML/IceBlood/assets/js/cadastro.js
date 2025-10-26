
function limparErros() {

    var erroNome = document.getElementById('erro_nome');
    var erroToken = document.getElementById('erro_token');
    var erroEmail = document.getElementById('erro_email');
    var erroSenha = document.getElementById('erro_senha');
    var erroConfirmarSenha = document.getElementById('erro_confirmar-senha');

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
    var nome = document.getElementById('ipt_nome').value;
    var token = document.getElementById('ipt_token').value;
    var email = document.getElementById('ipt_email').value;
    var senha = document.getElementById('ipt_senha').value;
    var confirmarSenha = document.getElementById('ipt_confirmarSenha').value;

    var erroNome = document.getElementById('erro_nome');
    var erroToken = document.getElementById('erro_token');
    var erroEmail = document.getElementById('erro_email');
    var erroSenha = document.getElementById('erro_senha');
    var erroConfirmarSenha = document.getElementById('erro_confirmar-senha');

    var erro = 0;

    if (nome === '') {
        erroNome.innerHTML = 'Preencha o campo nome.';
        erroNome.style.display = 'block';
        erro = 1;
    }
    if (token === '') {
        erroToken.innerHTML = 'Preencha o campo token.';
        erroToken.style.display = 'block';
        erro = 1;
    }
    if (email === '' || !email.includes('@') || !email.includes('.')) {
        erroEmail.innerHTML = 'Insira um e-mail válido.';
        erroEmail.style.display = 'block';
        erro = 1;
    }
    if (senha === '') {
        erroSenha.innerHTML = 'Preencha o campo senha.';
        erroSenha.style.display = 'block';
        erro = 1;
    } else if (senha.length < 6) {
        erroSenha.innerHTML = 'A senha deve ter pelo menos 6 caracteres.';
        erroSenha.style.display = 'block';
        erro = 1;
    }
    if (confirmarSenha === '') {
        erroConfirmarSenha.innerHTML = 'Preencha o campo confirmar senha.';
        erroConfirmarSenha.style.display = 'block';
        erro = 1;
    } else if (senha !== confirmarSenha) { 
        erroConfirmarSenha.innerHTML = 'As senhas estão diferentes.';
        erroConfirmarSenha.style.display = 'block';
        erro = 1;
    }

    if (erro === 0) {
        document.getElementById('cadastro-realizado').style.display = 'flex';
    }

}