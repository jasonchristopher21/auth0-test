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

    <Teleport to="body">
        <div v-if="open" class="fixed z-50 top-0 bg-[#00000040] w-full h-full backdrop-blur-sm dropshadow"
            @click="open = false">
            <div class="bg-white mt-[7rem] w-[24rem] h-[74%] m-auto rounded-2xl p-10 pt-20 align-center">

                <img :src="success" class="w-1/2 mx-auto" />
                <p class="text-center mx-3 mt-8 text-lg font-bold">
                    You have successfully created a new account!
                </p>
                <RouterLink to="/createacct">
                    <div
                        class="text-green border border-green px-10 py-3 rounded-full w-[19rem] hover:cursor-pointer hover:opacity-80 hover:bg-green hover:text-white hover:border-green transition-all mt-7 mx-auto text-center">
                        Create Another Account
                    </div>
                </RouterLink>
                <RouterLink to="/manage">
                    <div class="text-blue border border-blue px-10 py-3 rounded-full w-[19rem] hover:cursor-pointer hover:opacity-80 hover:bg-cyan hover:text-white hover:border-cyan transition-all mx-auto text-center mt-3"
                        @click="open = false">
                        Back to Manage Accounts
                    </div>
                </RouterLink>
            </div>
        </div>
    </Teleport>
</template>
    
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '../components/Navbar.vue';
import { useManagementTokenStore } from "../stores/managementTokenStore";
import axios from 'axios';
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import success from "../assets/success.png";

export default {
    setup() {
        const email = ref("");
        const password = ref(`${import.meta.env.VITE_DEFAULT_PASSWORD}`);
        const role = ref("user");
        const name = ref("");
        const successful = ref(false);
        const authStore = useAuthStore();
        const open = ref(false);

        return {
            success,
            name,
            email,
            role,
            open,
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
                }).then(() => {
                    open.value = true;
                }).catch((err) => {
                    console.error(err);
                })
            },
            reload: () => {
                window.location.reload();
            }
        };
    },
    components: {
        Navbar,
    }
};
</script>