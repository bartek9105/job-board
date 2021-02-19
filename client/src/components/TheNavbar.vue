<template>
  <div class="nav-container">
    <nav class="main-nav">
      <BaseLogo :job-text-color="jobTextColor" />
      <font-awesome-icon icon="bars" class="menu-icon" @click="navMenuState" />
      <ul class="main-nav__list">
        <router-link to="/">
          <li>Offers</li>
        </router-link>
        <router-link to="/companies">
          <li>Companies</li>
        </router-link>
        <router-link v-if="!loggedInUser" to="/login">
          <li>Login</li>
        </router-link>
        <router-link to="/offer/post">
          <BaseButton>Post a job</BaseButton>
        </router-link>
        <li
          v-if="loggedInUser"
          class="main-nav__list__user"
          :class="{ linkActive: showDropdown }"
          @click="showDropdown = !showDropdown"
        >
          <BaseLoggedUserBadge
            :logged-in-user-name="loggedInUser.name"
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
import StorageService from '@/services/storage.service'
import BaseLogo from '@/components/Base/BaseLogo'
import NavbarDropdown from '@/components/NavbarDropdown'
import BaseLoggedUserBadge from '@/components/Base/BaseLoggedUserBadge'

export default {
  components: {
    BaseLogo,
    NavbarDropdown,
    BaseLoggedUserBadge
  },
  data() {
    return {
      showDropdown: false,
      jobTextColor: '#182952',
      isNavMenuOpened: false
    }
  },
  computed: {
    loggedInUser() {
      return StorageService.getUserData()
    }
  },
  methods: {
    navMenuState() {
      this.isNavMenuOpened = !this.isNavMenuOpened
      this.$emit('navMenuOpen', this.isNavMenuOpened)
    }
  }
}
</script>

<style lang="scss">
.nav-container {
  background-color: white;
  width: 100%;
  .main-nav {
    @include flex(space-between, center);
    max-width: $nav-width;
    margin: $margin-center;
    padding: $padding-sm 1rem;
    .menu-icon {
      display: none;
      cursor: pointer;
      @media (max-width: 750px) {
        display: block;
      }
    }
    &__list {
      @include flex(null, center);
      @media (max-width: 750px) {
        display: none;
      }
      a,
      li {
        cursor: pointer;
        &:hover {
          color: $pink;
        }
      }
      a {
        margin-right: 3rem;
      }
      &__user {
        position: relative;
        font-size: $font-content-lg;
        font-weight: $font-semi-bold;
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
