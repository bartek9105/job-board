<template>
    <header class="mainHeader">
        <Logo/>
        <nav class="mainNav">
            <ul>
                <router-link to="/login">
                    <li>Offers</li>
                </router-link>
                <router-link to="/login">
                    <li>Login</li>
                </router-link>
                <router-link to="/register">
                    <li>Sign up</li>
                </router-link>
                <li>
                    <button>Post a job</button>
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

<style lang="scss">
    .mainHeader {
        max-width: 1640px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mainNav {
        ul {
            display: flex;
            li {
                font-weight: 700;
            }
        }
    }
</style>
