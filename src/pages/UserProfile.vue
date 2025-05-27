<template>
  <div>
    <h2>Профиль</h2>
    <p>Логин: {{ store.user?.username }}</p>
    <p>Баланс: {{ store.user?.balance }}</p>

    <h3>Инвентарь</h3>
    <ul>
      <li v-for="item in inventory" :key="item.resourceId">
        {{ item.resourceName }} — {{ item.amount }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import api from '../plugins/axios'
import { useMainStore } from '../store'
import { getUserInventory } from '../services/api'

const store = useMainStore()
const inventory = ref<any[]>([])

onMounted(async () => {
  inventory.value = await getInventory()
})
</script>
