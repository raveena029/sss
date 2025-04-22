package com.supermarket.repository;

import com.supermarket.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductId(String productId);
    List<Inventory> findByCurrentQuantityLessThanEqual(Integer threshold);
    List<Inventory> findByReorderStatus(String status);
}