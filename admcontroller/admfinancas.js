import { calcularTotalVendido , calcularTotalEstoque } from "../funcoesback/financas.js";

document.addEventListener("DOMContentLoaded", () => {

    const campoVendido = document.getElementById("totalVendido");
    const total = calcularTotalVendido();
    if (total !== null) {
        campoVendido.textContent = `Nenhum pedido confirmado.`;
    }
    campoVendido.textContent = `${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;


    const campoEstoque = document.getElementById("totalEstoque");
    const estoque = calcularTotalEstoque();

    if (estoque !== null) {
        campoEstoque.textContent = `Nenhum produto em estoque.`;
    }
    campoEstoque.textContent = `${estoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
});