<template>
  <div v-if="visible" class="popup">
    <h3>События дня</h3>
    <ul>
      <li v-for="e in events" :key="e.id">{{ e.message }}</li>
    </ul>
    <button @click="visible = false">Закрыть</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import { useMainStore } from '../store'
import { connectToEvents } from '../services/socket'

const visible = ref(false)
const events = ref<any[]>([])
const store = useMainStore()

onMounted(() => {
  const socket = connectToEvents()
  socket.on('event', (event) => {
    events.value.unshift(event)
  })
})
</script>

<style scoped>
.popup {
  position: fixed;
  right: 20px;
  top: 60px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
