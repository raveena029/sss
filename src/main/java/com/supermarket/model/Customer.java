package com.supermarket.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerId;
    private String name;
    private String email;
    private String password;
    private Integer loyaltyPoints;
    private Double creditBalance;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Order> purchaseHistory;
    
    @ManyToMany
    @JoinTable(
        name = "customer_product",
        joinColumns = @JoinColumn(name = "customer_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> searchHistoryItems;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }
    
    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }
    
    public Double getCreditBalance() {
        return creditBalance;
    }
    
    public void setCreditBalance(Double creditBalance) {
        this.creditBalance = creditBalance;
    }
    
    public List<Order> getPurchaseHistory() {
        return purchaseHistory;
    }
    
    public void setPurchaseHistory(List<Order> purchaseHistory) {
        this.purchaseHistory = purchaseHistory;
    }
    
    public List<Product> getSearchHistoryItems() {
        return searchHistoryItems;
    }
    
    public void setSearchHistoryItems(List<Product> searchHistoryItems) {
        this.searchHistoryItems = searchHistoryItems;
    }
    
    public Double checkPurchaseCredit() {
        return creditBalance;
    }
}