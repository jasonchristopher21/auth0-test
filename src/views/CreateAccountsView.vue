<template>
    <div>
        <Navbar />
        <div class="px-10 py-6">
            <div class="font-lexend text-[30px] font-bold mt-5">
                Create Accounts for your Organisation
            </div>
            <div class="mt-5">
                <input v-model="name" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]" placeholder="Name">
            </div>
            <div class="mt-3">
                <input v-model="email" class="py-3 px-7 rounded-full border border-gray-500 w-[40%]" placeholder="Email">
            </div>
            <div class="flex mt-5">
                <div class="font-bold my-auto text-[18px] ml-10">Role</div>
                <input type="radio" v-model="role" value="user" class="w-5 h-5 ml-20 my-auto" checked />
                <div class="ml-2 my-auto">User</div>
                <input type="radio" v-model="role" value="admin" class="ml-10 w-5 h-5 my-auto" />
                <div class="ml-2 my-auto">Admin</div>
            </div>
            <div class="bg-brick text-white px-10 py-2 font-lexend text-[20px] rounded-full w-[17rem] mt-8 hover:cursor-pointer hover:opacity-80 transition-all"
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
import { useAuthStore } from '../stores/authStore';

export default {
    setup() {
        const email = ref("");
        const password = ref(`${import.meta.env.VITE_DEFAULT_PASSWORD}`);
        const role = ref("user");
        const name = ref("");
        const successful = ref(false);
        const authStore = useAuthStore();

        return {
            name,
            email,
            role,
            password,
            createAccount: async () => {
                await useManagementTokenStore().fetchManagementApiToken();
                const api_token = useManagementTokenStore().token;
                axios.post(`${import.meta.env.VITE_AUTH0_API_URL}users`, {
                    "email": email.value,
                    "password": password.value,
                    "name": name.value,
                    "user_metadata": {
                        "role": role.value,
                        "children": []
                    },
                    "connection": "Username-Password-Authentication"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + api_token,
                    }
                }).then((response) => {
                    console.log(response.data);
                    successful.value = true;
                    let originalMetadata = null;
                    axios.get(`${import.meta.env.VITE_AUTH0_API_URL}users/${authStore.user.sub}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + api_token,
                        }
                    })
                        .then((resp2) => {
                            originalMetadata = resp2.data.user_metadata
                            originalMetadata.children.push(response.data.user_id)
                        }).then(() => {
                            axios.patch(`${import.meta.env.VITE_AUTH0_API_URL}users/${authStore.user.sub}`,
                                { "user_metadata": originalMetadata }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: 'Bearer ' + api_token,
                                }
                            })
                        }).catch((err) => {
                            console.error(err)
                        })

                    axios.post(`${import.meta.env.VITE_AUTH0_API_URL}tickets/password-change`, { "user_id": response.data.user_id }, {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + api_token,
                        }
                    })
                }).catch((err) => {
                    console.error(err);
                })
            },
        };
    },
    components: {
        Navbar,
    }
};
</script>