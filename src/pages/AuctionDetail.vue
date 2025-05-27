<template>
  <div v-if="auction">
    <h2>{{ auction.resourceName }}</h2>
    <p>Текущая ставка: {{ auction.currentPrice }}</p>
    <p>Осталось времени: {{ formatTime(remainingTime) }} сек.</p>

    <input v-model="bid" type="number" placeholder="Ваша ставка" />
    <button @click="makeBid" :disabled="bid <= auction.currentPrice || remainingTime === 0">Сделать ставку</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import api from '../plugins/axios'
import { useMainStore } from '../store'
import { getAuctionDetail, placeBid } from '../services/api'

const route = useRoute()
const store = useMainStore()
const auction = ref<any>(null)
const bid = ref<number>(0)
const remainingTime = ref<number>(0)

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

onMounted(async () => {
  const data = await getAuctionDetail(Number(route.params.id))
  auction.value = data
  remainingTime.value = data.remainingTime

  setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    }
  }, 1000)
})
async function makeBid() {
  await placeBid(Number(route.params.id), bid.value)
  const data = await getAuctionDetail(Number(route.params.id))
  auction.value = data
  remainingTime.value = data.remainingTime
}
</script>
