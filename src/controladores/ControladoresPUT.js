let { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

const verificacoes = require('../middleware/intermediario');

const atualizarUsuario = (req, res) => {

    let identificador = Number(req.params.numeroConta)

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    let conta = contas.find((conta) => {
        return conta.numero == identificador
    })

    if (nome) {
        let invalido = verificacoes.nomeInvalido(nome)
        if (invalido) {
            return res.status(400).json({ mensagem: "Por Favor, digite corretamente seu nome." })
        } else {
            conta.usuario.nome = nome;
        }
    }

    if (cpf) {
        let invalido = verificacoes.cpfInvalido(cpf)
        if (invalido) {
            return res.status(400).json({ mensagem: "Por Favor, digite corretamente seu cpf." })
        } else {
            conta.usuario.cpf = cpf;
        }
    }

    if (data_nascimento) {
        let invalido = verificacoes.dataInvalida(data_nascimento)
        if (invalido) {
            return res.status(400).json({ mensagem: "Por Favor, digite corretamente sua data de nascimento." })
        } else {
            conta.usuario.data_nascimento = data_nascimento;
        }
    }

    if (telefone) {
        let invalido = verificacoes.telefoneInvalido(telefone)
        if (invalido) {
            return res.status(400).json({ mensagem: "Por Favor, digite corretamente seu telefone." })
        } else {
            conta.usuario.telefone = telefone;
        }
    }

    if (email) {
        let invalido = verificacoes.emailInvalido(email)
        if (invalido) {
            return res.status(400).json({ mensagem: "Por Favor, digite corretamente seu email." })
        } else {
            conta.usuario.email = email;
        }
    }

    if (senha) {
        conta.usuario.senha = senha;
    }

    return res.status(201).json({ mensagem: "Conta atualizada com sucesso" }) ?? res.status(400).json({ mensagem: "Erro ao atualizar" })


};

module.exports = { atualizarUsuario };
