package com.supermarket.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer promotionId;
    private Integer productId;
    private String description;
    private String discountType;
    private Double discountValue;
    private List<Integer> applicableProducts;
    private Boolean isActive;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Integer getPromotionId() {
        return promotionId;
    }
    
    public void setPromotionId(Integer promotionId) {
        this.promotionId = promotionId;
    }
    
    public Integer getProductId() {
        return productId;
    }
    
    public void setProductId(Integer productId) {
        this.productId = productId;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getDiscountType() {
        return discountType;
    }
    
    public void setDiscountType(String discountType) {
        this.discountType = discountType;
    }
    
    public Double getDiscountValue() {
        return discountValue;
    }
    
    public void setDiscountValue(Double discountValue) {
        this.discountValue = discountValue;
    }
    
    public List<Integer> getApplicableProducts() {
        return applicableProducts;
    }
    
    public void setApplicableProducts(List<Integer> applicableProducts) {
        this.applicableProducts = applicableProducts;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public String createPromotion() {
        // Implementation for creating promotion
        return "Promotion created";
    }
    
    public Double applyToInvoice(Invoice invoice, Double amount) {
        // Implementation for applying promotion to invoice
        return amount * (1 - discountValue / 100);
    }
    
    public Boolean isValidForPurchaseAmount(Double purchaseAmount) {
        // Implementation for validating promotion
        return true;
    }
    
    public Boolean isValidForProductId(Product product) {
        // Implementation for validating promotion for product
        return applicableProducts.contains(Integer.parseInt(product.getProductId()));
    }
    
    public Double getDiscountAmountAgainstPrice(Double price) {
        return price * (discountValue / 100);
    }
}