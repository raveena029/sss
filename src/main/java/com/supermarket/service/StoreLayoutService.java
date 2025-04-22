package com.supermarket.service;

import com.supermarket.model.Dimension;
import com.supermarket.model.Report;
import com.supermarket.model.StoreLayout;
import com.supermarket.model.StoreSection;
import com.supermarket.repository.StoreLayoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreLayoutService {

    @Autowired
    private StoreLayoutRepository storeLayoutRepository;
    
    @Autowired
    private ReportService reportService;

    public StoreLayout getStoreLayout(String layoutId) {
        return storeLayoutRepository.findByLayoutId(layoutId).orElse(null);
    }
    
    public List<StoreLayout> getAllLayouts() {
        return storeLayoutRepository.findAll();
    }
    
    public StoreLayout createLayout(StoreLayout layout) {
        return storeLayoutRepository.save(layout);
    }
    
    public String updateLayout(Long id, StoreLayout layoutDetails) {
        Optional<StoreLayout> layoutOptional = storeLayoutRepository.findById(id);
        
        if (layoutOptional.isPresent()) {
            StoreLayout layout = layoutOptional.get();
            layout.setName(layoutDetails.getName());
            layout.setSections(layoutDetails.getSections());
            layout.setDimensions(layoutDetails.getDimensions());
            
            storeLayoutRepository.save(layout);
            return "Layout updated successfully";
        }
        
        return "Layout not found";
    }
    
    public String addSection(Long layoutId, StoreSection section) {
        Optional<StoreLayout> layoutOptional = storeLayoutRepository.findById(layoutId);
        
        if (layoutOptional.isPresent()) {
            StoreLayout layout = layoutOptional.get();
            List<StoreSection> sections = layout.getSections();
            sections.add(section);
            layout.setSections(sections);
            
            storeLayoutRepository.save(layout);
            return "Section added successfully";
        }
        
        return "Layout not found";
    }
    
    public String removeSection(Long layoutId, String sectionId) {
        Optional<StoreLayout> layoutOptional = storeLayoutRepository.findById(layoutId);
        
        if (layoutOptional.isPresent()) {
            StoreLayout layout = layoutOptional.get();
            List<StoreSection> sections = layout.getSections();
            sections.removeIf(section -> section.getSectionId().equals(sectionId));
            layout.setSections(sections);
            
            storeLayoutRepository.save(layout);
            return "Section removed successfully";
        }
        
        return "Layout not found";
    }
    
    public Report generateLayoutReport(Long layoutId) {
        Optional<StoreLayout> layoutOptional = storeLayoutRepository.findById(layoutId);
        
        if (layoutOptional.isPresent()) {
            StoreLayout layout = layoutOptional.get();
            
            // Create report data
            Map<String, Object> data = new HashMap<>();
            data.put("layoutName", layout.getName());
            data.put("sectionCount", layout.getSections().size());
            
            // Generate report
            return reportService.generateCustomReport("Store Layout Report", data);
        }
        
        return null;
    }
}