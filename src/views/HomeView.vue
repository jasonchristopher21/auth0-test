<template>
    <div>
        <Navbar :handleLogin="login" :handleLogout="logout" />
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
            <div class="w-[17rem]">
            <RouterLink to="/signup">
                <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full mt-5 hover:opacity-80 transition-all">
                    Create an Account
                </div>
            </RouterLink>
            <AccountCard type="other" :data="dummyData"/>
        </div>
        </div>
    </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '../components/Navbar.vue';
import { RouterLink } from "vue-router";
import AccountCard from '../components/AccountCard.vue';

export default {
    setup() {
        const { loginWithRedirect, logout } = useAuth0();
        const dummyData = {
        "created_at": "2023-05-25T16:07:23.688Z",
        "email": "dummy1@marinachain.io",
        "email_verified": false,
        "identities": [
            {
                "connection": "Username-Password-Authentication",
                "user_id": "646f87bb15b536ffce0f9b1b",
                "provider": "auth0",
                "isSocial": false
            }
        ],
        "name": "Dummy Account",
        "nickname": "dummy1",
        "picture": "https://s.gravatar.com/avatar/1fd5efac87a84db3269d22b22668ca2f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fda.png",
        "updated_at": "2023-05-25T16:07:23.688Z",
        "user_id": "auth0|646f87bb15b536ffce0f9b1b",
        "user_metadata": {
            "role": "admin",
            "children": []
        }
    }

        return {
            dummyData,
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
        AccountCard,
    }
};
</script>