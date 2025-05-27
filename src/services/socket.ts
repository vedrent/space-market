import { io, Socket } from 'socket.io-client'
import { useMainStore } from '../store'

let socket: Socket | null = null

export function connectToEvents(): Socket {
  const store = useMainStore()

  if (!socket) {
    socket = io(`ws://${store.server}/events`, {
      auth: {
        token: store.token
      }
    })
  }

  return socket
}
