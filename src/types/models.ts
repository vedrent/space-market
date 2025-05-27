export type Server = {
  name: string
  address: string
}

export type User = {
  id: number
  username: string
  balance: number
}

export type Resource = {
  id: number
  name: string
  rarity: 'Обычный' | 'Редкий' | 'Уникальный'
  price: number
}

export type InventoryItem = {
  resourceId: number
  resourceName: string
  amount: number
}

export type Auction = {
  id: number
  resourceId: number
  resourceName: string
  currentPrice: number
  remainingTime: number
}
