package com.cgi.practice.restaurant_reservation.controller;

import com.cgi.practice.restaurant_reservation.dto.CreateReservationRequest;
import com.cgi.practice.restaurant_reservation.entity.Reservation;
import com.cgi.practice.restaurant_reservation.service.ReservationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http:localhost:5173")

public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public Reservation createReservation(@RequestBody CreateReservationRequest request) {
        return reservationService.createReservation(request);
    }
}
