<template>
  <div v-if="resource">
    <h2>{{ resource.name }}</h2>
    <p>Цена: {{ resource.currentPrice }}</p>
    <p :class="rarityColorClass">Редкость: {{ rarityText }}</p>
    <p>У вас в наличии: {{ inventoryAmount }}</p>

    <input type="number" v-model.number="quantity" min="1" placeholder="Количество" />
    <div class="actions">
      <button @click="buy" :disabled="!canBuy">Купить</button>
      <button @click="sell" :disabled="inventoryAmount === 0">Продать</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
// import api from '../plugins/axios'
import { useMainStore } from '../store'
import { getResourceDetail, buyResource, sellResource } from '../services/api'
import * as signalR from "@microsoft/signalr"

const route = useRoute()
const store = useMainStore()
const resource = ref<any>(null)
const inventoryAmount = ref<number>(0)
const quantity = ref<number>(1)
const error = ref<string | null>(null)

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5227/pricehub")
  .withAutomaticReconnect()
  .build()

connection.on("ReceivePriceUpdate", (priceUpdates: any[]) => {
  for (const update of priceUpdates) {
    if (resource.value && update.id === resource.value.id) {
      resource.value.currentPrice = update.currentPrice
    }
  }
})

const rarityText = computed(() => {
  switch (resource.value?.rarity) {
    case 1: return 'Обычная'
    case 2: return 'Редкая'
    case 3: return 'Легендарная'
    default: return 'Неизвестно'
  }
})
const rarityColorClass = computed(() => {
  switch (resource.value?.rarity) {
    case 1:
      return 'rarity-common'
    case 2:
      return 'rarity-rare'
    case 3:
      return 'rarity-legendary'
    default:
      return ''
  }
})


async function load() {
  const data = await getResourceDetail(Number(route.params.id))
  resource.value = data.resource
  inventoryAmount.value = data.userAmount
  error.value = null
}

onMounted(async () => {
  await load()
  await connection.start()
  console.log('SignalR connected for detail page')
})

async function buy() {
  error.value = null
  try {
    const res = await buyResource(Number(route.params.id), quantity.value)
    store.user!.balance = res.balance // обновим баланс в store
    await load()
  } catch (err: any) {
    error.value = err.response?.data || 'Произошла ошибка при покупке.'
  }
}

async function sell() {
  await sellResource(Number(route.params.id))
  await load()
}
</script>

<style scoped>
.rarity-common {
  color: #2196f3; 
}
.rarity-rare {
  color: #a01cff; 
}
.rarity-legendary {
  color: #ff9800; 
}
h2, p {
  margin-bottom: 24px;
  color: #66ccff;
}
button {
  margin: 10px;
}
</style>