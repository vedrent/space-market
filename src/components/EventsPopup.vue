<template>
  <div class="events-wrapper">
    <button @click="visible = !visible" class="events-button">События дня</button>
    <div v-if="visible" class="popup">
      <h3>События дня</h3>
      <ul>
        <li v-for="e in events" :key="e.id">
          <strong>{{ new Date(e.timestamp).toLocaleString() }}</strong>: {{ e.message }}
        </li>
      </ul>
      <button @click="visible = false">Закрыть</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import { useMainStore } from '../store'
import { connectToEvents } from '../services/socket'
import { getDailyEvents } from '../services/api'

const visible = ref(false)
const events = ref<any[]>([])

onMounted(() => {
  const socket = connectToEvents()
  socket.on('event', (event) => {
    events.value.unshift(event)
  })
})
</script>

<style scoped>
.events-wrapper {
  display: inline-block;
}

.events-button {
  padding: 8px 16px;
  background-color: #161663;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
}

.popup {
  position: fixed;
  right: 20px;
  top: 60px;
  width: 300px;
  background: #090927;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.popup h3 {
  margin-bottom: 12px;
}

.popup ul {
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.popup li {
  margin-bottom: 8px;
}

.popup button {
  margin-top: 12px;
  background: #161663;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>