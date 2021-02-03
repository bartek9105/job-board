<template>
  <div v-if="showDropdown" class="nav-dropdown">
    <font-awesome-icon icon="sort-up" class="nav-dropdown__icon" />
    <ul class="nav-dropdown__list">
      <router-link to="/dashboard">
        <li class="nav-dropdown__list__item">
          <font-awesome-icon icon="columns" class="nav-dropdown__list__icon" />
          Dashboard
        </li>
      </router-link>
      <router-link to="/settings">
        <li class="nav-dropdown__list__item">
          <font-awesome-icon icon="cog" class="nav-dropdown__list__icon" />
          Settings
        </li>
      </router-link>

      <router-link to="/">
        <li class="nav-dropdown__list__item" @click="logoutUser">
          <font-awesome-icon
            icon="sign-out-alt"
            class="nav-dropdown__list__icon"
          />
          Logout
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NavbarDropdown',
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

<style lang="scss">
.nav-dropdown {
  position: relative;
  z-index: 1;
  &__icon {
    color: $white;
    position: absolute;
    top: -10px;
    right: 0px;
    font-size: $font-icon-lg;
    z-index: -1;
  }
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
      color: $dark-blue !important;
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
