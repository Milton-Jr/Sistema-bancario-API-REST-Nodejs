let { banco, contas, saques, depositos, transferencias } = require('../bancodedados')


const listarContas = (req, res) => {

    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'o usuário não está autenticado(logado)' })
    }
    // achei que aqui ou no de cima seria um 403.
    if (senha_banco !== banco.senha) {
        return res.status(401).json({ mensagem: 'o usuário não está autenticado(logado)' })
    }

    if (senha_banco === banco.senha) {
        return res.status(200).json(contas)
    }

    return res.status(500).json({ mensagem: 'erro inesperado do servidor' })
};


const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Por favor, informe o numero da conta." })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "Por favor, informe a senha da conta." })
    }

    let conta = contas.find((conta) => {
        return conta.numero == numero_conta
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "Não existe nenhuma conta com o numero informado" })
    }

    if (senha != conta.usuario.senha) {
        return res.status(400).json({ mensagem: "A Senha informada está incorreta" })
    }

    let saldo = conta.saldo

    return res.status(200).json({ saldo: saldo })


};


const exibirExtrato = (req, res) => {
    
    let transferenciasEnviadas = [];
    let transferenciasRecebidas = [];

    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Por favor, informe o numero da conta." })
    };

    if (!senha) {
        return res.status(400).json({ mensagem: "Por favor, informe a senha da conta." })
    };

    let conta = contas.find((conta) => {
        return conta.numero == numero_conta
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "Não existe nenhuma conta com o numero informado" })
    };

    if (senha != conta.usuario.senha) {
        return res.status(400).json({ mensagem: "A Senha informada está incorreta" })
    };

    depositosFeitos = depositos.filter((deposito) => {
        return deposito.numero_conta == numero_conta
    });

    saquesFeitos = saques.filter((saque) => {
        return saque.numero_conta == numero_conta
    });

    for (let item of transferencias) {
        if (item.numero_conta_origem == numero_conta) {
            transferenciasEnviadas.push(item)
        }
    };

    for (let item of transferencias) {
        if (item.numero_conta_destino == numero_conta) {
            transferenciasRecebidas.push(item)
        }
    }

    let extrato = {
        depositos: depositosFeitos,
        saques:saquesFeitos,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    return res.status(200).json(extrato)


};



module.exports = { listarContas, consultarSaldo, exibirExtrato }
