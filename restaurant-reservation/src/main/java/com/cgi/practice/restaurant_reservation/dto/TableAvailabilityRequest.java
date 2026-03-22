package com.cgi.practice.restaurant_reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter

public class TableAvailabilityRequest {
    private LocalDate reservationStart;
    private LocalDate reservationEnd;
}
