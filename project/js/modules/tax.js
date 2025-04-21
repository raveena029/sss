// tax.js - Tax calculation functionality
class TaxModule {
    constructor() {
        // Default tax rates - in a real system, these would be configurable
        this.taxRates = {
            standard: 0.10, // 10% standard tax rate
            reduced: 0.05,  // 5% reduced rate for certain items
            exempt: 0.00    // 0% for tax exempt items
        };
        
        // Map product categories to tax rates
        this.categoryTaxMap = {
            'groceries': 'reduced',
            'produce': 'reduced',
            'bakery': 'reduced',
            'dairy': 'reduced',
            'meat': 'reduced',
            'prepared-food': 'standard',
            'household': 'standard',
            'electronics': 'standard',
            'clothing': 'standard',
            'books': 'exempt',
            'medicines': 'exempt'
            // Add more categories as needed
        };
    }
    
    calculateTax(subtotal, items = []) {
        // If no items provided, apply standard tax rate to the subtotal
        if (!items || items.length === 0) {
            return subtotal * this.taxRates.standard;
        }
        
        // Calculate tax for each item based on its category
        let totalTax = 0;
        
        items.forEach(item => {
            const product = item.product || dataStore.getProductById(item.productId);
            if (!product) return;
            
            const category = product.category || 'default';
            const taxType = this.categoryTaxMap[category.toLowerCase()] || 'standard';
            const taxRate = this.taxRates[taxType];
            
            const itemTax = item.total * taxRate;
            totalTax += itemTax;
        });
        
        return totalTax;
    }
    
    getTaxBreakdown(items = []) {
        // Get detailed tax breakdown by tax type
        const breakdown = {
            standard: 0,
            reduced: 0,
            exempt: 0
        };
        
        if (!items || items.length === 0) return breakdown;
        
        items.forEach(item => {
            const product = item.product || dataStore.getProductById(item.productId);
            if (!product) return;
            
            const category = product.category || 'default';
            const taxType = this.categoryTaxMap[category.toLowerCase()] || 'standard';
            const taxRate = this.taxRates[taxType];
            
            const itemTax = item.total * taxRate;
            breakdown[taxType] += itemTax;
        });
        
        return breakdown;
    }
    
    getTaxRateForProduct(productId) {
        const product = dataStore.getProductById(productId);
        if (!product) return this.taxRates.standard;
        
        const category = product.category || 'default';
        const taxType = this.categoryTaxMap[category.toLowerCase()] || 'standard';
        
        return this.taxRates[taxType];
    }
    
    getTaxRateForCategory(category) {
        const taxType = this.categoryTaxMap[category.toLowerCase()] || 'standard';
        return this.taxRates[taxType];
    }
    
    updateTaxRate(type, rate) {
        if (this.taxRates.hasOwnProperty(type)) {
            this.taxRates[type] = rate;
            return true;
        }
        return false;
    }
    
    updateCategoryTaxMapping(category, taxType) {
        if (this.taxRates.hasOwnProperty(taxType)) {
            this.categoryTaxMap[category.toLowerCase()] = taxType;
            return true;
        }
        return false;
    }
    
    applyTaxToTotal(total, taxRate = null) {
        // Apply specific tax rate or standard rate
        const rate = taxRate !== null ? taxRate : this.taxRates.standard;
        return total * rate;
    }
}

// Initialize module
const taxModule = new TaxModule();