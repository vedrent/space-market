<template>
  <div>
    <h2>Создать аукцион</h2>

    <form @submit.prevent="submit">
      <label class="label-create">
        Ресурс:
        <select v-model="resourceId" required>
          <option v-for="r in resources" :key="r.id" :value="r.id">
            {{ r.name }}
          </option>
        </select>
      </label>
      <br />

      <label class="label-create">
        Начальная цена:
        <input type="number" v-model.number="startPrice" min="0.01" step="0.01" required />
      </label>
      <br />

      <label class="label-create">
        Длительность (в минутах):
        <input type="number" v-model.number="durationMinutes" min="1" required />
      </label>
      <br />

      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getResources, createAuction } from '../services/api'

const router = useRouter()
const resources = ref<any[]>([])
const resourceId = ref<number | null>(null)
const startPrice = ref<number>(0)
const durationMinutes = ref<number>(5)

onMounted(async () => {
  resources.value = await getResources()
  if (resources.value.length > 0) {
    resourceId.value = resources.value[0].id
  }
})

async function submit() {
  if (!resourceId.value) return

  await createAuction({
    resourceId: resourceId.value,
    startingPrice: startPrice.value,
    durationMinutes: durationMinutes.value
  })

  router.push('/dashboard/auctions')
}
</script>

<style scoped>
h2, p, label {
  /* margin-bottom: 24px; */
  color: #66ccff;
}
button {
  /* margin-top: 10px; */
}
input, option {
  margin: 10px;
}
</style>