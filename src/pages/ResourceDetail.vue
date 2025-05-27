<template>
  <div v-if="resource">
    <h2>{{ resource.name }}</h2>
    <p>Цена: {{ resource.currentPrice }}</p>
    <p :class="rarityColorClass">Редкость: {{ rarityText }}</p>
    <p>У вас в наличии: {{ inventoryAmount }}</p>

    <button @click="buy" :disabled="store.user?.balance < resource.price">Купить</button>
    <button @click="sell" :disabled="inventoryAmount === 0">Продать</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
// import api from '../plugins/axios'
import { useMainStore } from '../store'
import { getResourceDetail, buyResource, sellResource } from '../services/api'


const route = useRoute()
const store = useMainStore()
const resource = ref<any>(null)
const inventoryAmount = ref<number>(0)
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
}

onMounted(load)

async function buy() {
  await buyResource(Number(route.params.id))
  await load()
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
</style>