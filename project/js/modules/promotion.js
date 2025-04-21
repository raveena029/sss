// promotion.js - Promotions and rewards functionality
class PromotionModule {
    constructor() {
        this.promotions = [];
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        // Add promotion form
        const addPromotionForm = document.getElementById('add-promotion-form');
        if (addPromotionForm) {
            addPromotionForm.addEventListener('submit', this.handleAddPromotion.bind(this));
        }
        
        // Toggle promotion active status
        document.addEventListener('click', (e) => {
            if (e.target && e.target.matches('[data-action="toggle-promotion"]')) {
                const promotionId = e.target.getAttribute('data-promotion-id');
                this.togglePromotionStatus(promotionId);
            }
        });
    }
    
    loadPromotionsView() {
        this.loadPromotions();
        this.renderPromotionsTable();
    }
    
    loadPromotions() {
        this.promotions = dataStore.getPromotions();
    }
    
    renderPromotionsTable() {
        const promotionsTable = document.getElementById('promotions-table-body');
        if (!promotionsTable) return;
        
        promotionsTable.innerHTML = '';
        
        this.promotions.forEach(promotion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${promotion.promotionId}</td>
                <td>${promotion.description}</td>
                <td>${promotion.discountType === 'percentage' ? promotion.discountValue + '%' : '$' + promotion.discountValue.toFixed(2)}</td>
                <td>${promotion.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                    <button class="btn btn-sm ${promotion.isActive ? 'btn-danger' : 'btn-success'}" 
                        data-action="toggle-promotion" 
                        data-promotion-id="${promotion.promotionId}">
                        ${promotion.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button class="btn btn-sm" 
                        data-action="edit-promotion" 
                        data-promotion-id="${promotion.promotionId}">
                        Edit
                    </button>
                </td>
            `;
            
            // Add event listener for edit button
            const editButton = row.querySelector('[data-action="edit-promotion"]');
            editButton.addEventListener('click', () => this.editPromotion(promotion.promotionId));
            
            promotionsTable.appendChild(row);
        });
    }
    
    handleAddPromotion(event) {
        event.preventDefault();
        
        const descriptionInput = document.getElementById('promotion-description');
        const discountTypeSelect = document.getElementById('promotion-discount-type');
        const discountValueInput = document.getElementById('promotion-discount-value');
        const applicableProductsInput = document.getElementById('promotion-applicable-products');
        
        const description = descriptionInput.value.trim();
        const discountType = discountTypeSelect.value;
        const discountValue = parseFloat(discountValueInput.value) || 0;
        const applicableProducts = applicableProductsInput.value.trim()
            ? applicableProductsInput.value.split(',').map(id => id.trim())
            : [];
        
        if (!description || discountValue <= 0) {
            alert('Please enter a valid description and discount value');
            return;
        }
        
        // Create new promotion
        const newPromotion = {
            promotionId: this.generatePromotionId(),
            description: description,
            discountType: discountType,
            discountValue: discountValue,
            applicableProducts: applicableProducts,
            isActive: true
        };
        
        // Add to data store
        dataStore.addPromotion(newPromotion);
        
        // Refresh promotions list
        this.loadPromotions();
        this.renderPromotionsTable();
        
        // Clear the form
        descriptionInput.value = '';
        discountTypeSelect.selectedIndex = 0;
        discountValueInput.value = '';
        applicableProductsInput.value = '';
        
        alert('Promotion added successfully');
    }
    
    generatePromotionId() {
        // Simple ID generation - in a real system this would be handled by the backend
        return 'PROMO' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }
    
    togglePromotionStatus(promotionId) {
        const promotion = dataStore.getPromotionById(promotionId);
        if (!promotion) return;
        
        promotion.isActive = !promotion.isActive;
        
        // Save to data store
        dataStore.updatePromotion(promotion);
        
        // Refresh promotions list
        this.loadPromotions();
        this.renderPromotionsTable();
    }
    
    editPromotion(promotionId) {
        const promotion = dataStore.getPromotionById(promotionId);
        if (!promotion) return;
        
        // Open promotion edit modal
        const modal = document.getElementById('edit-promotion-modal');
        if (modal) {
            // Populate form with promotion details
            const descriptionInput = modal.querySelector('#edit-promotion-description');
            const discountTypeSelect = modal.querySelector('#edit-promotion-discount-type');
            const discountValueInput = modal.querySelector('#edit-promotion-discount-value');
            const applicableProductsInput = modal.querySelector('#edit-promotion-applicable-products');
            const promotionIdInput = modal.querySelector('#edit-promotion-id');
            
            if (descriptionInput) descriptionInput.value = promotion.description;
            if (discountTypeSelect) discountTypeSelect.value = promotion.discountType;
            if (discountValueInput) discountValueInput.value = promotion.discountValue;
            if (applicableProductsInput) applicableProductsInput.value = promotion.applicableProducts.join(', ');
            if (promotionIdInput) promotionIdInput.value = promotion.promotionId;
            
            // Add submit handler
            const form = modal.querySelector('form');
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    
                    // Update promotion
                    promotion.description = descriptionInput.value.trim();
                    promotion.discountType = discountTypeSelect.value;
                    promotion.discountValue = parseFloat(discountValueInput.value) || 0;
                    promotion.applicableProducts = applicableProductsInput.value.trim()
                        ? applicableProductsInput.value.split(',').// This is the continuation of the promotion.js file that was cut off
                        map(id => id.trim())
                    : [];
                    
                    // Save to data store
                    dataStore.updatePromotion(promotion);
                    
                    // Refresh promotions list
                    this.loadPromotions();
                    this.renderPromotionsTable();
                    
                    // Hide modal
                    modal.classList.add('hidden');
                    
                    alert('Promotion updated successfully');
                };
            }
            
                        // Show modal
                        modal.classList.remove('hidden');
                    }
                }
                
                calculateDiscount(items) {
                    // Get active promotions
                    const activePromotions = this.promotions.filter(promo => promo.isActive);
                    if (activePromotions.length === 0) return 0;
                    
                    let totalDiscount = 0;
                    
                    // Check each promotion against the items
                    activePromotions.forEach(promotion => {
                        let applicableItems = [];
                        
                        // If promotion is applicable to specific products
                        if (promotion.applicableProducts && promotion.applicableProducts.length > 0) {
                            applicableItems = items.filter(item => 
                                promotion.applicableProducts.includes(item.productId)
                            );
                        } else {
                            // Promotion applies to all products
                            applicableItems = [...items];
                        }
                        
                        if (applicableItems.length === 0) return;
                        
                        // Calculate discount based on type
                        const applicableTotal = applicableItems.reduce((sum, item) => sum + item.total, 0);
                        
                        if (promotion.discountType === 'percentage') {
                            const discount = applicableTotal * (promotion.discountValue / 100);
                            totalDiscount += discount;
                        } else if (promotion.discountType === 'fixed') {
                            totalDiscount += promotion.discountValue;
                        }
                    });
                    
                    return totalDiscount;
                }
                
                getDiscountAmountOnProduct(product) {
                    // Get active promotions
                    const activePromotions = this.promotions.filter(promo => promo.isActive);
                    if (activePromotions.length === 0) return 0;
                    
                    // Find promotions applicable to this product
                    const applicablePromotions = activePromotions.filter(promo => 
                        !promo.applicableProducts || 
                        promo.applicableProducts.length === 0 || 
                        promo.applicableProducts.includes(product.productId)
                    );
                    
                    if (applicablePromotions.length === 0) return 0;
                    
                    // Take the highest discount
                    let maxDiscount = 0;
                    
                    applicablePromotions.forEach(promo => {
                        let discount = 0;
                        
                        if (promo.discountType === 'percentage') {
                            discount = product.price * (promo.discountValue / 100);
                        } else if (promo.discountType === 'fixed') {
                            discount = promo.discountValue;
                        }
                        
                        maxDiscount = Math.max(maxDiscount, discount);
                    });
                    
                    return maxDiscount;
                }
            }
            
            // Initialize module
            const promotion = new PromotionModule();