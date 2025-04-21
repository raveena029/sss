package main.com.supermarket.service;

import com.supermarket.model.Product;
import com.supermarket.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public String configureProduct(Long productId, List<Long> componentIds) {
        // Logic to configure product
        return "Product configured successfully!";
    }
}