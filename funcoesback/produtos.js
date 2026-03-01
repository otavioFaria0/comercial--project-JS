import { salvarDados, buscarLista, limparLista} from "./locstorage.js";
import { logSistema } from "./logSistema.js";

    let indicePorIdProdutos = {};
    let indicePorNomeProdutos = {};
    let produtos = [];

    export function inicializacaoProdutos(){
        indicePorIdProdutos = {};
        indicePorNomeProdutos = {};
        produtos = buscarLista('produtos');

        for (let i = 0; i < produtos.length; i++){
            const nomeFormatado = formatarNome(produtos[i].nome);

            indicePorIdProdutos[produtos[i].id] = produtos[i];
            indicePorNomeProdutos[nomeFormatado] = produtos[i];
        }
    }

export function criarProduto(nome, preco, estoque, categoria){
    
    const id = Number(localStorage.getItem('maiorIdProdutos')) || 1;

    nome = formatarNome(nome);

    let ativo = true;

    // validações individuais por campo
    const dadosValidos = validarCampos(nome, preco, estoque, categoria);

    if (Number(estoque) === 0){
        ativo=false;
    }

    
    const produto = {
        nome: dadosValidos.nome,
        preco: dadosValidos.preco,
        estoque: dadosValidos.estoque,
        categoria: dadosValidos.categoria,
        ativo: ativo
    }

    produto['id'] = id;

    produtos.push(produto);

    indicePorIdProdutos[id]=produto;
    indicePorNomeProdutos[nome] = produto;

    logSistema('PRODUTO', 'CRIAR', id, `Criou o produto ${nome}`, null, produto, undefined);

    salvarDados('produtos', produtos);
    localStorage.setItem('maiorIdProdutos', id + 1);
}

export function buscarProduto(tipoDeBusca, dadoDeBusca){
   
    if (tipoDeBusca === 'id'){
        return indicePorIdProdutos[dadoDeBusca];
    
    } else if (tipoDeBusca === 'nome'){
        dadoDeBusca = formatarNome(dadoDeBusca);
        return indicePorNomeProdutos[dadoDeBusca];
    }
}

export function editarProduto(id, mudanca, dadoNovo){

    if (mudanca === 'id'){
        alert('ID não pode ser alterado.')
        return false;
    }

    let produto = buscarProduto('id', id);

    if (!validarProduto(produto)) return false; 

    let dadoAntigo = produto[mudanca];

    if (mudanca === 'ativo'){
        if (dadoNovo === 'true'){
            produto.ativo = true;
            salvarDados('produtos' , produtos);
            return false;
        } else if (dadoNovo === 'false') {
            produto.ativo = false;
            salvarDados('produtos' , produtos);
            return false;
        } else {
            alert('Ativo deve ser true ou false.');
            return false;
        }
    }
    if (mudanca === 'estoque'){
        if (dadoNovo > 0){
            produto.ativo = true;
            produto.estoque = Number(dadoNovo);
            salvarDados('produtos' , produtos);
        } else if (dadoNovo === 0) {
            produto.ativo = false;
            produto.estoque=0;
            salvarDados('produtos' , produtos);
        } else {
            alert('Quantidade indevida.')
            return false;
        }
    } else {
        produto[mudanca]=dadoNovo;
        if (validarCampos(produto.nome, produto.preco, produto.estoque, produto.categoria) === false) return false;
        salvarDados('produtos' , produtos);
    }

    logSistema('PRODUTO', 'EDITAR', id, `Editou o produto ${produto.nome}`, dadoAntigo, dadoNovo, undefined);
}

export function apagarProduto(dadoDeBusca){

    let produto = indicePorIdProdutos[dadoDeBusca];

    if (!validarProduto(produto)) return false;

    delete indicePorIdProdutos[dadoDeBusca];
    delete indicePorNomeProdutos[produto.nome];

    const indiceDoProduto = produtos.findIndex(indice => indice.id === dadoDeBusca);

    produtos.splice(indiceDoProduto, 1);

    logSistema('PRODUTO', 'APAGAR', dadoDeBusca, `Apagou o produto ${produto.nome}`, produto, null, undefined);
    salvarDados('produtos' , produtos)
}




function validarProduto(produto){
    if (!produto){
        alert('Produto não encontrado.');
        return false;
    }
    return true;
}

function formatarNome(nome){
    return nome.trim().toLowerCase();
}

function validarCampos(nome, preco, estoque, categoria){
    if (nome.length <= 3 || nome.length > 30){
        alert('Por favor, digite um nome valido.');
        return false;
    }
    if (indicePorNomeProdutos[nome]){
        alert('Já existe um produto registrado com esse nome.')
        return false;
    }

    if (isNaN(preco) || preco <= 0 || preco > 100000){
        alert('Por favor, digite um preço valido.');
        return false;
    } 

    if (isNaN(estoque) || estoque < 0){
        alert('Por favor, digite um estoque valido.');
        return false;
    }

    if (categoria.length <= 3 || categoria.length > 30 || /[0-9]/.test(categoria) === true){
        alert('Por favor, digite uma categoria valida.');
        return false;
    }
    
    return {
        nome: formatarNome(nome),
        preco: preco.trim(),
        estoque: estoque.trim(),
        categoria: categoria.toLowerCase()
    };
}