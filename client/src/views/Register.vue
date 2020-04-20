<template>
    <div class="flex justify-center items-center h-screen">
        <div class="sm:w-4/5 md:w-3/5 lg:w-2/5">
            <Logo class="text-center mb-8"/>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
                </div>
                <div class="flex items-center justify-between">
                <button class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign Up
                </button>
                </div>
            </form>
        </div>
    </div>
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
