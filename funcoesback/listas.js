export function montarTabela(dados) {

    const cabecalho = document.getElementById('cabecalho');
    const corpo = document.getElementById('corpoTabela');

    cabecalho.innerHTML = '';
    corpo.innerHTML = '';

    if (dados.length === 0) {
        corpo.innerHTML = '<tr><td>Nenhum dado encontrado.</td></tr>';
        return;
    }

    const colunas = Object.keys(dados[0]);

    let linhaCabecalho = '<tr>';
    colunas.forEach(coluna => {
        linhaCabecalho += `<th>${coluna.toUpperCase()}</th>`;
    });
    linhaCabecalho += '</tr>';

    cabecalho.innerHTML = linhaCabecalho;

    dados.forEach(item => {
        let linha = '<tr>';

        colunas.forEach(coluna => {
            if (coluna === 'status' || coluna === 'ativo') {

                if (item[coluna] === 'CONFIRMADO' || item[coluna] === true) {
                    linha += `<td class="status-ativo">${item[coluna]}</td>`;
                    return;
                } else if (item[coluna] === 'CANCELADO' || item[coluna] === false || item[coluna] === 'AGUARDANDO') {
                    linha += `<td class="status-inativo">${item[coluna]}</td>`
                    return;
                }
            }
            linha += `<td>${item[coluna]}</td>`;
        });

        linha += '</tr>';
        corpo.innerHTML += linha;
    });
}