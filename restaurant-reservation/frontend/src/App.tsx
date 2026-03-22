import { useEffect, useState } from "react"
import './index.css'
import FilterForm from "./components/FilterForm"
import TableLayout from "./components/TableLayout"
import { fetchTables, fetchRecommendations } from "./api"
import type { RestaurantTable, TableRecommendationResponse, RecommendationRequest } from "./types"

function App() {
  const [tables, setTables] = useState<RestaurantTable[]>([])
  const [recommendations, setRecommendations] = useState<TableRecommendationResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTables() {
      try {
        const data = await fetchTables()
        setTables(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load tables')
      }
    }

    loadTables()
  }, [])

  async function handleSearch(request: RecommendationRequest) {
    try {
      setLoading(true)
      setError('')
      const data = await fetchRecommendations(request)
      setRecommendations(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load recommendations')
    } finally {
      setLoading(false)
    }
    }

    return (
      <div className="app">
        <header>
          <h1>Restaurant Table Reservation</h1>
        </header>

        <div className="page-content">
          {/* LEFT: filter */}
          <FilterForm onSearch={handleSearch} />
          {/* RIGHT: results + layout */}
          <div className="right-panel">
            {loading && <p>Loading recommendations</p>}
            {error && <p className="error-text">{error}</p>}

            {recommendations.length > 0 && (
              <div className="recommendation-summary">
                <h2>Recommendations</h2>
                <ol>
                  {recommendations.map((table) => (
                    <li key={table.id}>
                      {table.tableNumber} ({table.zone}) - score {table.score}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <TableLayout tables={tables} recommendations={recommendations} />
          </div>
        </div>
      </div>
    )
  }

export default App
