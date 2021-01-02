<template>
  <div class="nav-container">
    <nav class="main-nav">
      <Logo :job-text-color="jobTextColor" />
      <ul class="main-nav__list">
        <router-link to="/">
          <li>Offers</li>
        </router-link>
        <router-link v-if="!isLoggedIn" to="/login">
          <li>Login</li>
        </router-link>
        <router-link to="/post-offer">
          <Button>Post a job</Button>
        </router-link>
        <li
          v-if="isLoggedIn"
          class="main-nav__list__user"
          :class="{ linkActive: showDropdown }"
          @click="showDropdown = !showDropdown"
        >
          <LoggedUser
            :logged-in-user-name="loggedInUser"
            class="main-nav__list__user"
          />
          <NavbarDropdown
            :show-dropdown="showDropdown"
            class="main-nav__list__dropdown"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import Button from '@/components/Base/Button'
import NavbarDropdown from '@/components/NavbarDropdown'
import LoggedUser from '@/components/LoggedUser'

export default {
  components: {
    Logo,
    Button,
    NavbarDropdown,
    LoggedUser
  },
  data() {
    return {
      showDropdown: false,
      jobTextColor: '#182952'
    }
  },
  computed: {
    isLoggedIn() {
      return window.localStorage.currentUser
    },
    loggedInUser() {
      return JSON.parse(window.localStorage.currentUser).name
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
    &__list {
      @include flex(null, center);
      a,
      li {
        cursor: pointer;
        font-size: $font-content-md;
        font-weight: $font-bold;
        &:hover {
          color: $pink;
        }
      }
      a {
        margin-right: 3rem;
      }
      &__user {
        position: relative;
      }
      &__dropdown {
        position: absolute;
        top: 60px;
        right: 0;
        a {
          margin-right: 0;
        }
      }
    }
  }
}
.linkActive {
  color: $pink !important;
}
</style>
