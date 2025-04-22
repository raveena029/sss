package com.supermarket.service;

import com.supermarket.model.Customer;
import com.supermarket.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public String registerCustomer(Customer customer) {
        // Check if email already exists
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            return "Email already exists";
        }
        
        // Set default values
        customer.setLoyaltyPoints(0);
        customer.setCreditBalance(0.0);
        
        // Save customer
        customerRepository.save(customer);
        return "Customer registered successfully";
    }
    
    public String updateCustomer(Long id, Customer customerDetails) {
        Optional<Customer> customer = customerRepository.findById(id);
        
        if (customer.isPresent()) {
            Customer existingCustomer = customer.get();
            existingCustomer.setName(customerDetails.getName());
            existingCustomer.setEmail(customerDetails.getEmail());
            // Don't update password unless explicitly changed
            if (customerDetails.getPassword() != null && !customerDetails.getPassword().isEmpty()) {
                existingCustomer.setPassword(customerDetails.getPassword());
            }
            
            customerRepository.save(existingCustomer);
            return "Customer updated successfully";
        }
        
        return "Customer not found";
    }
    
    public Customer findByCustomerId(String customerId) {
        return customerRepository.findByCustomerId(customerId).orElse(null);
    }
    
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
    
    public Double checkPurchaseCredit(String customerId) {
        Optional<Customer> customer = customerRepository.findByCustomerId(customerId);
        return customer.map(Customer::getCreditBalance).orElse(0.0);
    }
}