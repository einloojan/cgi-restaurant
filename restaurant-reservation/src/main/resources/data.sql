INSERT INTO restaurant_tables (id, table_number, capacity, zone, x, y, window_seat, quiet_area, accessible, near_play_area)
VALUES
    (1, 'T1', 2, 'INDOOR', 50, 50, true, false, false, false),
    (2, 'T2', 4, 'INDOOR', 120, 50, false, true, false, false),
    (3, 'T3', 4, 'TERRACE', 50, 120, true, false, false, false),
    (4, 'T4', 6, 'INDOOR', 120, 120, false, true, true, false);

INSERT INTO reservations (id, customer_name, reservation_start, reservation_end, party_size, status, table_id)
VALUES
    (1, 'Alice', '2026-03-26T18:00:00', '2026-03-26T20:00:00', 2, 'ACTIVE', 1),
    (2, 'Bob', '2026-03-26T19:00:00', '2026-03-26T21:00:00', 4, 'ACTIVE', 2);