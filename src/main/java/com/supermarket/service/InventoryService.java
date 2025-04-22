package com.supermarket.service;

import com.supermarket.model.Inventory;
import com.supermarket.model.Product;
import com.supermarket.repository.InventoryRepository;
import com.supermarket.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;
    
    @Autowired
    private ProductRepository productRepository;

    public List<Inventory> getLowStockItems() {
        return inventoryRepository.findByCurrentQuantityLessThanEqual(10);
    }
    
    public Inventory getInventoryByProductId(String productId) {
        return inventoryRepository.findByProductId(productId).orElse(null);
    }
    
    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }
    
    public String updateInventoryQuantity(String productId, Integer newQuantity) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findByProductId(productId);
        
        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();
            inventory.setCurrentQuantity(newQuantity);
            
            // Check if reorder is needed
            if (newQuantity <= inventory.getMinimumThreshold()) {
                inventory.setReorderStatus("REORDER_NEEDED");
            } else {
                inventory.setReorderStatus("NORMAL");
            }
            
            inventoryRepository.save(inventory);
            
            // Update product stock
            Optional<Product> productOptional = productRepository.findByProductId(productId);
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                product.setUnitInStock(newQuantity);
                productRepository.save(product);
            }
            
            return "Inventory updated successfully";
        }
        
        return "Inventory not found";
    }
    
    public String reorderStock(String productId, Integer quantity) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findByProductId(productId);
        
        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();
            Integer currentQuantity = inventory.getCurrentQuantity();
            inventory.setCurrentQuantity(currentQuantity + quantity);
            inventory.setLastRestockDate(new Date());
            inventory.setReorderStatus("RESTOCKED");
            
            inventoryRepository.save(inventory);
            
            // Update product stock
            Optional<Product> productOptional = productRepository.findByProductId(productId);
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                product.setUnitInStock(currentQuantity + quantity);
                productRepository.save(product);
            }
            
            return "Stock reordered successfully";
        }
        
        return "Inventory not found";
    }
    
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
    
    public Boolean reserveStock(String productId, Integer quantity) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findByProductId(productId);
        
        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();
            if (inventory.getCurrentQuantity() >= quantity) {
                inventory.setCurrentQuantity(inventory.getCurrentQuantity() - quantity);
                inventoryRepository.save(inventory);
                return true;
            }
        }
        
        return false;
    }
}