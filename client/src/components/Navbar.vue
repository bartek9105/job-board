<template>
    <div class="mainHeader">
        <Logo/>
        <nav class="mainNav">
            <ul>
                <router-link to="/">
                    <li>Offers</li>
                </router-link>
                <router-link to="/login">
                    <li>Login</li>
                </router-link>
                <router-link to="/register">
                    <li>Sign up</li>
                </router-link>
                <li>
                    <Button>Post a job</Button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import Logo from '@/components/Logo'
import Button from '@/components/Button'

export default {
  components: {
    Logo,
    Button
  }
}
</script>

<style lang="scss">
    .mainHeader {
        max-width: 1640px;
        margin: 0 auto;
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mainNav {
        ul {
            display: flex;
            list-style: none;
            li {
                font-size: 14px;
                font-weight: 700;
                color: $text-white;
                margin-right: 3rem;
            }
        }
    }
</style>
