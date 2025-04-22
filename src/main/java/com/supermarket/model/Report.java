package com.supermarket.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Map;

@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reportId;
    private String title;
    private Date generationDate;
    private String dataRange;
    
    @ElementCollection
    private Map<String, Object> data;
    
    private String author;
    private String format;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getReportId() {
        return reportId;
    }
    
    public void setReportId(String reportId) {
        this.reportId = reportId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public Date getGenerationDate() {
        return generationDate;
    }
    
    public void setGenerationDate(Date generationDate) {
        this.generationDate = generationDate;
    }
    
    public String getDataRange() {
        return dataRange;
    }
    
    public void setDataRange(String dataRange) {
        this.dataRange = dataRange;
    }
    
    public Map<String, Object> getData() {
        return data;
    }
    
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
    
    public String getAuthor() {
        return author;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }
    
    public String getFormat() {
        return format;
    }
    
    public void setFormat(String format) {
        this.format = format;
    }
    
    public Report generateReport() {
        // Implementation for generating report
        return this;
    }
    
    public void addDataSection(String title, String data, Object value) {
        this.data.put(title + ":" + data, value);
    }
    
    public Report filterDataOnDate(Date date, Date endDate) {
        // Implementation for filtering data by date range
        return this;
    }
    
    public void includePurchaseTypes(List<String> types) {
        // Implementation for including purchase types
    }
}