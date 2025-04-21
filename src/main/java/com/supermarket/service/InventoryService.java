package com.supermarket.service;

import com.supermarket.model.Inventory;
import com.supermarket.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getLowStockItems() {
        return inventoryRepository.findByQuantityLessThanEqual(10);
    }
}