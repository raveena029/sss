// report.js - Reports and statistics functionality
class ReportModule {
    constructor() {
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        // Generate report button
        const generateReportBtn = document.getElementById('generate-report-btn');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', this.handleGenerateReport.bind(this));
        }
        
        // Report type selector
        const reportTypeSelect = document.getElementById('report-type');
        if (reportTypeSelect) {
            reportTypeSelect.addEventListener('change', this.handleReportTypeChange.bind(this));
        }
    }
    
    loadReportsView() {
        // Set default dates (current week)
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        
        const startDateInput = document.getElementById('start-date');
        const endDateInput = document.getElementById('end-date');
        
        if (startDateInput) {
            startDateInput.valueAsDate = startDate;
        }
        
        if (endDateInput) {
            endDateInput.valueAsDate = today;
        }
    }
    
    handleReportTypeChange(event) {
        const reportType = event.target.value;
        // You could customize the date range based on report type
        // For example, tax reports might default to monthly or quarterly
    }
    
    handleGenerateReport() {
        const reportType = document.getElementById('report-type').value;
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        
        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            alert('Please select valid dates');
            return;
        }
        
        if (startDate > endDate) {
            alert('Start date must be before end date');
            return;
        }
        
        // Generate the appropriate report
        switch(reportType) {
            case 'sales':
                this.generateSalesReport(startDate, endDate);
                break;
            case 'inventory':
                this.generateInventoryReport(startDate, endDate);
                break;
            case 'product':
                this.generateProductReport(startDate, endDate);
                break;
            case 'tax':
                this.generateTaxReport(startDate, endDate);
                break;
            default:
                alert('Invalid report type');
        }
    }
    
    generateSalesReport(startDate, endDate) {
        // Get sales data from data store
        const salesData = dataStore.getSalesData(startDate, endDate);
        
        // Create report display
        const reportDisplay = document.getElementById('report-display');
        reportDisplay.innerHTML = '';
        
        // Create report header
        const header = document.createElement('div');
        header.classList.add('report-header');
        header.innerHTML = `
            <h3>Sales Report</h3>
            <p>Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}</p>
        `;
        reportDisplay.appendChild(header);
        
        // Create report summary
        const summary = document.createElement('div');
        summary.classList.add('report-summary');
        
        const totalSales = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const totalTransactions = salesData.length;
        const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;
        
        summary.innerHTML = `
            <div class="summary-item">
                <span class="label">Total Sales:</span>
                <span class="value">$${totalSales.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="label">Total Transactions:</span>
                <span class="value">${totalTransactions}</span>
            </div>
            <div class="summary-item">
                <span class="label">Average Transaction:</span>
                <span class="value">$${averageTransaction.toFixed(2)}</span>
            </div>
        `;
        reportDisplay.appendChild(summary);
        
        // Create sales chart
        const chartContainer = document.createElement('div');
        chartContainer.classList.add('report-chart');
        chartContainer.id = 'sales-chart';
        reportDisplay.appendChild(chartContainer);
        
        // Group sales by day
        const salesByDay = {};
        salesData.forEach(sale => {
            const date = new Date(sale.date).toLocaleDateString();
            if (!salesByDay[date]) {
                salesByDay[date] = 0;
            }
            salesByDay[date] += sale.totalAmount;
        });
        
        // Render chart (in a real application, you would use a charting library)
        this.renderChartPlaceholder(chartContainer.id, 'Daily Sales', salesByDay);
        
        // Create sales table
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('report-table-container');
        
        const table = document.createElement('table');
        table.classList.add('report-table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Invoice ID</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                </tr>
            </thead>
            <tbody id="sales-table-body">
            </tbody>
        `;
        
        const tableBody = table.querySelector('tbody');
        
        salesData.forEach(sale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(sale.date).toLocaleDateString()}</td>
                <td>${sale.invoiceId}</td>
                <td>$${sale.totalAmount.toFixed(2)}</td>
                <td>${sale.paymentMethod}</td>
            `;
            tableBody.appendChild(row);
        });
        
        tableContainer.appendChild(table);
        reportDisplay.appendChild(tableContainer);
    }
    
    generateInventoryReport(startDate, endDate) {
        // Get inventory data from data store
        const inventoryData = dataStore.getInventoryItems();
        
        // Create report display
        const reportDisplay = document.getElementById('report-display');
        reportDisplay.innerHTML = '';
        
        // Create report header
        const header = document.createElement('div');
        header.classList.add('report-header');
        header.innerHTML = `
            <h3>Inventory Report</h3>
            <p>As of: ${new Date().toLocaleDateString()}</p>
        `;
        reportDisplay.appendChild(header);
        
        // Create report summary
        const summary = document.createElement('div');
        summary.classList.add('report-summary');
        
        const totalItems = inventoryData.reduce((sum, item) => sum + item.currentQuantity, 0);
        const totalValue = inventoryData.reduce((sum, item) => {
            const product = dataStore.getProductById(item.productId);
            return sum + (product ? product.price * item.currentQuantity : 0);
        }, 0);
        
        const lowStockItems = inventoryData.filter(item => 
            item.currentQuantity <= item.minimumThreshold
        );
        
        summary.innerHTML = `
            <div class="summary-item">
                <span class="label">Total Items in Stock:</span>
                <span class="value">${totalItems}</span>
            </div>
            <div class="summary-item">
                <span class="label">Total Inventory Value:</span>
                <span class="value">$${totalValue.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="label">Low Stock Items:</span>
                <span class="value">${lowStockItems.length}</span>
            </div>
        `;
        reportDisplay.appendChild(summary);
        
        // Create inventory table
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('report-table-container');
        
        const table = document.createElement('table');
        table.classList.add('report-table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Current Quantity</th>
                    <th>Min Threshold</th>
                    <th>Status</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody id="inventory-table-body">
            </tbody>
        `;
        
        const tableBody = table.querySelector('tbody');
        
        inventoryData.forEach(item => {
            const product = dataStore.getProductById(item.productId);
            if (!product) return;
            
            const status = item.currentQuantity <= 0 ? 'Out of Stock' : 
                          item.currentQuantity <= item.minimumThreshold ? 'Low Stock' : 'In Stock';
            
            const value = product.price * item.currentQuantity;
            
            const row = document.createElement('tr');
            row.classList.add(status.toLowerCase().replace(' ', '-'));
            
            row.innerHTML = `
                <td>${item.productId}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${item.currentQuantity}</td>
                <td>${item.minimumThreshold}</td>
                <td>${status}</td>
                <td>$${value.toFixed(2)}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        tableContainer.appendChild(table);
        reportDisplay.appendChild(tableContainer);
    }
    
    generateProductReport(startDate, endDate) {
        // Get sales data from data store
        const salesData = dataStore.getSalesData(startDate, endDate);
        
        // Get all products
        const products = dataStore.getProducts();
        
        // Create map for product sales
        const productSales = {};
        
        // Calculate sales for each product
        salesData.forEach(sale => {
            sale.items.forEach(item => {
                if (!productSales[item.productId]) {
                    productSales[item.productId] = {
                        quantity: 0,
                        revenue: 0
                    };
                }
                
                productSales[item.productId].quantity += item.quantity;
                productSales[item.productId].revenue += item.total;
            });
        });
        
        // Create report display
        const reportDisplay = document.getElementById('report-display');
        reportDisplay.innerHTML = '';
        
        // Create report header
        const header = document.createElement('div');
        header.classList.add('report-header');
        header.innerHTML = `
            <h3>Product Performance Report</h3>
            <p>Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}</p>
        `;
        reportDisplay.appendChild(header);
        
        // Create product table
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('report-table-container');
        
        const table = document.createElement('table');
        table.classList.add('report-table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                </tr>
            </thead>
            <tbody id="product-table-body">
            </tbody>
        `;
        
        const tableBody = table.querySelector('tbody');
        
        // Sort products by revenue
        const sortedProducts = [...products].sort((a, b) => {
            const aRevenue = productSales[a.productId] ? productSales[a.productId].revenue : 0;
            const bRevenue = productSales[b.productId] ? productSales[b.productId].revenue : 0;
            return bRevenue - aRevenue;
        });
        
        sortedProducts.forEach(product => {
            const sales = productSales[product.productId] || { quantity: 0, revenue: 0 };
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${sales.quantity}</td>
                <td>$${sales.revenue.toFixed(2)}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        tableContainer.appendChild(table);
        reportDisplay.appendChild(tableContainer);
        
        // Create top products chart
        const chartContainer = document.createElement('div');
        chartContainer.classList.add('report-chart');
        chartContainer.id = 'product-chart';
        reportDisplay.appendChild(chartContainer);
        
        // Prepare chart data (top 5 products)
        const topProducts = sortedProducts.slice(0, 5).reduce((data, product) => {
            const sales = productSales[product.productId] || { revenue: 0 };
            data[product.name] = sales.revenue;
            return data;
        }, {});
        
        // Render chart (in a real application, you would use a charting library)
        this.renderChartPlaceholder(chartContainer.id, 'Top 5 Products by Revenue', topProducts);
    }
    
    generateTaxReport(startDate, endDate) {
        // Get sales data from data store
        const salesData = dataStore.getSalesData(startDate, endDate);
        
        // Create report display
        const reportDisplay = document.getElementById('report-display');
        reportDisplay.innerHTML = '';
        
        // Create report header
        const header = document.createElement('div');
        header.classList.add('report-header');
        header.innerHTML = `
            <h3>Tax Report</h3>
            <p>Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}</p>
        `;
        reportDisplay.appendChild(header);
        
        // Calculate tax data
        const taxData = {
            totalSales: 0,
            totalTax: 0,
            taxByType: {}
        };
        
        salesData.forEach(sale => {
            taxData.totalSales += sale.subtotal;
            taxData.totalTax += sale.taxAmount;
            
            // Assuming tax breakdown is available in sale object
            if (sale.taxBreakdown) {
                Object.entries(sale.taxBreakdown).forEach(([taxType, amount]) => {
                    if (!taxData.taxByType[taxType]) {
                        taxData.taxByType[taxType] = 0;
                    }
                    taxData.taxByType[taxType] += amount;
                });
            }
        });
        
        // Create report summary
        const summary = document.createElement('div');
        summary.classList.add('report-summary');
        
        summary.innerHTML = `
            <div class="summary-item">
                <span class="label">Total Sales:</span>
                <span class="value">$${taxData.totalSales.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="label">Total Tax Collected:</span>
                <span class="value">$${taxData.totalTax.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="label">Average Tax Rate:</span>
                <span class="value">${(taxData.totalTax / taxData.totalSales * 100).toFixed(2)}%</span>
            </div>
        `;
        reportDisplay.appendChild(summary);
        
        // Create tax breakdown table
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('report-table-container');
        
        const table = document.createElement('table');
        table.classList.add('report-table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Tax Type</th>
                    <th>Amount</th>
                    <th>Percentage of Total</th>
                </tr>
            </thead>
            <tbody id="tax-table-body">
            </tbody>
        `;
        
        const tableBody = table.querySelector('tbody');
        
        // Add default row if no tax breakdown
        if (Object.keys(taxData.taxByType).length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Sales Tax</td>
                <td>$${taxData.totalTax.toFixed(2)}</td>
                <td>100.00%</td>
            `;
            tableBody.appendChild(row);
        } else {
            // Add row for each tax type
            Object.entries(taxData.taxByType).forEach(([taxType, amount]) => {
                const percentage = (amount / taxData.totalTax * 100).toFixed(2);
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${taxType}</td>
                    <td>$${amount.toFixed(2)}</td>
                    <td>${percentage}%</td>
                `;
                tableBody.appendChild(row);
            });
        }
        
        tableContainer.appendChild(table);
        reportDisplay.appendChild(tableContainer);
    }
    
    renderChartPlaceholder(containerId, title, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // In a real application, you would use a charting library like Chart.js
        // This is just a placeholder for the chart
        container.innerHTML = `
            <div class="chart-placeholder">
                <h4>${title}</h4>
                <div class="chart-bars">
                    ${Object.entries(data).map(([label, value]) => `
                        <div class="chart-bar-container">
                            <div class="chart-bar" style="height: ${Math.min(value * 100 / Math.max(...Object.values(data)), 100)}%">
                                <span class="chart-value">$${typeof value === 'number' ? value.toFixed(2) : value}</span>
                            </div>
                            <span class="chart-label">${label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    getDailySalesSummary() {
        // Get sales data for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const salesData = dataStore.getSalesData(today, tomorrow);
        
        // Calculate summary
        const total = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const transactions = salesData.length;
        
        return {
            total,
            transactions
        };
    }
    
    getWeeklySalesSummary() {
        // Get sales data for the past week
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        weekAgo.setHours(0, 0, 0, 0);
        
        const salesData = dataStore.getSalesData(weekAgo, today);
        
        // Calculate summary
        const total = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const transactions = salesData.length;
        
        return {
            total,
            transactions
        };
    }
    
    generateReportByType(type, date, endDate) {
        // Generate report object based on type
        const report = {
            type: type,
            title: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
            date: date,
            endDate: endDate || date,
            data: {}
        };
        
        // Fill in data based on report type
        switch(type) {
            case 'sales':
                const salesData = dataStore.getSalesData(date, endDate || new Date(date.getTime() + 24*60*60*1000));
                report.data = {
                    totalSales: salesData.reduce((sum, sale) => sum + sale.totalAmount, 0),
                    transactions: salesData.length,
                    averageTransaction: salesData.length > 0 ? 
                        salesData.reduce((sum, sale) => sum + sale.totalAmount, 0) / salesData.length : 0
                };
                break;
                
            case 'inventory':
                const inventoryData = dataStore.getInventoryItems();
                report.data = {
                    totalItems: inventoryData.reduce((sum, item) => sum + item.currentQuantity, 0),
                    totalValue: inventoryData.reduce((sum, item) => {
                        const product = dataStore.getProductById(item.productId);
                        return sum + (product ? product.price * item.currentQuantity : 0);
                    }, 0),
                    lowStockItems: inventoryData.filter(item => 
                        item.currentQuantity <= item.minimumThreshold
                    ).length
                };
                break;
                
            // Add more report types as needed
        }
        
        return report;
    }
}

// Initialize module
const report = new ReportModule();