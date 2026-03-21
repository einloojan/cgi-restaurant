import type {
    RecommendationRequest,
    RestaurantTable,
    TableRecommendationResponse,
} from './types'

const BASE_URL = 'http://localhost:8080'

export async function fetchTables(): Promise<RestaurantTable[]> {
    const response = await fetch(`${BASE_URL}/api/tables`)

    if (!response.ok) {
        throw new Error('Failed to fetch tables')
    }

    return response.json()
}

export async function fetchRecommendations(
    request: RecommendationRequest,
): Promise<TableRecommendationResponse[]> {
    const response = await fetch(`${BASE_URL}/api/tables/recommendations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...request,
            zone: request.zone === '' ? null : request.zone,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
    }

    return response.json()
}
