package com.homelyhub.controller;

import com.homelyhub.dto.AdminStatsDto;
import com.homelyhub.dto.UserDto;
import com.homelyhub.model.Booking;
import com.homelyhub.model.BookingStatus;
import com.homelyhub.model.Property;
import com.homelyhub.model.Role;
import com.homelyhub.repository.BookingRepository;
import com.homelyhub.repository.PropertyRepository;
import com.homelyhub.repository.UserRepository;
import com.homelyhub.service.BookingService;
import com.homelyhub.service.PropertyService;
import com.homelyhub.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final PropertyService propertyService;
    private final BookingService bookingService;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;

    public AdminController(UserService userService,
                           PropertyService propertyService,
                           BookingService bookingService,
                           UserRepository userRepository,
                           PropertyRepository propertyRepository,
                           BookingRepository bookingRepository) {
        this.userService = userService;
        this.propertyService = propertyService;
        this.bookingService = bookingService;
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/properties")
    public ResponseEntity<List<Property>> getAllProperties() {
        return ResponseEntity.ok(propertyService.getAllProperties());
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getAdminStats() {
        long totalUsers = userRepository.countByRole(Role.USER);
        long totalOwners = userRepository.countByRole(Role.OWNER);
        long totalProperties = propertyRepository.count();
        long totalBookings = bookingRepository.count();
        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
        long confirmedBookings = bookingRepository.countByStatus(BookingStatus.CONFIRMED);

        AdminStatsDto stats = new AdminStatsDto(totalUsers, totalOwners, totalProperties, totalBookings, pendingBookings, confirmedBookings);
        return ResponseEntity.ok(stats);
    }
}
