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