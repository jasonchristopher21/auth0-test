<template>
    <div>
        <Navbar :handleLogin="login" />
        <div class="px-10 py-8">
            <div class="font-lexend text-[30px] font-bold">
                Progress
            </div>
            <div class="text-[18px] mt-2">
                Login feature uses the default Auth0 universal login which is hard to be customised, but is working
                properly.<br>
                You can try to login using the default email and password used for MarinaNet.
            </div>
            <div class="font-lexend text-[30px] font-bold mt-5">
                Create Account
            </div>
            <div class="text-[18px] mt-2">
                You can create an account here! (uses Auth0 Management API)
            </div>
            <RouterLink to="/signup">
                <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full w-[17rem] mt-5">
                    Create an Account
                </div>
            </RouterLink>
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