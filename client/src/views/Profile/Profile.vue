<template>
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
          <li class="list-item-active">
            <router-link to="/profile/dashboard">
              <columns-icon size="1.5x" class="sidebar__nav-icon icon" />
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/profile/account">
              <user-icon size="1.5x" class="sidebar__nav-icon icon" />
              Account
            </router-link>
          </li>
          <li>
            <router-link to="/profile/password">
              <shield-icon size="1.5x" class="sidebar__nav-icon icon" />
              Password
            </router-link>
          </li>
          <li>
            <router-link to="/profile/saved">
              <bookmark-icon size="1.5x" class="sidebar__nav-icon icon" />
              Saved offers
            </router-link>
          </li>
          <li>
            <router-link to="/profile/invoices">
              <book-icon size="1.5x" class="sidebar__nav-icon icon" />
              Invoices
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <Container>
      <router-view />
    </Container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  ColumnsIcon,
  UserIcon,
  ShieldIcon,
  BookmarkIcon,
  BookIcon
} from 'vue-feather-icons'

export default {
  name: 'Profile',
  components: {
    ColumnsIcon,
    UserIcon,
    ShieldIcon,
    BookmarkIcon,
    BookIcon
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
    text-align: center;
    h1 {
      margin-bottom: $margin-sm;
    }
  }
  &__nav {
    width: 100%;
    margin-top: $margin-lg;
    li {
      @include transition;
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
  }
  &__nav-icon {
    color: $dark-blue-lighter;
    margin-right: 1.5rem;
  }
}
.list-item-active {
  background-color: $dark-blue;
  .icon {
    color: $white;
  }
  a {
    color: $white;
  }
}
</style>
