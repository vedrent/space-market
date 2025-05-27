<template>
  <div>
    <h2>Выберите сервер</h2>
    <ul>
      <li v-for="s in servers" :key="s" @click="selectServer(s)">
        {{ s }}
      </li>
    </ul>
    <input v-model="custom" placeholder="IP:Port" />
    <button @click="selectServer(custom)">Подключиться</button>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const servers = ['Европа', 'Азия']
const custom = ref('')
const store = useMainStore()
const router = useRouter()

function selectServer(server: string) {
  store.setServer("localhost:5227/api")
  router.push('/login')
}
</script>
