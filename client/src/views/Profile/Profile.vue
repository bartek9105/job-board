<template>
  <div>
    <TheNavbar :nav-white="true" />
    <div class="profile">
      <div class="sidebar">
        <BaseCompanyLogo
          :avatar-url="getUserInfo.avatarUrl"
          :img-width="120"
          :img-height="120"
        />
        <div class="sidebar__company-info">
          <h1>{{ getUserInfo.name }}</h1>
          <span>{{ getUserInfo.email }}</span>
        </div>
        <nav class="sidebar__nav">
          <ul>
            <li>
              <router-link
                to="/profile/dashboard"
                active-class="active"
                class="sidebar__nav-item"
              >
                <columns-icon size="1.5x" class="sidebar__nav-icon icon" />
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/profile/account"
                active-class="active"
                class="sidebar__nav-item"
              >
                <user-icon size="1.5x" class="sidebar__nav-icon icon" />
                Account
              </router-link>
            </li>
            <li>
              <router-link
                to="/profile/password"
                active-class="active"
                class="sidebar__nav-item"
              >
                <shield-icon size="1.5x" class="sidebar__nav-icon icon" />
                Password
              </router-link>
            </li>
            <li>
              <router-link
                to="/profile/invoices"
                active-class="active"
                class="sidebar__nav-item"
              >
                <book-icon size="1.5x" class="sidebar__nav-icon icon" />
                Invoices
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <Container class="container">
        <router-view />
      </Container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ColumnsIcon, UserIcon, ShieldIcon, BookIcon } from 'vue-feather-icons'
import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Profile',
  components: {
    ColumnsIcon,
    UserIcon,
    ShieldIcon,
    BookIcon,
    TheNavbar
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    ...mapActions(['fetchUserInfo'])
  },
  created() {
    this.fetchUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-width: 50%;
  padding: 0 2rem;
}
.profile {
  @include flex();
}
.sidebar {
  @include shadow-hover;
  @include flex(null, center, column);
  width: 400px;
  height: 100vh;
  background-color: $white;
  padding: $padding-lg;
  &__company-info {
    width: 100%;
    border-bottom: 1px solid $white-blue;
    text-align: center;
    padding-bottom: $padding-lg;
    margin-top: $margin-md;
    h1 {
      margin-bottom: $margin-sm;
    }
    span {
      color: $dark-blue-light;
      font-size: $font-content-lg;
    }
  }
  &__nav {
    width: 100%;
    margin-top: $margin-lg;
  }
  &__nav-item {
    @include transition;
    @include flex(null, center);
    font-size: $font-content-lg;
    padding: 0.75rem $padding-md;
    margin-bottom: $margin-sm;
    border-radius: 30px;
    cursor: pointer;
    a {
      @include flex(null, center);
    }
    &:hover {
      color: $dark-blue;
      background-color: $light-blue;
    }
  }
  &__nav-icon {
    color: $dark-blue-lighter;
    margin-right: 1.5rem;
  }
}
.active {
  background-color: $dark-blue;
  color: $white !important;
  .icon {
    color: $white;
  }
}
</style>
