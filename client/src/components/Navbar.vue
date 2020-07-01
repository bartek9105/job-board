<template>
    <header class="mx-auto flex justify-between bg-indigo-900 text-gray-100 tracking-wider items-center shadow-outline px-8 py-4">
            <Logo/>
            <nav>
                <ul class="flex items-center">
                    <router-link to="/login">
                        <li class="mr-6">Login</li>
                    </router-link>
                    <router-link to="/register">
                        <li class="mr-6">Sign up</li>
                    </router-link>
                    <li>
                        <button class="bg-red-600 p-3 px-4 rounded-md outline-none hover:bg-red-800">Post a job</button>
                    </li>
                </ul>
            </nav>
    </header>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style>

</style>
