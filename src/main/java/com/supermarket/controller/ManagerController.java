package com.supermarket.controller;

import com.supermarket.model.Report;
import com.supermarket.service.ManagerService;
import com.supermarket.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @Autowired
    private SalesService salesService;

    @GetMapping("/reports")
    public List<Report> getAllReports() {
        return managerService.getAllReports();
    }

    @GetMapping("/reports/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        return managerService.getReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/reports/generate")
    public ResponseEntity<Report> generateReport(@RequestParam String reportType) {
        return ResponseEntity.ok(managerService.generateReport(reportType));
    }

    @GetMapping("/sales-statistics")
    public ResponseEntity<String> getSalesStatistics() {
        return ResponseEntity.ok(salesService.getSalesStatistics());
    }

    @PutMapping("/product/{id}/price")
    public ResponseEntity<String> updateProductPrice(@PathVariable Long id, @RequestParam double newPrice) {
        return ResponseEntity.ok(managerService.updateProductPrice(id, newPrice));
    }
}