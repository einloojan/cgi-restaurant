## Development notes

### Overview

The backend was implemented using Spring Boot with a layered architecture:
- controller
- service
- repository
- entity 
- dto
- enums

The goal was to implement a simplified but functional version of a restaurant reservation and recommendation system.

---

### Previous experience

A similar Spring Boot project was completed during a previous OOP course (web shop application).  
That experience helped structure this project, but this task required a more complex domain model.

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

This improves:
- security (no direct entity exposure)
- clarity of API inputs/outputs

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

The scoring logic is intentionally simple:
- better fit for group size → higher score
- matching preferences → additional score

The initial scoring approach was discussed with ChatGPT and then simplified for this project.

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

The scoring logic is intentionally simple:
- better fit for group size → higher score
- matching preferences → additional score

The initial scoring approach was discussed with ChatGPT and then simplified for this project.

---

### Time spent

(approximate)

- Project setup: 30 min
- Entity design: 1.5–2 h
- Repositories: 1 h
- DTOs: 1 h
- Services (logic): 3–4 h
- Controllers: 1 h
- Testing & debugging: 2–3 h
- Documentation: ~1–2 h

---

### Time spent

(approximate)

- Project setup: 30 min
- Entity design: 1.5–2 h
- Repositories: 1 h
- DTOs: 1 h
- Services (logic): 4 h
- Controllers: 1 h
- Testing & debugging: ~2 h
- Documentation: ~1 h

---

### Known limitations

- No frontend yet (visual layout missing)
- Recommendation algorithm is simple
- No concurrency handling
- Error handling uses basic RuntimeExceptions
