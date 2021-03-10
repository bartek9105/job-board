<template>
  <div class="nav-mobile">
    <div class="nav-mobile-top">
      <BaseLogo :job-text-color="jobTextColor" />
      <x-icon size="1.25x" class="close-icon" @click="closeNavMenu" />
    </div>
    <nav class="main-nav">
      <ul class="main-nav__list">
        <router-link to="/">
          <li>Offers</li>
        </router-link>
        <router-link to="/companies">
          <li>Companies</li>
        </router-link>
        <router-link to="/offer/post">
          <li>Post a job</li>
        </router-link>
      </ul>
      <ul v-if="loggedInUser" class="main-nav__list">
        <router-link to="/dashboard">
          <li class="main-nav__list__item">
            Dashboard
          </li>
        </router-link>
        <router-link to="/settings">
          <li class="main-nav__list__item">
            Settings
          </li>
        </router-link>
        <router-link to="/">
          <li class="main-nav__list__item" @click="logoutUser">
            <log-out-icon size="1.25x" class="main-nav__list__icon" />
            Logout
          </li>
        </router-link>
      </ul>
      <ul v-if="!loggedInUser" class="main-nav__list">
        <router-link to="/dashboard">
          <li class="main-nav__list__item">
            Login
          </li>
        </router-link>
        <router-link to="/settings">
          <li class="main-nav__list__item">
            Register
          </li>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StorageService from '@/services/storage.service'
import BaseLogo from '@/components/Base/BaseLogo'
import { XIcon, LogOutIcon } from 'vue-feather-icons'

export default {
  components: {
    BaseLogo,
    XIcon,
    LogOutIcon
  },
  data() {
    return {
      jobTextColor: '#182952'
    }
  },
  computed: {
    loggedInUser() {
      return StorageService.getUserData()
    }
  },
  methods: {
    closeNavMenu() {
      this.$emit('navMenuOpen', false)
    },
    ...mapActions(['logout']),
    logoutUser() {
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-mobile {
  background-color: white;
  width: 100%;
  height: 100vh;
  padding: $padding-sm;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  .nav-mobile-top {
    @include flex(space-between, center);
    margin-bottom: $margin-lg;
    .close-icon {
      cursor: pointer;
    }
  }
  .main-nav {
    &__list {
      a,
      li {
        cursor: pointer;
        margin-bottom: $margin-md;
        text-transform: uppercase;
        border-bottom: 1px solid $light-blue;
        padding-bottom: 1rem;
        &:hover {
          color: $pink;
        }
      }
      &__icon {
        margin-right: 0.5rem;
      }
    }
  }
}
.linkActive {
  color: $pink !important;
}
</style>
