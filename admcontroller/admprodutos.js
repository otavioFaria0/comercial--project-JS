import { inicializacaoProdutos, criarProduto, buscarProduto, editarProduto, apagarProduto } from '../funcoesback/produtos.js'

inicializacaoProdutos();

const btnCriar = document.getElementById('btnCriar');

btnCriar.addEventListener('click', () => {
    const nomeProduto = document.getElementById('nome').value;
    const precoProduto = document.getElementById('preco').value;
    const categoria = document.getElementById('categoria').value;
    const estoque = document.getElementById('estoque').value;

    if (nomeProduto === '' || precoProduto === '' || categoria === '' || estoque === '') {
        alert('Por favor, preencha todos os campos');
        return;
    }

    criarProduto(nomeProduto, precoProduto, estoque, categoria);

    const produto = buscarProduto('nome', nomeProduto);

    const avisoCriar = document.getElementById('avisoCriar');
    avisoCriar.innerHTML = `Produto criado! | ID: ${produto.id}`;

    const popup = document.getElementById('avisoCriar');
    popup.classList.remove('hidden');

});

const fecharAviso = document.getElementById('fecharAviso');

fecharAviso.addEventListener('click', () => {
    const popup = document.getElementById('avisoCriar');
    popup.classList.add('hidden');
});

const btnBuscar = document.getElementById('btnBuscar');

btnBuscar.addEventListener('click', () => {
    const tipoDeBusca = document.getElementById('tipoBusca').value;
    const valor = document.getElementById('buscaValor').value;

    const produto = buscarProduto(tipoDeBusca, valor);
    
    if (produto){
        console.log(`Resultado da busca pelo ${tipoDeBusca} "${valor}"`);
        console.log("ID: ", produto.id);
        console.log("Nome: ", produto.nome);
        console.log("Preco: ", produto.preco);
        console.log("Categoria: ", produto.categoria);
        console.log("Estoque: ", produto.estoque);
        console.log("Ativo: ", produto.ativo);
    } else {
        alert ('Produto não encontrado.');
        return;
    }

    const avisoConteudo = document.getElementById('avisoConteudo');
    avisoConteudo.innerHTML = `ID: ${produto.id} |
    Nome: ${produto.nome} |
    Preco: ${produto.preco} |
    Categoria: ${produto.categoria} |
    Estoque: ${produto.estoque} |
    Ativo: ${produto.ativo}`;

    const popup = document.getElementById('avisoBuscar');
    popup.classList.remove('hidden');
});

const fecharAvisoBuscar = document.getElementById('fecharAvisoBuscar');

fecharAvisoBuscar.addEventListener('click', () => {
    const popup = document.getElementById('avisoBuscar');
    popup.classList.add('hidden');
});



const btnEditar = document.getElementById('btnEditar');

btnEditar.addEventListener('click', () => {
    const idDoProduto = document.getElementById('editarBusca').value;
    const mudanca = document.getElementById('campo').value;
    const dadoNovo = document.getElementById('novoValor').value;

    const avisoConteudo = document.getElementById('avisoConteudoEditar');
    
    if (idDoProduto != '' || mudanca != '' || dadoNovo != ''){
        let produto = buscarProduto('id', idDoProduto);
        avisoConteudo.innerHTML = `ID: ${produto.id} |
        Nome: ${produto.nome} |
        Preco: ${produto.preco} |
        Categoria: ${produto.categoria} |
        Estoque: ${produto.estoque} |
        Ativo: ${produto.ativo}`;

        editarProduto(idDoProduto, mudanca, dadoNovo)
    } else {
        alert('Por favor, preencha todos os campos');
        return;
    }
    const popup = document.getElementById('avisoEditar');
    popup.classList.remove('hidden');

    const avisoConteudo2 = document.getElementById('avisoConteudoEditar2');
    const dadoAlterado = mudanca.toUpperCase();
    avisoConteudo2.innerHTML = `
        NOVO DADO → ${dadoAlterado} = ${dadoNovo}
    `;
});

const fecharAvisoEditar = document.getElementById('fecharAvisoEditar');

fecharAvisoEditar.addEventListener('click', () => {
    const popup = document.getElementById('avisoEditar');
    popup.classList.add('hidden');
});



const btnApagar = document.getElementById('btnApagar');
let idPendenteExclusao = null;

btnApagar.addEventListener('click', () => {
    const idDoProduto = document.getElementById('apagarId').value;
    const produto = buscarProduto('id', idDoProduto);

    if (!produto) {
        alert('Produto nao encontrado.');
        return;
    }

    const avisoConteudoApagar = document.getElementById('avisoConteudoApagar');
    avisoConteudoApagar.innerHTML = `ID: ${produto.id} |
    Nome: ${produto.nome} |
    Preco: ${produto.preco} |
    Categoria: ${produto.categoria} |
    Estoque: ${produto.estoque} |
    Ativo: ${produto.ativo}`;

    const popup = document.getElementById('avisoApagar');
    popup.classList.remove('hidden');

    idPendenteExclusao = idDoProduto;
});


const fecharAvisoApagar = document.getElementById('fecharAvisoApagar');

fecharAvisoApagar.addEventListener('click', () => {
    if (idPendenteExclusao !== null) {
        apagarProduto(idPendenteExclusao);
        idPendenteExclusao = null;
    }

    const popup = document.getElementById('avisoApagar');
    popup.classList.add('hidden');
});

const btnCancelarExclusao = document.getElementById('cancelarAviso');

btnCancelarExclusao.addEventListener('click', () => {
    idPendenteExclusao = null;
    document.getElementById('avisoApagar').classList.add('hidden');
});
