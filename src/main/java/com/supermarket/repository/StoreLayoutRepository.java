package com.supermarket.repository;

import com.supermarket.model.StoreLayout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreLayoutRepository extends JpaRepository<StoreLayout, Long> {
    Optional<StoreLayout> findByLayoutId(String layoutId);
}