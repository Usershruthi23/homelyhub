package com.homelyhub.config;

import com.homelyhub.model.*;
import com.homelyhub.repository.BookingRepository;
import com.homelyhub.repository.PropertyRepository;
import com.homelyhub.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           PropertyRepository propertyRepository,
                           BookingRepository bookingRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.bookingRepository = bookingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed Users
            User admin = new User("System Admin", "admin@homelyhub.com", passwordEncoder.encode("admin123"), "9876543210", Role.ADMIN);
            User owner = new User("John Host", "owner@homelyhub.com", passwordEncoder.encode("owner123"), "9876543211", Role.OWNER);
            User user = new User("Alice Renter", "user@homelyhub.com", passwordEncoder.encode("user123"), "9876543212", Role.USER);

            userRepository.save(admin);
            User savedOwner = userRepository.save(owner);
            User savedUser = userRepository.save(user);

            // Seed Properties
            Property p1 = new Property(
                    "Skyline Luxury Apartment",
                    "A sleek 3BHK modern apartment with panoramic city views, high-speed Wi-Fi, full kitchen, and balcony.",
                    4500.0,
                    "Hyderabad",
                    PropertyType.APARTMENT,
                    3, 2, 1800,
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            Property p2 = new Property(
                    "Sunset Beach Villa",
                    "Private luxury beachfront villa with private pool, tropical garden, and direct beach access.",
                    12500.0,
                    "Goa",
                    PropertyType.VILLA,
                    4, 4, 3200,
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            Property p3 = new Property(
                    "Greenfield Co-Living PG",
                    "Cozy and modern PG for working professionals and students with meals included, AC, and 24/7 security.",
                    1200.0,
                    "Bangalore",
                    PropertyType.PG,
                    1, 1, 350,
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            Property p4 = new Property(
                    "Heritage Family House",
                    "Spacious independent family house with private garage, front lawn, spacious bedrooms, and peaceful environment.",
                    6000.0,
                    "Delhi",
                    PropertyType.HOUSE,
                    3, 3, 2400,
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            Property p5 = new Property(
                    "Urban Minimalist Studio",
                    "Compact studio apartment ideal for solo travelers and digital nomads. Fully furnished near metro station.",
                    2200.0,
                    "Mumbai",
                    PropertyType.STUDIO,
                    1, 1, 550,
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            Property p6 = new Property(
                    "Pine Hill View Room",
                    "Private suite in a scenic hill station property with mountain sunrise views, fireplace, and hot tub.",
                    3500.0,
                    "Pune",
                    PropertyType.ROOM,
                    1, 1, 400,
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            Property p7 = new Property(
                    "Royal Heritage Villa",
                    "Experience royal living in a beautifully restored heritage villa featuring courtyard, pool, and fine dining service.",
                    15000.0,
                    "Hyderabad",
                    PropertyType.VILLA,
                    5, 5, 4500,
                    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            Property p8 = new Property(
                    "Tech Park Executive Suite",
                    "Modern 2BHK residence close to major tech hubs. Includes swimming pool, gym, and underground parking.",
                    3800.0,
                    "Bangalore",
                    PropertyType.APARTMENT,
                    2, 2, 1200,
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
                    true, savedOwner
            );

            propertyRepository.save(p1);
            propertyRepository.save(p2);
            propertyRepository.save(p3);
            propertyRepository.save(p4);
            propertyRepository.save(p5);
            propertyRepository.save(p6);
            propertyRepository.save(p7);
            Property savedP8 = propertyRepository.save(p8);

            // Seed initial booking
            Booking b1 = new Booking(
                    savedP8,
                    savedUser,
                    LocalDate.now().plusDays(2),
                    LocalDate.now().plusDays(5),
                    2,
                    11400.0,
                    BookingStatus.CONFIRMED
            );
            bookingRepository.save(b1);

            System.out.println(">>> HomelyHub Sample Data Initialized Successfully! <<<");
        }
    }
}
