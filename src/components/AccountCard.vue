<template>
    <div class="bg-white drop-shadow mt-4 py-6 px-8 rounded-xl z-0">
        <div class="grid grid-cols-[100px_1fr_1fr_1fr_1.1fr] align-middle">
            <div>
                <img :src="data.picture" class="w-12 h-12 rounded-full" />
            </div>
            <div class="my-auto">
                {{ data.name }}
            </div>

            <div class="my-auto">
                {{ data.email }}
            </div>

            <div class="my-auto">
                Role: {{ data.user_metadata.role }}
            </div>
            <div class="mr-0 ml-auto">
                <RouterLink to="/edit/profile" v-if="type === 'this'">
                    <div
                        class="text-blue border border-blue px-10 py-2 rounded-full w-[12.5rem] hover:cursor-pointer hover:opacity-80 hover:bg-cyan hover:text-white hover:border-cyan transition-all">
                        Update Profile
                    </div>
                </RouterLink>
                <div class="text-red border border-red px-10 py-2 rounded-full w-[13rem] hover:cursor-pointer hover:opacity-80 hover:bg-red hover:text-white hover:border-red transition-all"
                    v-if="type === 'other'" @click="open = true">
                    Delete Account
                </div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <div v-if="open" class="fixed z-50 top-0 bg-[#00000040] w-full h-full backdrop-blur-sm dropshadow" @click="open=false">
            <div class="bg-white mt-[7rem] w-[24rem] h-[74%] m-auto rounded-2xl p-10 align-center">
                
                <img :src="warning" class="w-3/4 mx-auto" />
                <p class="text-center mx-3 text-lg font-bold">
                    Warning! Deleting an account is an irreversible action
                </p>
                <div class="text-red border border-red px-10 py-2 rounded-full w-[13rem] hover:cursor-pointer hover:opacity-80 hover:bg-red hover:text-white hover:border-red transition-all mt-5 mx-auto text-center"
                    v-if="type === 'other'" @click="removeAccount">
                    Delete Account
                </div>
                <div class="text-blue border border-blue px-10 py-2 rounded-full w-[13rem] hover:cursor-pointer hover:opacity-80 hover:bg-cyan hover:text-white hover:border-cyan transition-all mx-auto text-center mt-3"
                    v-if="type === 'other'" @click="open = false">
                    Cancel
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script>
import { ref, computed, toRefs } from 'vue'
import { RouterLink } from 'vue-router';
import warning from "../assets/warning.png"
export default {
    props: {
        type: String,
        data: Object,
        deleteLogic: {
            type: Function
        }
    },
    setup(props) {
        const { type, data, deleteLogic } = toRefs(props);
        const open = ref(false);
        function removeAccount() {
            deleteLogic.value(data.value.user_id)
            open.value = false
        }
        return {
            type,
            data,
            deleteLogic,
            removeAccount,
            open,
            warning,
        };
    },
    components: { RouterLink }
}
</script>