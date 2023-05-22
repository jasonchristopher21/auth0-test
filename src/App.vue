
<template>
  <RouterView />
</template>

<script setup>
import HomeView from './views/HomeView.vue';
import SignupView from './views/SignupView.vue';
import "./style.css"
import { RouterView } from 'vue-router';
</script>


<!-- <template>
  <div>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";
import auth0 from "auth0-js";

var webAuth = new auth0.WebAuth({
    domain: 'dev-cioju4o7r00ule5j.us.auth0.com',
    clientID: 'R9mqxjLUFpFHzxSfYdMl859yXayHFUK4',        
    responseType: 'token',
    redirectUri: 'http://localhost:5173',
  });

export default {
  setup() {
    const username = ref("");
    const password = ref("");

    const login = () => {
      webAuth.login({
        realm: "Username-Password-Authentication",
        username: username.value,
        password: password.value,
      })
    }

    const logout = () => {
      webAuth.logout({
        clientID: 'R9mqxjLUFpFHzxSfYdMl859yXayHFUK4',
        returnTo: "http://localhost:5173"
      })
    }

    return { username, password, login, logout };
  },
};
</script> -->
