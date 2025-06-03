<template>
  <div>
    <nav>
      <router-link to="/dashboard/resources">Ресурсы</router-link> |
      <router-link to="/dashboard/auctions">Аукционы</router-link> |
      <router-link to="/dashboard/profile">Профиль</router-link> |
      <button @click="showEvents = !showEvents">События дня</button> |
      <router-link to="/dashboard/profile">Логин: {{ store.user?.username }} | Баланс: {{ store.user?.balance }}</router-link> |
      <router-link to="/" v-if="store.user?.username == null">Войти</router-link>
    </nav>

    <EventsPopup v-if="showEvents" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EventsPopup from '../components/EventsPopup.vue'
import { useMainStore } from '../store'

const showEvents = ref(false)
const store = useMainStore()
</script>

<style scoped>
nav {
  background: #1e1e2f;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  color: #001eff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  border-radius: 12px;
}
nav a {
  margin: 0 10px;
}
</style>
