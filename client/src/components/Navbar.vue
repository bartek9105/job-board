<template>
    <header class="mx-auto flex justify-between p-4 bg-indigo-900 text-gray-100 py-6 tracking-wider items-center shadow-outline">
            <Logo/>
            <nav>
                <ul class="flex items-center">
                    <router-link to="/login">
                        <li class="mr-6">Login</li>
                    </router-link>
                    <li class="mr-6">Signup</li>
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
