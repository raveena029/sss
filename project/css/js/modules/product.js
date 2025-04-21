// product.js - Product management functionality
class ProductModule {
    constructor() {
        this.products = [];
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        // Search input
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }
        
        // Category filter
        const categoryFilter = document.getElementById('product-category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        // Add product button
        const addProductBtn = document.getElementById('add-product-btn');
        if (addProductBtn) {
            addProductBtn.addEventListener('click', this.showAddProductModal.bind(this));
        }
        
        // Update prices button
        const updatePricesBtn = document.getElementById('update-prices-btn');
        if (updatePricesBtn) {
            updatePricesBtn.addEventListener('click', this.showUpdatePricesModal.bind(this));
        }
        
        // Product form submission
        document.addEventListener('submit', (e) => {
            if (e.target && e.target.id === 'add-product-form') {
                e.preventDefault();
                this.addProduct();
            } else if (e.target && e.target.id === 'edit-product-form') {
                e.preventDefault();
                this.updateProduct();
            } else if (e.target && e.target.id === 'bulk-price-update-form') {
                e.preventDefault();
                this.bulkUpdatePrices();
            }
        });
        
        // Edit product buttons
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('edit-product')) {
                const productId = e.target.dataset.productId;
                this.showEditProductModal(productId);
            }
        });
        
        // Delete product buttons
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('delete-product')) {
                const productId = e.target.dataset.productId;
                this.confirmDeleteProduct(productId);
            }
        });
        
        // Close modal buttons
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('close-modal')) {
                this.closeModals();
            }
        });
    }
    
    loadProductsView() {
        this.loadProducts();
        this.populateCategoryFilter();
        this.renderProductTable();
    }
    
    loadProducts() {
        // In a real application, this would fetch from a server
        this.products = dataStore.getProducts();
    }
    
    populateCategoryFilter() {
        const categoryFilter = document.getElementById('product-category-filter');
        if (!categoryFilter) return;
        
        // Clear existing options except "All Categories"
        while (categoryFilter.options.length > 1) {
            categoryFilter.remove(1);
        }
        
        // Get unique categories
        const categories = [...new Set(this.products.map(product => product.category))];
        
        // Add category options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
    
    renderProductTable(products = null) {
        const productTable = document.getElementById('product-table-body');
        if (!productTable) return;
        
        // Clear existing rows
        productTable.innerHTML = '';
        
        // Use provided products or all products
        const displayedProducts = products || this.products;
        
        if (displayedProducts.length === 0) {
            productTable.innerHTML = '<tr><td colspan="7" class="text-center">No products found</td></tr>';
            return;
        }
        
        // Create table rows
        displayedProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.unit || 'Each'}</td>
                <td>${product.barcode || 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-product" data-product-id="${product.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-product" data-product-id="${product.id}">Delete</button>
                </td>
            `;
            
            productTable.appendChild(row);
        });
    }
    
    handleSearch(e) {
        const searchText = e.target.value.toLowerCase();
        
        if (!searchText) {
            this.renderProductTable();
            return;
        }
        
        // Search by product name, ID, or barcode
        const searchResults = this.products.filter(product => 
            product.name.toLowerCase().includes(searchText) ||
            product.id.toLowerCase().includes(searchText) ||
            (product.barcode && product.barcode.toLowerCase().includes(searchText))
        );
        
        this.renderProductTable(searchResults);
    }
    
    applyFilters() {
        const categoryFilter = document.getElementById('product-category-filter');
        const category = categoryFilter ? categoryFilter.value : '';
        
        if (!category || category === 'all') {
            this.renderProductTable();
            return;
        }
        
        // Filter by category
        const filteredProducts = this.products.filter(product => product.category === category);
        this.renderProductTable(filteredProducts);
    }
    
    showAddProductModal() {
        const modal = document.getElementById('add-product-modal');
        if (!modal) return;
        
        // Reset form
        const form = document.getElementById('add-product-form');
        if (form) form.reset();
        
        // Show modal
        modal.style.display = 'block';
    }
    
    showEditProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.getElementById('edit-product-modal');
        if (!modal) return;
        
        // Populate form with product data
        document.getElementById('edit-product-id').value = product.id;
        document.getElementById('edit-product-name').value = product.name;
        document.getElementById('edit-product-category').value = product.category;
        document.getElementById('edit-product-price').value = product.price;
        document.getElementById('edit-product-unit').value = product.unit || 'Each';
        document.getElementById('edit-product-barcode').value = product.barcode || '';
        document.getElementById('edit-product-description').value = product.description || '';
        
        // Show modal
        modal.style.display = 'block';
    }
    
    showUpdatePricesModal() {
        const modal = document.getElementById('update-prices-modal');
        if (!modal) return;
        
        // Reset form
        const form = document.getElementById('bulk-price-update-form');
        if (form) form.reset();
        
        // Populate category selector
        const categorySelect = document.getElementById('price-update-category');
        if (categorySelect) {
            // Clear existing options except "All Categories"
            while (categorySelect.options.length > 1) {
                categorySelect.remove(1);
            }
            
            // Get unique categories
            const categories = [...new Set(this.products.map(product => product.category))];
            
            // Add category options
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        }
        
        // Show modal
        modal.style.display = 'block';
    }
    
    closeModals() {
        // Hide all modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    addProduct() {
        // Get form values
        const name = document.getElementById('add-product-name').value;
        const category = document.getElementById('add-product-category').value;
        const price = parseFloat(document.getElementById('add-product-price').value);
        const unit = document.getElementById('add-product-unit').value;
        const barcode = document.getElementById('add-product-barcode').value;
        const description = document.getElementById('add-product-description').value;
        
        // Validate required fields
        if (!name || !category || isNaN(price) || price <= 0) {
            alert('Please fill in all required fields with valid values');
            return;
        }
        
        // Generate ID (in a real system, this would be handled by the server)
        const productId = 'P' + Date.now().toString().slice(-8);
        
        // Create new product object
        const newProduct = {
            id: productId,
            name: name,
            category: category,
            price: price,
            unit: unit,
            barcode: barcode,
            description: description
        };
        
        // Add to products array
        this.products.push(newProduct);
        
        // Update data store
        dataStore.addProduct(newProduct);
        
        // Close modal
        this.closeModals();
        
        // Refresh product table
        this.renderProductTable();
        
        // Refresh category filter
        this.populateCategoryFilter();
        
        return true;
    }
    
    updateProduct() {
        // Get form values
        const id = document.getElementById('edit-product-id').value;
        const name = document.getElementById('edit-product-name').value;
        const category = document.getElementById('edit-product-category').value;
        const price = parseFloat(document.getElementById('edit-product-price').value);
        const unit = document.getElementById('edit-product-unit').value;
        const barcode = document.getElementById('edit-product-barcode').value;
        const description = document.getElementById('edit-product-description').value;
        
        // Validate required fields
        if (!id || !name || !category || isNaN(price) || price <= 0) {
            alert('Please fill in all required fields with valid values');
            return;
        }
        
        // Find product index
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            alert('Product not found');
            return;
        }
        
        // Update product object
        const updatedProduct = {
            id: id,
            name: name,
            category: category,
            price: price,
            unit: unit,
            barcode: barcode,
            description: description
        };
        
        // Update products array
        this.products[productIndex] = updatedProduct;
        
        // Update data store
        dataStore.updateProduct(updatedProduct);
        
        // Close modal
        this.closeModals();
        
        // Refresh product table
        this.renderProductTable();
        
        // Refresh category filter if category changed
        if (this.products[productIndex].category !== category) {
            this.populateCategoryFilter();
        }
        
        return true;
    }
    
    bulkUpdatePrices() {
        // Get form values
        const category = document.getElementById('price-update-category').value;
        const updateType = document.getElementById('price-update-type').value;
        const updateValue = parseFloat(document.getElementById('price-update-value').value);
        
        // Validate inputs
        if ((updateType === 'percentage' || updateType === 'amount') && (isNaN(updateValue) || updateValue <= 0)) {
            alert('Please enter a valid positive number for the update value');
            return;
        }
        
        if (updateType === 'fixed' && (isNaN(updateValue) || updateValue < 0)) {
            alert('Please enter a valid non-negative number for the fixed price');
            return;
        }
        
        // Filter products by category if specified
        let productsToUpdate = this.products;
        if (category && category !== 'all') {
            productsToUpdate = this.products.filter(p => p.category === category);
        }
        
        if (productsToUpdate.length === 0) {
            alert('No products found to update');
            return;
        }
        
        // Apply price updates
        productsToUpdate.forEach(product => {
            const originalPrice = product.price;
            let newPrice;
            
            if (updateType === 'percentage') {
                // Increase by percentage
                newPrice = originalPrice * (1 + updateValue / 100);
            } else if (updateType === 'amount') {
                // Increase by fixed amount
                newPrice = originalPrice + updateValue;
            } else if (updateType === 'fixed') {
                // Set to fixed price
                newPrice = updateValue;
            }
            
            // Update product price
            product.price = newPrice;
            
            // Update in data store
            dataStore.updateProduct(product);
        });
        
        // Close modal
        this.closeModals();
        
        // Refresh product table
        this.renderProductTable();
        
        return true;
    }
    
    confirmDeleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.deleteProduct(productId);
        }
    }
    
    deleteProduct(productId) {
        // Find product index
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            alert('Product not found');
            return false;
        }
        
        // Remove from products array
        this.products.splice(productIndex, 1);
        
        // Remove from data store
        dataStore.deleteProduct(productId);
        
        // Refresh product table
        this.renderProductTable();
        
        // Refresh category filter
        this.populateCategoryFilter();
        
        return true;
    }
    
    getProductById(productId) {
        return this.products.find(p => p.id === productId) || null;
    }
    
    getProductsByCategory(category) {
        if (!category || category === 'all') {
            return [...this.products];
        }
        return this.products.filter(p => p.category === category);
    }
    
    searchProducts(query) {
        if (!query) return [...this.products];
        
        const searchText = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchText) ||
            product.id.toLowerCase().includes(searchText) ||
            (product.barcode && product.barcode.toLowerCase().includes(searchText)) ||
            (product.description && product.description.toLowerCase().includes(searchText))
        );
    }
    
    getProductCategories() {
        return [...new Set(this.products.map(product => product.category))];
    }
}

// Initialize module
const productModule = new ProductModule();