package com.cgi.practice.restaurant_reservation.entity;

import com.cgi.practice.restaurant_reservation.enums.Zone;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "restaurant_tables")

public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tableNumber;
    private int capacity;

    @Enumerated(EnumType.STRING)
    private Zone zone;

    private int x;
    private int y;

    private boolean windowSeat;
    private boolean quietArea;
    private boolean accessible;
    private boolean nearPlayArea;
}
