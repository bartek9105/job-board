<template>
    <nav class="main-nav">
        <Logo :jobTextColor="jobTextColor"/>
        <div class="main-nav__links">
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
                <router-link to="/post-offer">
                    <Button>Post a job</Button>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
import Logo from '@/components/Logo'
import Button from '@/components/Button'

export default {
  components: {
    Logo,
    Button
  },
  data () {
    return {
      jobTextColor: '#fff'
    }
  }
}
</script>

<style lang="scss">
    .main-nav {
        max-width: 1640px;
        margin: 0 auto;
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__links {
            ul {
                display: flex;
                align-items: center;
                list-style: none;
                a {
                    font-size: 14px;
                    font-weight: 700;
                    color: $text-white;
                    margin-right: 3rem;
                    text-decoration: none;
                    &:hover {
                        color: $theme-pink;
                    }
                }
            }
        }
    }
</style>
