# Plano de Testes — Projeto E-commerce

## Documentação

A documentação do projeto está organizada da seguinte forma:

- **Plano de Testes:** disponível na pasta `docs/`.
- **Casos de Teste:** documentados e gerenciados no **Jira** https://kayqueneves016.atlassian.net/jira/software/projects/PC/boards/2.
- **Registro de Bugs:** realizado no **Jira**, contendo descrição, severidade, prioridade, passos para reprodução e evidências.
- **Testes de API:** disponíveis na pasta `postman/`.
- **Automação de Testes:** implementada com **Playwright** e localizada na pasta `automation/`.
- **Evidências:** capturas de tela e demais arquivos estão disponíveis nos bugs na interface do jira.
- **Para executar a aplicação**: Iniciar a API e o banco de dados

*1.Na raiz do projeto, execute:*

docker compose up -d

Esse comando iniciará:

API (.NET)
Banco de dados MySQL

Para verificar se os containers estão em execução:

docker ps

*2. Executar o Front-end*

Acesse a pasta do front-end:

cd frontend

Instale as dependências:

npm install

Inicie a aplicação:

npm run dev

A aplicação ficará disponível em:

http://localhost:5173
*3. Executar os testes automatizados*

Acesse a pasta onde estão os testes:

cd playwright

Instale as dependências:

npm install

Execute todos os testes:

npx playwright test
*4. Abrir o relatório dos testes*

Após a execução:

npx playwright show-report

O relatório HTML será aberto automaticamente no navegador.
## 1. Identificação do projeto

**Nome do projeto:** E-commerce QA Study
**Tipo de sistema:** Aplicação web de comércio eletrônico
**Front-end:** React
**Back-end:** ASP.NET Core / .NET
**Banco de dados:** MySQL
**Responsável pelos testes:** Kayque
**Versão do documento:** 1.0
**Data:** 14/07/2026

---

## 2. Objetivo

Este plano de testes tem como objetivo definir a estratégia, o escopo, os tipos de teste, os critérios de aprovação e os recursos utilizados para validar as principais funcionalidades do sistema de e-commerce.

Os testes serão realizados para verificar se o sistema funciona conforme o esperado, apresenta mensagens adequadas ao usuário, protege os dados enviados para a API e mantém a integridade das informações armazenadas no banco de dados.

---

## 3. Escopo dos testes

Serão testadas as seguintes funcionalidades:

### 3.1 Cadastro de usuário

* Cadastro com dados válidos.
* Validação dos campos obrigatórios.
* Validação de formato de e-mail.
* Validação de senha.
* Tentativa de cadastro com e-mail já existente.
* Redirecionamento após o cadastro.
* Persistência do usuário no banco de dados.

### 3.2 Login

* Login com credenciais válidas.
* Login com e-mail incorreto.
* Login com senha incorreta.
* Login com campos vazios.
* Validação das mensagens de erro.
* Geração e armazenamento do token JWT.
* Redirecionamento após autenticação.
* Acesso a páginas protegidas.

### 3.3 Logout

* Encerramento da sessão.
* Redirecionamento para a página de login.
* Bloqueio do acesso a páginas protegidas após logout.

### 3.4 Produtos

* Exibição da lista de produtos.
* Exibição das informações de cada produto.
* Consulta de produtos pela API.
* Comportamento quando não existem produtos.
* Comportamento quando a API está indisponível.
* Validação de preço, nome, descrição e estoque.

### 3.5 Carrinho

* Adicionar um produto ao carrinho.
* Adicionar mais de um produto.
* Adicionar o mesmo produto novamente.
* Alterar a quantidade de um produto.
* Remover produto do carrinho.
* Esvaziar o carrinho.
* Validar o cálculo do subtotal.
* Validar o cálculo do total.
* Tentar adicionar quantidade negativa.
* Tentar informar quantidade zero.
* Tentar adicionar quantidade maior que o estoque.
* Persistência dos itens do carrinho.

### 3.6 Checkout

* Finalizar compra com dados válidos.
* Finalizar compra com carrinho vazio.
* Validar campos obrigatórios.
* Validar dados de entrega.
* Validar forma de pagamento.
* Validar o valor total do pedido.
* Confirmar a criação do pedido.
* Verificar a redução do estoque.
* Verificar se o carrinho é limpo após a compra.
* Impedir envio duplicado do pedido.

### 3.7 Pedidos

* Visualizar os pedidos do usuário autenticado.
* Exibir detalhes de um pedido.
* Validar valor, produtos e quantidades.
* Impedir que um usuário visualize pedidos de outro usuário.
* Validar o status do pedido.


## 5. Tipos de teste

### 5.1 Testes funcionais

Serão utilizados para validar se cada funcionalidade executa corretamente as ações esperadas.

Exemplos:

* Cadastrar usuário.
* Fazer login.
* Adicionar produto ao carrinho.
* Remover produto.
* Finalizar pedido.

### 5.2 Testes de interface

Serão utilizados para validar:

* Exibição dos componentes.
* Botões e campos.
* Mensagens de erro e sucesso.
* Redirecionamento entre páginas.
* Comportamento da aplicação em diferentes tamanhos de tela.

### 5.3 Testes de API

Serão realizados diretamente nos endpoints para validar:

* Métodos HTTP.
* Status das respostas.
* Estrutura do JSON.
* Regras de negócio.
* Autenticação.
* Validação dos dados enviados.

### 5.4 Testes de integração

Serão utilizados para validar a comunicação entre:

* React e API .NET.
* API .NET e MySQL.
* Autenticação e páginas protegidas.
* Checkout, pedidos e estoque.

### 5.5 Testes de regressão

Serão executados após correções ou novas funcionalidades para garantir que partes já existentes do sistema continuem funcionando.

Os principais fluxos de regressão serão:

1. Cadastro.
2. Login.
3. Listagem de produtos.
4. Adição ao carrinho.
5. Remoção do carrinho.
6. Checkout.
7. Consulta de pedidos.



###  Testes automatizados

Serão automatizados os fluxos críticos e repetitivos da aplicação.

Principais candidatos:

* Cadastro válido.
* Cadastro com e-mail já existente.
* Login válido.
* Login inválido.
* Adicionar produto ao carrinho.
* Alterar quantidade.
* Remover produto.
* Finalizar compra.
* Acessar página protegida sem autenticação.

---

## 6. Estratégia de testes

Os testes serão divididos em três níveis.

### 6.1 Testes manuais de interface

Executados diretamente no navegador para validar a experiência do usuário, os elementos visuais, as mensagens e os fluxos completos.

### 6.2 Testes automatizados

Executados utilizando Playwright.

Os testes automatizados deverão:

* Ser independentes.
* Possuir nomes claros.
* Evitar depender da ordem de execução.
* Criar ou preparar seus próprios dados.
* Validar o resultado final da ação.
* Produzir relatório de execução.
* Salvar evidências em caso de falha.

---

## 7. Ambiente de testes

### 7.1 Ambiente local

**Sistema operacional:** Windows
**Front-end:** executado localmente com React
**API:** executada localmente com ASP.NET Core
**Banco de dados:** MySQL executado com Docker
**Navegador principal:** Google Chrome ou Chromium
**Automação:** Playwright
**Testes de API:** Postman

### 7.2 Endereços previstos

* Front-end: `http://localhost:5173`
* API: conforme porta configurada no projeto.
* MySQL: `localhost:3306`

Os endereços podem ser alterados conforme a configuração do ambiente.

---

## 8. Ferramentas utilizadas

* Playwright.
* Postman.
* Swagger.
* GitHub.
* Jira
* Docker.
* MySQL.
* Visual Studio Code.
* Relatório HTML do Playwright.

---

## 9. Dados de teste

Serão utilizados dados fictícios durante os testes.

### Usuário válido

* Nome: Usuário Teste
* E-mail: user@teste.com.
* Senha: Password123!

### Usuário inválido

* E-mail sem formato válido.
* Senha abaixo do tamanho mínimo.
* Campos vazios.
* E-mail já cadastrado.



---

## . Critérios de entrada

Os testes poderão começar quando:

* O front-end estiver executando.
* A API estiver disponível.
* O banco de dados estiver funcionando.

* Os endpoints principais estiverem implementados.
* Não existirem erros que impeçam a abertura da aplicação.



## Registro de defeitos

Cada defeito deverá conter:

* ID.
* Título.
* Descrição.
* Pré-condições.
* Passos para reprodução.
* Resultado esperado.
* Resultado obtido.
* Ambiente.
* Evidência(em casos negativos).
* Status.

Exemplo de título:

`BUG-001 — Sistema permite adicionar quantidade negativa ao carrinho`

---

## Evidências

As evidências poderão ser armazenadas por meio de:

* Capturas de tela.
* Vídeos.
* Relatório HTML do Playwright.
* Respostas do Postman.
* Logs da API.
* Registros do banco de dados.
* Arquivos de trace do Playwright.

Não é obrigatório adicionar uma imagem para todo caso aprovado. As evidências devem ser priorizadas para:

* Casos críticos.
* Bugs encontrados.
* Resultados inesperados.
* Fluxos importantes.
* Testes automatizados com falha.


## Aprovação do plano

Este plano deverá ser atualizado sempre que:

* Uma nova funcionalidade for adicionada.
* Uma regra de negócio for alterada.
* Um novo risco for identificado.
* O ambiente de testes for modificado.
* A estratégia de automação for alterada.
