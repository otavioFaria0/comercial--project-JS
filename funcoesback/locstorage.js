export function buscarLista(nomeDaLista){
    const lista = JSON.parse(localStorage.getItem(`${nomeDaLista}`)) || [];
    return lista;
}

export function salvarDados(nomeDaLista, dadoInserido){
    const dados = JSON.stringify(dadoInserido)
    localStorage.setItem(`${nomeDaLista}`, dados)
}

export function limparLista(nomeDaLista){
    let lista = JSON.parse(localStorage.getItem(`${nomeDaLista}`)) || [];
    lista = [];
    salvarDados(nomeDaLista, lista)
}
