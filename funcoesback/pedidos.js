 import { salvarDados, buscarLista, limparLista} from "./locstorage.js";
 import { buscarCliente} from './clientes.js';
 import { buscarProduto, editarProduto} from './produtos.js'


let indicePedidos = {};
let pedidos = [];
let pedidosPorCliente = {};

export function inicializacaoPedidos(){
        indicePedidos = {};
        pedidosPorCliente = {};
        pedidos = buscarLista('pedidos') || [];

        for (let i = 0; i < pedidos.length; i++){
            const pedido = pedidos[i];

            indicePedidos[pedido.id] = pedido;

            if (!pedidosPorCliente[pedido.cliente]) {
                pedidosPorCliente[pedido.cliente] = [];
            }

            pedidosPorCliente[pedido.cliente].push(pedido);
        }
    }


export function gerarPedido(idCliente, idProduto, quantidade){
    if (quantidade <= 0){
        alert('Quantidade inválida');
        return;
    }   

    const cliente = buscarCliente('id', idCliente);
    const produto = buscarProduto('id' , idProduto);

    if (validarClienteEObjeto(cliente, produto) === false) { return };
    if (quantidade <= 0){
        alert('Quantidade inválida.');
        return false;
    } else if (produto.estoque < quantidade){
        alert('Estoque insuficiente.');
        return false;
    } else if (!produto.ativo){
        alert('Produto inativo.');
        return false;
    } 
    
    
    const id = Number(localStorage.getItem('maiorIdPedidos')) || 1;

    const valor = quantidade *produto.preco;
    const novoEstoque = produto.estoque - quantidade;

    const data = new Date();

    const pedido = {
        id: id,
        cliente: cliente.id,
        produto: produto.id,
        quantidade: quantidade,
        valor: valor,
        data: data,
        status: 'ABERTO'
    }

    editarProduto(idProduto, 'estoque', novoEstoque);

    pedidos.unshift(pedido);
    indicePedidos[id]= pedido;
    pedidosPorCliente[pedido.cliente].unshift(pedido);

    salvarDados('pedidos' , pedidos);
    localStorage.setItem('maiorIdPedidos' , id + 1);

    return pedido;
}

export function buscarPedido(idDoPedido){
        return indicePedidos[idDoPedido];
}

export function confirmarPedidos(idDoPedido){
    const pedido = buscarPedido(idDoPedido);
    const cliente = buscarCliente('id', pedido.cliente);

    if (!pedido){
        alert('Pedido nao encontrado');
        return;
    }

    
    
}


function validarClienteEObjeto(cliente,produto){
    if (!cliente){
    alert('Cliente não encontrado');
    return false;
}

if (!produto){
    alert('Produto não encontrado');
    return false;
}

return true;
}