# 📋 Relatório de Casos de Teste (QA)

Este documento contém a especificação e o resultado da execução dos casos de teste para os módulos de **Cadastro, Login, Carrinho e Checkout**.


## Módulo: Checkout

### CH-001 — Finalizar compra com todos os dados válidos
* **Pré-condição:** Usuário logado e com pelo menos um produto no carrinho.
* **Passos:**
  1. Acessar a página de produtos.
  2. Selecionar um produto disponível.
  3. Adicionar o produto ao carrinho.
  4. Acessar o carrinho.
  5. Conferir o produto, a quantidade e o valor apresentado.
  6. Clicar no botão *Finalizar compra*.
* **Resultado Esperado:** O pedido deve ser criado com sucesso e o usuário deve visualizar uma mensagem de confirmação.
* **Status:** ✅ **Aprovado**

### CH-003 — Validar cálculo do valor total
* **Pré-condição:** Usuário logado e produto disponível para compra.
* **Passos:**
  1. Acessar a página de produtos.
  2. Selecionar um produto.
  3. Anotar o preço unitário do produto.
  4. Adicionar o produto ao carrinho.
  5. Acessar o carrinho.
  6. Alterar a quantidade do produto para um valor maior que 1 (ex: 3 unidades).
  7. Conferir o subtotal apresentado no carrinho.
  8. Clicar em *Finalizar compra*.
  9. Conferir o valor total apresentado no checkout.
  10. Calcular manualmente: $\text{Preço unitário} \times \text{Quantidade} = \text{Total esperado}$.
  11. Comparar o valor calculado manualmente com o valor apresentado pelo sistema.
* **Resultado Esperado:** O sistema deve multiplicar corretamente o preço do produto pela quantidade selecionada e apresentar o valor total correto.
* **Resultado Obtido:** O valor do produto não é multiplicado pela quantidade.
* **Status:** ❌ **Falhou**

### CH-004 — Validar acesso ao checkout com carrinho vazio
* **Pré-condição:** Usuário logado e carrinho vazio.
* **Passos:**
  1. Acessar o sistema e realizar o login.
  2. Conferir que o carrinho não possui produtos.
  3. Tentar acessar diretamente a página de checkout pela URL.
  4. Caso exista um botão de checkout no carrinho, tentar clicar nele.
* **Resultado Esperado:** O sistema deve impedir o acesso ao checkout, exibir uma mensagem informando que o carrinho está vazio ou redirecionar o usuário para a página do carrinho ou de produtos.
* **Resultado Obtido:** Não é possível acessar o checkout.
* **Status:** ✅ **Aprovado**

### CH-005 — Validar limpeza do carrinho após finalizar pedido
* **Pré-condição:** Usuário logado e com pelo menos um produto no carrinho.
* **Passos:**
  1. Adicionar um ou mais produtos ao carrinho.
  2. Acessar o carrinho e confirmar os itens.
  3. Clicar em *Finalizar compra*.
  4. Preencher os dados obrigatórios do checkout.
  5. Selecionar uma forma de pagamento válida.
  6. Conferir o resumo e clicar em *Confirmar pedido*.
  7. Aguardar a confirmação de compra e acessar novamente o carrinho.
* **Resultado Esperado:** O pedido deve ser criado com sucesso e o carrinho deve ficar vazio após a finalização da compra.
* **Resultado Obtido:** Os produtos continuam no carrinho após a finalização do checkout.
* **Status:** ❌ **Falhou**

---

## 👤 Módulo: Cadastro

### Casos Positivos (Cadastro)

| ID | Título | Resultado Esperado | Resultado Obtido | Status |
| :--- | :--- | :--- | :--- | :--- |
| **CT-001** | Cadastrar usuário com todos os dados válidos | Usuário cadastrado com sucesso. | Cadastro realizado com sucesso. | ✅ Aprovado |
| **CT-002** | Cadastrar utilizando e-mail válido | Cadastro realizado com sucesso. | Cadastro realizado com sucesso. | ✅ Aprovado |
| **CT-003** | Cadastrar com senha no tamanho mínimo | Cadastro realizado com sucesso. | Cadastro realizado com sucesso. | ✅ Aprovado |
| **CT-004** | Cadastrar com nome contendo acentos | Cadastro realizado com sucesso. | Cadastro realizado com sucesso. | ✅ Aprovado |
| **CT-005** | Cadastrar usuário com nome composto | Cadastro realizado com sucesso. | Cadastro realizado com sucesso. | ✅ Aprovado |
| **CT-006** | Validar redirecionamento após cadastro | Redirecionar para a página inicial/login. | Redirecionamento realizado. | ✅ Aprovado |

### Casos Negativos (Cadastro)

| ID | Título | Resultado Esperado | Resultado Obtido | Status |
| :--- | :--- | :--- | :--- | :--- |
| **CT-007** | Validar obrigatoriedade do campo Nome | Exibir "Nome é obrigatório" e bloquear. | Nenhuma mensagem e segue o fluxo. | ❌ Falhou |
| **CT-008** | Validar obrigatoriedade do campo E-mail | Informar que o e-mail é obrigatório. | Nenhuma mensagem e segue o fluxo. | ❌ Falhou |
| **CT-009** | Validar obrigatoriedade do campo Senha | Informar que a senha é obrigatória. | Nenhuma mensagem e segue o fluxo. | ❌ Falhou |
| **CT-010** | Validar cadastro com e-mail inválido | Exibir a mensagem "E-mail inválido". | Nenhuma mensagem e segue o fluxo. | ❌ Falhou |
| **CT-011** | Validar cadastro com e-mail já existente | Informar que o e-mail já está em uso. | Mensagem informando duplicidade. | ✅ Aprovado |
| **CT-012** | Validar senha abaixo do tamanho mínimo | O cadastro deve ser bloqueado. | Nenhuma mensagem e segue o fluxo. | ❌ Falhou |
| **CT-013** | Validar campos contendo apenas espaços | O sistema deve impedir o cadastro. | Mensagem de e-mail já cadastrado. | ❌ Falhou |
| **CT-014** | Validar nome acima do limite permitido | Exibir mensagem de erro e bloquear. | Nenhuma mensagem e segue o fluxo. | ❌ Falhou |
| **CT-015** | Validar cadastro sem preencher campos | Exibir alertas de campos obrigatórios. | Mensagem de e-mail já cadastrado. | ❌ Falhou |

---

### Detalhamento dos Casos de Cadastro (CT)

> 💡 *Nota: Para reduzir a repetição visual, os casos que compartilham a mesma estrutura simplificada estão descritos abaixo passo a passo.*

<details>
<summary><b>Clique para expandir o detalhamento dos passos (CT-001 a CT-015)</b></summary>

#### CT-001 ao CT-005 (Fluxos Positivos de Cadastro)
* **Pré-condição:** Sistema disponível.
* **Passos:**
  1. Acessar a tela de cadastro.
  2. Preencher Nome, E-mail e Senha de acordo com a variação do teste (acentos, tamanho mínimo, nome composto).
  3. Clicar em *Cadastrar*.

#### CT-006 — Validar redirecionamento após cadastro
* **Passos:** Realizar um cadastro válido, enviar o formulário e verificar a página de destino.

#### CT-007 ao CT-010 e CT-012 ao CT-015 (Fluxos Negativos de Validação de Campos)
* **Pré-condição:** Tela de cadastro aberta.
* **Passos:**
  1. Deixar o campo alvo vazio, inválido, com espaços ou acima do limite.
  2. Preencher os demais campos corretamente.
  3. Clicar em *Cadastrar*.
  4. Validar se a mensagem de erro correspondente é exibida.
</details>

---

## 🛒 Módulo: Carrinho de Compras (CR)

### Casos de Teste Positivos

#### CR-001 — Adicionar um produto ao carrinho
* **Pré-condição:** Usuário autenticado e produto disponível.
* **Passos:**
  1. Acessar a listagem de produtos.
  2. Selecionar um produto e clicar em *Adicionar ao carrinho*.
* **Resultado Esperado:** O produto deve ser adicionado corretamente ao carrinho.
* **Resultado Obtido:** Produto adicionado corretamente.
* **Status:** ✅ **Aprovado**

#### CR-002 — Adicionar mais de um produto ao carrinho
* **Passos:** Adicionar um produto, adicionar outro produto diferente e acessar o carrinho.
* **Resultado Esperado:** Todos os produtos adicionados devem ser exibidos.
* **Status:** ✅ **Aprovado**

#### CR-003 — Alterar a quantidade de um produto no carrinho
* **Passos:** Acessar o carrinho, alterar a quantidade de um produto e salvar.
* **Resultado Esperado:** A quantidade deve ser atualizada corretamente.
* **Status:** ✅ **Aprovado**

#### CR-004 — Remover um produto do carrinho
* **Passos:** Acessar o carrinho e clicar em *Remover* no produto selecionado.
* **Resultado Esperado:** O produto deve ser removido do carrinho.
* **Resultado Obtido:** O produto não é removido.
* **Status:** ❌ **Falhou**

#### CR-005 — Esvaziar completamente o carrinho
* **Passos:** Acessar o carrinho, clicar em *Esvaziar Carrinho* e confirmar.
* **Resultado Esperado:** O carrinho deve ficar totalmente limpo.
* **Resultado Obtido:** A funcionalidade de esvaziar não existe no sistema.
* **Status:** ❌ **Falhou**

#### CR-006 — Validar cálculo do subtotal do carrinho
* **Passos:** Adicionar produtos, acessar o carrinho e somar os valores.
* **Resultado Esperado:** O subtotal exibido deve bater com a soma dos produtos adicionados.
* **Status:** ✅ **Aprovado**

#### CR-007 — Continuar comprando após adicionar um produto
* **Passos:** Adicionar produto, retornar para a listagem e depois reabrir o carrinho.
* **Resultado Esperado:** O produto inserido deve permanecer salvo no carrinho.
* **Status:** ✅ **Aprovado**

#### CR-008 — Finalizar compra a partir do carrinho
* **Passos:** No carrinho com itens, clicar em *Finalizar Compra*.
* **Resultado Esperado:** Redirecionamento correto para a tela de checkout.
* **Status:** ✅ **Aprovado**

### Casos de Teste Negativos

#### CR-009 — Tentar finalizar compra com o carrinho vazio
* **Passos:** Acessar o carrinho vazio e tentar clicar em *Finalizar Compra*.
* **Resultado Esperado:** O sistema deve impedir que a compra prossiga.
* **Status:** ✅ **Aprovado**

---

## 🔑 Módulo: Login (LG)

### Casos de Teste Positivos

#### LG-001 — Realizar login com credenciais válidas
* **Passos:** Acessar a tela de login, informar e-mail/senha corretos e clicar em *Entrar*.
* **Resultado Esperado:** Usuário autenticado e redirecionado para a home.
* **Status:** ✅ **Aprovado**

#### LG-002 — Realizar login utilizando o botão "Entrar"
* **Passos:** Validar a ação do clique físico no botão de confirmação.
* **Status:** ✅ **Aprovado**

#### LG-003 — Validar manutenção da sessão durante a navegação
* **Passos:** Fazer login e navegar entre diferentes abas e caminhos internos do sistema.
* **Resultado Esperado:** A sessão deve continuar ativa sem exigir novo login.
* **Status:** ✅ **Aprovado**

#### LG-004 — Validar login após realizar logout
* **Passos:** Logar, deslogar e tentar realizar o login novamente com as mesmas credenciais.
* **Status:** ✅ **Aprovado**

#### LG-005 — Validar login após realizar cadastro
* **Passos:** Criar uma nova conta e tentar logar imediatamente com ela.
* **Status:** ✅ **Aprovado**

### Casos de Teste Negativos

| ID | Título | Resultado Esperado | Resultado Obtido | Status |
| :--- | :--- | :--- | :--- | :--- |
| **LG-006** | Login com e-mail inexistente | Exibir mensagem de credenciais inválidas. | Nenhuma mensagem é exibida. | ❌ Falhou |
| **LG-007** | Login com senha incorreta | Exibir mensagem de erro e impedir o acesso. | Nenhuma mensagem é exibida. | ❌ Falhou |
| **LG-008** | Campo E-mail obrigatório | Exibir mensagem informando a obrigatoriedade. | Nenhuma mensagem e login bloqueia. | ❌ Falhou |
| **LG-009** | Campo Senha obrigatório | Exibir mensagem informando a obrigatoriedade. | Nenhuma mensagem e login bloqueia. | ❌ Falhou |
| **LG-010** | Login sem preencher campos | Exibir alertas de obrigatoriedade nos dois campos. | Nenhuma mensagem e login bloqueia. | ❌ Falhou |
| **LG-011** | E-mail com formato inválido | Exibir o alerta: "E-mail inválido". | Mensagem de erro exibida corretamente.| ✅ Aprovado |
| **LG-012** | Acesso a rota protegida sem login | Redirecionar o usuário para a tela de login. | Redirecionado com sucesso. | ✅ Aprovado |