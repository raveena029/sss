package main.com.supermarket.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Component> components;

    // Getters and Setters
}