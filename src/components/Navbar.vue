<script>
import { useAuthStore } from '../stores/authStore';
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            authStore: useAuthStore(),
            isExpanded: false,
        }
    },
    props: ['handleLogin', 'handleLogout'],
    methods: {
        loginPinia() {
            useAuthStore().handleLogin();
        },
        logoutPinia() {
            this.isExpanded = false;
            useAuthStore().handleLogout();
        }
    }
}
</script>

<template>
    <div class="flex navbar px-10 py-5 bg-blue w-full justify-between">
        <RouterLink to="/">
            <span class="font-lexend xs:text-[20px] text-[25px] text-white">
                Auth0 Test
            </span>
        </RouterLink>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <div class="flex">

            <div v-if="authStore.isAuthenticated"
                class="flex bg-white p-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all"
                @click="isExpanded = !isExpanded" @blur="isExpanded = false">
                <img :src="authStore.user.picture" class="h-8 w-8 mr-3 rounded-full" />
                <div class="my-auto mr-5 font-lexend">
                    {{ authStore.user.name }}
                </div>
            </div>

            <div class="bg-brick text-white px-7 py-1 text-[18px] font-lexend rounded-full hover:cursor-pointer mr-2 hover:scale-105 transition-all"
                @click="loginPinia" v-else>
                Login
            </div>

        </div>
    </div>

    <transition enter-active-class="transform transition duration-700 ease-custom"
        enter-class="-translate-y-1/2 scale-y-0 opacity-0" enter-to-class="translate-y-0 scale-y-100 opacity-100"
        leave-active-class="transform transition-all duration-700 ease-custom"
        leave-class="translate-y-0 scale-y-100 opacity-100" leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
        <div class="relative z-10" v-show="isExpanded">
            <div class="flex flex-col absolute top-2 right-2 z-10 transition-all">
                <RouterLink to="/edit/profile">
                    <div class="pl-10 py-3 pr-20 bg-white text-md drop-shadow hover:cursor-pointer hover:scale-105 transition-all rounded-t-xl hover:z-20 hover:rounded-xl"
                        @click="isExpanded = false">
                        Edit Profile
                    </div>
                </RouterLink>
                <RouterLink to="/manage">
                    <div class="pl-10 py-3 pr-20 bg-white text-md drop-shadow hover:cursor-pointer hover:scale-105 transition-all hover:z-20 hover:rounded-xl"
                        @click="isExpanded = false">
                        Manage Accounts
                    </div>
                </RouterLink>
                <div class="pl-10 py-3 pr-20 bg-brick text-white font-lexend font-bold text-md drop-shadow hover:cursor-pointer  hover:scale-105 rounded-b-xl transition-all hover:z-20 hover:rounded-xl"
                    @click="logoutPinia">
                    Logout
                </div>
            </div>
        </div>
    </transition>
</template>

<style>
.ease-custom {
    transition-timing-function: cubic-bezier(.61, -0.53, .43, 1.43);
}
</style>
