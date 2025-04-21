// helpers.js - Helper functions for common tasks
class Helpers {
    // Format currency
    formatCurrency(amount) {
        return '$' + parseFloat(amount).toFixed(2);
    }
    
    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    
    // Format time
    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Format date and time
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return this.formatDate(date) + ' ' + this.formatTime(date);
    }
    
    // Generate a random ID with a prefix
    generateId(prefix = '', length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = prefix;
        
        for (let i = 0; i < length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return id;
    }
    
    // Truncate text to a specific length
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    // Calculate percentage
    calculatePercentage(value, total) {
        if (total === 0) return 0;
        return (value / total) * 100;
    }
    
    // Get random color
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Show modal
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            
            // Add close event to X button
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.onclick = () => this.hideModal(modalId);
            }
            
            // Close when clicking outside
            window.onclick = (event) => {
                if (event.target === modal) {
                    this.hideModal(modalId);
                }
            };
        }
    }
    
    // Hide modal
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Create and show a toast notification
    showToast(message, type = 'info', duration = 3000) {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
            
            // Add basic styles
            toastContainer.style.position = 'fixed';
            toastContainer.style.bottom = '20px';
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '1000';
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add styles
        toast.style.padding = '10px 20px';
        toast.style.marginTop = '10px';
        toast.style.backgroundColor = type === 'error' ? '#f44336' : 
                                     type === 'success' ? '#4CAF50' : 
                                     type === 'warning' ? '#ff9800' : '#2196F3';
        toast.style.color = 'white';
        toast.style.borderRadius = '4px';
        toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Remove after duration
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s';
            
            // Remove from DOM after fade out
            setTimeout(() => {
                toastContainer.removeChild(toast);
                
                // Remove container if empty
                if (toastContainer.childElementCount === 0) {
                    document.body.removeChild(toastContainer);
                }
            }, 500);
        }, duration);
    }
    
    // Export data to CSV
    exportToCSV(data, filename = 'export.csv') {
        if (!data || !data.length) return;
        
        // Extract column headers
        const headers = Object.keys(data[0]);
        
        // Create CSV content
        let csvContent = headers.join(',') + '\n';
        
        data.forEach(item => {
            const row = headers.map(header => {
                let value = item[header];
                
                // Handle special cases
                if (value === null || value === undefined) {
                    value = '';
                } else if (typeof value === 'string' && value.includes(',')) {
                    // Quote values containing commas
                    value = `"${value}"`;
                }
                
                return value;
            });
            
            csvContent += row.join(',') + '\n';
        });
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Print element
    printElement(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(element.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
}

// Initialize the helpers
const helpers = new Helpers();