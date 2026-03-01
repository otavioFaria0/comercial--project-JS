import { salvarDados , buscarLista} from "./locstorage.js";

export function logSistema(tipo, acao, itemID, descricao, antes, depois, data){
    const logs = buscarLista('logs') || [];
    let indiceLog = Number(localStorage.getItem('maiorIdLog')) || 1;

    let log = {
        id: indiceLog,
        tipo: tipo,
        acao: acao,
        itemID: itemID,
        descricao: descricao,
        antes: antes,
        depois: depois,
        data: data
    };

    if (log.data === undefined) {
        log.data = new Date().toLocaleString();
    }
    
    localStorage.setItem('maiorIdLog', indiceLog + 1);
    logs.push(log);
    salvarDados('logs', logs);
}

export function mostrarLogs(logs) {
    const cabecalho = document.getElementById('cabecalho');
    const corpo = document.getElementById('corpoTabela');

    cabecalho.innerHTML = `
        <tr>
            <th>ID</th>
            <th>TIPO</th>
            <th>AÇÃO</th>
            <th>ITEM</th>
            <th>DESCRIÇÃO</th>
            <th>ALTERAÇÕES</th>
            <th>DATA</th>
        </tr>
    `;

    corpo.innerHTML = '';

    logs.forEach(log => {

        let alteracoesHTML = gerarDiff(log.antes, log.depois);

        const linha = `
            <tr>
                <td>${log.id}</td>
                <td>${log.tipo}</td>
                <td>${log.acao}</td>
                <td>${log.itemID}</td>
                <td>${log.descricao}</td>
                <td>${alteracoesHTML}</td>
                <td>${log.data}</td>
            </tr>
        `;

        corpo.innerHTML += linha;
    });
}

function gerarDiff(antes, depois) {

    if ((antes === null || antes === undefined) && depois !== undefined) {
        return `<span class="log-create">Registro criado</span>`;
    }

    if (antes !== undefined && (depois === null || depois === undefined)) {
        return `<span class="log-delete">Registro removido</span>`;
    }

    if (typeof antes !== 'object' && typeof depois !== 'object') {

        if (antes === depois) return '-';

        return `
            <div class="diff-item">
                <span class="antes">${antes ?? 'null'}</span>
                →
                <span class="depois">${depois ?? 'null'}</span>
            </div>
        `;
    }

    if (typeof antes === 'object' && typeof depois === 'object') {

        let html = '<div class="log-diff">';

        const campos = new Set([
            ...Object.keys(antes || {}),
            ...Object.keys(depois || {})
        ]);

        campos.forEach(campo => {

            const vAntes = antes?.[campo];
            const vDepois = depois?.[campo];

            if (vAntes !== vDepois) {
                html += `
                    <div class="diff-item">
                        <b>${campo}</b>: 
                        <span class="antes">${vAntes ?? 'null'}</span>
                        →
                        <span class="depois">${vDepois ?? 'null'}</span>
                    </div>
                `;
            }
        });

        html += '</div>';

        return html === '<div class="log-diff"></div>' ? '-' : html;
    }

    return '-';
}