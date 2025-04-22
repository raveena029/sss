package com.supermarket.controller;

import com.supermarket.model.Inventory;
import com.supermarket.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/low-stock")
    public List<Inventory> getLowStockItems() {
        return inventoryService.getLowStockItems();
    }

    @PostMapping("/reorder")
    public ResponseEntity<String> reorderStock(@RequestBody List<String> productIds) {
        return ResponseEntity.ok(inventoryService.reorderStock(productIds));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<String> updateInventory(@PathVariable String productId, @RequestParam int quantity) {
        return ResponseEntity.ok(inventoryService.updateInventory(productId, quantity));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getInventoryByProductId(@PathVariable String productId) {
        return inventoryService.getInventoryByProductId(productId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}