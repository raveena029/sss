package com.supermarket.service;

import com.supermarket.model.Order;
import com.supermarket.model.OrderItem;
import com.supermarket.model.Promotion;
import com.supermarket.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    public List<Promotion> getAllActivePromotions() {
        return promotionRepository.findByIsActive(true);
    }
    
    public Promotion getPromotionById(Long id) {
        return promotionRepository.findById(id).orElse(null);
    }
    
    public Promotion createPromotion(Promotion promotion) {
        promotion.setIsActive(true);
        return promotionRepository.save(promotion);
    }
    
    public String updatePromotion(Long id, Promotion promotionDetails) {
        Optional<Promotion> promotionOptional = promotionRepository.findById(id);
        
        if (promotionOptional.isPresent()) {
            Promotion promotion = promotionOptional.get();
            promotion.setDescription(promotionDetails.getDescription());
            promotion.setDiscountType(promotionDetails.getDiscountType());
            promotion.setDiscountValue(promotionDetails.getDiscountValue());
            promotion.setApplicableProducts(promotionDetails.getApplicableProducts());
            promotion.setIsActive(promotionDetails.getIsActive());
            
            promotionRepository.save(promotion);
            return "Promotion updated successfully";
        }
        
        return "Promotion not found";
    }
    
    public String deactivatePromotion(Long id) {
        Optional<Promotion> promotionOptional = promotionRepository.findById(id);
        
        if (promotionOptional.isPresent()) {
            Promotion promotion = promotionOptional.get();
            promotion.setIsActive(false);
            promotionRepository.save(promotion);
            return "Promotion deactivated successfully";
        }
        
        return "Promotion not found";
    }
    
    public Double applyPromotions(Order order, Double totalAmount) {
        Double discountedAmount = totalAmount;
        
        // Get all active promotions
        List<Promotion> activePromotions = getAllActivePromotions();
        
        // Apply promotions to order items
        for (OrderItem item : order.getOrderItems()) {
            Integer productId = Integer.parseInt(item.getProduct().getProductId());
            
            // Find applicable promotions for this product
            for (Promotion promotion : activePromotions) {
                if (promotion.getApplicableProducts().contains(productId)) {
                    // Calculate discount
                    Double itemTotal = item.getPrice() * item.getQuantity();
                    Double discount = promotion.getDiscountValue() / 100 * itemTotal;
                    discountedAmount -= discount;
                }
            }
        }
        
        return discountedAmount;
    }
}