// validation.js - Input validation utility
class ValidationUtil {
    constructor() {
        // Common validation patterns
        this.patterns = {
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^\d{10}$/,
            productId: /^[A-Z0-9]{4,}$/,
            price: /^\d+(\.\d{1,2})?$/,
            quantity: /^\d+$/
        };
    }
    
    // Check if a value is not empty
    isNotEmpty(value) {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    }
    
    // Check if a value matches a pattern
    matchesPattern(value, patternName) {
        if (!this.isNotEmpty(value)) return false;
        
        const pattern = this.patterns[patternName];
        if (!pattern) return false;
        
        return pattern.test(value);
    }
    
    // Validate email format
    isValidEmail(email) {
        return this.matchesPattern(email, 'email');
    }
    
    // Validate phone number format
    isValidPhone(phone) {
        return this.matchesPattern(phone, 'phone');
    }
    
    // Validate product ID format
    isValidProductId(productId) {
        return this.matchesPattern(productId, 'productId');
    }
    
    // Validate price format
    isValidPrice(price) {
        return this.matchesPattern(price, 'price');
    }
    
    // Validate quantity format
    isValidQuantity(quantity) {
        return this.matchesPattern(quantity, 'quantity');
    }
    
    // Validate a form - takes an object with field names and validation functions
    validateForm(formData, validations) {
        const errors = {};
        
        for (const field in validations) {
            const value = formData[field];
            const validationFn = validations[field];
            
            if (typeof validationFn === 'function') {
                const valid = validationFn(value);
                if (!valid) {
                    errors[field] = `Invalid ${field}`;
                }
            }
        }
        
        return {
            valid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    
    // Display validation errors on a form
    displayValidationErrors(formId, errors) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Remove any existing error messages
        const existingErrors = form.querySelectorAll('.validation-error');
        existingErrors.forEach(el => el.remove());
        
        // Display new error messages
        for (const field in errors) {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                // Add error class to input
                input.classList.add('error');
                
                // Create error message element
                const errorEl = document.createElement('div');
                errorEl.classList.add('validation-error');
                errorEl.textContent = errors[field];
                
                // Insert after input
                input.parentNode.insertBefore(errorEl, input.nextSibling);
            }
        }
    }
    
    // Clear validation errors on a form
    clearValidationErrors(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Remove error classes from inputs
        const inputs = form.querySelectorAll('.error');
        inputs.forEach(input => input.classList.remove('error'));
        
        // Remove error messages
        const errors = form.querySelectorAll('.validation-error');
        errors.forEach(el => el.remove());
    }
}

// Initialize the validation utility
const validation = new ValidationUtil();