<template>
  <div>
    <h2>Ресурсы</h2>
    <table class="table-container">
      <thead>
        <tr><th>Название</th><th>Цена</th><th>Редкость</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="r in resources" :key="r.id" @click="openDetail(r.id)">
          <td>{{ r.name }}</td>
          <td>{{ r.currentPrice }}</td>
          <td :class="rarityColorClass(r.rarity)">{{ getRarityText(r.rarity) }}</td>
          <td><button @click="openDetail(r.id)">Купить</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMainStore } from '../store'
import { useRouter } from 'vue-router'
import { getResources, buyResource } from '../services/api'
import * as signalR from "@microsoft/signalr";


const resources = ref<any[]>([])
const store = useMainStore()
const router = useRouter()

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5227/pricehub")
  .withAutomaticReconnect()
  .build()

connection.on("ReceivePriceUpdate", (priceUpdates: any[]) => {
  // Здесь обновляй цены в `resources.value`
  for (const update of priceUpdates) {
    const resource = resources.value.find(r => r.id === update.id)
    if (resource) {
      resource.currentPrice = update.currentPrice
    }
  }
})

function getRarityText(rarity: number): string {
  switch (rarity) {
    case 1: return 'Обычная'
    case 2: return 'Редкая'
    case 3: return 'Легендарная'
    default: return 'Неизвестно'
  }
}

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
  await connection.start()
  console.log("SignalR connected")

  resources.value = await getResources()
})

async function openDetail(id: number) {
  router.push(`/dashboard/resources/${id}`)
}

async function buy(id: number) {
  await buyResource(id)
  resources.value = await getResources()
}
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
.rarity-common {
  color: #2196f3; 
}
.rarity-rare {
  color: #a01cff; 
}
.rarity-legendary {
  color: #ff9800;
}
table {
  margin-top: 10px;
  border-collapse: collapse;
  width: 100%;
}
h2 {
  margin-bottom: 24px;
  color: #66ccff;
}
td, th {
  padding: 8px 12px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
  color: #66ccff;
}

</style>