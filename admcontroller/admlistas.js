import { montarTabela } from '../funcoesback/listas.js';
import { quickSort } from '../funcoesback/quickSort.js';
import { buscarLista } from '../funcoesback/locstorage.js';

const btnCarregar = document.getElementById('btnCarregar');

btnCarregar.addEventListener('click', () => {
    const tipo = document.getElementById('tipoLista').value;
    
    if (tipo === 'clientes') {
        const selectOrdenacaoProdutos = document.getElementById('ordenacaoProdutos');
        selectOrdenacaoProdutos.classList.add('hidden');
        const selectOrdenacaoPedidos = document.getElementById('ordenacaoPedidos');
        selectOrdenacaoPedidos.classList.add('hidden');

        const selectOrdenacao = document.getElementById('ordenacaoClientes');
        selectOrdenacao.classList.remove('hidden');

        let dados = buscarLista('clientes');
        const criterio = selectOrdenacao.value;

        if (criterio === 'nome') {
            dados = quickSort(dados, 'nome');
        } 
        else if (criterio === 'id') {
            dados = quickSort(dados, 'id');}

        montarTabela(dados);
    
    } else if (tipo === 'produtos') {
        const selectOrdenacaoClientes = document.getElementById('ordenacaoClientes');
        selectOrdenacaoClientes.classList.add('hidden');
        const selectOrdenacaoPedidos = document.getElementById('ordenacaoPedidos');
        selectOrdenacaoPedidos.classList.add('hidden');


        const selectOrdenacao = document.getElementById('ordenacaoProdutos');
        selectOrdenacao.classList.remove('hidden');

        let dados = buscarLista('produtos');
        const criterio = selectOrdenacao.value;

        if (criterio === 'nome') {
            dados = quickSort(dados, 'nome');
        } 
        else if (criterio === 'id') {
            dados = quickSort(dados, 'id');

        } 

        montarTabela(dados);
        
        } else if (tipo === 'pedidos') {
        const selectOrdenacaoClientes = document.getElementById('ordenacaoClientes');
        selectOrdenacaoClientes.classList.add('hidden');

        const selectOrdenacaoProdutos = document.getElementById('ordenacaoProdutos');
        selectOrdenacaoProdutos.classList.add('hidden');

        const selectOrdenacaoPedidos = document.getElementById('ordenacaoPedidos');
        selectOrdenacaoPedidos.classList.remove('hidden');


        let dados = buscarLista('pedidos');
        const criterio = selectOrdenacaoPedidos.value;

        if (criterio === 'valor') {
            dados = quickSort(dados, 'valor');
        } 
        else if (criterio === 'id') {
            dados = quickSort(dados, 'id');

        } 
        if (criterio === 'data') {
            dados = quickSort(dados, 'data');
        }
        montarTabela(dados);
    } 
});


