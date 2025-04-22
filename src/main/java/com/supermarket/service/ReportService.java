package com.supermarket.service;

import com.supermarket.model.Report;
import com.supermarket.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private InventoryService inventoryService;

    public Report generateSalesReport(Date startDate, Date endDate) {
        Report report = new Report();
        report.setReportId("SALES-" + System.currentTimeMillis());
        report.setTitle("Sales Report");
        report.setGenerationDate(new Date());
        report.setDataRange(startDate + " to " + endDate);
        report.setFormat("PDF");
        
        // Create data map
        Map<String, Object> data = new HashMap<>();
        
        // Add sales data
        // This would typically involve aggregating order data within the date range
        
        report.setData(data);
        
        return reportRepository.save(report);
    }
    
    public Report generateInventoryReport() {
        Report report = new Report();
        report.setReportId("INV-" + System.currentTimeMillis());
        report.setTitle("Inventory Report");
        report.setGenerationDate(new Date());
        report.setFormat("PDF");
        
        // Create data map
        Map<String, Object> data = new HashMap<>();
        
        // Add inventory data
        // This would typically involve getting current inventory levels,
        // low stock items, etc.
        
        report.setData(data);
        
        return reportRepository.save(report);
    }
    
    public Report generateCustomReport(String title, Map<String, Object> data) {
        Report report = new Report();
        report.setReportId("CUSTOM-" + System.currentTimeMillis());
        report.setTitle(title);
        report.setGenerationDate(new Date());
        report.setFormat("PDF");
        report.setData(data);
        
        return reportRepository.save(report);
    }
    
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
    
    public Report getReportById(Long id) {
        return reportRepository.findById(id).orElse(null);
    }
    
    public List<Report> getReportsByDateRange(Date startDate, Date endDate) {
        return reportRepository.findByGenerationDateBetween(startDate, endDate);
    }
    
    public List<Report> getReportsByTitle(String title) {
        return reportRepository.findByTitle(title);
    }
}