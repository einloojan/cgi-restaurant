# Restaurant Reservation System (CGI internship task)

## Description
Web application for restaurant table reservation and recommendation.

Users can:
- search available tables
- filter by time, group size, zone
- recieve table recommendations based on preferences
- view tables on a simplified restaurant layout
- reserve the top recommended table directly from frontend

Backend: Spring Boot
Frontend: React + TypeScript (Vite)

---

## Features

### Backend
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
- Availability endpoint for showing occupied tables on the layout

### Frontend
- Search form for:
  - reservation start and end time
  - group size
  - zone
  - optional preferences
- Restaurant layout visualization using simplified table coordinates
- Highlighting of:
  - top recommended table
  - other recommended tables
  - occupied tables
- Reservation flow from frontend to backend using “Reserve top recommendation”
---

## Running the project

### 1. Clone the repository
Clone the repository from GitHub

### 2. Run the backend
Open the backend project in your IDE and start the Spring Boot application.
Backend runs on:
`http://localhost:8080`

### 3. Run the frontend
Open a terminal in the `frontend` folder and run:

npm install
npm run dev

Frontend runs on:
http://localhost:5173

## Notes
- Backend must be running before the frontend is used
- Test/Demo data is used for tables and reservations
- CORS is configured for local frontend-backend communication

Example backend endpoints:
- `GET /api/tables`
- `POST /api/tables/recommendations`
- `POST /api/tables/availability`
- `POST /api/reservations`

---
  
## Requirements

- Java 25
- Maven
- Node.js
- npm

---

## Design decisions

- Table layout uses simplified coordinates (x, y) for visualization
- Table size is not modeled to keep the solution simple
- Preferences are implemented as boolean fields
- DTOs are used to separate API layer from database entities
- Recommendation is implemented using simple scoring approach
- Occupied tables are determined dynamically based on reservation data for the selected time interval

---

## Documentation

- [Development notes](restaurant-reservation/docs/development-notes.md)
