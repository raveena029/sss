package com.supermarket.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class StoreLayout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String layoutId;
    private String name;
    
    @ElementCollection
    private List<StoreSection> sections;
    
    @ElementCollection
    private List<Dimension> dimensions;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getLayoutId() {
        return layoutId;
    }
    
    public void setLayoutId(String layoutId) {
        this.layoutId = layoutId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public List<StoreSection> getSections() {
        return sections;
    }
    
    public void setSections(List<StoreSection> sections) {
        this.sections = sections;
    }
    
    public List<Dimension> getDimensions() {
        return dimensions;
    }
    
    public void setDimensions(List<Dimension> dimensions) {
        this.dimensions = dimensions;
    }
    
    public Boolean updateSynchronizedLayout(StoreLayout layout) {
        // Implementation for updating layout
        return true;
    }
    
    public StoreSection addStoreSection(StoreSection section) {
        sections.add(section);
        return section;
    }
    
    public void removeSection(String sectionId) {
        sections.removeIf(section -> section.getSectionId().equals(sectionId));
    }
    
    public StoreSection findNearestSection(String productId) {
        // Implementation to find nearest section for a product
        return null;
    }
    
    public Report generateLayoutReport() {
        // Implementation to generate layout report
        return new Report();
    }
    
    public StoreLayout viewLayout() {
        return this;
    }
}