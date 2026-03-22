import { useEffect, useState } from "react"
import "./index.css"
import FilterForm from "./components/FilterForm"
import TableLayout from "./components/TableLayout"
import {
  fetchTables,
  fetchRecommendations,
  fetchAvailability,
  createReservation,
} from "./api"
import type {
  RestaurantTable,
  TableRecommendationResponse,
  RecommendationRequest,
  TableAvailabilityResponse,
} from "./types"

function App() {
  const [tables, setTables] = useState<RestaurantTable[]>([])
  const [recommendations, setRecommendations] = useState<
    TableRecommendationResponse[]
  >([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [lastRequest, setLastRequest] = useState<RecommendationRequest | null>(
    null,
  )
  const [availability, setAvailability] = useState<TableAvailabilityResponse[]>(
    [],
  )
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    async function loadTables() {
      try {
        const data = await fetchTables()
        setTables(data)
      } catch (err) {
        console.error(err)
        setError("Failed to load tables")
      }
    }

    loadTables()
  }, [])

  async function handleSearch(request: RecommendationRequest) {
    try {
      setLoading(true)
      setError("")
      setSuccessMessage("")
      setLastRequest(request)

      const [recommendationData, availabilityData] = await Promise.all([
        fetchRecommendations(request),
        fetchAvailability({
          reservationStart: request.reservationStart,
          reservationEnd: request.reservationEnd,
        }),
      ])

      setRecommendations(recommendationData)
      setAvailability(availabilityData)
    } catch (err) {
      console.error(err)
      setError("Failed to load recommendations")
    } finally {
      setLoading(false)
    }
  }

  async function handleReserveTopTable() {
    if (!lastRequest || recommendations.length === 0) return

    const topTable = recommendations[0]

    try {
      setError("")
      setSuccessMessage("")

      await createReservation({
        customerName: "Test User",
        tableId: topTable.id,
        reservationStart: lastRequest.reservationStart,
        reservationEnd: lastRequest.reservationEnd,
        partySize: lastRequest.partySize,
      })

      setSuccessMessage(`Reservation created for table ${topTable.tableNumber}`)
      setRecommendations([])

      const availabilityData = await fetchAvailability({
        reservationStart: lastRequest.reservationStart,
        reservationEnd: lastRequest.reservationEnd,
      })

      setAvailability(availabilityData)
    } catch (err) {
      console.error(err)
      setError("Failed to create reservation")
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Restaurant Table Reservation</h1>
      </header>

      <div className="page-content">
        <FilterForm onSearch={handleSearch} />

        <div className="right-panel">
          {loading && <p>Loading recommendations...</p>}
          {error && <p className="error-text">{error}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}

          {recommendations.length > 0 && (
            <div className="recommendation-summary">
              <h2>Recommendations</h2>
              <ol>
                {recommendations.map(table => (
                  <li key={table.id}>
                    {table.tableNumber} ({table.zone}) - score {table.score}
                  </li>
                ))}
              </ol>

              <button onClick={handleReserveTopTable}>
                Reserve top recommendation
              </button>
            </div>
          )}

          <TableLayout
            tables={tables}
            recommendations={recommendations}
            availability={availability}
          />
        </div>
      </div>
    </div>
  )
}

export default App
