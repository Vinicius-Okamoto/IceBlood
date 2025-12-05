var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) res.status(400).send("Seu email está undefined!");
    if (senha == undefined) res.status(400).send("Sua senha está indefinida!");
    else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        return res.json({
                            id: resultadoAutenticar[0].id,
                            nomeUsuario: resultadoAutenticar[0].nomeUsuario,
                            emailUsuario: resultadoAutenticar[0].emailUsuario,
                            senhaUsuario: resultadoAutenticar[0].senhaUsuario,
                            idUnidade: resultadoAutenticar[0].idUnidade,
                            tokenUnidade: resultadoAutenticar[0].tokenUnidade,
                            nomeUnidade: resultadoAutenticar[0].nomeUnidade
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var token = req.body.tokenServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (token == undefined) {
        res.status(400).send("Seu token a vincular está undefined!");
    } else {
        usuarioModel.buscarPorToken(token)
            .then(resultadoToken => {
                if (resultadoToken.length == 0) {
                    return console.log("Token inválido!")
                }

                const idUnidade = resultadoToken[0].idUnidade;

                return usuarioModel.cadastrar(nome, email, senha, idUnidade);
            })
            .then(resultadoCadastro => {
                res.json({
                    mensagem: "Usuário cadastrado com sucesso!",
                    dados: resultadoCadastro
                });
            })
            .catch(erro => {
                console.log("Erro no cadastro:", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
}