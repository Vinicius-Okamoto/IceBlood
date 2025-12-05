var alertas = [];

function obterDadosTemperatura() {

    fetch(`/dashboard/temperaturas/${token}/${idCamara}`, { cache: 'no-store' })
        .then(response => {
            if (!response.ok) {
                console.error("Erro no fetch");
                return;
            }

            return response.json();
        })
        .then(dados => {
            if (!dados || dados.length == 0) return;

            let ultimoRegistro = dados[dados.length - 1];

            alertar(ultimoRegistro, idCamara);

            plotarGraficoTemperatura(dados);
            carregarGraficoAlertas(dados);
            atualizarKPIs(dados);
        })
        .catch(error => {
            console.error("Erro na API:", error);
        });
}
function alertar(dados, idCamara) {

    let temp = Number(dados.tempAtual);
    let min = Number(dados.tempMin);
    let max = Number(dados.tempMax);

    let mensagem = "";
    let classe = "";

    if (temp < min) {
        mensagem = "Temperatura ABAIXO do limite";
        classe = "alerta-frio";
        exibirAlerta(idCamara, temp, mensagem, classe);
    }
    else if (temp > max) {
        mensagem = "Temperatura ACIMA do limite";
        classe = "alerta-quente";
        exibirAlerta(idCamara, temp, mensagem, classe);
    }
    else {
        removerAlerta(idCamara);
    }
}
function exibirAlerta(idCamara, temp, mensagem, classe) {
    let idx = alertas.findIndex(a => a.idCamara == idCamara);

    if (idx >= 0) {
        alertas[idx] = { idCamara, temp, mensagem, classe };
    } else {
        alertas.push({ idCamara, temp, mensagem, classe });
    }

    exibirCards();
}

function removerAlerta(idCamara) {
    alertas = alertas.filter(a => a.idCamara != idCamara);
    exibirCards();
}
function exibirCards() {
    let el = document.getElementById("alerta");
    if (!el) return;

    el.style.display = alertas.length > 0 ? "block" : "none";
    el.innerHTML = "";

    alertas.forEach(a => {
        el.innerHTML += transformarEmDiv(a);
    });
}

function transformarEmDiv({ idCamara, temp, mensagem, classe }) {
    return `
        <div class="mensagem-alarme ${classe}">
            <strong>Câmara ${idCamara}</strong><br>
            ${mensagem}<br>
            Temperatura: ${temp}°C
        </div>
    `;
}
