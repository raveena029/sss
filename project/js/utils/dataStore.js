// dataStore.js - Data management utility
class DataStore {
    constructor() {
        this.products = [];
        this.inventory = [];
        this.customers = [];
        this.promotions = [];
        this.invoices = [];
        this.storeLayout = {};
        this.salesData = [];
    }
    
    initializeData() {
        // Load data from mock data files (in real application, this would be API calls)
        this.loadProducts();
        this.loadInventory();
        this.loadCustomers();
        this.loadPromotions();
        this.initializeStoreLayout();
        this.initializeSalesData();
    }
    
    // Product methods
    loadProducts() {
        // In a real application, this would be an API call
        // For now, assume products are loaded from products.js
        this.products = window.mockProducts || [];
    }
    
    getProducts() {
        return this.products;
    }
    
    getProductById(productId) {
        return this.products.find(product => product.productId === productId);
    }
    
    searchProducts(term) {
        term = term.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(term) || 
            product.productId.toLowerCase().includes(term)
        );
    }
    
    getProductsByCategory(category) {
        if (!category) return this.products;
        return this.products.filter(product => product.category === category);
    }
    
    addProduct(product) {
        this.products.push(product);
    }
    
    updateProduct(updatedProduct) {
        const index = this.products.findIndex(p => p.productId === updatedProduct.productId);
        if (index !== -1) {
            this.products[index] = updatedProduct;
        }
    }
    
    // Inventory methods
    loadInventory() {
        // In a real application, this would be an API call
        // For now, assume inventory is loaded from inventory.js
        this.inventory = window.mockInventory || [];
    }
    
    getInventory() {
        return this.inventory;
    }
    
    getInventoryItem(productId) {
        return this.inventory.find(item => item.productId === productId);
    }
    
    getLowStockItems() {
        return this.inventory.filter(item => 
            item.currentQuantity <= item.minimumThreshold
        );
    }
    
    updateInventoryQuantity(productId, quantity) {
        const item = this.getInventoryItem(productId);
        if (item) {
            item.currentQuantity += quantity;
            // Ensure we don't go below 0
            if (item.currentQuantity < 0) item.currentQuantity = 0;
        }
    }
    
    // Customer methods
    loadCustomers() {
        // In a real application, this would be an API call
        // For now, assume customers are loaded from customers.js
        this.customers = window.mockCustomers || [];
    }
    
    getCustomers() {
        return this.customers;
    }
    
    getCustomerById(customerId) {
        return this.customers.find(customer => customer.customerId === customerId);
    }
    
    searchCustomers(term) {
        term = term.toLowerCase();
        return this.customers.filter(customer => 
            customer.name.toLowerCase().includes(term) || 
            customer.customerId.toLowerCase().includes(term) ||
            (customer.email && customer.email.toLowerCase().includes(term))
        );
    }
    
    addCustomer(customer) {
        this.customers.push(customer);
    }
    
    updateCustomer(updatedCustomer) {
        const index = this.customers.findIndex(c => c.customerId === updatedCustomer.customerId);
        if (index !== -1) {
            this.customers[index] = updatedCustomer;
        }
    }
    
    // Promotion methods
    loadPromotions() {
        // In a real application, this would be an API call
        // For now, assume promotions are loaded from promotions.js
        this.promotions = window.mockPromotions || [];
    }
    
    getPromotions() {
        return this.promotions;
    }
    
    getActivePromotions() {
        return this.promotions.filter(promo => promo.isActive);
    }
    
    getPromotionById(promotionId) {
        return this.promotions.find(promo => promo.promotionId === promotionId);
    }
    
    addPromotion(promotion) {
        this.promotions.push(promotion);
    }
    
    updatePromotion(updatedPromotion) {
        const index = this.promotions.findIndex(p => p.promotionId === updatedPromotion.promotionId);
        if (index !== -1) {
            this.promotions[index] = updatedPromotion;
        }
    }
    
    // Invoice methods
    addInvoice(invoice) {
        this.invoices.push(invoice);
    }
    
    getRecentInvoices(count = 10) {
        return this.invoices
            .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
            .slice(0, count);
    }
    
    // Sales data methods
    initializeSalesData() {
        // For demo purposes, generate some mock sales data
        const today = new Date();
        
        // Create sales data for the last 30 days
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            this.salesData.push({
                date: date,
                totalSales: Math.random() * 10000 + 1000,
                transactionCount: Math.floor(Math.random() * 100) + 10,
                topSellingItems: this.getRandomTopSellingItems()
            });
        }
    }
    
    getRandomTopSellingItems() {
        // Generate some random top selling items for demo
        const items = [];
        const productCount = Math.min(this.products.length, 5);
        
        for (let i = 0; i < productCount; i++) {
            const randomIndex = Math.floor(Math.random() * this.products.length);
            const product = this.products[randomIndex];
            
            items.push({
                productId: product.productId,
                name: product.name,
                quantity: Math.floor(Math.random() * 50) + 1,
                revenue: Math.random() * 500 + 50
            });
        }
        
        return items;
    }
    
    getSalesDataByDateRange(startDate, endDate) {
        return this.salesData.filter(data => {
            const date = new Date(data.date);
            return date >= startDate && date <= endDate;
        });
    }
    
    getTodaysSales() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.salesData.find(data => {
            const date = new Date(data.date);
            date.setHours(0, 0, 0, 0);
            return date.getTime() === today.getTime();
        }) || { totalSales: 0, transactionCount: 0, topSellingItems: [] };
    }
    
    // Store layout methods
    initializeStoreLayout() {
        // Create a mock store layout
        this.storeLayout = {
            sections: [
                {
                    sectionId: 'produce',
                    name: 'Produce',
                    type: 'section',
                    position: { x: 10, y: 10 },
                    dimensions: { width: 200, height: 150 },
                    items: this.getProductsByCategory('Produce').map(p => p.productId)
                },
                {
                    sectionId: 'dairy',
                    name: 'Dairy',
                    type: 'section',
                    position: { x: 220, y: 10 },
                    dimensions: { width: 150, height: 100 },
                    items: this.getProductsByCategory('Dairy').map(p => p.productId)
                },
                {
                    sectionId: 'meat',
                    name: 'Meat & Seafood',
                    type: 'section',
                    position: { x: 10, y: 170 },
                    dimensions: { width: 180, height: 120 },
                    items: this.getProductsByCategory('Meat').map(p => p.productId)
                },
                {
                    sectionId: 'bakery',
                    name: 'Bakery',
                    type: 'section',
                    position: { x: 220, y: 120 },
                    dimensions: { width: 150, height: 100 },
                    items: this.getProductsByCategory('Bakery').map(p => p.productId)
                },
                {
                    sectionId: 'checkout',
                    name: 'Checkout',
                    type: 'checkout',
                    position: { x: 380, y: 10 },
                    dimensions: { width: 80, height: 210 },
                    items: []
                }
            ]
        };
    }
    
    getStoreLayout() {
        return this.storeLayout;
    }
    
    getStoreSection(sectionId) {
        return this.storeLayout.sections.find(section => section.sectionId === sectionId);
    }
}

// Create a global instance
const dataStore = new DataStore();