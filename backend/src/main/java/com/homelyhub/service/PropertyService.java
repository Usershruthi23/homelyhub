package com.homelyhub.service;

import com.homelyhub.dto.PropertyRequest;
import com.homelyhub.model.Property;
import com.homelyhub.model.PropertyType;
import com.homelyhub.model.User;
import com.homelyhub.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
    }

    public List<Property> searchProperties(String location, PropertyType propertyType, Double minPrice, Double maxPrice, Integer bedrooms) {
        return propertyRepository.searchProperties(location, propertyType, minPrice, maxPrice, bedrooms);
    }

    public List<Property> getPropertiesByOwner(User owner) {
        return propertyRepository.findByOwner(owner);
    }

    public List<Property> getPropertiesByOwnerId(Long ownerId) {
        return propertyRepository.findByOwnerId(ownerId);
    }

    public Property createProperty(PropertyRequest request, User owner) {
        Property property = new Property(
                request.getTitle(),
                request.getDescription(),
                request.getPrice(),
                request.getLocation(),
                request.getPropertyType(),
                request.getBedrooms(),
                request.getBathrooms(),
                request.getArea(),
                request.getImageUrl(),
                request.getAvailable() != null ? request.getAvailable() : true,
                owner
        );
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, PropertyRequest request, User owner) {
        Property property = getPropertyById(id);

        // Security check: Only the owner or an admin can update
        if (!property.getOwner().getId().equals(owner.getId()) && !owner.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("You are not authorized to update this property");
        }

        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setLocation(request.getLocation());
        property.setPropertyType(request.getPropertyType());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setArea(request.getArea());
        if (request.getImageUrl() != null && !request.getImageUrl().isBlank()) {
            property.setImageUrl(request.getImageUrl());
        }
        if (request.getAvailable() != null) {
            property.setAvailable(request.getAvailable());
        }

        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id, User currentUser) {
        Property property = getPropertyById(id);
        if (!property.getOwner().getId().equals(currentUser.getId()) && !currentUser.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("You are not authorized to delete this property");
        }
        propertyRepository.delete(property);
    }
}
