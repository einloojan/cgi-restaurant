export type Zone = 'INDOOR' | 'TERRACE' | 'PRIVATE_ROOM'

export type RestaurantTable = {
    id: number
    tableNumber: string
    capacity: number
    zone: Zone
    x: number
    y: number
    windowSeat: boolean
    quietArea: boolean
    accessible: boolean
    nearPlayArea: boolean
}

export type RecommendationRequest = {
    reservationStart: string
    reservationEnd: string
    partySize: number
    zone: Zone | ''
    windowSeat: boolean
    quietArea: boolean
    accessible: boolean
    nearPlayArea: boolean
}

export type TableRecommendationResponse = {
    id: number
    tableNumber: string
    capacity: number
    zone: Zone
    x: number
    y: number
    occupied: boolean
    score: number
}

export type TableAvailabilityRequest = {
    reservationStart: string
    reservationEnd: string
}

export type TableAvailabilityResponse = {
    id: number
    tableNumber: string
    capacity: number
    zone: Zone
    x: number
    y: number
    occupied: boolean
}

export type CreateReservationRequest = {
    customerName: string
    tableId: number
    reservationStart: string
    reservationEnd: string
    partySize: number
}