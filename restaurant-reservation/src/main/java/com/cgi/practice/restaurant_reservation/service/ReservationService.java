package com.cgi.practice.restaurant_reservation.service;

import com.cgi.practice.restaurant_reservation.dto.CreateReservationRequest;
import com.cgi.practice.restaurant_reservation.entity.Reservation;
import com.cgi.practice.restaurant_reservation.entity.RestaurantTable;
import com.cgi.practice.restaurant_reservation.enums.ReservationStatus;
import com.cgi.practice.restaurant_reservation.repository.ReservationRepository;
import com.cgi.practice.restaurant_reservation.repository.RestaurantTableRepository;
import org.springframework.stereotype.Service;

@Service

public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RestaurantTableRepository restaurantTableRepository;

    public ReservationService(ReservationRepository reservationRepository, RestaurantTableRepository restaurantTableRepository) {
        this.reservationRepository = reservationRepository;
        this.restaurantTableRepository = restaurantTableRepository;
    }


    //At this part I collaborated with AI to get the services set up and running.
    public boolean isTableAvailable(Long tableId, CreateReservationRequest request) {
        return reservationRepository
                .findByRestaurantTableIdAndStatusAndReservationStartLessThanAndReservationEndGreaterThan(
                        tableId,
                        ReservationStatus.ACTIVE,
                        request.getReservationEnd(),
                        request.getReservationStart()
                )
                .isEmpty();
    }

    //Also here abit, if statements I kinda figured out myself.
    public Reservation createReservation(CreateReservationRequest request) {
        RestaurantTable table = restaurantTableRepository.findById(request.getTableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        if (table.getCapacity() < request.getPartySize()) {
            throw new RuntimeException("Table capacity is too small");
        }

        if (!isTableAvailable(request.getTableId(), request)) {
            throw new RuntimeException("Table is already reserved for this time");
        }

        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.getCustomerName());
        reservation.setReservationStart(request.getReservationStart());
        reservation.setReservationEnd(request.getReservationEnd());
        reservation.setPartySize(request.getPartySize());
        reservation.setStatus(ReservationStatus.ACTIVE);
        reservation.setRestaurantTable(table);

        return reservationRepository.save(reservation);
    }
}
