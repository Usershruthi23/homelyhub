package com.homelyhub.repository;

import com.homelyhub.model.Property;
import com.homelyhub.model.PropertyType;
import com.homelyhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByOwner(User owner);

    List<Property> findByOwnerId(Long ownerId);

    List<Property> findByAvailableTrue();

    @Query("SELECT p FROM Property p WHERE " +
           "(:location IS NULL OR :location = '' OR LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:propertyType IS NULL OR p.propertyType = :propertyType) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:bedrooms IS NULL OR p.bedrooms >= :bedrooms)")
    List<Property> searchProperties(@Param("location") String location,
                                    @Param("propertyType") PropertyType propertyType,
                                    @Param("minPrice") Double minPrice,
                                    @Param("maxPrice") Double maxPrice,
                                    @Param("bedrooms") Integer bedrooms);
}
