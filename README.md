# Sistema de Gestão Comercial (CRUD-JS)

## Descrição
Este é um **projeto pessoal**, desenvolvido com o objetivo de **consolidar fundamentos de programação e engenharia de software** antes de avançar definitivamente para o desenvolvimento **backend em Java**. Interrompi temporariamente meus estudos na linguagem para me desafiar a criar um projeto real e funcional.

A motivação principal foi praticar conceitos que eu já conhecia, aprofundar novos aprendizados e estruturar um sistema de forma correta, pensando desde o início em **organização, desempenho e regras de negócio, boas práticas**, e não apenas em interface, lição que obtive devido a estar lendo o livro Como ser um programador melhor. Também utilizei essa prática para aplicar conceitos estudados no livro **Entendendo Algoritmos**, servindo como base sólida para evoluções futuras.

Este projeto não foi desenvolvido com foco visual, mas sim como um exercício de engenharia de software, priorizando lógica, organização, arquitetura bacl-end e boas práticas. Ele representa a base do meu portfólio atual e servirá como referência direta para minha evolução no ecossistema Java.

---

## Objetivos do Projeto
- Praticar fundamentos que independem de linguagem
- Aplicar estruturas de dados e algoritmos em um sistema real
- Desenvolver organização de código semelhante a aplicações backend
- Criar uma base reutilizável para futura reimplementação em Java
- Praticar regras de negócio reais 

---

## Funcionalidades Principais
- Gestão completa de **clientes**, **produtos** e **pedidos**
- Validações rigorosas de entrada de dados e padronização
- Controle de estoque automático
- Sistema de status para clientes, produtos e pedidos
- Módulo financeiro com cálculo de faturamento
- Rastreabilidade profissional com log do sistema
- Listagens organizadas com múltiplas formas de ordenação 

---

## Destaques Técnicos
- Busca otimizada com **tabelas hash**, garantindo acesso em **O(1)**
- Implementação manual do algoritmo **QuickSort** para ordenação 
- Arquitetura modular, com separação clara por responsabilidade
- Código estruturado para fácil manutenção e entendimento
- Regras de negócio desacopladas da interface
- Persistência de dados estruturada utilizando `localStorage`

---

## Tecnologias Utilizadas

**JavaScript**

HTML5

CSS3

localStorage

Este projeto não foi desenvolvido com foco visual, mas sim como um exercício de engenharia de software, priorizando lógica, organização e boas práticas. Ele representa a base do meu portfólio atual e servirá como referência direta para minha evolução no ecossistema Java.

---

## Estrutura do Projeto
```text
funcoesback/
 ├── clientes.js
 ├── produtos.js
 ├── pedidos.js
 ├── financas.js
 ├── listas.js
 ├── quickSort.js
 ├── logSistema.js
 
 └── locstorage.js
admcontroller/
 ├── Interfaces administrativas
styles/
 ├── CSS organizado por módulo
 
---