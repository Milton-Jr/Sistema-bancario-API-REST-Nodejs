let { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

let { format } = require('date-fns')

let numero = 1;

const criarConta = (req, res) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const novaConta = {
        numero,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    numero++

    if (novaConta) {
        
        contas.push(novaConta)

        return res.status(201).send(novaConta)
    } else {
        return res.status(400).json({ mensagem: 'Erro ao cadastrar' })
    }
};


const depositar = (req, res) => {

    let destino = Number(req.body.numero_conta);

    let valorDeposito = req.body.valor;

    let usuarioExistente = contas.find((conta) => {
        return conta.numero == destino
    });

    if (isNaN(destino) || !destino) {
        return res.status(400).json({ mensagem: "Por favor, digite o numero da conta corretamente." })
    }

    if (isNaN(valorDeposito) || !valorDeposito) {
        return res.status(400).json({ mensagem: "Por favor, digite o valor do deposito corretamente." })
    }

    if (!usuarioExistente) {
        return res.status(404).json({ mensagem: "Não foi encontrado nenhum usuario com o numero da conta informado." })
    }

    if (valorDeposito <= 0) {
        return res.status(400).json({ mensagem: "Não é possivel depositar um valor negativo e/ou nulo" })
    } else {
        usuarioExistente.saldo += valorDeposito;
    }


    let extratoDeposito = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta: destino,
        valor: valorDeposito
    };

    depositos.push(extratoDeposito)

    return res.status(200).json({ mensagem: "Depósito realizado com sucesso" })


};


const sacar = (req, res) => {

    let origemSaque = Number(req.body.numero_conta);
    let valorSaque = req.body.valor;
    let { senha } = req.body;

    if (isNaN(origemSaque) || !origemSaque) {
        return res.status(400).json({ mensagem: "Por favor, digite o numero da conta corretamente." })
    }

    if (isNaN(valorSaque) || !valorSaque) {
        return res.status(400).json({ mensagem: "Por favor, digite o valor do saque corretamente." })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "Por favor, digite a senha da conta." })
    }

    let usuarioExistente = contas.find((conta) => {
        return conta.numero == origemSaque
    });

    if (!usuarioExistente) {
        return res.status(404).json({ mensagem: "Não foi encontrado nenhum usuario com o numero da conta informado." })
    }

    if (usuarioExistente.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "A Senha informada está incorreta" })
    }

    if (valorSaque > usuarioExistente.saldo) {
        return res.status(400).json({ mensagem: "Não é possivel sacar um valor maior que o seu saldo" })
    }

    if (valorSaque <= 0) {
        return res.status(400).json({ mensagem: "Não é possivel sacar um valor negativo e/ou nulo" })
    } else {
        usuarioExistente.saldo -= valorSaque;
    }

    let extratoSaque = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta: origemSaque,
        valor: valorSaque
    };

    saques.push(extratoSaque)

    return res.status(200).json({ mensagem: "Saque realizado com sucesso" })

};


const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: "Por favor, insira corretamente os dados necessarios para a transferencia." })
    }

    let numeroOrigemExiste = contas.find((conta) => {
        return conta.numero == numero_conta_origem
    });

    if (!numeroOrigemExiste) {
        return res.status(404).json({ mensagem: "Nenhum conta com o numero de origem foi encontrada." })
    };

    let numeroDestinoExiste = contas.find((conta) => {
        return conta.numero == numero_conta_destino
    });

    if (!numeroDestinoExiste) {
        return res.status(404).json({ mensagem: "Nenhum conta com o numero de destino foi encontrada." })
    };

    if (senha !== numeroOrigemExiste.usuario.senha) {
        return res.status(400).json({ mensagem: "A Senha informada está incorreta." })
    };

    if (valor > numeroOrigemExiste.saldo || valor <= 0) {
        return res.status(400).json({ mensagem: "Não foi possivel realizar a transferencia pois o valor informado é maior que o saldo da conta ou é negativo/nulo." })
    } else {
        numeroOrigemExiste.saldo -= valor;
        numeroDestinoExiste.saldo += valor;
    }

    let extratoTransferencia = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor,
    }

    transferencias.push(extratoTransferencia);

    return res.status(200).json({ mensagem: "Transferência realizado com sucesso" })


};

module.exports = { criarConta, depositar, sacar, transferir};

