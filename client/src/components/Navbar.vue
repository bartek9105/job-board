<template>
  <div class="nav-container">
    <nav class="main-nav">
      <Logo :job-text-color="jobTextColor" />
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
          <li @click="logoutUser">
            Logout
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import Button from '@/components/Base/Button'
import { mapActions } from 'vuex'

export default {
  components: {
    Logo,
    Button
  },
  data() {
    return {
      jobTextColor: '#182952'
    }
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout()
    }
  }
}
</script>

<style lang="scss">
.nav-container {
  width: 100%;
  background: $white;
  .main-nav {
    @include flex(space-between, center);
    @include shadow;
    background: $white;
    max-width: $nav-width;
    margin: $margin-center;
    padding: $padding-sm 1rem;
    &__links {
      ul {
        @include flex(null, center);
        a {
          font-size: $font-content-md;
          font-weight: $font-bold;
          margin-right: 3rem;
          &:hover {
            color: $pink;
          }
        }
      }
    }
  }
}
</style>
