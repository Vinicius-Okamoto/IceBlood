
var VALOR_POR_BOLSA = 750; 
var PERDA_BASE_SEM_SISTEMA = 0.20; 
var REDUCAO_PERCENTUAL_NA_PERDA = 0.65;

function publico() {
    
    var nome = iptNome.value;
    var qtdBolsa = Number(iptQuantidade.value); 
    var selectPeriodo = tipoGasto.value; 

    

    var perdaBolsasMensal_SemSistema = qtdBolsa * PERDA_BASE_SEM_SISTEMA;
    var custoMensal_SemSistema = perdaBolsasMensal_SemSistema * VALOR_POR_BOLSA;

   
    var economiaBolsasMensal = perdaBolsasMensal_SemSistema * REDUCAO_PERCENTUAL_NA_PERDA;
    var economiaFinanceiraMensal = economiaBolsasMensal * VALOR_POR_BOLSA;

   
    var perdaBolsasMensal_ComSistema = perdaBolsasMensal_SemSistema - economiaBolsasMensal;
    var custoMensal_ComSistema = custoMensal_SemSistema - economiaFinanceiraMensal;
    

    
    var perdaBolsasAnual_SemSistema = perdaBolsasMensal_SemSistema * 12;
    var custoAnual_SemSistema = custoMensal_SemSistema * 12;

    var economiaBolsasAnual = economiaBolsasMensal * 12;
    var economiaFinanceiraAnual = economiaFinanceiraMensal * 12;

    var perdaBolsasAnual_ComSistema = perdaBolsasMensal_ComSistema * 12;
    var custoAnual_ComSistema = custoMensal_ComSistema * 12;
    
    
    

    
    
    while (nome === '' || qtdBolsa <= 0 || selectPeriodo === '') {
        div_resultado.innerHTML = '<p>Por favor, preencha o nome, a quantidade e selecione o período!<p/>';
        break;    
    }

    if (selectPeriodo == 'mensal') {
       div_resultado.innerHTML = `

        Olá, ${nome} ! A simulação para ${qtdBolsa} bolsas armazenadas foi realizada. <br><br>

       <p><strong>SIMULAÇÃO DE PERDAS MENSAIS</strong></p>
       <p>
           <b>1. Sem Monitoramento (Risco Alto):</b> <br>
           Com base na média de perdas de 20%, sua instituição descartaria aproximadamente <b style="color: red;">${perdaBolsasMensal_SemSistema.toFixed(0)}</b> bolsas mensalmente, gerando um prejuízo de <b style="color: red;">R$${custoMensal_SemSistema.toFixed(2)}</b>.
       </p><br>
       
       <p>
           <b>2. Com a Solução de Monitoramento:</b> <br>
           Considerando uma redução de 65% no descarte (com base em estudos), sua instituição economizaria <b style="color: green;">${economiaBolsasMensal.toFixed(0)}</b> bolsas.
       </p><br>

       <p>
           <b>ECONOMIA FINANCEIRA MENSAL:</b> <br>
           Essa economia representa um ganho direto de <b style="color: green;">R$${economiaFinanceiraMensal.toFixed(2)}</b> no seu orçamento! A nova perda seria de <b style="color: orange;">${perdaBolsasMensal_ComSistema.toFixed(0)}</b> bolsas, com custo remanescente de R$${custoMensal_ComSistema.toFixed(2)}.
       </p><br>
   `;
   }

   if (selectPeriodo == 'anual') {
        div_resultado.innerHTML = `
       <p><strong>SIMULAÇÃO DE PERDAS ANUAIS</strong></p>

       <p>
           <b>1. Sem Monitoramento (Risco Alto):</b> <br>
           Com base na média de perdas de 20%, sua instituição descartaria aproximadamente <b style="color: red;">${perdaBolsasAnual_SemSistema.toFixed(0)}</b> bolsas anualmente, gerando um prejuízo de <b style="color: red;">R$${custoAnual_SemSistema.toFixed(2)}</b>.
       </p><br>
       
       <p>
           <b>2. Com a Solução de Monitoramento:</b> <br>
           Considerando uma redução de 65% no descarte (com base em estudos), sua instituição economizaria <b style="color: green;">${economiaBolsasAnual.toFixed(0)}</b> bolsas.
       </p><br>

       <p>
           <b>ECONOMIA FINANCEIRA MENSAL:</b> <br>
           Essa economia representa um ganho direto de <b style="color: green;">R$${economiaFinanceiraAnual.toFixed(2)}</b> no seu orçamento! A nova perda seria de <b style="color: orange;">${perdaBolsasAnual_ComSistema.toFixed(0)}</b> bolsas, com custo remanescente de R$${custoAnual_ComSistema.toFixed(2)}.
       </p><br>
   `;
   }

}
