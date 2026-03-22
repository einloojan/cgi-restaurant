import type {
  RestaurantTable,
  TableRecommendationResponse,
  TableAvailabilityResponse,
} from '../types'

// Initial version of this layout component was created with the help of ChatGPT.
// Rendering logic and table visualization were reviewed and adapted manually.

type Props = {
  tables: RestaurantTable[]
  recommendations: TableRecommendationResponse[]
  availability: TableAvailabilityResponse[]
}

function TableLayout({ tables, recommendations, availability }: Props) {
  const recommendedIds = new Set(recommendations.map((table) => table.id))
  const occupiedIds = new Set(
    availability.filter((table) => table.occupied).map((table) => table.id),
  )
  const topRecommendationId =
    recommendations.length > 0 ? recommendations[0].id : null

  return (
    <div className="layout-wrapper">
      <h2>Restaurant layout</h2>

      <div className="layout">
        {tables.map((table) => {
          const isRecommended = recommendedIds.has(table.id)
          const isTopRecommendation = topRecommendationId === table.id
          const isOccupied = occupiedIds.has(table.id)

          return (
            <div
              key={table.id}
              className={`table-box ${
                isOccupied
                  ? 'occupied-table'
                  : isTopRecommendation
                  ? 'top-recommended'
                  : isRecommended
                  ? 'recommended'
                  : 'default-table'
              }`}
              style={{
                left: `${table.x}px`,
                top: `${table.y}px`,
              }}
              title={`${table.tableNumber} | Capacity: ${table.capacity} | Zone: ${table.zone}`}
            >
              {isOccupied && <strong>Occupied</strong>}
              {isTopRecommendation && !isOccupied && <strong>Recommended</strong>}
              <div>{table.tableNumber}</div>
              <div>{table.capacity} seats</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TableLayout