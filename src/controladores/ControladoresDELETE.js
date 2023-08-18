let { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

const deletarConta = (req, res) => {

    let identificador = Number(req.params.numeroConta)

    let usuarioExistente = contas.find((conta) => {
        return conta.numero == identificador
    });

    if (!usuarioExistente) {
        return res.status(404).json({ mensagem: "Não foi encontrada nenhuma conta com o numero informado." })
    }

    if (usuarioExistente.saldo > 0) {
        return res.status(400).json({ mensagem: "Não é possivel excluir a conta pois a mesma possuí saldo em conta." })
    }


    let indice = contas.findIndex((conta) => {
        return conta.numero === identificador
    });


    if (indice !== -1) {
        contas.splice(indice, 1)

        return res.status(200).json({ mensagem: "Conta excluída com sucesso" });

    } else {
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor." })
    }

};

module.exports = { deletarConta };
