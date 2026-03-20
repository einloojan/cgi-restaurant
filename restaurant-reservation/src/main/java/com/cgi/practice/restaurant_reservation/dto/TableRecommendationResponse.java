package com.cgi.practice.restaurant_reservation.dto;

import com.cgi.practice.restaurant_reservation.enums.Zone;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class TableRecommendationResponse {
    private Long id;
    private String tableNumber;
    private int capacity;
    private Zone zone;
    private int x;
    private int y;
    private boolean occupied;
    private int score;
}
