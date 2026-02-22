import { salvarDados, buscarLista, limparLista} from "./locstorage.js";

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

    nome = formatarNome(nome)

    if (indicePorNomeProdutos[nome]){
        alert('Já existe um produto registrado com esse nome.')
        return;
    }
    
    const produto = {
        nome: nome,
        preco: preco,
        estoque: estoque,
        categoria: categoria,
        ativo: true
    }

    produto['id'] = id;

    produtos.push(produto);

    indicePorIdProdutos[id]=produto;
    indicePorNomeProdutos[nome] = produto;

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

}

export function apagarProduto(dadoDeBusca){

    let produto = indicePorIdProdutos[dadoDeBusca];

    if (!validarProduto(produto)) return;

    delete indicePorIdProdutos[dadoDeBusca];
    delete indicePorNomeProdutos[produto.nome];

    const indiceDoProduto = produtos.findIndex(indice => indice.id === dadoDeBusca);

    produtos.splice(indiceDoProduto, 1);

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