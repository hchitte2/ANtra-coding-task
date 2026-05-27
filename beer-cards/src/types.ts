export interface Rating {
  average: number
  reviews: number
}

export interface Beer {
  id: number
  name: string
  price: string
  rating: Rating
}