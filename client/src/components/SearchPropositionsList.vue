<template>
  <ul class="propositions-list">
    <li
      v-for="(item, index) in listItems"
      :key="index"
      class="propositions-list__item"
      @click="emitItem(item)"
    >
      <div class="propositions-list__icon">
        <slot />
      </div>
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PropositionsList',
  props: {
    listItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitItem(item) {
      this.$emit('item', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.propositions-list {
  @include shadow;
  color: $dark-blue;
  background-color: $white;
  font-size: $font-content-lg;
  &__item {
    @include transition;
    @include flex(null, center);
    text-align: left;
    padding: $padding-sm $padding-md;
    cursor: pointer;
    &:hover {
      color: $white;
      background-color: $dark-blue;
    }
  }
  &__icon {
    margin-right: 1rem;
  }
}
</style>
