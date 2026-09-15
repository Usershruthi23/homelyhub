package com.homelyhub.repository;

import com.homelyhub.model.Booking;
import com.homelyhub.model.BookingStatus;
import com.homelyhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserOrderByCreatedAtDesc(User user);

    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT b FROM Booking b WHERE b.property.owner.id = :ownerId ORDER BY b.createdAt DESC")
    List<Booking> findByOwnerId(@Param("ownerId") Long ownerId);

    List<Booking> findByPropertyId(Long propertyId);

    long countByStatus(BookingStatus status);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.property.owner.id = :ownerId")
    long countByOwnerId(@Param("ownerId") Long ownerId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.property.owner.id = :ownerId AND b.status = :status")
    long countByOwnerIdAndStatus(@Param("ownerId") Long ownerId, @Param("status") BookingStatus status);

    @Query("SELECT COALESCE(SUM(b.totalPrice), 0.0) FROM Booking b WHERE b.property.owner.id = :ownerId AND b.status = 'CONFIRMED'")
    double sumConfirmedRevenueByOwnerId(@Param("ownerId") Long ownerId);
}
