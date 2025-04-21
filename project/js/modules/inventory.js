// inventory.js - Inventory management functionality
class InventoryModule {
    constructor() {
        this.inventory = [];
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        // Search input
        const searchInput = document.getElementById('inventory-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }
        
        // Filter dropdowns
        const categoryFilter = document.getElementById('category-filter');
        const stockFilter = document.getElementById('stock-filter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        if (stockFilter) {
            stockFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        // Add inventory button
        const addInventoryBtn = document.getElementById('add-inventory');
        if (addInventoryBtn) {
            addInventoryBtn.addEventListener('click', this.showAddInventoryModal.bind(this));
        }
        
        // Reorder low stock button
        const reorderBtn = document.getElementById('reorder-inventory');
        if (reorderBtn) {
            reorderBtn.addEventListener('click', this.reorderLowStockItems.bind(this));
        }
    }
    
    loadInventoryView() {
        this.loadInventory();
        this.populateCategoryFilter();
        this.renderInventoryTable();
    }
    
    loadInventory() {
        this.inventory = dataStore.getInventory();
    }
    
    populateCategoryFilter() {
        const categoryFilter = document.getElementById('category-filter');
        if (!categoryFilter) return;
        
        // Clear existing options except the first one
        while (categoryFilter.options.length > 1) {
            categoryFilter.remove(1);
        }
        
        // Get unique categories from products
        const products = dataStore.getProducts();
        const categories = [...new Set(products.map(product => product.category))];
        
        // Add options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
    
    renderInventoryTable(items = null) {
        const inventoryTable = document.getElementById('inventory-items');
        if (!inventoryTable) return;
        
        // If no items provided, use all inventory
        const inventoryItems = items || this.inventory;
        
        // Clear current table
        inventoryTable.innerHTML = '';
        
        // Add each item to the table
        inventoryItems.forEach(item => {
            const product = dataStore.getProductById(item.productId);
            if (!product) return;
            
            const row = document.createElement('tr');
            
            // Determine stock status
            let statusClass = 'status-in-stock';
            let statusText = 'In Stock';
            
            if (item.currentQuantity === 0) {
                statusClass = 'status-out-of-stock';
                statusText = 'Out of Stock';
            } else if (item.currentQuantity <= item.minimumThreshold) {
                statusClass = 'status-low-stock';
                statusText = 'Low Stock';
            }
            
            row.innerHTML = `
                <td>${item.productId}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${item.currentQuantity}</td>
                <td>${item.minimumThreshold}</td>
                <td>
                    <span class="status-indicator ${statusClass}"></span>
                    ${statusText}
                </td>
                <td>
                    <button class="btn btn-sm" data-action="edit" data-product-id="${item.productId}">Edit</button>
                    <button class="btn btn-sm" data-action="reorder" data-product-id="${item.productId}">Reorder</button>
                </td>
            `;
            
            // Add event listeners to buttons
            const editButton = row.querySelector('[data-action="edit"]');
            const reorderButton = row.querySelector('[data-action="reorder"]');
            
            editButton.addEventListener('click', () => this.editInventoryItem(item.productId));
            reorderButton.addEventListener('click', () => this.reorderStock(item.productId));
            
            inventoryTable.appendChild(row);
        });
    }
    
    handleSearch(event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            this.applyFilters();
            return;
        }
        
        // Filter inventory items
        const filteredItems = this.inventory.filter(item => {
            const product = dataStore.getProductById(item.productId);
            if (!product) return false;
            
            return product.name.toLowerCase().includes(searchTerm) || 
                   item.productId.toLowerCase().includes(searchTerm);
        });
        
        this.renderInventoryTable(filteredItems);
    }
    
    applyFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const stockFilter = document.getElementById('stock-filter');
        
        const categoryValue = categoryFilter ? categoryFilter.value : '';
        const stockValue = stockFilter ? stockFilter.value : '';
        
        // Filter inventory items
        let filteredItems = [...this.inventory];
        
        if (categoryValue) {
            filteredItems = filteredItems.filter(item => {
                const product = dataStore.getProductById(item.productId);
                return product && product.category === categoryValue;
            });
        }
        
        if (stockValue) {
            filteredItems = filteredItems.filter(item => {
                if (stockValue === 'low') {
                    return item.currentQuantity <= item.minimumThreshold && item.currentQuantity > 0;
                } else if (stockValue === 'out') {
                    return item.currentQuantity === 0;
                } else if (stockValue === 'in') {
                    return item.currentQuantity > item.minimumThreshold;
                }
                return true;
            });
        }
        
        this.renderInventoryTable(filteredItems);
    }
    
    showAddInventoryModal() {
        // To be implemented - show modal to add new inventory item
        alert('Add inventory functionality would be implemented here.');
    }
    
    editInventoryItem(productId) {
        const item = dataStore.getInventoryItem(productId);
        const product = dataStore.getProductById(productId);
        
        if (!item || !product) {
            alert('Item not found');
            return;
        }
        
        // Prompt for new quantity
        const newQuantity = prompt(`Update quantity for ${product.name}`, item.currentQuantity);
        
        if (newQuantity === null) return;
        
        const quantity = parseInt(newQuantity);
        if (isNaN(quantity) || quantity < 0) {
            alert('Please enter a valid quantity');
            return;
        }
        
        // Update quantity
        item.currentQuantity = quantity;
        
        // Refresh table
        this.renderInventoryTable();
    }
    
    reorderStock(productId) {
        const item = dataStore.getInventoryItem(productId);
        const product = dataStore.getProductById(productId);
        
        if (!item || !product) {
            alert('Item not found');
            return;
        }
        
        // Calculate reorder quantity (fill up to 2x minimum threshold)
        let reorderQuantity = item.minimumThreshold * 2 - item.currentQuantity;
        if (reorderQuantity <= 0) {
            reorderQuantity = item.minimumThreshold;
        }
        
        // In a real system, this would place an order with a supplier
        alert(`Reordering ${reorderQuantity} units of ${product.name}`);
        
        // Update quantity
        item.currentQuantity += reorderQuantity;
        
        // Refresh table
        this.renderInventoryTable();
    }
    
    reorderLowStockItems() {
        const lowStockItems = dataStore.getLowStockItems();
        
        if (lowStockItems.length === 0) {
            alert('No items need reordering');
            return;
        }
        
        // Reorder each low stock item
        lowStockItems.forEach(item => {
            this.reorderStock(item.productId);
        });
        
        alert(`Reordered ${lowStockItems.length} items`);
    }
    
    updateQuantity(productId, change) {
        dataStore.updateInventoryQuantity(productId, change);
    }
    
    getTotalProducts() {
        return this.inventory.length;
    }
    
    getLowStockItems() {
        return dataStore.getLowStockItems();
    }
}

// Initialize module
const inventory = new InventoryModule();