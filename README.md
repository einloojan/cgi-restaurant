# Restaurant Reservation System (CGI internship task)

## Description
Web application for restaurant table reservation and recommendation.

Users can:
- search available tables
- filter by time, group size, zone
- recieve table recommendations based on preferences
- view tables on a simplified restaurant layout

Backend: Spring Boot
Frontend: React

---

## Features (Backend)
- Restaurant table and reservation data model
- Filtering by:
  - reservation time
  - group size
  - zone (e.g. indoor, terrace, private room)
- Table availability check based on time overlap
- Reservation creation with validation:
  - table existence
  - capacity check
  - time conflict check
- Basic recommendation system:
  - filters suitable tables
  - excludes occupied tables
  - assigns score based on:
    - how well table fits group size
    - user preferences (window, quiet area, etc.) 

---

## Running the project

1. Clone the repository
2. Run the Spring Boot application
3. Backend runs on: http://localhost:8080

Example endpoints:
- `GET /api/tables`
- `POST /api/tables/recommendations`
- `POST /api/reservations`

---
  
## Requirements

- Java 25
- Maven

---

## Design decisions

- Table layout uses simplified coordinates (x, y) for visualization
- Table size is not modeled to keep the solution simple
- Preferences are implemented as boolean fields
- DTOs are used to separate API layer from database entities
- Recommendation is implemented using simple scoring approach

---

## Documentation

- [Development notes](restaurant-reservation/docs/development-notes.md)
