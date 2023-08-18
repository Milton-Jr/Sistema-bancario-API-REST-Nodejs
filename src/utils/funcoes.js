
const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');


const cpfExistente = (cpf) => {
    let validarCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    });

    if (validarCpf) {
        return true
    }
};

const emailExistente = (email) => {
    let validarEmail = contas.find((conta) => {
        return conta.usuario.email === email
    });

    if (validarEmail) {
        return true
    }
}

const nomeInvalido = (nome) => {
    if (!nome || !isNaN(Number(nome))) {
        return true
    }
};

const cpfInvalido = (cpf) => {
    if (!cpf || isNaN(Number(cpf)) || cpf.length !== 11) {
        return true
    };
}

const dataInvalida = (data_nascimento) => {
    if (!data_nascimento || isNaN(Number(data_nascimento.replaceAll('-', '')))) {
        return true
    }
};

const telefoneInvalido = (telefone) => {
    if (!telefone || isNaN(Number(telefone))) {
        return true
    }

};

const emailInvalido = (email) => {
    if (!email || !isNaN(Number(email))) {
        return true
    }
};


module.exports = {
    emailExistente,
    emailInvalido,
    cpfExistente,
    cpfInvalido,
    nomeInvalido,
    telefoneInvalido,
    dataInvalida
};