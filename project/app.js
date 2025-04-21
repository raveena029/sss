// app.js - Main application file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules
    const checkoutModule = new CheckoutModule();
    const inventoryModule = new InventoryModule();
    const productModule = new ProductModule();
    const customerModule = new CustomerModule();
    const promotionModule = new PromotionModule();
    const reportModule = new ReportModule();
    const invoiceModule = new InvoiceModule();
    const taxModule = new TaxModule();
    const storeLayoutModule = new StoreLayoutModule();
    
    // Load initial data
    dataStore.initializeData();
    
    // Setup navigation
    setupNavigation();
    
    // Load default view (dashboard)
    loadDashboard();
});

// Handle navigation between different sections of the application
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target view from data attribute
            const targetView = this.getAttribute('data-view');
            
            // Load the appropriate view
            loadView(targetView);
        });
    });
}

// Load specific view based on navigation
function loadView(view) {
    // Hide all views
    const views = document.querySelectorAll('.view-container');
    views.forEach(viewElement => viewElement.classList.add('hidden'));
    
    // Show selected view
    const targetView = document.getElementById(`${view}-view`);
    if (targetView) {
        targetView.classList.remove('hidden');
    }
    
    // Update view-specific content
    switch(view) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'checkout':
            checkout.loadCheckoutView();
            break;
        case 'inventory':
            inventory.loadInventoryView();
            break;
        case 'products':
            product.loadProductsView();
            break;
        case 'customers':
            customer.loadCustomersView();
            break;
        case 'promotions':
            promotion.loadPromotionsView();
            break;
        case 'reports':
            report.loadReportsView();
            break;
        case 'store-layout':
            storeLayout.loadStoreLayoutView();
            break;
    }
}

// Load dashboard with summary information
function loadDashboard() {
    const dashboardView = document.getElementById('dashboard-view');
    if (!dashboardView) return;
    
    // Load summary cards
    const totalProducts = inventory.getTotalProducts();
    const lowStockItems = inventory.getLowStockItems();
    const salesSummary = report.getDailySalesSummary();
    
    // Update dashboard elements
    document.getElementById('product-count').textContent = totalProducts;
    document.getElementById('low-stock-count').textContent = lowStockItems.length;
    document.getElementById('sales-today').textContent = `$${salesSummary.total.toFixed(2)}`;
    document.getElementById('transactions-today').textContent = salesSummary.transactions;
    
    // Load recent transactions
    const recentTransactions = invoice.getRecentTransactions(5);
    const transactionsList = document.getElementById('recent-transactions');
    transactionsList.innerHTML = '';
    
    recentTransactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add('transaction-item');
        listItem.innerHTML = `
            <div class="transaction-info">
                <span class="transaction-id">#${transaction.invoiceId}</span>
                <span class="transaction-time">${formatTime(transaction.purchaseDate)}</span>
            </div>
            <div class="transaction-amount">$${transaction.totalAmount.toFixed(2)}</div>
        `;
        transactionsList.appendChild(listItem);
    });
    
    // Load low stock alerts
    const alertsList = document.getElementById('alerts-list');
    alertsList.innerHTML = '';
    
    lowStockItems.forEach(item => {
        const alertItem = document.createElement('div');
        alertItem.classList.add('alert-item');
        alertItem.innerHTML = `
            <div class="alert-info">
                <span class="alert-title">${item.name}</span>
                <span class="alert-desc">Stock: ${item.currentQuantity}/${item.minimumThreshold}</span>
            </div>
            <button class="btn btn-sm btn-outline" onclick="inventory.reorderStock('${item.productId}')">
                Reorder
            </button>
        `;
        alertsList.appendChild(alertItem);
    });
}

// Helper function to format time
function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}