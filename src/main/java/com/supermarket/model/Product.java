package com.supermarket.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productId;
    private String name;
    private Double price;
    private String category;
    private Integer unitInStock;
    private Double discount;
    private String location;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Component> components;
    
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
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public Integer getUnitInStock() {
        return unitInStock;
    }
    
    public void setUnitInStock(Integer unitInStock) {
        this.unitInStock = unitInStock;
    }
    
    public Double getDiscount() {
        return discount;
    }
    
    public void setDiscount(Double discount) {
        this.discount = discount;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public List<Component> getComponents() {
        return components;
    }
    
    public void setComponents(List<Component> components) {
        this.components = components;
    }
    
    public void manageProductDetails() {
        // Implementation for managing product details
    }
    
    public void updatePrice(Double newPrice) {
        this.price = newPrice;
    }
    
    public List<Product> searchItem(String query) {
        // Search implementation
        return null;
    }
    
    public void addToInventory(Integer quantity) {
        this.unitInStock += quantity;
    }
    
    public Boolean removeFromInventory(Integer quantity) {
        if (this.unitInStock >= quantity) {
            this.unitInStock -= quantity;
            return true;
        }
        return false;
    }
    
    public Boolean inStock() {
        return this.unitInStock > 0;
    }
}