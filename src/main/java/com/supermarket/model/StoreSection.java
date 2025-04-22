package com.supermarket.model;

import jakarta.persistence.*;
import java.util.List;

@Embeddable
public class StoreSection {
    private String sectionId;
    private String name;
    private List<String> productIds;
    
    // Getters and Setters
    public String getSectionId() {
        return sectionId;
    }
    
    public void setSectionId(String sectionId) {
        this.sectionId = sectionId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public List<String> getProductIds() {
        return productIds;
    }
    
    public void setProductIds(List<String> productIds) {
        this.productIds = productIds;
    }
}