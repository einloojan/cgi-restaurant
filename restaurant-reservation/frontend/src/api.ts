import type {
    RecommendationRequest,
    RestaurantTable,
    TableRecommendationResponse,
    TableAvailabilityRequest,
    TableAvailabilityResponse,
    CreateReservationRequest,
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

export async function fetchAvailability(
    request: TableAvailabilityRequest,
): Promise<TableAvailabilityResponse[]> {
    const response = await fetch(`${BASE_URL}/api/tables/availability`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch availability')
    }

    return response.json()
}

export async function createReservation(
    request: CreateReservationRequest,
) {
    const response = await fetch(`${BASE_URL}/api/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw new Error('Failed to create reservation')
    }

    return response.json()
}