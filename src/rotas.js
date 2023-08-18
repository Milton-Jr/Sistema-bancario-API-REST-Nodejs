const express = require('express');
const rotas = express();

const { verificarInformacoes, verificacaoParaAtualizar } = require('./middleware/intermediario')
const { listarContas, consultarSaldo, exibirExtrato } = require('./controladores/ControladoresGET');
const { transferir, sacar, depositar, criarConta } = require('./controladores/ControladoresPOST');
const { deletarConta } = require('./controladores/ControladoresDELETE');
const { atualizarUsuario } = require('./controladores/ControladoresPUT');

rotas.get('/contas', listarContas);
rotas.post('/contas', verificarInformacoes, criarConta);
rotas.put('/contas/:numeroConta/usuario', verificacaoParaAtualizar, atualizarUsuario);
rotas.delete('/contas/:numeroConta', deletarConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', consultarSaldo);
rotas.get('/contas/extrato', exibirExtrato);




module.exports = rotas;


