<template>
  <div class="nav-container" :class="{ bgWhite: navWhite }">
    <nav class="main-nav">
      <BaseLogo :is-dark-blue="isDarkBlue" />
      <menu-icon
        v-if="isMedium"
        size="1.5x"
        class="menu-icon"
        @click="navMenuState"
      />

      <ul v-else class="main-nav__list">
        <router-link to="/">
          <li :class="{ darkBlue: navWhite }">
            Offers
          </li>
        </router-link>
        <router-link to="/companies">
          <li :class="{ darkBlue: navWhite }">
            Companies
          </li>
        </router-link>
        <router-link to="/profile/dashboard">
          <li :class="{ darkBlue: navWhite }">
            Profile
          </li>
        </router-link>
        <router-link v-if="!loggedInUser" to="/login">
          <li :class="{ darkBlue: navWhite }">
            Login
          </li>
        </router-link>
        <router-link to="/offer/post">
          <BaseButton>Post a job</BaseButton>
        </router-link>
        <li
          v-if="loggedInUser"
          class="main-nav__list__user"
          :class="{ linkActive: showDropdown, darkBlue: navWhite }"
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
import { MenuIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'

export default {
  components: {
    BaseLogo,
    NavbarDropdown,
    BaseLoggedUserBadge,
    MenuIcon
  },
  props: {
    navWhite: {
      type: Boolean,
      deafult: false
    }
  },
  data() {
    return {
      showDropdown: false,
      isNavMenuOpened: false
    }
  },
  computed: {
    ...mapGetters(['isMedium']),
    loggedInUser() {
      return StorageService.getUserData()
    },
    isDarkBlue() {
      return this.navWhite
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

<style lang="scss" scoped>
.nav-container {
  width: 100%;
  .main-nav {
    @include flex(space-between, center);
    max-width: $nav-width;
    margin: $margin-center;
    padding: $padding-sm 1rem;
    .menu-icon {
      cursor: pointer;
    }
    &__list {
      @include flex(null, center);
      z-index: 1;
      a,
      li {
        @include transition;
        color: $white;
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
.bgWhite {
  background-color: $white;
}
.darkBlue {
  color: $dark-blue !important;
}
</style>
