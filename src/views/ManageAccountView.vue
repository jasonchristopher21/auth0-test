<template>
    <div>
        <Navbar />
        <div class="px-10 py-8">
            <div class="font-lexend text-[30px] font-bold">
                Manage Accounts
            </div>

            <div class="font-lexend text-[20px] font-bold mt-5 text-dgray">
                Your Account
            </div>
            <div v-if="userDetails">
                <AccountCard type="this" :data="userDetails.data" />
            </div>

            <div class="flex justify-between mt-8 mb-5">
                <div class="font-lexend text-[20px] font-bold my-auto text-dgray">
                    Manage Other Accounts
                </div>
                <RouterLink to="/createacct" class="mr-8"
                    v-if="isUserFetched && userDetails.data.user_metadata.role === 'admin'">
                    <div
                        class="text-brick border border-orange px-10 py-2 rounded-full w-[13.5rem] hover:cursor-pointer hover:opacity-80 hover:bg-brick hover:text-white hover:border-brick transition-all">
                        Add an Account
                    </div>
                </RouterLink>
            </div>

            <div v-if="!isUserFetched">
                Loading Data
            </div>

            <div v-if="isUserFetched && !userDetails.data.user_metadata.children.length">
                You don't have any accounts under you
            </div>

            <div v-if="isUserFetched && userDetails.data.user_metadata.role !== 'admin'">
                You are not authorised to create or manage other accounts
            </div>

            <div v-if="isUserFetched && userDetails.data.user_metadata.children.length" v-for="data in accountsManaged">
                <AccountCard :data="data" type="other" :deleteLogic="deleteUser" />
            </div>

        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue'
import axios from 'axios';
import { RouterLink } from "vue-router";
import AccountCard from '../components/AccountCard.vue';
import { useAuthStore } from '../stores/authStore';
import { useManagementTokenStore } from '../stores/managementTokenStore';

export default {
    setup() {
        const authStore = useAuthStore();
        const userDetails = ref(null);
        const isUserFetched = ref(false);
        const accountsManaged = ref([]);
        const open = ref(false);

        async function fetchUsers() {
            const managementTokenStore = useManagementTokenStore();
            await managementTokenStore.fetchManagementApiToken();
            const api_token = managementTokenStore.token;
            axios
                .get(`${import.meta.env.VITE_AUTH0_API_URL}users/${authStore.user.sub}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + api_token,
                    }
                })
                .then((response) => {
                    userDetails.value = response
                    isUserFetched.value = true
                    console.log(response)
                    for (let i = 0; i < userDetails.value.data.user_metadata.children.length; i++) {
                        axios.get(`${import.meta.env.VITE_AUTH0_API_URL}users/${userDetails.value.data.user_metadata.children[i]}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: 'Bearer ' + api_token,
                            }
                        }).then((response) => {
                            accountsManaged.value.push(response.data);
                            console.log(accountsManaged)
                        }).catch((err) => {
                            console.error(err)
                        })
                    }
                }).catch((err) => {
                    console.error(err)
                })
        }

        async function deleteUser(userId) {
            const managementTokenStore = useManagementTokenStore();
            await managementTokenStore.fetchManagementApiToken();
            const api_token = managementTokenStore.token;
            await axios.delete(`${import.meta.env.VITE_AUTH0_API_URL}users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + api_token,
                }
            }).then((response) => {
                console.log(`user ${userId} deleted`)
                let metadata = userDetails.value.data.user_metadata
                metadata.children = metadata.children.filter(id => id !== userId)
                axios.patch(`${import.meta.env.VITE_AUTH0_API_URL}users/${authStore.user.sub}`,
                    {
                        "user_metadata": metadata
                    }, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + api_token,
                    }
                })
            }).catch((err) => {
                console.error(err)
            })
        }

        fetchUsers();

        return {
            authStore,
            userDetails,
            fetchUsers,
            isUserFetched,
            accountsManaged,
            deleteUser,
            open,
        };
    },
    components: {
        Navbar,
        AccountCard,
    }
};
</script>