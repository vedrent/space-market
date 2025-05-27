<template>
  <div class="server-select">
    <h2>Выберите сервер</h2>
    <ul>
      <li v-for="s in servers" :key="s" @click="selectServer(s)">
        {{ s }}
      </li>
    </ul>
    <!-- <input v-model="custom" placeholder="IP:Port" />
    <button @click="selectServer(custom)">Подключиться</button> -->
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

<style scoped>
.server-select {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #1e1e2f;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
}

.server-select h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #66ccff;
}

.server-select ul {
  list-style: none;
  padding: 0;
}

.server-select li {
  background: #2a2a3d;
  margin: 8px 0;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.server-select li:hover {
  background: #3a3a5a;
  transform: scale(1.02);
}
</style>