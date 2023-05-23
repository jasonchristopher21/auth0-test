<template>
    <div>
        <Navbar :handleLogin="login" :handleLogout="logout" />
        <div class="px-10 py-6">
            <div class="font-lexend text-[30px] font-bold mt-5">
                Account Created!
            </div>
            <div class="text-[18px] mt-2">
                You may login now
            </div>
        </div>
    </div>
</template>
    
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '../components/Navbar.vue';
import { RouterLink } from "vue-router";

export default {
    setup() {
        const { loginWithRedirect, logout } = useAuth0();

        return {
            login: () => {
                loginWithRedirect();
            },
            logout: () => {
                logout({
                    logoutParams: {
                        returnTo: window.location.origin
                    }
                })
            }
        };
    },
    components: {
        Navbar,
    }
};
</script>