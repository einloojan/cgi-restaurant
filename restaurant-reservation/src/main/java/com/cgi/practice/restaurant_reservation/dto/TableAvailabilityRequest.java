package com.cgi.practice.restaurant_reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter

public class TableAvailabilityRequest {
    private LocalDateTime reservationStart;
    private LocalDateTime reservationEnd;
}
