<template>
  <div>
    <h2>Профиль</h2>
    <p>Логин: {{ store.user?.username }}</p>
    <p>Баланс: {{ store.user?.balance }}</p>

    <h3>Инвентарь</h3>
    <table class="table-container">
      <thead>
        <tr><th>Название</th><th>Количество</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory" :key="item.resourceId">
          <td :class="rarityColorClass(item.resourceRarity)">{{ item.resourceName }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import api from '../plugins/axios'
import { useMainStore } from '../store'
import { getInventory } from '../services/api'

const store = useMainStore()
const inventory = ref<any[]>([])

function rarityColorClass(rarity: number): string {
  switch (rarity) {
    case 1:
      return 'rarity-common'
    case 2:
      return 'rarity-rare'
    case 3:
      return 'rarity-legendary'
    default:
      return ''
  }
}

onMounted(async () => {
  inventory.value = await getInventory()
})
</script>

<style scoped>
.table-container{
  background-color: #1e1e2f;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  color: #eee;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}
table {
  margin-top: 10px;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  padding: 8px 12px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
  color: #66ccff;
}
h2, h3, p, li {
  margin-bottom: 24px;
  color: #66ccff;
}
.rarity-common {
  color: #2196f3; 
}
.rarity-rare {
  color: #a01cff; 
}
.rarity-legendary {
  color: #ff9800;
}
</style>