function cadastrar(){
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
    

    if(nome == ''){
        erroNome.innerHTML = 'Preencha o campo nome.';
    }
    if(token == ''){
        erroToken.innerHTML = 'Preencha o campo token.';
    }
    if(email == ''){
        erroEmail.innerHTML = 'Preencha o campo email.';
    }
    if(senha == ''){
        erroSenha.innerHTML = 'Preencha o campo senha.';
    }
    if(confirmarSenha == ''){
        erroConfirmarSenha.innerHTML = 'Preencha o campo confirmar senha.';
    }
}