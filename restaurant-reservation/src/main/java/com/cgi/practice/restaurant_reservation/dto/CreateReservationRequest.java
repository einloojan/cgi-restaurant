package com.cgi.practice.restaurant_reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter

public class CreateReservationRequest {
    private String customerName;
    private Long tableId;
    private LocalDateTime reservationStart;
    private LocalDateTime reservationEnd;
    private int partySize;
}
