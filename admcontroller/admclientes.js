import {
  inicializacao,
  criarCliente,
  buscarCliente,
  editarCliente,
  apagarCliente
} from '../funcoesback/clientes.js';


inicializacao();

const btnCriar = document.getElementById('btnCriar');

btnCriar.addEventListener('click', () => {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    
    if (nome === '' || cpf === '' || telefone === '' || email === ''){
        alert('Por favor, preencha todos os campos');
        return ;
    }
    
    if(criarCliente(nome, cpf , telefone , email) === false){
        return ;
    };
    const cliente = buscarCliente('cpf', cpf);

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
        alert ('Cliente não encontrado.')
    } else {
        ;
        console.log(`Resultado da busca pelo ${tipo} "${valor}"`);
        console.log("nome: ", cliente.nome);
        console.log("CPF: ", cliente.cpf);
        console.log("Telefone: ", cliente.telefone);
        console.log("Email: ", cliente.email);
    }

    const avisoConteudo = document.getElementById('avisoConteudo');
    avisoConteudo.innerHTML = `ID: ${cliente.id} |
    Nome: ${cliente.nome} |
    CPF: ${cliente.cpf} |
    Telefone: ${cliente.telefone} |
    Email: ${cliente.email}`;


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
    const tipo = document.getElementById('tipoBuscaEditar').value;
    const dadoAntigo = document.getElementById('campo').value;
    const novoDado = document.getElementById('novoValor').value;

     const cliente = buscarCliente(tipo, dadoCliente);

    const avisoConteudo = document.getElementById('avisoConteudoEditar');
    avisoConteudo.innerHTML = `
        ID: ${cliente.id} |
        CPF: ${cliente.cpf} |
        Nome: ${cliente.nome} |
        Telefone: ${cliente.telefone} |
        Email: ${cliente.email}
    `;
    
    
    editarCliente(tipo, dadoCliente , dadoAntigo , novoDado);


    const avisoConteudo2 = document.getElementById('avisoConteudoEditar2');
    avisoConteudo2.innerHTML = `
        NOVO DADO → ${dadoAntigo.toUpperCase()} = ${novoDado}
    `;

    document.getElementById('avisoEditar').classList.remove('hidden');
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

    idPendenteExclusao = idDoCliente;

    const aviso = document.getElementById('avisoConteudoApagar');
    aviso.innerHTML = `
        CPF: ${cliente.cpf} |
        Nome: ${cliente.nome} |
        Telefone: ${cliente.telefone} |
        Email: ${cliente.email}
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