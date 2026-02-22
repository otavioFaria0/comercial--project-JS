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
        }
    }


export function criarCliente(nome, cpf, telefone, email){

    if(indicePorCpf[cpf]){
        alert('CPF já registrado, digite um CPF válido.');
        return false;
    }

    const id = Number(localStorage.getItem('maiorid')) || 1; //pega o maior id para não ter problemas ao apagar IDs

    const cliente = {
        id: id,
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email
    }
    clientes.push(cliente);
    // inclui na "tabela hash"
    indicePorCpf[cpf]=cliente;
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

    if (mudanca === 'id'){
        alert('ID não pode ser alterado.');
        return ;
    }

    mudanca = mudanca.toLowerCase().trim();

    let cliente = buscarCliente(tipoDeBusca, dadoDeBusca);

    if (!cliente){
        alert('Cliente não encontrado.');
        return false;
    }

    if (mudanca === 'cpf'){
        delete indicePorCpf[cliente.cpf];
        
        cliente.cpf = dadoNovo;
        
        indicePorCpf[dadoNovo] = cliente;
        indicePorIdClientes[cliente.id] = cliente;
    } else  {
        cliente[mudanca] = dadoNovo;

        indicePorCpf[cliente.cpf] = cliente;
        indicePorIdClientes[cliente.id] = cliente;
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