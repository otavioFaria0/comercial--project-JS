import { montarTabela } from '../funcoesback/listas.js';

const btnCarregar = document.getElementById('btnCarregar');

btnCarregar.addEventListener('click', () => {
    const tipo = document.getElementById('tipoLista').value;

    const dados = JSON.parse(localStorage.getItem(tipo)) || [];

    if (dados.length === 0)

    montarTabela(dados);
});


