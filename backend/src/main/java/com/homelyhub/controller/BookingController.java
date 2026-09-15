package com.homelyhub.controller;

import com.homelyhub.dto.BookingRequest;
import com.homelyhub.model.Booking;
import com.homelyhub.model.User;
import com.homelyhub.service.BookingService;
import com.homelyhub.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    public BookingController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest request, Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        Booking created = bookingService.createBooking(request, currentUser);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        List<Booking> bookings = bookingService.getUserBookings(currentUser);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.getUserByEmail(authentication.getName());
        Booking cancelled = bookingService.cancelBooking(id, currentUser);
        return ResponseEntity.ok(cancelled);
    }
}
