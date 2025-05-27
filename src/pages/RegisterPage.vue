<template>
  <div class="auth-container">
    <h2>Регистрация</h2>
    <input v-model="username" placeholder="Логин" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="register">Зарегистрироваться</button>
    <p class="switch-text">
      Уже есть аккаунт? 
      <router-link to="/login" class="link">Войти</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '../store'
import { register as apiRegister, login as apiLogin } from '../services/api'

const username = ref('')
const password = ref('')
const router = useRouter()
const store = useMainStore()

async function register() {
  await apiRegister(username.value, password.value)
  const user = await apiLogin(username.value, password.value)
  store.setUser(user)
  router.push('/dashboard/resources')
}
</script>

<style scoped>
.auth-container {
  max-width: 360px;
  margin: 80px auto;
  padding: 32px;
  background: #1e1e2f;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  color: #eee;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

.auth-container h2 {
  margin-bottom: 24px;
  color: #66ccff;
}

.auth-container input {
  min-width: 92%;
  padding: 12px 14px;
  margin-bottom: 16px;
  border: none;
  border-radius: 8px;
  background: #2a2a3d;
  color: #eee;
  font-size: 16px;
  outline: none;
  transition: background 0.2s;
}

.auth-container input:focus {
  background: #3a3a5a;
}

.auth-container button {
  width: 100%;
  padding: 12px 0;
  margin-bottom: 12px;
  background: #66ccff;
  border: none;
  border-radius: 8px;
  color: #1e1e2f;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.auth-container button:hover {
  background: #4bb0ff;
}

.switch-text {
  font-size: 14px;
  color: #aaa;
}

.link {
  color: #66ccff;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}
</style>
