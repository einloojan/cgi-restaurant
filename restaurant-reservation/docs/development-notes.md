## Development notes

### Overview

The backend was implemented using Spring Boot with a layered architecture:
- controller
- service
- repository
- entity 
- dto
- enums

The frontend was built with React + TypeScript using Vite.

The goal was to implement the main business requirements:
- filtering by reservation time, group size and zone
- recommending suitable tables
- displaying the restaurant layout visually
- showing occupied tables
- allowing reservation creation from the frontend

---

### Previous experience

A similar Spring Boot project was completed during a previous OOP course (web shop application).  
That experience helped structure this project, but this task required a more complex domain model and more business logic, especially around reservation overlap checking and recommendation logic.

React and TypeScript were also familiar from previous coursework, which made it a practical choice for the frontend.

---

### Entity design

Two main entities were created:
- `RestaurantTable`
- `Reservation`

The design includes:
- table capacity and zone
- optional preferences (window seat, quiet area, accessibility, etc.)
- reservation time interval (start and end)

Enums were used (e.g. `Zone`, `ReservationStatus`) to restrict possible values and improve clarity.

ChatGPT was used to brainstorm possible fields for the entities, after which the final structure was adjusted manually.

---

### Repository layer

Spring Data JPA was used for repository implementation.

Standard CRUD operations were handled using `JpaRepository`.

A custom query method was created to check time overlap between reservations:
findByRestaurantTableIdAndStatusAndReservationStartLessThanAndReservationEndGreaterThan(...)

This allows detecting conflicting reservations.

Reference:
https://docs.spring.io/spring-data/data-commons/docs/1.6.1.RELEASE/reference/html/repositories.html

---

### DTO usage

DTOs were introduced to separate API input from entity models:

- `CreateReservationRequest`
- `RecommendationRequest`
- `TableRecommendationResponse`
- `TableAvailabilityRequest`
- `TableAvailabilityResponse`

This improves:
- security (no direct entity exposure)
- clarity of API inputs/outputs
- separation between persistence layer and frontend communication

Reference:
https://www.baeldung.com/java-dto-pattern

---

### Service layer

The service layer contains the core business logic.

#### ReservationService
Handles:

- table lookup
- capacity validation
- time overlap checking
- reservation creation

The validation flow was initially structured with the help of ChatGPT and then adapted manually.

#### RecommendationService
Handles:
- filtering tables by constraints
- checking availability
- calculating recommendation score
- returning table availability for visual layout state

The scoring logic is intentionally simple:
- better fit for group size → higher score
- matching preferences → additional score

The initial scoring approach was discussed with ChatGPT and then simplified for this project.

---

### Frontend

The frontend was implemented using React + TypeScript with Vite.

Implemented frontend features:
- filter form for reservation start and end time, group size, zone and preferences
- recommendation request to the backend
- simplified restaurant layout using table coordinates (`x`, `y`)
- recommendation list shown alongside the layout
- highlighting of:
  - top recommendation
  - other recommended tables
  - occupied tables
- reservation creation from the frontend using the top recommended table

The layout was intentionally kept simple to focus on clarity and functionality rather than advanced UI complexity.

---

## CORS and frontend-backend integration

Since the frontend and backend run on different local ports during development, CORS configuration was needed.

A global `CorsConfig` was added in the backend to allow requests from the Vite frontend.

This configuration pattern was based on a previous course project and adapted for this application.

---

## Testing

The backend and frontend were tested manually.

Test cases included:
- successful reservation creation
- reservation conflict detection
- recommendation results for different filter combinations
- occupied tables being shown correctly for a selected time interval
- top recommendation being highlighted on the layout
- reservation creation directly from the frontend

Postman was used for backend endpoint testing before frontend integration.

---

### Time spent

(approximate)

- Project setup: 30 min
- Entity design: 1.5–2 h
- Repositories: 1 h
- DTOs: 1 h
- Services (logic): 4 h
- Controllers: 1 h
- Frontend setup: 30min
- Frontend implementation: ~10h
- Testing & debugging: 2–3 h
- Documentation: ~1–2 h

---

### Known limitations

 Recommendation algorithm is intentionally simple
- Error handling still uses basic `RuntimeException` messages in backend services
- Restaurant layout is simplified and not editable
- Reservation creation from frontend currently reserves the top recommended table, rather than allowing selection of any table directly on the layout
- Random generation of reserved tables was not implemented; instead, existing reservation data and test data are used

All generated ideas and code were reviewed, understood and adapted manually for this project.
