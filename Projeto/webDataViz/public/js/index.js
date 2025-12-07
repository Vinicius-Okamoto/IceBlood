var VALOR_POR_BOLSA = 750;
var PERDA_BASE_SEM_SISTEMA = 0.20;
var REDUCAO_PERCENTUAL_NA_PERDA = 0.65;

function mostrar() {
    div_resultado.style.display = "block";
    publico()
}

function publico() {

    var nome = iptNome.value;
    var qtdBolsa = Number(iptQuantidade.value);
    var selectPeriodo = tipoGasto.value;

    var perdaBolsasMensal_SemSistema = qtdBolsa * PERDA_BASE_SEM_SISTEMA;
    var custoMensal_SemSistema = perdaBolsasMensal_SemSistema * VALOR_POR_BOLSA;

    var economiaBolsasMensal = (perdaBolsasMensal_SemSistema * REDUCAO_PERCENTUAL_NA_PERDA).toFixed(0);
    var economiaFinanceiraMensal = economiaBolsasMensal * VALOR_POR_BOLSA;

    var perdaBolsasMensal_ComSistema = perdaBolsasMensal_SemSistema - economiaBolsasMensal;
    var custoMensal_ComSistema = perdaBolsasMensal_ComSistema * VALOR_POR_BOLSA;


    var perdaBolsasAnual_SemSistema = (perdaBolsasMensal_SemSistema * 12);
    var custoAnual_SemSistema = custoMensal_SemSistema * 12;

    var economiaBolsasAnual = (economiaBolsasMensal * 12);
    var economiaFinanceiraAnual = economiaFinanceiraMensal * 12;

    var perdaBolsasAnual_ComSistema = perdaBolsasMensal_ComSistema * 12;
    var custoAnual_ComSistema = custoMensal_ComSistema * 12;

    while (nome === '' || qtdBolsa <= 0 || selectPeriodo === '') {
        div_resultado.innerHTML = '<b>Por favor, preencha o nome, a quantidade e selecione o período!<b/>';
        return;
    }

    if (selectPeriodo == 'mensal') {
        div_resultado.innerHTML = `

        Olá, ${nome}! A simulação para ${qtdBolsa} bolsas armazenadas foi realizada. <br><br>


           <b>Situação Atual (Sem Monitoramento)</b> <br>

           <p>Perda Média: <i>20%</i><p/>
           <p>Descarte Mensal: <i>${perdaBolsasMensal_SemSistema.toFixed(0)} bolsas</i><p/>
            <p>Prejuízo: <i>R$${custoMensal_SemSistema.toFixed(2)}/mês</i><p/>
            <p class="fonte">(Fonte: ANVISA)</p><br>

       <b>Com Monitoramento</b><br>

       <p>Redução de Perdas: <i>65% </i><p/>
       <p>Bolsas Economizadas: <i>${economiaBolsasMensal} bolsas/mês</i><p/>
       <p>Economia Financeira Direta: <i>R$${economiaFinanceiraMensal.toFixed(2)}/mês</i><p/>
       <p class="fonte">(Fonte: CURIOUS)</p><br>
       <b class="final">A Nova Perda Remanescente seria de <i>${perdaBolsasMensal_ComSistema.toFixed(0)} bolsas</i>, com custo de  <i>R$${custoMensal_ComSistema.toFixed(2)}</i>.<b/><br><br>

        <a href="#contatos">
            <button class id="btnContato">
                Contrate nossos serviços...
            </button>  
        </a>

   `;
    }

    if (selectPeriodo == 'anual') {
        div_resultado.innerHTML = `
       Olá, ${nome}! A simulação para ${qtdBolsa} bolsas armazenadas foi realizada. <br><br>


           <b>Situação Atual (Sem Monitoramento)</b> <br>

           <p>Perda Média: <i>20%</i><p/>
           <p>Descarte Anual: <i>${perdaBolsasAnual_SemSistema.toFixed(0)} bolsas</i><p/>
            <p>Prejuízo: <i>R$${custoAnual_SemSistema.toFixed(2)}/ano</i><p/>
            <p class="fonte">(Fonte: ANVISA)</p><br>

       <b>Com Monitoramento</b><br>

       <p>Redução de Perdas: <i>65% </i><p/>
       <p>Bolsas Economizadas: <i>${economiaBolsasAnual} bolsas/mês</i><p/>
       <p>Economia Financeira Direta: <i>R$${economiaFinanceiraAnual.toFixed(2)}/mês</i><p/>
       <p class="fonte">(Fonte: CURIOUS)</p><br>
       <b class="final">A Nova Perda Remanescente seria de <i>${perdaBolsasAnual_ComSistema.toFixed(0)} bolsas</i>, com custo de  <i>R$${custoAnual_ComSistema.toFixed(2)}</i>.<b/><br><br><br>
       <a href="#contatos">
            <button class id="btnContato">
                Contrate nossos serviços...
            </button>  
        </a>

   `;
    }

    /*   Resumo de Perdas Mensais e Economia com Monitoramento
    
    Situação Atual (Sem Monitoramento - 20% de perda):
    
    Perda: 60 bolsas/mês
    
    Prejuízo: R$45.000,00/mês
    
    Com Monitoramento (Redução de 65% na perda):
    
    Economia: 39 bolsas/mês
    
    Ganho Financeiro Direto: R$29.250,00/mês
    
    Nova Perda Remanescente: 21 bolsas (Custo: R$15.750,00)*/

}

function enviar() {
    var email = document.getElementById('inputEmail');
    var mensagem = document.getElementById('inputMsg');

    fetch("/enviar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: email.value,
            mensagemServer: mensagem.value,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    email.value = '';
    mensagem.value = '';
    return false;
}