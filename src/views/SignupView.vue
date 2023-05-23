<template>
    <div>
        <Navbar :handleLogin="login" :handleLogout="logout" />
        <div class="px-10 py-6">
            <div class="font-lexend text-[30px] font-bold mt-5">
                Create Account
            </div>
            <div class="mt-5">
                <input v-model="name" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]"
                    placeholder="Full Name">
            </div>
            <div class="mt-3">
                <input v-model="username" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]"
                    placeholder="Username">
            </div>
            <div class="mt-3">
                <input v-model="password" type="password" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]"
                    placeholder="Password">
            </div>
            <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full w-[17rem] mt-5">
                Create an Account
            </div>
        </div>
    </div>
</template>
    
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '../components/Navbar.vue';
import { useManagementTokenStore } from "../stores/managementTokenStore";

export default {
    setup() {
        const { loginWithRedirect, logout } = useAuth0();
        const username = "";
        const password = "";
        const name = "";

        return {
            name,
            username,
            password,
            createAccount: () => {
                const api_token = useManagementTokenStore().token;

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