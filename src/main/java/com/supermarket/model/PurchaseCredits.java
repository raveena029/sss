package com.supermarket.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class PurchaseCredits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String purchaseId;
    private Double creditBalance;
    private Date expiryDate;
    private Double pointsPerDollar;
    
    @ElementCollection
    private List<CreditTransaction> creditTransactions;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPurchaseId() {
        return purchaseId;
    }
    
    public void setPurchaseId(String purchaseId) {
        this.purchaseId = purchaseId;
    }
    
    public Double getCreditBalance() {
        return creditBalance;
    }
    
    public void setCreditBalance(Double creditBalance) {
        this.creditBalance = creditBalance;
    }
    
    public Date getExpiryDate() {
        return expiryDate;
    }
    
    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
    
    public Double getPointsPerDollar() {
        return pointsPerDollar;
    }
    
    public void setPointsPerDollar(Double pointsPerDollar) {
        this.pointsPerDollar = pointsPerDollar;
    }
    
    public List<CreditTransaction> getCreditTransactions() {
        return creditTransactions;
    }
    
    public void setCreditTransactions(List<CreditTransaction> creditTransactions) {
        this.creditTransactions = creditTransactions;
    }
    
    public void updatePurchaseCredits(Double purchaseAmount) {
        // Implementation for updating purchase credits
    }
    
    public Boolean redeemCredits(Double amount) {
        if (creditBalance >= amount) {
            creditBalance -= amount;
            return true;
        }
        return false;
    }
    
    public Double checkBalance() {
        return creditBalance;
    }
    
    public void addCredits(Double amount, String reason) {
        creditBalance += amount;
        CreditTransaction transaction = new CreditTransaction();
        transaction.setAmount(amount);
        transaction.setReason(reason);
        transaction.setTimestamp(new Date());
        creditTransactions.add(transaction);
    }
    
    public Boolean deductCredits(Double amount, String reason) {
        if (creditBalance >= amount) {
            creditBalance -= amount;
            CreditTransaction transaction = new CreditTransaction();
            transaction.setAmount(-amount);
            transaction.setReason(reason);
            transaction.setTimestamp(new Date());
            creditTransactions.add(transaction);
            return true;
        }
        return false;
    }
    
    public Double checkEarningCredits() {
        return pointsPerDollar;
    }
}