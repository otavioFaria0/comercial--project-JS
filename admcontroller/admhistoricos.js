import { mostrarLogs } from '../funcoesback/logSistema.js';

const btnCarregarLogs = document.getElementById('btnCarregarLogs');

btnCarregarLogs.addEventListener('click', () => {
    const tipo = document.getElementById('tipoLista').value;

    if (tipo === 'todos') {

        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        mostrarLogs(logs);

    } else if (tipo === 'clientes') {

        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const logsFiltrados = logs.filter(log => log.tipo === 'CLIENTE');

        mostrarLogs(logsFiltrados);

    } else if (tipo === 'produtos') {

        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const logsFiltrados = logs.filter(log => log.tipo === 'PRODUTO');

        mostrarLogs(logsFiltrados);

    } else if (tipo === 'pedidos') {

        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const logsFiltrados = logs.filter(log => log.tipo === 'PEDIDO');

        mostrarLogs(logsFiltrados);

    } 
});