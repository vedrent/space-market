// import { io, Socket } from 'socket.io-client'
// import { useMainStore } from '../store'

// let socket: Socket | null = null

// export function connectToEvents(): Socket {
//   const store = useMainStore()

//   if (!socket) {
//     socket = io(`ws://${store.server}/events`, {
//       auth: {
//         token: store.token
//       }
//     })
//   }

//   return socket
// }

import * as signalR from '@microsoft/signalr'

export function connectToEvents() {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5227/eventshub")
    .withAutomaticReconnect()
    .build()

  connection.start().then(() => {
    console.log("Соединение с EventsHub установлено")
  }).catch(console.error)

  return connection
}
