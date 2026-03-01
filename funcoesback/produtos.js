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
    // nome
    if (nome.length <= 3 || nome.length > 30){
        alert('Por favor, digite um nome valido.');
        return;
    }
    if (indicePorNomeProdutos[nome]){
        alert('Já existe um produto registrado com esse nome.')
        return;
    }

    // preco
    if (isNaN(preco) || preco <= 0 || preco > 100000){
        alert('Por favor, digite um preço valido.');
        return;
    } 

    // estoque
    if (isNaN(estoque) || estoque < 0){
        alert('Por favor, digite um estoque valido.');
        return;
    }

    // categoria
    if (categoria.length <= 3 || categoria.length > 30 || /[0-9]/.test(categoria) === true){
        alert('Por favor, digite uma categoria valida.');
        return;
    }

    if (Number(estoque) === 0){
        ativo=false;
    }

    
    const produto = {
        nome: nome,
        preco: preco,
        estoque: estoque,
        categoria: categoria,
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
        return alert('ID não pode ser alterado.');
    }

    let produto = buscarProduto('id', id);

    if (!validarProduto(produto)) return; 

    let dadoAntigo = produto[mudanca];

    if (mudanca === 'ativo'){
        if (dadoNovo === 'true'){
            produto.ativo = true;
            salvarDados('produtos' , produtos);
            return;
        } else if (dadoNovo === 'false') {
            produto.ativo = false;
            salvarDados('produtos' , produtos);
            return;
        } else {
            alert('Ativo deve ser true ou false.');
            return;
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
            return;
        }
    } else {
        produto[mudanca]=dadoNovo;
        salvarDados('produtos' , produtos);
    }

    logSistema('PRODUTO', 'EDITAR', id, `Editou o produto ${produto.nome}`, dadoAntigo, dadoNovo, undefined);
}

export function apagarProduto(dadoDeBusca){

    let produto = indicePorIdProdutos[dadoDeBusca];

    if (!validarProduto(produto)) return;

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