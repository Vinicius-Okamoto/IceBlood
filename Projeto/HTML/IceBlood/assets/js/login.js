function acessar(){
        var keyCNPJ ='101010';
        var keySenha = '123456';
        var CNPJ = iptCNPJ.value;
        var psw = iptSenha.value;
        var email = iptEmail.value
        if(CNPJ == ''){
            alert ('Preencha o campo CNPJ...')
        }else if(email == ''){
            alert('Preencha o campo email...')
        }
        else if(psw == ''){
            alert ('Preencha o campo senha...') 
        }
        else if(keyCNPJ != CNPJ || keySenha != psw){
            alert('CNPJ e Senha não correspondem...')
            return;
        }else{
            window.location.href = "dashboard.html";
        }
    }