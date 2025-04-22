package com.supermarket.service;

import com.supermarket.model.*;
import com.supermarket.repository.CustomerRepository;
import com.supermarket.repository.OrderRepository;
import com.supermarket.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private InventoryService inventoryService;
    
    @Autowired
    private PromotionService promotionService;

    public Order createOrder(Order order) {
        // Set order date
        order.setOrderDate(new Date());
        // Set initial status
        order.setStatus("PENDING");
        
        // Check and reserve inventory
        for (OrderItem item : order.getOrderItems()) {
            String productId = item.getProduct().getProductId();
            Integer quantity = item.getQuantity();
            
            // Check inventory
            Boolean reserved = inventoryService.reserveStock(productId, quantity);
            if (!reserved) {
                throw new RuntimeException("Insufficient stock for product: " + productId);
            }
        }
        
        // Calculate total amount
        Double totalAmount = order.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        
        // Apply promotions if applicable
        totalAmount = promotionService.applyPromotions(order, totalAmount);
        
        order.setTotalAmount(totalAmount);
        
        // Save order
        return orderRepository.save(order);
    }
    
    public List<Order> getOrdersByCustomer(String customerId) {
        Optional<Customer> customerOptional = customerRepository.findByCustomerId(customerId);
        
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            return orderRepository.findByCustomer(customer);
        }
        
        return List.of();
    }
    
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public String updateOrderStatus(Long id, String status) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(status);
            orderRepository.save(order);
            return "Order status updated successfully";
        }
        
        return "Order not found";
    }
    
    public String cancelOrder(Long id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            // Check if order can be canceled
            if (order.getStatus().equals("PENDING")) {
                // Return items to inventory
                for (OrderItem item : order.getOrderItems()) {
                    String productId = item.getProduct().getProductId();
                    Integer quantity = item.getQuantity();
                    
                    // Get current inventory
                    Inventory inventory = inventoryService.getInventoryByProductId(productId);
                    if (inventory != null) {
                        inventory.setCurrentQuantity(inventory.getCurrentQuantity() + quantity);
                        inventoryService.saveInventory(inventory);
                    }
                }
                
                order.setStatus("CANCELED");
                orderRepository.save(order);
                return "Order canceled successfully";
            } else {
                return "Cannot cancel order with status: " + order.getStatus();
            }
        }
        
        return "Order not found";
    }
}