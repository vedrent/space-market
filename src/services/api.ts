import api from '../plugins/axios'
import { useMainStore } from '../store'


export async function getResources() {
  const res = await api.get('/Resources')
  return res.data
}

export async function getResourceDetail(id: number) {
  const {resource, userAmount} = await api.get(`/Resources/${id}`).then(res => res.data)
  // const userAmount = 0
  return {resource, userAmount }
}

export async function buyResource(resourceId: number, quantity: number = 1) {
  const response = await api.post(`/Resources/buy/${resourceId}?quantity=${quantity}`)
  return response.data
}

export async function sellResource(resourceId: number, quantity: number = 1) {
  const response = await api.post(`/Resources/sell/${resourceId}?quantity=${quantity}`)
  return response.data
}

export async function getAuctions() {
  const res = await api.get('/Auctions')
  return res.data
}

export async function getAuctionDetail(id: number) {
  const res = await api.get(`/Auctions/${id}`)
  console.log('Auction detail:', res.data)
  return res.data
}

export async function placeBid(id: number, bidAmount: number) {
  await api.post(`/Auctions/bid/${id}`, { bidAmount, userId: 2 })
}

export async function getInventory() {
  const res = await api.get('/Profile/inventory')
  return res.data
}

export async function login(username: string, password: string) {
  const res = await api.post('/Auth/login', { username, password })
  return res.data.user
}

export async function register(username: string, password: string) {
  const store = useMainStore()
  await api.post('/Auth/register', { username, password, server: store.server })
}

export async function createAuction(data: {
  resourceId: number
  startingPrice: number
  durationMinutes: number
}) {
  const now = new Date()
  const endTime = new Date(now.getTime() + data.durationMinutes * 60 * 1000)
  await api.post('/auctions/create', {
    resourceId: data.resourceId,
    startingPrice: data.startingPrice,
    endTime: endTime.toISOString()
  })
}

export async function getDailyEvents() {
  const response = await api.get('/events')
  return response.data
}