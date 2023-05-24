<template>
    <div>
        <Navbar :handleLogin="login" :handleLogout="logout" />
        <div class="px-10 py-6">
            <div class="font-lexend text-[30px] font-bold mt-5">
                Edit Profile
            </div>
            <div class="font-lexend text-dgray text-[18px] mt-5">Name</div>
            <div class="mt-2">
                <input v-model="name" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]"
                    :placeholder="authStore.user.name">
            </div>
            <div class="font-lexend text-dgray text-[18px] mt-3">Email</div>
            <div class="mt-2">
                <input v-model="email" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]"
                    :placeholder="authStore.user.email">
            </div>
            <div class="flex">
                <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full w-[17rem] mt-5 hover:cursor-pointer hover:opacity-80 transition-all"
                    @click="editProfile">
                    Update my Profile!
                </div>

                <RouterLink to="/edit/password">
                    <div class="text-blue border border-blue px-10 py-2 font-lexend text-[20px] rounded-full w-[16rem] ml-3 mt-5 hover:cursor-pointer hover:opacity-80 hover:bg-cyan hover:text-white hover:border-cyan transition-all">
                        Update Password
                    </div>
                </RouterLink>
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
import { useAuthStore } from '../stores/authStore';

export default {
    setup() {
        const { loginWithRedirect, logout } = useAuth0();
        const authStore = useAuthStore();
        const email = ref("");
        const name = ref("");
        const successful = ref(false);

        return {
            name,
            email,
            authStore,
            editProfile: async () => {
                await useManagementTokenStore().fetchManagementApiToken();
                const api_token = useManagementTokenStore().token;
                const requestBody = {};
                if (email.value) requestBody.email = email.value;
                if (name.value) requestBody.name = name.value;
                axios.patch(`${import.meta.env.VITE_AUTH0_API_URL}users/${authStore.user.sub}`,
                    requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + api_token,
                    }
                }).then((response) => {
                    console.log(response.data);
                    successful.value = true;
                    if (!requestBody.email && !requestBody.password) {
                        window.location.href = "/"
                    } else {
                        window.location.href = "/updatesuccessful"
                    }
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