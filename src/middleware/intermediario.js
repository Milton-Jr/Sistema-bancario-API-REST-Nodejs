const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

const { emailExistente, emailInvalido, cpfExistente, cpfInvalido, nomeInvalido, telefoneInvalido, dataInvalida } = require('../utils/funcoes')

const verificarInformacoes = (req, res, next) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(404).json({ mensagem: "Por Favor, para cadastrar sua conta, insira seu: Nome, cpf, data de nascimento, telefone, email e a senha desejada." })
    }

    if (nomeInvalido(nome)) {
        return res.status(400).json({ mensagem: "Por Favor, digite corretamente seu nome." })
    }

    if (cpfInvalido(cpf)) {
        return res.status(400).json({ mensagem: "Cpf Inválido, Por Favor digite apenas números e verifique se está correto." })
    }
    if (dataInvalida(data_nascimento)) {
        return res.status(400).json({ mensagem: "Data de Nascimento inválida, Por favor, digite no seguinte formato separado por traços: 'Ano - Mes - Dia'" })
    }
    if (telefoneInvalido(telefone)) {
        return res.status(400).json({ mensagem: "Numero de telefone invalido, por favor, insira apenas números e verifique se o DDD está incluso." })
    }
    if (emailInvalido(email)) {

        return res.status(400).json({ mensagem: "Email inválido, por favor, escreva seu email corretamente." })

    } else {
        let indexArroba = email.indexOf('@');
        let indexPonto = email.indexOf('.', indexArroba + 1);
        if (indexArroba === -1 || indexPonto === -1) {
            return res.status(400).json({ mensagem: "Email inválido, não esqueça do arroba (@) ou do ponto (.com)" })
        }
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "Por favor, digite uma senha para a segurança de sua conta." })

    }

    if (cpfExistente(cpf)) {
        return res.status(400).json({ mensagem: "O Cpf informado já foi cadastrado por um de nossos clientes." })
    }

    if (emailExistente(email)) {
        return res.status(400).json({ mensagem: "O Email informado já foi cadastrado por um de nossos clientes." })
    }


    return next()
};

const verificacaoParaAtualizar = (req, res, next) => {
    const identificador = Number(req.params.numeroConta)
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    let usuarioExistente = contas.find((conta) => {
        return conta.numero == identificador
    })

    if (!usuarioExistente) {
        return res.status(404).json({ mensagem: "Não existe nenhum usuario com o numero inserido" })
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(404).json({ mensagem: "Não foi solicitado nenhuma mudança" })
    }

    if (cpf) {
        let cpfJaExiste = cpfExistente(cpf)
        if (cpfJaExiste) {
            return res.status(400).json({ mensagem: "O Cpf informado já foi cadastrado por um de nossos clientes." })
        }
    }

    if (email) {
        let emailJaExiste = emailExistente(email);
        if (emailJaExiste) {
            return res.status(400).json({ mensagem: "O Email informado já foi cadastrado por um de nossos clientes." })
        }
    }

    return next()

};

module.exports = { cpfExistente, emailExistente, verificarInformacoes, verificacaoParaAtualizar, nomeInvalido, cpfInvalido, emailInvalido, telefoneInvalido, dataInvalida }