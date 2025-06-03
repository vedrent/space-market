<template>
  <div>
    <h2>Аукционы</h2>
    <button @click="createAuction">Создать аукцион</button>
    <table class="table-container">
      <thead>
        <tr><th>Название</th><th>Цена</th><th>Редкость</th><th>Время</th></tr>
      </thead>
      <tbody>
        <tr v-for="auction in auctions" :key="auction.id" @click="openDetail(auction.id)">
          <td>{{ auction.resourceName }}</td>
          <td>{{ auction.currentPrice }}</td>
          <td :class="rarityColorClass(auction.resourceRarity)">{{ getRarityText(auction.resourceRarity) }}</td>
          <td>{{ formatTime(auction.remainingTimeSeconds) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="auctions.length === 0">
      <p>Нет активных аукционов</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '../plugins/axios'
import { getAuctions } from '../services/api'
import { ref, onMounted } from 'vue'
import { useMainStore } from '../store'
import { useRouter } from 'vue-router'

const store = useMainStore()
const auctions = ref<any[]>([])
const router = useRouter()
const remainingTime = ref<number>(0)

function getRarityText(rarity: number): string {
  switch (rarity) {
    case 1: return 'Обычная'
    case 2: return 'Редкая'
    case 3: return 'Легендарная'
    default: return `${rarity}`
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

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

onMounted(async () => {
  const data = await getAuctions()
  auctions.value = data

  setInterval(() => {
    auctions.value.forEach(a => {
      if (a.remainingTimeSeconds > 0) {
        a.remainingTimeSeconds--
      }
    })
  }, 1000)
})

async function openDetail(id: number) {
  router.push(`/dashboard/auctions/${id}`)
}

function createAuction() {
  router.push('/dashboard/auctions/new')
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
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}
h2, p {
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
button {
  background-color: #161663;
}
</style>