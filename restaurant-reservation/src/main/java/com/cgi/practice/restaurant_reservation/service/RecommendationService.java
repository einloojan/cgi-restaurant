package com.cgi.practice.restaurant_reservation.service;

import com.cgi.practice.restaurant_reservation.dto.RecommendationRequest;
import com.cgi.practice.restaurant_reservation.dto.TableRecommendationResponse;
import com.cgi.practice.restaurant_reservation.entity.RestaurantTable;
import com.cgi.practice.restaurant_reservation.enums.ReservationStatus;
import com.cgi.practice.restaurant_reservation.repository.ReservationRepository;
import com.cgi.practice.restaurant_reservation.repository.RestaurantTableRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service

public class RecommendationService {

    private final RestaurantTableRepository restaurantTableRepository;
    private final ReservationRepository reservationRepository;

    public RecommendationService(RestaurantTableRepository restaurantTableRepository, ReservationRepository reservationRepository) {
        this.restaurantTableRepository = restaurantTableRepository;
        this.reservationRepository = reservationRepository;
    }

    // like the other service, here I had to collaborate with AI.
    public List<TableRecommendationResponse> getRecommendations(RecommendationRequest request) {
        List<RestaurantTable> tables = restaurantTableRepository.findAll();

        return tables.stream()
                .filter(table -> table.getCapacity() >= request.getPartySize())
                .filter(table -> request.getZone() == null || table.getZone() == request.getZone())
                .filter(table -> isTableAvailable(table.getId(), request))
                .map(table -> new TableRecommendationResponse(
                        table.getId(),
                        table.getTableNumber(),
                        table.getCapacity(),
                        table.getZone(),
                        table.getX(),
                        table.getY(),
                        false,
                        calculateScore(table, request)
                ))
                .sorted(Comparator.comparingInt(TableRecommendationResponse::getScore).reversed())
                .toList();
    }

    private boolean isTableAvailable(Long tableId, RecommendationRequest request) {
        return reservationRepository
                .findByRestaurantTableIdAndStatusAndReservationStartLessThanAndReservationEndGreaterThan(
                        tableId,
                        ReservationStatus.ACTIVE,
                        request.getReservationEnd(),
                        request.getReservationStart()
                )
                .isEmpty();
    }

    // basic score calculating. Idea and recommendations helped by AI
    private int calculateScore(RestaurantTable table, RecommendationRequest request) {
        int score = 100 - (table.getCapacity() - request.getPartySize()) * 10;

        if (request.isWindowSeat() && table.isWindowSeat()) score += 10;
        if (request.isQuietArea() && table.isQuietArea()) score += 10;
        if (request.isAccessible() && table.isAccessible()) score += 10;
        if (request.isNearPlayArea() && table.isNearPlayArea()) score += 10;

        return score;
    }
}
