package com.cgi.practice.restaurant_reservation.repository;

import com.cgi.practice.restaurant_reservation.entity.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
}
