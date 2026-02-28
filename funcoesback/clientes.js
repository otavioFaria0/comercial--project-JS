 import { salvarDados, buscarLista } from "./locstorage.js";

    let indicePorCpf = {};
    let indicePorIdClientes = {};
    let clientes = [];

    export function inicializacao(){
        indicePorCpf = {};
        indicePorIdClientes = {};
        clientes = buscarLista('clientes');

        for (let i=0; i<clientes.length; i++){
            indicePorCpf[clientes[i]['cpf']] = clientes[i];
            indicePorIdClientes[clientes[i]['id']] = clientes[i];

            const cpfApenasNumeros = normalizarCpf(clientes[i]['cpf']);
            const telefoneApenasNumeros = clientes[i]['telefone'].replace(/[^0-9]/g, '');

            let cliente = clientes[i];
            cliente = {
            id: cliente.id,
            nome: cliente.nome,
            cpf: cpfApenasNumeros,
            telefone: telefoneApenasNumeros,
            email: cliente.email,
            status: 'ABERTO'
        };
        }
        salvarDados('clientes', clientes);
    }


export function criarCliente(nome, cpf, telefone, email){

    //verifica se todos os campos foram preenchidos
    if (nome === '' || cpf === '' || telefone === '' || email === ''){
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    //validações individuais por campo
    const dadosValidados = validarCampos(nome, cpf, telefone, email);
    if (!dadosValidados) return false;

    const id = Number(localStorage.getItem('maiorid')) || 1; //pega o maior id para não ter problemas ao apagar IDs

    const cliente = {
        id: id,
        nome: dadosValidados.nome,
        cpf: dadosValidados.cpf,
        telefone: dadosValidados.telefone,
        email: dadosValidados.email,
        status: 'ABERTO'
    }
    
    clientes.push(cliente);
    // inclui na "tabela hash"
    indicePorCpf[cliente.cpf]=cliente;
    indicePorIdClientes[id]=cliente;

    salvarDados('clientes', clientes);//altera a lista inteira e salva ela no localStorage

    localStorage.setItem('maiorid', id+1);
}

export function buscarCliente(tipoDeBusca, dado ){

    if (tipoDeBusca === 'cpf'){return indicePorCpf[dado]}
    if (tipoDeBusca === 'id'){return indicePorIdClientes[dado]}

    return undefined;
}

export function editarCliente(tipoDeBusca , dadoDeBusca, mudanca, dadoNovo){

    mudanca = mudanca.toLowerCase().trim();
    
    if (mudanca === 'id'){
        alert('ID não pode ser alterado.');
        return false;
    }

    let cliente = buscarCliente(tipoDeBusca, dadoDeBusca);

    if (!cliente){
        alert('Cliente não encontrado.');
        return false;
    }

    if (cliente[mudanca] === dadoNovo){
        alert('Nenhuma alteração foi feita.');
        return false;
    } else if (cliente[mudanca] === undefined){
        alert('Por favor, preencha com um campo valido.');
        return false;
    }
    
    if (mudanca === 'nome'){
        const dadosValidados = validarCampos(dadoNovo, cliente.cpf, cliente.telefone, cliente.email);
        if (!dadosValidados) return false;

        salvarMudancas(cliente, mudanca, dadoNovo.trim());
    } else if (mudanca === 'cpf'){
        const dadosValidados = validarCampos(cliente.nome, dadoNovo, cliente.telefone, cliente.email);
        if (!dadosValidados) return false;

        delete indicePorCpf[cliente.cpf];
        
        salvarMudancas(cliente, mudanca, normalizarCpf(dadoNovo).trim());

    } else if (mudanca === 'email'){
        const dadosValidados = validarCampos(cliente.nome, cliente.cpf, cliente.telefone, dadoNovo);
        if (!dadosValidados) return false;

        salvarMudancas(cliente, mudanca, dadoNovo.trim());
    } else if (mudanca === 'status'){
        dadoNovo = dadoNovo.toUpperCase();

        if (dadoNovo !== 'ABERTO' && dadoNovo !== 'PENDENTE'){
            alert('Status deve ser ABERTO ou PENDENTE.');
            return false;
        } else if (dadoNovo === cliente.status){
            alert('Nenhuma alteração foi feita.');
            return false;
        }
        salvarMudancas(cliente, mudanca, dadoNovo);

    } else  if (mudanca === 'telefone'){
        const dadosValidados = validarCampos(cliente.nome, cliente.cpf, dadoNovo, cliente.email);
        if (!dadosValidados) return false;

        salvarMudancas(cliente, mudanca, dadoNovo.trim().replace(/[^0-9]/g, ''));
    }

    salvarDados('clientes' , clientes)
}

export function apagarCliente(tipoDeBusca, dadoDeBusca){
    
    let cliente = buscarCliente(tipoDeBusca, dadoDeBusca);

    if (validarCliente(cliente) === false){ return };
    

    delete indicePorCpf[cliente.cpf];
    delete indicePorIdClientes[cliente.id];

    const indiceDoCliente = clientes.findIndex(indice => indice.id === cliente.id);

    clientes.splice(indiceDoCliente, 1);

    salvarDados('clientes' , clientes)
}

export function validarCliente(cliente){
    if(!cliente){
        alert('Cliente não encontrado.');
        return false;
    } else {
        return true;
    }
}

function validarCampos(nome, cpf, telefone, email){
    const nomeCorreto = nome.trim();
    if (nomeCorreto.length < 3){
        alert('Por favor, digite um nome valido.');
        return false;
    }
    if (/[0-9]/.test(nome) === true){
        alert('Por favor, digite um nome valido.');
        return false;
    }

    const cpfApenasNumeros = normalizarCpf(cpf);
    if (cpfApenasNumeros.length !== 11){
        alert('Por favor, digite um CPF valido.');
        return false;
    }

    const telefoneApenasNumeros = telefone.replace(/[^0-9]/g, '');
    if (telefoneApenasNumeros.length !== 11){
        alert('Por favor, digite um telefone valido.');
        return false;
    }
    if (/[a-zA-Z]/.test(telefone) === true){
        alert('Por favor, digite um telefone valido.');
        return false;
    }

    const emailCorreto = email.trim();
    if (emailCorreto.includes('@') === false){
        alert('Por favor, digite um email valido.');
        return false;
    }
    
    return {
        nome: nomeCorreto,
        cpf: cpfApenasNumeros,
        telefone: telefoneApenasNumeros,
        email: emailCorreto
    };
}

export function normalizarCpf(cpf){
    return cpf.replace(/[^0-9]/g, '');
}

function salvarMudancas(cliente, mudanca, dadoNovo){
    cliente[mudanca] = dadoNovo;

    indicePorCpf[cliente.cpf] = cliente;
    indicePorIdClientes[cliente.id] = cliente;
    
}