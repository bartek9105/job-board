<template>
  <div v-if="showDropdown" class="nav-dropdown">
    <ul class="nav-dropdown__list">
      <router-link to="/dashboard">
        <li class="nav-dropdown__list__item">
          <columns-icon size="1.25x" class="nav-dropdown__list__icon" />
          Dashboard
        </li>
      </router-link>
      <router-link to="/settings">
        <li class="nav-dropdown__list__item">
          <settings-icon size="1.25x" class="nav-dropdown__list__icon" />
          Settings
        </li>
      </router-link>

      <router-link to="/">
        <li class="nav-dropdown__list__item" @click="logoutUser">
          <log-out-icon size="1.25x" class="nav-dropdown__list__icon" />
          Logout
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ColumnsIcon, SettingsIcon, LogOutIcon } from 'vue-feather-icons'

export default {
  name: 'NavbarDropdown',
  components: {
    ColumnsIcon,
    SettingsIcon,
    LogOutIcon
  },
  props: {
    showDropdown: Boolean
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-dropdown {
  position: relative;
  &__list {
    @include flex(center, center, column);
    @include shadow;
    background: $white;
    border-radius: $border-radius-sm;
    &__icon {
      margin-right: 1rem;
    }
    a {
      width: 100%;
    }
    &__item {
      @include flex(null, center);
      text-align: center;
      padding: $padding-sm $padding-md;
      border-radius: $border-radius-sm;
      &:hover {
        background-color: $dark-blue;
        color: $white !important;
      }
    }
  }
}
</style>
