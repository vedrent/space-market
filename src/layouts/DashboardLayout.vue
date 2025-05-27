<template>
  <div>
    <nav>
      <router-link to="/dashboard/resources">Ресурсы</router-link> |
      <router-link to="/dashboard/auctions">Аукционы</router-link> |
      <router-link to="/dashboard/profile">Профиль</router-link> |
      <button @click="showEvents = !showEvents">События дня</button>
    </nav>

    <EventsPopup v-if="showEvents" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EventsPopup from '../components/EventsPopup.vue'

const showEvents = ref(false)
</script>

<style scoped>
nav {
  background: #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
nav a {
  margin: 0 10px;
}
</style>
