<template>
    <div>
        <Navbar :handleLogin="login" :handleLogout="logout" />
        <div class="px-10 py-8">
            <div class="font-lexend text-[30px] font-bold">
                Edit Profile Successful
            </div>
            <div class="text-[18px] mt-2">
                You have updated an email or a password. Please proceed to login again with the new credentials.
            </div>
            <div class="w-[19rem]">
                <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full mt-5 hover:opacity-80 transition-all hover:scale-105 hover:cursor-pointer"
                    @click="login">
                    Login to your Account
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '../components/Navbar.vue';

export default {
    setup() {
        const { loginWithRedirect } = useAuth0();

        return {
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