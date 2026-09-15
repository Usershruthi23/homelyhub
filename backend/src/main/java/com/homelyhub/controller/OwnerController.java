package com.homelyhub.controller;

import com.homelyhub.dto.OwnerStatsDto;
import com.homelyhub.model.Booking;
import com.homelyhub.model.BookingStatus;
import com.homelyhub.model.Property;
import com.homelyhub.model.User;
import com.homelyhub.repository.BookingRepository;
import com.homelyhub.repository.PropertyRepository;
import com.homelyhub.service.BookingService;
import com.homelyhub.service.PropertyService;
import com.homelyhub.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owner")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
public class OwnerController {

    private final PropertyService propertyService;
    private final BookingService bookingService;
    private final UserService userService;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;

    public OwnerController(PropertyService propertyService,
                           BookingService bookingService,
                           UserService userService,
                           PropertyRepository propertyRepository,
                           BookingRepository bookingRepository) {
        this.propertyService = propertyService;
        this.bookingService = bookingService;
        this.userService = userService;
        this.propertyRepository = propertyRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/properties")
    public ResponseEntity<List<Property>> getMyProperties(Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(propertyService.getPropertiesByOwner(currentUser));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getMyPropertyBookings(Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(bookingService.getOwnerBookings(currentUser.getId()));
    }

    @PutMapping("/bookings/{id}/approve")
    public ResponseEntity<Booking> approveBooking(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        Booking approved = bookingService.updateBookingStatus(id, BookingStatus.CONFIRMED, currentUser);
        return ResponseEntity.ok(approved);
    }

    @PutMapping("/bookings/{id}/reject")
    public ResponseEntity<Booking> rejectBooking(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        Booking rejected = bookingService.updateBookingStatus(id, BookingStatus.REJECTED, currentUser);
        return ResponseEntity.ok(rejected);
    }

    @GetMapping("/stats")
    public ResponseEntity<OwnerStatsDto> getOwnerStats(Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        Long ownerId = currentUser.getId();

        long propertiesCount = propertyRepository.findByOwnerId(ownerId).size();
        long totalBookings = bookingRepository.countByOwnerId(ownerId);
        long pendingBookings = bookingRepository.countByOwnerIdAndStatus(ownerId, BookingStatus.PENDING);
        long confirmedBookings = bookingRepository.countByOwnerIdAndStatus(ownerId, BookingStatus.CONFIRMED);
        double revenue = bookingRepository.sumConfirmedRevenueByOwnerId(ownerId);

        OwnerStatsDto stats = new OwnerStatsDto(propertiesCount, totalBookings, pendingBookings, confirmedBookings, revenue);
        return ResponseEntity.ok(stats);
    }
}
