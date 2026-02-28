import {
  inicializacao,
  criarCliente,
  buscarCliente,
  editarCliente,
  apagarCliente, 
  normalizarCpf
} from '../funcoesback/clientes.js';


inicializacao();

const btnCriar = document.getElementById('btnCriar');

btnCriar.addEventListener('click', () => {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    
    
    if(criarCliente(nome, cpf , telefone , email) === false){
        return ;
    };
    const cpfApenasNumeros = normalizarCpf(cpf);
    const cliente = buscarCliente('cpf', cpfApenasNumeros);

    const avisoID = document.getElementById('criarID');
    avisoID.innerHTML = `Cliente criado! | ID: ${cliente.id}`;
    
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
    const valor = document.getElementById('buscaValor').value;
    const tipo = document.getElementById('tipoBusca').value;
    
    const cliente = buscarCliente(tipo, valor);
    
    if (!cliente){
        alert ('Cliente não encontrado.');
        return;
    }

    const avisoConteudo = document.getElementById('avisoConteudo');
    avisoConteudo.innerHTML = `ID: ${cliente.id} |
    Nome: ${cliente.nome} |
    CPF: ${cliente.cpf} |
    Telefone: ${cliente.telefone} |
    Email: ${cliente.email} |
    STATUS : ${cliente.status}`;


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
    const dadoCliente = document.getElementById('editarBusca').value;
    const tipoDeBusca = document.getElementById('tipoBuscaEditar').value;
    const tipoMudanca = document.getElementById('campo').value;
    const novoDado = document.getElementById('novoValor').value;

    const cliente = buscarCliente(tipoDeBusca, dadoCliente);

    if (!cliente){
        alert('Cliente não encontrado.');
        return;
    }

    const avisoConteudo = document.getElementById('avisoConteudoEditar');
    avisoConteudo.innerHTML = `
         ID: ${cliente.id} |
         CPF: ${cliente.cpf} |
         Nome: ${cliente.nome} |
         Telefone: ${cliente.telefone} |
         Email: ${cliente.email} |
         STATUS: ${cliente.status}
    `;

    if (editarCliente(tipoDeBusca, dadoCliente , tipoMudanca , novoDado) === false){
        return;
    } else {
        
        const avisoConteudo2 = document.getElementById('avisoConteudoEditar2');
        avisoConteudo2.innerHTML = `
        NOVO DADO → ${tipoMudanca.toUpperCase()} = ${novoDado.toUpperCase()}
        `;
        
        document.getElementById('avisoEditar').classList.remove('hidden');
    }
});

const fecharAvisoEditar = document.getElementById('fecharAvisoEditar');

fecharAvisoEditar.addEventListener('click', () => {
    const popup = document.getElementById('avisoEditar');
    popup.classList.add('hidden');
});

const btnApagar = document.getElementById('btnApagar');
let idPendenteExclusao = null;

btnApagar.addEventListener('click', () => {
    const idDoCliente = document.getElementById('apagarid').value;

    if (idDoCliente === '') {
        alert('Informe o id');
        return;
    }


    const cliente = buscarCliente('id', idDoCliente);
    if (!cliente) {
        alert('Cliente não encontrado');
        return;
    }

    const statusPadronizado = (cliente.status).toUpperCase();
    

    if (statusPadronizado === 'PENDENTE'){
        alert('Nao pode excluir um cliente em divida');
        return;
    }

    
    idPendenteExclusao = idDoCliente;
    
    const aviso = document.getElementById('avisoConteudoApagar');
    aviso.innerHTML = `
        CPF: ${cliente.cpf} |
        Nome: ${cliente.nome} |
        Telefone: ${cliente.telefone} |
        Email: ${cliente.email} | 
        STATUS: ${cliente.status} |
    `;
        
    document.getElementById('avisoApagar').classList.remove('hidden');
});

const confirmarExclusao = document.getElementById('fecharAvisoApagar');

confirmarExclusao.addEventListener('click', () => {

    if (idPendenteExclusao !== null) {
        apagarCliente('id', idPendenteExclusao);
        idPendenteExclusao = null;
    }

    document.getElementById('avisoApagar').classList.add('hidden');
});

const cancelarExclusao = document.getElementById('cancelarAvisoApagar');

cancelarExclusao.addEventListener('click', () => {
    idPendenteExclusao = null;
    document.getElementById('avisoApagar').classList.add('hidden');
});