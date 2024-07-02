package com.example.real_estate_backend.controller;


import com.example.real_estate_backend.service.PropertyService;
import com.example.real_estate_backend.domain.Property;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("property")
public class PropertyController {

    public final PropertyService propertyService;
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("properties")
    public List<Property> getAllProperties() {
        return propertyService.getProperties();
    }

    @GetMapping("/{propertyId}")
    public Property getPropertyById(@PathVariable int propertyId) {
        return propertyService.getPropertyById(propertyId);
    }
    @GetMapping("/filter")
    public Property getPropertyByName(@RequestParam String name) {
        return propertyService.getPropertyByName(name);
    }
}
