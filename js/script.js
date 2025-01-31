class OrderManager {
    constructor() {
        this.selectedItems = {
            prato: null,
            bebida: null,
            sobremesa: null
        };
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const cards = document.querySelectorAll('.option-card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.handleCardSelection(card));
        });

        const finishButton = document.querySelector('.finish-order-button');
        finishButton.addEventListener('click', () => this.finishOrder());

        // Primeiro atualizo o estado do botão
        this.updateOrderButton();
        // Depois restauro o estado visual dos cards selecionados
        this.restoreVisualState();
    }

    restoreSelectedItems() {
        // Restauro os itens do localStorage se existirem
        const savedItems = localStorage.getItem('selectedItems');
        if (savedItems) {
            const parsedItems = JSON.parse(savedItems);
            // Só restauro se todos os itens estiverem presentes
            if (Object.values(parsedItems).every(item => item !== null)) {
                this.selectedItems = parsedItems;
            } else {
                // Se não tiver todos os itens, limpo o localStorage
                localStorage.removeItem('selectedItems');
                this.selectedItems = {
                    prato: null,
                    bebida: null,
                    sobremesa: null
                };
            }
        }
    }

    restoreVisualState() {
        Object.entries(this.selectedItems).forEach(([type, item]) => {
            if (item) {
                const card = document.querySelector(`.option-card[data-type="${type}"] h3`);
                if (card && card.textContent === item.nome) {
                    card.closest('.option-card').classList.add('selected');
                }
            }
        });
    }

    handleCardSelection(card) {
        const type = card.getAttribute('data-type');
        
        // Se clicar no mesmo card já selecionado, desseleciona
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            this.selectedItems[type] = null;
        } else {
            // Remove seleção anterior do mesmo tipo
            const previousSelected = document.querySelector(`.option-card[data-type="${type}"].selected`);
            if (previousSelected) {
                previousSelected.classList.remove('selected');
            }

            // Adiciona nova seleção
            card.classList.add('selected');
            this.selectedItems[type] = {
                nome: card.querySelector('h3').textContent,
                preco: this.extractPrice(card.querySelector('.price').textContent)
            };
        }
        
        this.updateOrderButton();
    }

    extractPrice(priceString) {
        return Number(priceString.replace('R$ ', '').replace(',', '.'));
    }

    updateOrderButton() {
        const button = document.querySelector('.finish-order-button');
        const hasAnyItemSelected = Object.values(this.selectedItems)
            .some(item => item !== null);

        if (hasAnyItemSelected) {
            button.classList.add('enabled');
            button.disabled = false;
            button.textContent = 'Fechar pedido';
        } else {
            button.classList.remove('enabled');
            button.disabled = true;
            button.textContent = 'Selecione pelo menos 1 item para fechar o pedido';
        }
    }

    finishOrder() {
        const modal = document.getElementById('confirmation-modal');
        const orderItems = modal.querySelectorAll('.order-item');
        
        // Limpo todos os items do modal primeiro
        orderItems.forEach(item => {
            item.style.display = 'none';
        });

        // Pego apenas os itens que foram selecionados
        const selectedItems = Object.values(this.selectedItems)
            .filter(item => item !== null);

        // Mostro apenas os itens selecionados
        selectedItems.forEach((item, index) => {
            const itemElement = orderItems[index];
            if (itemElement) {
                itemElement.style.display = 'flex';
                itemElement.querySelector('.item-name').textContent = item.nome;
                itemElement.querySelector('.item-price').textContent = 
                    `R$ ${item.preco.toFixed(2)}`.replace('.', ',');
            }
        });

        // Calculo o total apenas dos itens selecionados
        const total = selectedItems.reduce((sum, item) => sum + item.preco, 0);
        modal.querySelector('.total-price').textContent = 
            `R$ ${total.toFixed(2)}`.replace('.', ',');

        modal.style.display = 'block';

        const cancelButton = modal.querySelector('.cancel-button');
        cancelButton.onclick = () => {
            modal.style.display = 'none';
        };
    }
}

// Inicializo o gerenciador de pedidos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new OrderManager();
}); 