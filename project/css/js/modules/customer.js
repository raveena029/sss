// customer.js - Customer management functionality
class CustomerModule {
    constructor() {
        this.customers = [];
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        // Customer search in checkout
        const customerSearchInput = document.getElementById('customer-search');
        if (customerSearchInput) {
            customerSearchInput.addEventListener('input', this.handleCustomerSearch.bind(this));
        }
        
        // Add customer form
        const addCustomerForm = document.getElementById('add-customer-form');
        if (addCustomerForm) {
            addCustomerForm.addEventListener('submit', this.handleAddCustomer.bind(this));
        }
    }
    
    loadCustomersView() {
        this.loadCustomers();
        this.renderCustomerTable();
    }
    
    loadCustomers() {
        this.customers = dataStore.getCustomers();
    }
    
    renderCustomerTable() {
        const customerTable = document.getElementById('customers-table-body');
        if (!customerTable) return;
        
        customerTable.innerHTML = '';
        
        this.customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.customerId}</td>
                <td>${customer.name}</td>
                <td>${customer.loyaltyPoints}</td>
                <td>${customer.creditBalance ? '$' + customer.creditBalance.toFixed(2) : '$0.00'}</td>
                <td>
                    <button class="btn btn-sm" data-action="view" data-customer-id="${customer.customerId}">View</button>
                    <button class="btn btn-sm" data-action="edit" data-customer-id="${customer.customerId}">Edit</button>
                </td>
            `;
            
            // Add event listeners to buttons
            const viewButton = row.querySelector('[data-action="view"]');
            const editButton = row.querySelector('[data-action="edit"]');
            
            viewButton.addEventListener('click', () => this.viewCustomerDetails(customer.customerId));
            editButton.addEventListener('click', () => this.editCustomer(customer.customerId));
            
            customerTable.appendChild(row);
        });
    }
    
    handleCustomerSearch(event) {
        const searchTerm = event.target.value.trim();
        if (searchTerm === '') {
            this.clearCustomerResults();
            return;
        }
        
        // Search for customers
        const customers = dataStore.searchCustomers(searchTerm);
        this.displayCustomerResults(customers);
    }
    
    displayCustomerResults(customers) {
        const resultsContainer = document.getElementById('customer-results');
        resultsContainer.innerHTML = '';
        
        if (customers.length === 0) {
            resultsContainer.innerHTML = '<p>No customers found</p>';
            return;
        }
        
        customers.forEach(customer => {
            const customerElement = document.createElement('div');
            customerElement.classList.add('customer-result');
            customerElement.innerHTML = `
                <div class="customer-info">
                    <h4>${customer.name}</h4>
                    <p>ID: ${customer.customerId}</p>
                    <p>Loyalty Points: ${customer.loyaltyPoints}</p>
                </div>
                <button class="btn btn-sm" data-customer-id="${customer.customerId}">Select</button>
            `;
            
            // Add event listener to the select button
            const selectButton = customerElement.querySelector('button');
            selectButton.addEventListener('click', () => this.selectCustomer(customer));
            
            resultsContainer.appendChild(customerElement);
        });
    }
    
    clearCustomerResults() {
        const resultsContainer = document.getElementById('customer-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    }
    
    selectCustomer(customer) {
        // Update current order with customer details
        if (checkout && checkout.currentOrder) {
            checkout.currentOrder.customerId = customer.customerId;
            
            // Display selected customer
            const selectedCustomerElement = document.getElementById('selected-customer');
            if (selectedCustomerElement) {
                selectedCustomerElement.innerHTML = `
                    <h4>${customer.name}</h4>
                    <p>ID: ${customer.customerId}</p>
                    <p>Loyalty Points: ${customer.loyaltyPoints}</p>
                    <p>Credit Balance: $${customer.creditBalance ? customer.creditBalance.toFixed(2) : '0.00'}</p>
                `;
            }
            
            // Apply any customer-specific discounts or credits
            checkout.updateOrderSummary();
        }
        
        this.clearCustomerResults();
    }
    
    handleAddCustomer(event) {
        event.preventDefault();
        
        const nameInput = document.getElementById('customer-name');
        const emailInput = document.getElementById('customer-email');
        const phoneInput = document.getElementById('customer-phone');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (!name || !email) {
            alert('Please enter name and email');
            return;
        }
        
        // Create new customer
        const newCustomer = {
            customerId: this.generateCustomerId(),
            name: name,
            email: email,
            phone: phone,
            loyaltyPoints: 0,
            creditBalance: 0,
            purchaseHistory: []
        };
        
        // Add to data store
        dataStore.addCustomer(newCustomer);
        
        // Refresh customer list
        this.loadCustomers();
        this.renderCustomerTable();
        
        // Clear the form
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        
        alert('Customer added successfully');
    }
    
    generateCustomerId() {
        // Simple ID generation - in a real system this would be handled by the backend
        return 'CUST' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }
    
    viewCustomerDetails(customerId) {
        const customer = dataStore.getCustomerById(customerId);
        if (!customer) return;
        
        // Open customer details modal
        const modal = document.getElementById('customer-details-modal');
        if (modal) {
            // Populate modal with customer details
            const nameElement = modal.querySelector('.customer-name');
            const idElement = modal.querySelector('.customer-id');
            const pointsElement = modal.querySelector('.customer-points');
            const creditElement = modal.querySelector('.customer-credit');
            const historyContainer = modal.querySelector('.purchase-history');
            
            if (nameElement) nameElement.textContent = customer.name;
            if (idElement) idElement.textContent = customer.customerId;
            if (pointsElement) pointsElement.textContent = customer.loyaltyPoints;
            if (creditElement) creditElement.textContent = `$${customer.creditBalance ? customer.creditBalance.toFixed(2) : '0.00'}`;
            
            // Load purchase history
            if (historyContainer) {
                historyContainer.innerHTML = '';
                
                if (!customer.purchaseHistory || customer.purchaseHistory.length === 0) {
                    historyContainer.innerHTML = '<p>No purchase history</p>';
                } else {
                    customer.purchaseHistory.forEach(purchase => {
                        const purchaseElement = document.createElement('div');
                        purchaseElement.classList.add('purchase-item');
                        purchaseElement.innerHTML = `
                            <div class="purchase-date">${new Date(purchase.date).toLocaleDateString()}</div>
                            <div class="purchase-amount">$${purchase.amount.toFixed(2)}</div>
                        `;
                        historyContainer.appendChild(purchaseElement);
                    });
                }
            }
            
            // Show modal
            modal.classList.remove('hidden');
        }
    }
    
    editCustomer(customerId) {
        const customer = dataStore.getCustomerById(customerId);
        if (!customer) return;
        
        // Open customer edit modal
        const modal = document.getElementById('edit-customer-modal');
        if (modal) {
            // Populate form with customer details
            const nameInput = modal.querySelector('#edit-customer-name');
            const emailInput = modal.querySelector('#edit-customer-email');
            const phoneInput = modal.querySelector('#edit-customer-phone');
            const customerIdInput = modal.querySelector('#edit-customer-id');
            
            if (nameInput) nameInput.value = customer.name;
            if (emailInput) emailInput.value = customer.email || '';
            if (phoneInput) phoneInput.value = customer.phone || '';
            if (customerIdInput) customerIdInput.value = customer.customerId;
            
            // Add submit handler
            const form = modal.querySelector('form');
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    
                    // Update customer
                    customer.name = nameInput.value.trim();
                    customer.email = emailInput.value.trim();
                    customer.phone = phoneInput.value.trim();
                    
                    // Save to data store
                    dataStore.updateCustomer(customer);
                    
                    // Refresh customer list
                    this.loadCustomers();
                    this.renderCustomerTable();
                    
                    // Hide modal
                    modal.classList.add('hidden');
                    
                    alert('Customer updated successfully');
                };
            }
            
            // Show modal
            modal.classList.remove('hidden');
        }
    }
    
    updatePurchaseCredits(customerId, purchaseAmount) {
        const customer = dataStore.getCustomerById(customerId);
        if (!customer) return;
        
        // Calculate loyalty points (1 point per $10 spent)
        const pointsEarned = Math.floor(purchaseAmount / 10);
        customer.loyaltyPoints += pointsEarned;
        
        // Add to purchase history
        if (!customer.purchaseHistory) {
            customer.purchaseHistory = [];
        }
        
        customer.purchaseHistory.push({
            date: new Date(),
            amount: purchaseAmount,
            pointsEarned: pointsEarned
        });
        
        // Save to data store
        dataStore.updateCustomer(customer);
        
        return pointsEarned;
    }
}

// Initialize module
const customer = new CustomerModule();