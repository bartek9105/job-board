<template>
  <div class="logged-user">
    <img
      :src="'https://picsum.photos/30'"
      alt="logo"
      class="logged-user__avatar"
    />
    {{ loggedInUserName }}
    <font-awesome-icon icon="sort-down" class="logged-user__icon" />
  </div>
</template>

<script>
export default {
  name: 'LoggedUser',
  props: {
    loggedInUserName: String
  }
}
</script>

<style lang="scss">
.logged-user {
  @include flex(null, center);
  &__avatar {
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  &__icon {
    margin-top: -5px;
    margin-left: 0.5rem;
  }
}
</style>
