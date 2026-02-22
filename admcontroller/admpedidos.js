import { inicializacao } from '../funcoesback/clientes.js';
import { inicializacaoProdutos } from '../funcoesback/produtos.js';
import { inicializacaoPedidos, gerarPedido } from '../funcoesback/pedidos.js';

inicializacao();
inicializacaoProdutos();
inicializacaoPedidos();

const resultado = document.getElementById('resultado');
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

    resultado.textContent =
        `Pedido gerado com sucesso!
    Cliente: ${idCliente}
    Produto: ${idProduto}
    Quantidade: ${quantidade}
    Valor: ${pedido.valor}
    Data: ${pedido.data}`;
});