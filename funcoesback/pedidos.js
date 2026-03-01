 import { salvarDados, buscarLista, limparLista} from "./locstorage.js";
 import { buscarCliente, editarCliente} from './clientes.js';
 import { buscarProduto, editarProduto} from './produtos.js'


let indicePedidos = {};
let pedidos = [];

export function inicializacaoPedidos(){
        indicePedidos = {};
        pedidos = buscarLista('pedidos') || [];

        for (let i = 0; i < pedidos.length; i++){
            const pedido = pedidos[i];

            indicePedidos[pedido.id] = pedido;
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
    } 
    else if (produto.estoque < quantidade){
        alert('Estoque insuficiente.');
        return false;
    } 
    else if (!produto.ativo){
        alert('Produto inativo.');
        return false;
    } 
    else if (cliente.status === 'PENDENTE'){
        alert('Cliente está com pendência.');
        return false;
    }
    
    
    const id = Number(localStorage.getItem('maiorIdPedidos')) || 1;

    const valor = quantidade *produto.preco;

    const data = new Date().toLocaleString();

    const pedido = {
        id: id,
        cliente: cliente.id,
        produto: produto.id,
        quantidade: quantidade,
        valor: valor,
        data: data,
        status: 'PENDENTE'
    }
    
    pedidos.unshift(pedido);
    indicePedidos[id]= pedido;
    
    editarCliente('id', idCliente, 'status', 'PENDENTE');
    salvarDados('pedidos' , pedidos);
    localStorage.setItem('maiorIdPedidos' , id + 1);

    return pedido;
}

export function buscarPedido(idDoPedido){
        return indicePedidos[idDoPedido];
}

export function confirmarPedidos(idDoPedido){
    const pedido = buscarPedido(idDoPedido);
    
    if (!pedido){
        alert('Pedido nao encontrado');
        return false;
    }
    
    if (pedido.status === 'CONFIRMADO' || pedido.status === 'CANCELADO'){
        alert('Pedido já foi processado.');
        return false;
    }
    
    const produto = buscarProduto('id' , pedido.produto);

    const novoEstoque = produto.estoque - pedido.quantidade;

    editarCliente('id', pedido.cliente, 'status', 'CONFIRMADO');
    editarProduto(pedido.produto, 'estoque', novoEstoque);  
    
    pedido.status = 'CONFIRMADO';
    indicePedidos[idDoPedido] = pedido;
    salvarDados('pedidos' , pedidos);

    return true;
}

export function cancelarPedidos(idDoPedido){
    const pedido = buscarPedido(idDoPedido);
    
    if (!pedido){
        alert('Pedido nao encontrado');
        return;
    }

    editarCliente('id', pedido.cliente, 'status', 'ABERTO');
    pedido.status = 'CANCELADO';
    indicePedidos[idDoPedido] = pedido;
    salvarDados('pedidos' , pedidos);
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