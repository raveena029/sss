package com.supermarket.repository;

import com.supermarket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductId(String productId);
    List<Product> findByCategory(String category);
    List<Product> findByNameContaining(String keyword);
    List<Product> findByPriceLessThanEqual(Double price);
    
    @Query("SELECT p FROM Product p WHERE p.unitInStock <= 10")
    List<Product> findLowStockProducts();
}