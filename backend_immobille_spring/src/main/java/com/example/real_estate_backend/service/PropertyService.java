package com.example.real_estate_backend.service;

import com.example.real_estate_backend.domain.Property;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {
    private List<Property> properties;

    @PostConstruct
    private void init() {
        properties = List.of(
                new Property(1, "Cozy Cottage", "A small cozy cottage in the woods", "123 Forest Lane", "cottage.jpg", "Cottage", "Available"),
                new Property(2, "Luxury Villa", "A luxurious villa with a sea view", "456 Ocean Drive", "villa.jpg", "Villa", "Sold"),
                new Property(3, "Downtown Apartment", "A modern apartment in the city center", "789 City St", "apartment.jpg", "Apartment", "Available")
        );
    }

    public List<Property> getProperties() {
        return properties;
    }

    public Property getPropertyById(int id) {
        for (Property property : properties) {
            if (property.getId() == id) {
                return property;
            }
        }
        return null;
    }
    public Property getPropertyByName(String name) {
        for (Property property : properties) {
            if (property.getName().contains(name)) {
                return property;
            }
        }
        return null;
    }


}
