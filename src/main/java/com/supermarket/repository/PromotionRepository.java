package com.supermarket.repository;

import com.supermarket.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByIsActive(Boolean isActive);
    List<Promotion> findByProductId(Integer productId);
}