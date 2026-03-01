import { inicializacao } from '../funcoesback/clientes.js';
import { inicializacaoProdutos } from '../funcoesback/produtos.js';
import { inicializacaoPedidos, gerarPedido, buscarPedido, confirmarPedidos, cancelarPedidos } from '../funcoesback/pedidos.js';

inicializacao();
inicializacaoProdutos();
inicializacaoPedidos();

const btnGerar = document.getElementById('btnGerar');

btnGerar.addEventListener('click', () => {
    
    const idCliente = Number(document.getElementById('idCliente').value);
    const idProduto = Number(document.getElementById('idProduto').value);
    const quantidade = Number(document.getElementById('quantidade').value);

    if (!idCliente || !idProduto || !quantidade){
        alert('Preencha todos os campos!');
        return;
    }
    
    const pedido = gerarPedido(idCliente, idProduto, quantidade);
    
    if (!pedido) return;
    
    const resultado = document.getElementById('resultadoGerar');
    resultado.textContent =
        `Pedido gerado com sucesso!
    ID: ${pedido.id}
    Cliente: ${idCliente}
    Produto: ${idProduto}
    Quantidade: ${quantidade}
    Valor: ${pedido.valor}
    Data: ${pedido.data.toLocaleString()}`;
    const hidden1 = document.getElementById('hidden1');
    hidden1.classList.remove('hidden');
});


const btnBuscar = document.getElementById('btnBuscar');

btnBuscar.addEventListener('click', () => {
    const idPedido = Number(document.getElementById('idPedidoBuscar').value);

    const pedido = buscarPedido(idPedido);

    if (!pedido){
        alert('Pedido não encontrado!');
        return;
    }

    const resultado = document.getElementById('resultadoBusca');
    resultado.innerHTML = `
    ID: ${pedido.id}
    Cliente: ${pedido.cliente}
    Produto: ${pedido.produto}
    Quantidade: ${pedido.quantidade}
    Valor: ${pedido.valor}
    Data: ${pedido.data}
    Status: ${pedido.status}
    `;
    const hidden2 = document.getElementById('hidden2');
    hidden2.classList.remove('hidden');
});

const btnConfirmar = document.getElementById('btnConfirmar');

btnConfirmar.addEventListener('click', () => {
    const idPedido = Number(document.getElementById('idPedidoConfirmarCancelar').value);

    if (idPedido === null || isNaN(idPedido)) {
        alert('Por favor, insira um ID de pedido válido.');
        return;
    }

    if (confirmarPedidos(idPedido) === false) return;
    
    const resultado = document.getElementById('resultadoConfirmacao');
    resultado.innerHTML = `
    Pedido confirmado com sucesso!
    ID: ${idPedido}
    `;
});

const btnCancelar = document.getElementById('btnCancelar');

btnCancelar.addEventListener('click', () => {
    const idPedido = Number(document.getElementById('idPedidoConfirmarCancelar').value);

    if (idPedido === null || isNaN(idPedido)) {
        alert('Por favor, insira um ID de pedido válido.');
        return;
    }

    if (cancelarPedidos(idPedido)) return;
    
    const resultado = document.getElementById('resultadoConfirmacao');
    resultado.innerHTML = `
    Pedido cancelado com sucesso!
    ID: ${idPedido}
    `;
});