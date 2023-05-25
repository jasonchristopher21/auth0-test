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
                    v-if="type === 'other'" @click="removeAccount">
                    Delete Account
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { RouterLink } from 'vue-router';
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
        function removeAccount() {
            deleteLogic.value(data.value.user_id)
        }
        return {
            type,
            data,
            deleteLogic,
            removeAccount
        };
    },
    components: { RouterLink }
}
</script>