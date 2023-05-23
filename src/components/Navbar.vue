<script>
export default {
    data() {
        return {}
    },
    props: ['handleLogin', 'handleLogout']
}
</script>

<template>
    <div class="flex navbar px-10 py-5 bg-blue w-full justify-between">
        <span class="font-lexend xs:text-[20px] text-[25px] text-white">
            Auth0 Test
        </span>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <div class="flex"> 
        <div class="bg-brick text-white px-7 py-1 text-[18px] font-lexend rounded-full hover:cursor-pointer mr-2" @click="handleLogin">
            Login
        </div>
        
        <div class="bg-brick text-white px-7 py-1 text-[18px] font-lexend rounded-full hover:cursor-pointer mr-2" @click="handleLogout">
            Logout
        </div>
        </div>
    </div>
</template>