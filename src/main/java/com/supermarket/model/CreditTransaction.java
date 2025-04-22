package com.supermarket.model;

import jakarta.persistence.*;
import java.util.Date;

@Embeddable
public class CreditTransaction {
    private Double amount;
    private Date timestamp;
    private String reason;
    
    // Getters and Setters
    public Double getAmount() {
        return amount;
    }
    
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    
    public Date getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getReason() {
        return reason;
    }
    
    public void setReason(String reason) {
        this.reason = reason;
    }
}