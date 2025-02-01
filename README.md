# DrivenEats - Documentação da Lógica JavaScript

## Visão Geral
A aplicação utiliza uma abordagem baseada em classes com a classe OrderManager gerenciando toda a lógica de negócios para seleção de itens e gerenciamento do processo de pedidos.

## Estrutura da Classe: OrderManager

### Gerenciamento de Estado
A classe mantém um objeto de estado chamado `selectedItems` que rastreia seleções para três categorias:
- prato (prato principal)
- bebida
- sobremesa

### Inicialização
Quando o DOM é carregado, a aplicação:
1. Cria uma nova instância do OrderManager
2. Inicializa os event listeners para todos os cards de produtos
3. Configura o listener do botão de finalizar pedido
4. Atualiza o estado do botão de pedido
5. Restaura quaisquer itens previamente selecionados

### Lógica de Seleção de Cards
Quando um usuário clica em um card de produto:
1. Verifica se o card já está selecionado
   - Se sim, desmarca ele
   - Se não, remove qualquer seleção anterior na mesma categoria
2. Atualiza o estado visual (adiciona/remove a classe 'selected')
3. Atualiza o estado interno (selectedItems)
4. Atualiza o estado do botão de pedido

### Gerenciamento do Botão de Pedido
O botão "Fechar pedido":
1. Permanece desabilitado até que todas as três categorias tenham seleções
2. Muda o texto e estilo quando habilitado/desabilitado
3. Só habilita quando todos os três itens estão selecionados

### Modal de Confirmação de Pedido
Ao finalizar um pedido:
1. Mostra um modal com os itens selecionados
2. Exibe os nomes e preços dos itens
3. Calcula e mostra o total
4. Fornece opções para confirmar ou cancelar

### Funções Auxiliares
- extractPrice: Converte strings de preço em números
- restoreVisualState: Restaura o estado visual dos cards selecionados
- updateOrderButton: Atualiza o estado do botão baseado nas seleções

## Fluxo de Eventos
1. Usuário seleciona produtos clicando nos cards
2. Cada clique aciona handleCardSelection
3. Atualizações de seleção disparam mudanças no estado do botão
4. Quando todos os itens estão selecionados, o botão de pedido torna-se clicável
5. Clicar no botão de pedido mostra o modal de confirmação
6. Usuário pode então confirmar (redireciona para WhatsApp) ou cancelar

## Estrutura de Dados
Cada item selecionado é armazenado como um objeto com:
- nome
- preço

Estes são armazenados no objeto selectedItems, categorizados por tipo.

## Feedback Visual
A aplicação fornece feedback visual através de:
- Bordas verdes nos cards selecionados
- Efeitos de sombra nos cards selecionados
- Mudanças de cor e texto no botão
- Exibição do modal para confirmação do pedido

Esta implementação segue uma abordagem orientada a objetos limpa com clara separação de responsabilidades.
