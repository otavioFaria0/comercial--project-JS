import { inicializacao } from '../funcoesback/clientes.js';
import { inicializacaoProdutos } from '../funcoesback/produtos.js';
import { inicializacaoPedidos, gerarPedido, buscarPedido } from '../funcoesback/pedidos.js';

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
    Cliente: ${idCliente}
    Produto: ${idProduto}
    Quantidade: ${quantidade}
    Valor: ${pedido.valor}
    Data: ${pedido.data}`;
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
    `;
    const hidden2 = document.getElementById('hidden2');
    hidden2.classList.remove('hidden');
});
