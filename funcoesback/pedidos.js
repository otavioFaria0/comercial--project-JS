 import { salvarDados, buscarLista, limparLista} from "./locstorage.js";
 import { buscarCliente, editarCliente} from './clientes.js';
 import { buscarProduto, editarProduto} from './produtos.js'
import { logSistema } from "./logSistema.js";


let indicePedidos = {};
let pedidos = [];
let totalVendido = 0;

export function inicializacaoPedidos(){
        indicePedidos = {};
        pedidos = buscarLista('pedidos') || [];

        for (let i = 0; i < pedidos.length; i++){
            const pedido = pedidos[i];

            indicePedidos[pedido.id] = pedido;

            if (pedido.status === 'CONFIRMADO'){
                totalVendido += pedido.valor;
            }
        }
        return totalVendido;
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
    else if (cliente.status === 'AGUARDANDO'){
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
    
    logSistema('PEDIDO', 'GERAR', id, `Pedido gerado para Cliente ${cliente.id}, Produto ${produto.id}`, null, pedido, data);
    
    const novoEstoque = produto.estoque - pedido.quantidade;

    editarProduto(pedido.produto, 'estoque', novoEstoque);
    editarCliente('id', idCliente, 'status', 'AGUARDANDO');
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

    logSistema('PEDIDO', 'CONFIRMAR', idDoPedido, `Pedido confirmado para Cliente ${pedido.cliente}, Produto ${pedido.produto}`, 'PENDENTE', 'CONFIRMADO', undefined);

    editarCliente('id', pedido.cliente, 'status', 'CONFIRMADO');  
    
    pedido.status = 'CONFIRMADO';
    indicePedidos[idDoPedido] = pedido;
    salvarDados('pedidos' , pedidos);

    return true;
}

export function cancelarPedidos(idDoPedido){
    const pedido = buscarPedido(idDoPedido);
    const produto = buscarProduto('id', pedido.produto);
    
    if (!pedido){
        alert('Pedido nao encontrado');
        return;
    }

    if (pedido.status === 'CONFIRMADO' || pedido.status === 'CANCELADO'){
        alert('Pedido já foi processado.');
        return false;
    }

    logSistema('PEDIDO', 'CANCELAR', idDoPedido, `Pedido cancelado para Cliente ${pedido.cliente}, Produto ${pedido.produto}`, 'PENDENTE', 'CANCELADO', undefined);
    editarProduto(pedido.produto, 'estoque', produto.estoque + pedido.quantidade);
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