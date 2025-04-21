// invoice.js - Invoice generation functionality
class InvoiceModule {
    constructor() {
        this.currentInvoice = null;
        this.invoiceCounter = 1000; // Starting invoice number
        this.invoiceHistory = [];
        
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        // Print invoice button
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'print-invoice') {
                this.printInvoice();
            }
        });
        
        // Email invoice button
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'email-invoice') {
                this.emailInvoice();
            }
        });
        
        // Close invoice button
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'close-invoice') {
                this.closeInvoice();
            }
        });
        
        // Close modal when clicking X
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('close-modal')) {
                this.closeInvoice();
            }
        });
    }
    
    generateInvoice(order) {
        // Generate a unique invoice ID
        const invoiceId = this.generateInvoiceId();
        
        // Create invoice object
        const invoice = {
            invoiceId: invoiceId,
            customerId: order.customerId,
            customerName: order.customerId ? this.getCustomerName(order.customerId) : 'Guest',
            items: [...order.items],
            subtotal: order.subtotal,
            taxAmount: order.taxAmount,
            discountAmount: order.discountAmount,
            totalAmount: order.totalAmount,
            purchaseDate: new Date(),
            paymentMethod: 'Cash', // Default, would be selected by cashier
            taxBreakdown: order.items.length > 0 ? taxModule.getTaxBreakdown(order.items) : {},
            cashierId: order.cashierId || 'SYSTEM',
            cashierName: order.cashierName || 'System',
            storeInfo: {
                name: 'SuperMart',
                address: '123 Market Street',
                phone: '(555) 123-4567',
                email: 'info@supermart.example',
                taxId: 'TAX-12345678'
            }
        };
        
        // Set as current invoice
        this.currentInvoice = invoice;
        
        // Add to invoice history
        this.invoiceHistory.push(invoice);
        
        // Update data store
        dataStore.addInvoice(invoice);
        
        return invoice;
    }
    
    generateInvoiceId() {
        // Generate invoice ID with prefix INV followed by counter
        const invoiceId = `INV-${this.invoiceCounter}`;
        this.invoiceCounter++;
        return invoiceId;
    }
    
    getCustomerName(customerId) {
        const customer = dataStore.getCustomerById(customerId);
        if (!customer) return 'Unknown Customer';
        return `${customer.firstName} ${customer.lastName}`;
    }
    
    showInvoice(invoice = null) {
        // Use provided invoice or current invoice
        const invoiceToShow = invoice || this.currentInvoice;
        if (!invoiceToShow) {
            alert('No invoice available to display');
            return;
        }
        
        // Get invoice modal element
        const invoiceModal = document.getElementById('invoice-modal');
        if (!invoiceModal) return;
        
        // Get invoice content element
        const invoiceContent = document.getElementById('invoice-content');
        if (!invoiceContent) return;
        
        // Generate invoice HTML
        const invoiceHtml = this.generateInvoiceHtml(invoiceToShow);
        
        // Set invoice content
        invoiceContent.innerHTML = invoiceHtml;
        
        // Show modal
        invoiceModal.style.display = 'block';
    }
    
    generateInvoiceHtml(invoice) {
        // Format date
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = invoice.purchaseDate.toLocaleDateString('en-US', dateOptions);
        
        // Start building HTML
        let html = `
            <div class="invoice-header">
                <h2>INVOICE</h2>
                <div class="invoice-id">Invoice #: ${invoice.invoiceId}</div>
                <div class="invoice-date">Date: ${formattedDate}</div>
            </div>
            
            <div class="store-info">
                <h3>${invoice.storeInfo.name}</h3>
                <div>${invoice.storeInfo.address}</div>
                <div>Phone: ${invoice.storeInfo.phone}</div>
                <div>Email: ${invoice.storeInfo.email}</div>
                <div>Tax ID: ${invoice.storeInfo.taxId}</div>
            </div>
            
            <div class="customer-info">
                <h4>Customer</h4>
                <div>${invoice.customerName}</div>
                ${invoice.customerId ? `<div>Customer ID: ${invoice.customerId}</div>` : ''}
            </div>
            
            <table class="invoice-items">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Add items
        invoice.items.forEach(item => {
            html += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${item.total.toFixed(2)}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
            
            <div class="invoice-summary">
                <div class="summary-row">
                    <div class="summary-label">Subtotal:</div>
                    <div class="summary-value">$${invoice.subtotal.toFixed(2)}</div>
                </div>
        `;
        
        // Add tax breakdown if available
        if (invoice.taxBreakdown) {
            const taxBreakdown = invoice.taxBreakdown;
            if (taxBreakdown.standard > 0) {
                html += `
                    <div class="summary-row">
                        <div class="summary-label">Standard Tax (10%):</div>
                        <div class="summary-value">$${taxBreakdown.standard.toFixed(2)}</div>
                    </div>
                `;
            }
            if (taxBreakdown.reduced > 0) {
                html += `
                    <div class="summary-row">
                        <div class="summary-label">Reduced Tax (5%):</div>
                        <div class="summary-value">$${taxBreakdown.reduced.toFixed(2)}</div>
                    </div>
                `;
            }
            if (taxBreakdown.exempt > 0) {
                html += `
                    <div class="summary-row">
                        <div class="summary-label">Tax Exempt:</div>
                        <div class="summary-value">$${taxBreakdown.exempt.toFixed(2)}</div>
                    </div>
                `;
            }
        }
        
        // Add discount if any
        if (invoice.discountAmount > 0) {
            html += `
                <div class="summary-row">
                    <div class="summary-label">Discount:</div>
                    <div class="summary-value">-$${invoice.discountAmount.toFixed(2)}</div>
                </div>
            `;
        }
        
        // Add total
        html += `
                <div class="summary-row total-row">
                    <div class="summary-label">Total:</div>
                    <div class="summary-value">$${invoice.totalAmount.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="payment-info">
                <div>Payment Method: ${invoice.paymentMethod}</div>
                <div>Cashier: ${invoice.cashierName}</div>
            </div>
            
            <div class="invoice-footer">
                <p>Thank you for shopping at ${invoice.storeInfo.name}!</p>
                <p>Return Policy: Items can be returned within 30 days with receipt.</p>
            </div>
        `;
        
        return html;
    }
    
    printInvoice() {
        if (!this.currentInvoice) {
            alert('No invoice available to print');
            return;
        }
        
        // In a real application, this would use proper print functionality
        // For this demo, we'll open a new window with the invoice content
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Invoice</title>');
        printWindow.document.write('<link rel="stylesheet" href="css/styles.css">');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<div class="print-invoice">');
        printWindow.document.write(this.generateInvoiceHtml(this.currentInvoice));
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        // Trigger print dialog
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    }
    
    emailInvoice() {
        if (!this.currentInvoice) {
            alert('No invoice available to email');
            return;
        }
        
        // Get customer email
        let email = '';
        if (this.currentInvoice.customerId) {
            const customer = dataStore.getCustomerById(this.currentInvoice.customerId);
            if (customer && customer.email) {
                email = customer.email;
            }
        }
        
        // Show email form
        const emailModal = document.getElementById('email-invoice-modal');
        const emailInput = document.getElementById('invoice-email');
        
        if (emailModal && emailInput) {
            emailInput.value = email;
            emailModal.style.display = 'block';
        }
    }
    
    sendInvoiceEmail() {
        const emailInput = document.getElementById('invoice-email');
        if (!emailInput || !emailInput.value) {
            alert('Please enter a valid email address');
            return;
        }
        
        const email = emailInput.value;
        
        // In a real application, this would send the email through a server
        // For this demo, we'll just show a success message
        alert(`Invoice ${this.currentInvoice.invoiceId} has been sent to ${email}`);
        
        // Close email modal
        const emailModal = document.getElementById('email-invoice-modal');
        if (emailModal) {
            emailModal.style.display = 'none';
        }
    }
    
    closeInvoice() {
        // Close invoice modal
        const invoiceModal = document.getElementById('invoice-modal');
        if (invoiceModal) {
            invoiceModal.style.display = 'none';
        }
        
        // Close email modal
        const emailModal = document.getElementById('email-invoice-modal');
        if (emailModal) {
            emailModal.style.display = 'none';
        }
    }
    
    getInvoiceById(invoiceId) {
        return this.invoiceHistory.find(inv => inv.invoiceId === invoiceId) || null;
    }
    
    loadInvoiceHistory() {
        // In a real application, this would fetch from a server
        this.invoiceHistory = dataStore.getInvoices();
        return this.invoiceHistory;
    }
    
    renderInvoiceHistoryTable(container) {
        if (!container) return;
        
        // Clear container
        container.innerHTML = '';
        
        // Load invoices if not already loaded
        if (this.invoiceHistory.length === 0) {
            this.loadInvoiceHistory();
        }
        
        if (this.invoiceHistory.length === 0) {
            container.innerHTML = '<p>No invoices found.</p>';
            return;
        }
        
        // Create table
        const table = document.createElement('table');
        table.classList.add('invoice-history-table');
        
        // Add header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Add body
        const tbody = document.createElement('tbody');
        
        this.invoiceHistory.forEach(invoice => {
            const row = document.createElement('tr');
            const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDate = invoice.purchaseDate.toLocaleDateString('en-US', dateOptions);
            
            row.innerHTML = `
                <td>${invoice.invoiceId}</td>
                <td>${formattedDate}</td>
                <td>${invoice.customerName}</td>
                <td>$${invoice.totalAmount.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-primary view-invoice" data-invoice-id="${invoice.invoiceId}">View</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        container.appendChild(table);
        
        // Add event listeners for view buttons
        document.querySelectorAll('.view-invoice').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const invoiceId = e.target.dataset.invoiceId;
                const invoice = this.getInvoiceById(invoiceId);
                if (invoice) {
                    this.currentInvoice = invoice;
                    this.showInvoice(invoice);
                }
            });
        });
    }
    
    generateDailyInvoiceReport(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        // Filter invoices for the specified day
        const dailyInvoices = this.invoiceHistory.filter(inv => 
            inv.purchaseDate >= startOfDay && inv.purchaseDate <= endOfDay
        );
        
        // Calculate totals
        const totalSales = dailyInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
        const totalTax = dailyInvoices.reduce((sum, inv) => sum + inv.taxAmount, 0);
        const totalDiscount = dailyInvoices.reduce((sum, inv) => sum + inv.discountAmount, 0);
        
        // Return report object
        return {
            date: date,
            invoiceCount: dailyInvoices.length,
            totalSales: totalSales,
            totalTax: totalTax,
            totalDiscount: totalDiscount,
            netSales: totalSales - totalTax,
            invoices: dailyInvoices
        };
    }
}

// Initialize module
const invoiceModule = new InvoiceModule();