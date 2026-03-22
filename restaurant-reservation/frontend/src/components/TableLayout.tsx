import type { RestaurantTable, TableRecommendationResponse } from "../types"

// Initial version of this layout component was created with the help of ChatGPT.
// Rendering logic and table visualization were reviewed and adapted manually.

type Props = {
  tables: RestaurantTable[]
  recommendations: TableRecommendationResponse[]
}

function TableLayout({ tables, recommendations }: Props) {
  const recommendedIds = new Set(recommendations.map(table => table.id))
  const topRecommendationId =
    recommendations.length > 0 ? recommendations[0].id : null

  return (
    <div className="layout-wrapper">
      <h2>Restaurant Layout</h2>

      <div className="layout">
        {tables.map(table => {
          const isRecommended = recommendedIds.has(table.id)
          const isTopRecommendation = topRecommendationId === table.id

          return (
            <div
              key={table.id}
              className={`table-box ${
                isTopRecommendation
                  ? "top-recommendation"
                  : isRecommended
                    ? "recommended"
                    : "default-table"
              }`}
              style={{
                left: `${table.x}px`,
                top: `${table.y}px`,
              }}
              title={`${table.tableNumber} | Capacity: ${table.capacity} | Zone: ${table.zone}`}
            >
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
