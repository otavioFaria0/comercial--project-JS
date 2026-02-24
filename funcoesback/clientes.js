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
            let cliente = clientes[i];
            cliente = {
            id: cliente.id,
            nome: cliente.nome,
            cpf: cliente.cpfApenasNumeros,
            telefone: cliente.telefoneApenasNumeros,
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

    //nome 
    if (nome.length < 3){
        alert('Por favor, digite um nome valido.');
        return false;
    }
    if (/[0-9]/.test(nome) === true){
        alert('Por favor, digite um nome valido.');
        return false;
    }


    //cpf
    const cpfApenasNumeros = normalizarCpf(cpf);
    if (cpfApenasNumeros.length !== 11){
        alert('Por favor, digite um CPF valido.');
        return false;
    }
    if (indicePorCpf[cpfApenasNumeros]){
        alert('CPF já registrado, digite um CPF válido.');
        return false;
    }

    //telefone;
    const telefoneApenasNumeros = telefone.replace(/[^0-9]/g, '');
    if (telefoneApenasNumeros.length !== 11){
        alert('Por favor, digite um telefone valido.');
        return false;
    }
    if (/[a-zA-Z]/.test(telefone) === true){
        alert('Por favor, digite um telefone valido.');
        return false;
    }

    //email
    if (email.includes('@') === false){
        alert('Por favor, digite um email valido.');
        return false;
    }

    const id = Number(localStorage.getItem('maiorid')) || 1; //pega o maior id para não ter problemas ao apagar IDs

    const cliente = {
        id: id,
        nome: nome,
        cpf: cpfApenasNumeros,
        telefone: telefoneApenasNumeros,
        email: email,
        status: 'ABERTO'
    }
    clientes.push(cliente);
    // inclui na "tabela hash"
    indicePorCpf[cpfApenasNumeros]=cliente;
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

export function normalizarCpf(cpf){
    return cpf.replace(/[^0-9]/g, '');
}