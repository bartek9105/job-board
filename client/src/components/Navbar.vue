<template>
    <div class="nav-container">
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
    </div>
</template>

<script>
import Logo from '@/components/Logo'
import Button from '@/components/Base/Button'

export default {
  components: {
    Logo,
    Button
  },
  data () {
    return {
      jobTextColor: '#182952'
    }
  }
}
</script>

<style lang="scss">
    .nav-container {
        width: 100%;
        background: #fff;
        .main-nav {
            @include shadow;
            background: #fff;
            max-width: 1640px;
            margin: 0 auto;
            padding: 1rem;
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
                        color: $theme-dark-blue;
                        margin-right: 3rem;
                        text-decoration: none;
                        &:hover {
                            color: $theme-pink;
                        }
                    }
                }
            }
        }
    }
</style>
