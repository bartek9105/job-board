<template>
  <div class="dashboard-container">
    <h1>Invoices</h1>
    <ul v-if="getUserInfo.invoices.length > 0" class="invoices-list">
      <li
        v-for="(invoice, index) in getUserInfo.invoices"
        :key="index"
        class="invoices-list__item"
      >
        <div>
          <div>
            <span class="invoices-list__title">Amount:</span>
            <span class="invoices-list__content">
              {{ invoice.amount / 100 }}
            </span>
          </div>
          <div>
            <span class="invoices-list__title">Date:</span>
            <span class="invoices-list__content">
              {{ new Date(invoice.created).toDateString() }}
            </span>
          </div>
        </div>
        <a
          :href="invoice.receiptUrl"
          target="_blank"
          class="invoices-list__link"
        >
          <span>See your receipt</span>
          <eye-icon size="1.25x" class="invoices-list__icon" />
        </a>
      </li>
    </ul>
    <p v-else>
      No invoices
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EyeIcon } from 'vue-feather-icons'

export default {
  name: 'ProfileInvoices',
  components: {
    EyeIcon
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  @include shadow;
  background-color: $white;
  border-radius: $border-radius-sm;
  padding: $padding-lg;
  h1 {
    font-weight: $font-semi-bold;
    margin-bottom: $margin-lg;
  }
}
.invoices-list {
  color: $dark-blue;
  font-size: $font-content-lg;
  &__item {
    @include flex(space-between, center);
    margin-bottom: $margin-sm;
    border-bottom: 1px solid $light-blue;
    padding: $padding-sm 0;
  }
  &__title {
    font-weight: $font-semi-bold;
  }
  &__content {
    color: $dark-blue-hover;
  }
  &__icon {
    color: $dark-blue-lighter;
    margin-left: 1rem;
  }
  &__link {
    @include flex(null, center);
    &:hover {
      color: $dark-blue-light;
    }
  }
}
</style>
