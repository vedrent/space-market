import axios from 'axios'
import { useMainStore } from '../store'

// Настройка глобального axios экземпляра
const api = axios.create()

// Автоматическое добавление токена и адреса сервера к каждому запросу
api.interceptors.request.use((config) => {
  const store = useMainStore()

  if (store.token) {
    // config.headers.Authorization = `Bearer ${store.token}`
    config.headers.Authorization = `${store.token}`
  }

  if (store.server) {
    config.baseURL = `http://${store.server}`
  }

  const userId = store.user?.id
  if (userId) {
    config.headers['X-User-Id'] = userId
  }

  console.log('Отправляем запрос:', config.url)
  console.log('Заголовки:', config.headers)

  return config
})

export default api
