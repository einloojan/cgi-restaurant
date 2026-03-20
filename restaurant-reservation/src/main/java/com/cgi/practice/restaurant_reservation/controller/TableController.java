package com.cgi.practice.restaurant_reservation.controller;

import com.cgi.practice.restaurant_reservation.dto.RecommendationRequest;
import com.cgi.practice.restaurant_reservation.dto.TableRecommendationResponse;
import com.cgi.practice.restaurant_reservation.entity.RestaurantTable;
import com.cgi.practice.restaurant_reservation.repository.RestaurantTableRepository;
import com.cgi.practice.restaurant_reservation.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")

public class TableController {

    private final RestaurantTableRepository restaurantTableRepository;
    private final RecommendationService recommendationService;

    public TableController(RestaurantTableRepository restaurantTableRepository, RecommendationService recommendationService) {
        this.restaurantTableRepository = restaurantTableRepository;
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return restaurantTableRepository.findAll();
    }

    @PostMapping("/recommendations")
    public List<TableRecommendationResponse> getRecommendations(@RequestBody RecommendationRequest request) {
        return recommendationService.getRecommendations(request);
    }
}
