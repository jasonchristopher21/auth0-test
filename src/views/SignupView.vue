<template>
    <div>
        <Navbar :handleLogin="login" :handleLogout="logout" />
        <div class="px-10 py-6">
            <div class="font-lexend text-[30px] font-bold mt-5">
                Create Account
            </div>
            <div class="mt-5">
                <input v-model="name" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]" placeholder="Full Name">
            </div>
            <div class="mt-3">
                <input v-model="email" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]" placeholder="Email">
            </div>
            <div class="mt-3">
                <input v-model="password" type="password" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]"
                    placeholder="Password">
            </div>
            <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full w-[17rem] mt-5 hover:cursor-pointer hover:opacity-80 transition-all"
                @click="createAccount">
                Create an Account
            </div>
        </div>
    </div>
</template>
    
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '../components/Navbar.vue';
import { useManagementTokenStore } from "../stores/managementTokenStore";
import axios from 'axios';
import { ref } from 'vue';

export default {
    setup() {
        const { loginWithRedirect, logout } = useAuth0();
        const email = ref("");
        const password = ref("");
        const name = ref("");
        const successful = ref(false);

        return {
            name,
            email,
            password,
            createAccount: async () => {
                await useManagementTokenStore().fetchManagementApiToken();
                const api_token = useManagementTokenStore().token;
                axios.post(`${import.meta.env.VITE_AUTH0_API_URL}users`, {
                    "email": email.value,
                    "password": password.value,
                    "connection": "Username-Password-Authentication"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + api_token,
                    }
                }).then((response) => {
                    console.log(response.data);
                    successful.value = true;
                    window.location.href="/forcelogin"
                }).catch((err) => {
                    console.error(err);
                })
            },
            login: () => {
                loginWithRedirect();
            },

        };
    },
    components: {
        Navbar,
    }
};
</script>