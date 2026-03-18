package com.cgi.practice.restaurant_reservation.repository;

import com.cgi.practice.restaurant_reservation.entity.Reservation;
import com.cgi.practice.restaurant_reservation.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByRestaurantTableIdAndStatusAndReservationStartLessThanAndReservationEndGreaterThan(Long tableId, ReservationStatus status, LocalDateTime reservationEnd, LocalDateTime reservationStart);
}
