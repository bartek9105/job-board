<template>
  <div class="nav-container">
    <nav class="main-nav">
      <BaseLogo :job-text-color="jobTextColor" />
      <ul class="main-nav__list">
        <router-link to="/">
          <li>Offers</li>
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
import BaseButton from '@/components/Base/Buttons/BaseButton'
import NavbarDropdown from '@/components/NavbarDropdown'
import BaseLoggedUserBadge from '@/components/Base/BaseLoggedUserBadge'

export default {
  components: {
    BaseLogo,
    BaseButton,
    NavbarDropdown,
    BaseLoggedUserBadge
  },
  data() {
    return {
      showDropdown: false,
      jobTextColor: '#182952'
    }
  },
  computed: {
    loggedInUser() {
      return StorageService.getUserData()
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
