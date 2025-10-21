function cadastrar(){
        var cnpj = iptCNPJ.value.length;
        var email = iptEmail.value;
        var senha = iptSenha.value;
        if(cnpj<0 || cnpj> 10){
            alert('Preencha o campo cnpj corretamente...');
        }else if(!email.includes('@')){
            alert('Insira um email valido...');
        }else if(senha<0){
            alert('Insira uma senha valida...');
        }else{
             window.location.href = "institucional.html";
        }
    }