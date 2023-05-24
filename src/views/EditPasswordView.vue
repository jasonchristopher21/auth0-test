<template>
    <div>
        <Navbar :handleLogin="login" :handleLogout="logout" />
        <div class="px-10 py-6">
            <div class="font-lexend text-[30px] font-bold mt-5">
                Edit Profile: Change Password
            </div>
            <div class="font-lexend text-dgray text-[18px] mt-5">New Password</div>
            <div class="mt-2">
                <input v-model="password" type="password" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]"
                    placeholder="Password">
            </div>
            <div class="font-lexend text-dgray text-[18px] mt-3">Confirm Password</div>
            <div class="mt-2">
                <input v-model="passwordChallenge" type="password"
                    class="py-3 px-7 rounded-full border border-gray-500 w-[40%]" placeholder="Password">
            </div>
            <div class="text-brick text-[14px] mt-3" v-if="!matchPassword">
                Passwords do not match
            </div>
            <div class="flex">
                <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full w-[19rem] mt-5 hover:cursor-pointer hover:opacity-80 transition-all"
                    @click="editProfile">
                    Update my Password!
                </div>

                <RouterLink to="/edit/profile">
                    <div class="text-blue border border-blue px-10 py-2 font-lexend text-[20px] rounded-full w-[14rem] ml-3 mt-5 hover:cursor-pointer hover:opacity-80 hover:bg-cyan hover:text-white hover:border-cyan transition-all">
                        Update Profile
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
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

export default {
    setup() {
        const { loginWithRedirect, logout } = useAuth0();
        const authStore = useAuthStore();
        const password = ref("");
        const passwordChallenge = ref("");
        const successful = ref(false);
        const matchPassword = computed(() => {
            return passwordChallenge.value === "" || passwordChallenge.value == password.value
        })

        return {
            password,
            passwordChallenge,
            authStore,
            matchPassword,
            editProfile: async () => {
                await useManagementTokenStore().fetchManagementApiToken();
                const api_token = useManagementTokenStore().token;
                axios.patch(`${import.meta.env.VITE_AUTH0_API_URL}users/${authStore.user.sub}`,
                    {
                        password: password.value
                    }, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + api_token,
                    }
                }).then((response) => {
                    console.log(response.data);
                    successful.value = true;
                    window.location.href = "/updatesuccessful"
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