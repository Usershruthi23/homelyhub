package com.homelyhub.service;

import com.homelyhub.dto.BookingRequest;
import com.homelyhub.model.Booking;
import com.homelyhub.model.BookingStatus;
import com.homelyhub.model.Property;
import com.homelyhub.model.User;
import com.homelyhub.repository.BookingRepository;
import com.homelyhub.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository;

    public BookingService(BookingRepository bookingRepository, PropertyRepository propertyRepository) {
        this.bookingRepository = bookingRepository;
        this.propertyRepository = propertyRepository;
    }

    public Booking createBooking(BookingRequest request, User user) {
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getAvailable()) {
            throw new RuntimeException("Property is currently not available for booking");
        }

        if (request.getCheckOut().isBefore(request.getCheckIn()) || request.getCheckOut().isEqual(request.getCheckIn())) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        long days = ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
        if (days <= 0) days = 1;

        double totalPrice = days * property.getPrice();

        Booking booking = new Booking(
                property,
                user,
                request.getCheckIn(),
                request.getCheckOut(),
                request.getGuests(),
                totalPrice,
                BookingStatus.PENDING
        );

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(User user) {
        return bookingRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Booking> getOwnerBookings(Long ownerId) {
        return bookingRepository.findByOwnerId(ownerId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public Booking cancelBooking(Long id, User currentUser) {
        Booking booking = getBookingById(id);
        if (!booking.getUser().getId().equals(currentUser.getId()) && !currentUser.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Not authorized to cancel this booking");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(Long id, BookingStatus status, User owner) {
        Booking booking = getBookingById(id);
        if (!booking.getProperty().getOwner().getId().equals(owner.getId()) && !owner.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Not authorized to update status for this booking");
        }
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
}
