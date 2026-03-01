import { buscarLista } from "./locstorage.js";

export function calcularTotalVendido(){
    let totalVendido = 0;

    let pedidos = buscarLista('pedidos') || []; 

    for (let i = 0; i < pedidos.length; i++){
        if (pedidos[i].status === "CONFIRMADO"){
            totalVendido += Number(pedidos[i].valor);
        }
    }

    return totalVendido;
}

export function calcularTotalEstoque(){
    let totalEstoque = 0;

    let produtos = buscarLista('produtos') || []; 

    for (let i = 0; i < produtos.length; i++){
        let valorProduto = Number(produtos[i].preco) * Number(produtos[i].estoque);
        totalEstoque += valorProduto;
    }

    return totalEstoque;
}