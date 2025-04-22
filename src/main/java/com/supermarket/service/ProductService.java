package com.supermarket.service;

import com.supermarket.model.Product;
import com.supermarket.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    
    public Product getProductByProductId(String productId) {
        return productRepository.findByProductId(productId).orElse(null);
    }
    
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
    
    public String configureProduct(Long productId, List<Long> componentIds) {
        Optional<Product> productOptional = productRepository.findById(productId);
        
        if (productOptional.isPresent()) {
            // Logic to configure product with components
            // This would typically involve finding the components by IDs and adding them to the product
            
            return "Product configured successfully!";
        }
        
        return "Product not found";
    }
    
    public List<Product> searchProductsByName(String keyword) {
        return productRepository.findByNameContaining(keyword);
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }
    
    public String updateProductPrice(Long id, Double newPrice) {
        Optional<Product> productOptional = productRepository.findById(id);
        
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setPrice(newPrice);
            productRepository.save(product);
            return "Price updated successfully";
        }
        
        return "Product not found";
    }
    
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}