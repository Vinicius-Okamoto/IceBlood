// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    valoresSensorAnalogico
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '127.0.0.1',
            user: 'lifesense',
            password: 'lifesense123',
            database: 'iceblood',
            port: 3306 // Inserindo os dados no banco virtualizado
        } 
    ).promise(); 

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorAnalogico = parseFloat(valores[0]);

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorAnalogico.push(sensorAnalogico);

        const obterHoraBrasiliaFormatada = () => {
        const data = new Date();
            // Usamos o toLocaleString com a opção 'timeZone' para um controle mais preciso do horário
            return data.toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '');
        }

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            const dataHoraAtual = obterHoraBrasiliaFormatada();

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'INSERT INTO registro (temperatura, dtHora, fkSensor) VALUES (?, ?, 1)',
                [sensorAnalogico + 10, dataHoraAtual]
            );
            console.log("valores inseridos no banco: ", sensorAnalogico + 10, dataHoraAtual);
            await poolBancoDados.execute(
                'INSERT INTO registro (temperatura, dtHora, fkSensor) VALUES (?, ?, 2)',
                [sensorAnalogico, dataHoraAtual]
            );
            console.log("valores inseridos no banco: ", sensorAnalogico, dataHoraAtual);
            await poolBancoDados.execute(
                'INSERT INTO registro (temperatura, dtHora, fkSensor) VALUES (?, ?, 3)',
                [sensorAnalogico - 10, dataHoraAtual]
            );
            console.log("valores inseridos no banco: ", sensorAnalogico - 10, dataHoraAtual);
        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorAnalogico
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresSensorAnalogico);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorAnalogico = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorAnalogico
    );

    // inicia o servidor web
    servidor(
        valoresSensorAnalogico
    );
})();