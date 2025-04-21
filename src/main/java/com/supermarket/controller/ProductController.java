package main.java.com.supermarket.controller;

import com.supermarket.model.Product;
import com.supermarket.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/{id}/configure")
    public String configureProduct(@PathVariable Long id, @RequestBody List<Long> componentIds) {
        return productService.configureProduct(id, componentIds);
    }
}