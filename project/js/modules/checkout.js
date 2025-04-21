// checkout.js - Checkout functionality
class CheckoutModule {
    constructor() {
        this.currentOrder = {
            items: [],
            customerId: null,
            subtotal: 0,
            taxAmount: 0,
            discountAmount: 0,
            totalAmount: 0
        };
        
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        // Product search
        const productSearchInput = document.getElementById('product-search');
        if (productSearchInput) {
            productSearchInput.addEventListener('input', this.handleProductSearch.bind(this));
        }
        
        // Add product button
        const addProductForm = document.getElementById('add-product-form');
        if (addProductForm) {
            addProductForm.addEventListener('submit', this.handleAddProduct.bind(this));
        }
        
        // Complete sale button
        const completeSaleBtn = document.getElementById('complete-sale');
        if (completeSaleBtn) {
            completeSaleBtn.addEventListener('click', this.handleCompleteSale.bind(this));
        }
        
        // Clear sale button
        const clearSaleBtn = document.getElementById('clear-sale');
        if (clearSaleBtn) {
            clearSaleBtn.addEventListener('click', this.clearOrder.bind(this));
        }
    }
    
    loadCheckoutView() {
        // Load any necessary data for checkout view
        this.clearOrder();
        this.updateOrderSummary();
    }
    
    handleProductSearch(event) {
        const searchTerm = event.target.value.trim();
        if (searchTerm === '') {
            this.clearProductResults();
            return;
        }
        
        // Search for products
        const products = dataStore.searchProducts(searchTerm);
        this.displayProductResults(products);
    }
    
    displayProductResults(products) {
        const resultsContainer = document.getElementById('product-results');
        resultsContainer.innerHTML = '';
        
        if (products.length === 0) {
            resultsContainer.innerHTML = '<p>No products found</p>';
            return;
        }
        
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-result');
            productElement.innerHTML = `
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <button class="btn btn-sm" data-product-id="${product.productId}">Add</button>
            `;
            
            // Add event listener to the add button
            const addButton = productElement.querySelector('button');
            addButton.addEventListener('click', () => this.addProductToOrder(product));
            
            resultsContainer.appendChild(productElement);
        });
    }
    
    clearProductResults() {
        const resultsContainer = document.getElementById('product-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    }
    
    handleAddProduct(event) {
        event.preventDefault();
        
        const productIdInput = document.getElementById('product-id');
        const quantityInput = document.getElementById('product-quantity');
        
        const productId = productIdInput.value.trim();
        const quantity = parseInt(quantityInput.value, 10) || 1;
        
        if (!productId) {
            alert('Please enter a product ID');
            return;
        }
        
        const product = dataStore.getProductById(productId);
        if (!product) {
            alert('Product not found');
            return;
        }
        
        this.addProductToOrder(product, quantity);
        
        // Clear the form
        productIdInput.value = '';
        quantityInput.value = '1';
    }
    
    addProductToOrder(product, quantity = 1) {
        // Check if product is in stock
        const inventoryItem = dataStore.getInventoryItem(product.productId);
        if (!inventoryItem || inventoryItem.currentQuantity < quantity) {
            alert('Product is out of stock or insufficient quantity');
            return;
        }
        
        // Check if the product is already in the order
        const existingItem = this.currentOrder.items.find(item => item.productId === product.productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            this.currentOrder.items.push({
                productId: product.productId,
                name: product.name,
                price: product.price,
                quantity: quantity,
                total: product.price * quantity
            });
        }
        
        this.updateOrderSummary();
        this.clearProductResults();
    }
    
    removeProductFromOrder(productId) {
        this.currentOrder.items = this.currentOrder.items.filter(item => item.productId !== productId);
        this.updateOrderSummary();
    }
    
    updateOrderSummary() {
        const orderItemsContainer = document.getElementById('order-items');
        const subtotalElement = document.getElementById('order-subtotal');
        const taxElement = document.getElementById('order-tax');
        const discountElement = document.getElementById('order-discount');
        const totalElement = document.getElementById('order-total');
        
        if (!orderItemsContainer) return;
        
        // Clear current items
        orderItemsContainer.innerHTML = '';
        
        // Add each item
        this.currentOrder.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            itemElement.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                </div>
                <div class="item-actions">
                    <span class="item-total">$${item.total.toFixed(2)}</span>
                    <button class="btn-remove" data-product-id="${item.productId}">×</button>
                </div>
            `;
            
            // Add event listener to remove button
            const removeButton = itemElement.querySelector('.btn-remove');
            removeButton.addEventListener('click', () => this.removeProductFromOrder(item.productId));
            
            orderItemsContainer.appendChild(itemElement);
        });
        
        // Calculate totals
        this.currentOrder.subtotal = this.currentOrder.items.reduce((sum, item) => sum + item.total, 0);
        
        // Calculate tax (assuming tax module is available)
        this.currentOrder.taxAmount = taxModule.calculateTax(this.currentOrder.subtotal);
        
        // Check for applicable promotions
        this.currentOrder.discountAmount = promotionModule.calculateDiscount(this.currentOrder.items);
        
        // Calculate final total
        this.currentOrder.totalAmount = 
            this.currentOrder.subtotal + 
            this.currentOrder.taxAmount - 
            this.currentOrder.discountAmount;
        
        // Update display
        subtotalElement.textContent = `$${this.currentOrder.subtotal.toFixed(2)}`;
        taxElement.textContent = `$${this.currentOrder.taxAmount.toFixed(2)}`;
        discountElement.textContent = `$${this.currentOrder.discountAmount.toFixed(2)}`;
        totalElement.textContent = `$${this.currentOrder.totalAmount.toFixed(2)}`;
    }
    
    handleCompleteSale() {
        if (this.currentOrder.items.length === 0) {
            alert('Please add products to the order');
            return;
        }
        
        // Generate invoice
        const invoice = invoiceModule.generateInvoice(this.currentOrder);
        
        // Update inventory
        this.currentOrder.items.forEach(item => {
            inventoryModule.updateQuantity(item.productId, -item.quantity);
        });
        
        // Check for purchase credits
        if (this.currentOrder.customerId) {
            customerModule.updatePurchaseCredits(
                this.currentOrder.customerId, 
                this.currentOrder.totalAmount
            );
        }
        
        // Show invoice
        invoiceModule.displayInvoice(invoice);
        
        // Clear the order
        this.clearOrder();
    }
    
    clearOrder() {
        this.currentOrder = {
            items: [],
            customerId: null,
            subtotal: 0,
            taxAmount: 0,
            discountAmount: 0,
            totalAmount: 0
        };
        
        this.updateOrderSummary();
    }
}

// Initialize module
const checkout = new CheckoutModule();