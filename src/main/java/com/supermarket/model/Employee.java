package com.supermarket.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String employeeId;
    private String name;
    private String department;
    
    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Employee supervisor;
    
    @OneToMany(mappedBy = "supervisor")
    private List<Employee> subordinates;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmployeeId() {
        return employeeId;
    }
    
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public Employee getSupervisor() {
        return supervisor;
    }
    
    public void setSupervisor(Employee supervisor) {
        this.supervisor = supervisor;
    }
    
    public List<Employee> getSubordinates() {
        return subordinates;
    }
    
    public void setSubordinates(List<Employee> subordinates) {
        this.subordinates = subordinates;
    }
    
    public void processOrderCheckout(Order order) {
        // Implementation for processing order checkout
    }
    
    public Invoice generateInvoice(Order order) {
        // Implementation for generating invoice
        return new Invoice();
    }
    
    public List<Product> searchItemsByQuery(String query) {
        // Implementation for searching items
        return null;
    }
    
    public StoreLayout viewStoreLayout() {
        // Implementation for viewing store layout
        return new StoreLayout();
    }
    
    public Double calculateTax(Double amount) {
        // Tax calculation logic
        return amount * 0.10; // 10% tax as an example
    }
}