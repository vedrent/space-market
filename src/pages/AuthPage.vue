<template>
  <div>
    <h2>Вход / Регистрация</h2>
    <input v-model="username" placeholder="Логин" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Вход</button>
    <button @click="register">Регистрация</button>
  </div>
</template>

<script setup lang="ts">
// import api from '../plugins/axios'
import { useMainStore } from '../store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { login as apiLogin, register as apiRegister } from '../services/api'

const username = ref('')
const password = ref('')
const router = useRouter()
const store = useMainStore()

async function login() {
  const user = await apiLogin(username.value, password.value)
  store.setUser(user)
  router.push('/dashboard/resources')
}

async function register() {
  await apiRegister(username.value, password.value)
  await login()
}
</script>
