package com.supermarket.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productId;
    private Integer currentQuantity;
    private Integer minimumThreshold;
    private Date lastRestockDate;
    private String reorderStatus;
    private Integer maximumCapacity;
    private Date locationDate;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getProductId() {
        return productId;
    }
    
    public void setProductId(String productId) {
        this.productId = productId;
    }
    
    public Integer getCurrentQuantity() {
        return currentQuantity;
    }
    
    public void setCurrentQuantity(Integer currentQuantity) {
        this.currentQuantity = currentQuantity;
    }
    
    public Integer getMinimumThreshold() {
        return minimumThreshold;
    }
    
    public void setMinimumThreshold(Integer minimumThreshold) {
        this.minimumThreshold = minimumThreshold;
    }
    
    public Date getLastRestockDate() {
        return lastRestockDate;
    }
    
    public void setLastRestockDate(Date lastRestockDate) {
        this.lastRestockDate = lastRestockDate;
    }
    
    public String getReorderStatus() {
        return reorderStatus;
    }
    
    public void setReorderStatus(String reorderStatus) {
        this.reorderStatus = reorderStatus;
    }
    
    public Integer getMaximumCapacity() {
        return maximumCapacity;
    }
    
    public void setMaximumCapacity(Integer maximumCapacity) {
        this.maximumCapacity = maximumCapacity;
    }
    
    public Date getLocationDate() {
        return locationDate;
    }
    
    public void setLocationDate(Date locationDate) {
        this.locationDate = locationDate;
    }
    
    public Boolean notifyBelowQuantity(String productId, Integer quantity) {
        return currentQuantity < quantity;
    }
    
    public void updateQuantity(Integer newQuantity) {
        this.currentQuantity = newQuantity;
    }
    
    public List<Product> checkLowStock() {
        // Implementation to check low stock items
        return null;
    }
    
    public Integer getProductAvailability(String productId) {
        // Implementation to get product availability
        return null;
    }
    
    public Boolean reserveStock(String productId, Integer quantity) {
        if (currentQuantity >= quantity) {
            currentQuantity -= quantity;
            return true;
        }
        return false;
    }
}