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
        <router-link v-if="userInfo" to="/profile/dashboard">
          <li :class="{ darkBlue: navWhite }">
            Profile
          </li>
        </router-link>
        <router-link v-if="!userInfo" to="/login">
          <li :class="{ darkBlue: navWhite }">
            Login
          </li>
        </router-link>
        <router-link to="/offer/post">
          <BaseButton>Post a job</BaseButton>
        </router-link>
        <li
          v-if="userInfo"
          class="main-nav__list__user"
          :class="{ linkActive: showDropdown, darkBlue: navWhite }"
          @click="showDropdown = !showDropdown"
        >
          <BaseLoggedUserBadge
            :user-info="userInfo"
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
import { mapGetters } from 'vuex'
import { MenuIcon } from 'vue-feather-icons'
import BaseLogo from '@/components/Base/BaseLogo'
import NavbarDropdown from '@/components/NavbarDropdown'
import BaseLoggedUserBadge from '@/components/Base/BaseLoggedUserBadge'
import StorageService from '@/services/storage.service'

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
    isDarkBlue() {
      return this.navWhite
    },
    userInfo() {
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
