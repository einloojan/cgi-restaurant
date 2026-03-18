package com.cgi.practice.restaurant_reservation.dto;

import com.cgi.practice.restaurant_reservation.enums.Zone;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter

public class RecommendationRequest {
    private LocalDateTime reservationStart;
    private LocalDateTime reservationEnd;
    private int partySize;
    private Zone zone;

    private boolean windowSeat;
    private boolean quietArea;
    private boolean accessible;
    private boolean nearPlayArea;
}
