const { GoogleGenAI } = require("@google/genai");

const chatIA = new GoogleGenAI({
    apiKey: process.env.MINHA_CHAVE
});

async function gerarResposta(mensagem) {

    try {
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Em um paragráfo responda: ${mensagem}`

        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function perguntar(req, res) {
    const { pergunta } = req.body;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

module.exports = { perguntar };