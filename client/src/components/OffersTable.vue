<template>
  <table class="offers-table">
    <thead class="offers-table__header">
      <tr class="offers-table__header__row">
        <th class="offers-table__header__row__cell">
          Title
        </th>
        <th class="offers-table__header__row__cell">
          Category
        </th>
        <th class="offers-table__header__row__cell">
          Status
        </th>
        <th class="offers-table__header__row__cell">
          Created
        </th>
        <th class="offers-table__header__row__cell">
          Expires
        </th>
        <th class="offers-table__header__row__cell">
          Promoted
        </th>
      </tr>
    </thead>
    <tbody class="offers-table__body">
      <tr
        v-for="offer in offers"
        :key="offer._id"
        class="offers-table__body__row"
      >
        <td class="offers-table__body__row__cell">
          {{ offer.title }}
        </td>
        <td class="offers-table__body__row__cell">
          {{ offer.category }}
        </td>
        <td class="offers-table__body__row__cell">
          {{ offer.status }}
        </td>
        <td class="offers-table__body__row__cell">
          {{ dateISOToString(offer.createdAt) }}
        </td>
        <td class="offers-table__body__row__cell">
          {{ dateISOToString(offer.expireAt) }}
        </td>
        <td class="offers-table__body__row__cell">
          <font-awesome-icon
            v-if="offer.isPromoted"
            icon="check"
            class="offers-table__body__row__cell__icon__check"
          />
          <font-awesome-icon
            v-else
            icon="times"
            class="offers-table__body__row__cell__icon__times"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dateISOToString } from '@/utils/dateISOToString'
export default {
  name: 'OffersTable',
  props: {
    offers: Array
  },
  methods: {
    dateISOToString
  }
}
</script>

<style lang="scss" scoped>
.offers-table {
  @include shadow;
  width: 100%;
  border-collapse: collapse;
  &__header {
    background-color: $white;
    &__row {
      &__cell {
        padding: $padding-sm;
        border: 0;
      }
    }
  }
  &__body {
    &__row {
      @include transition;
      &:hover {
        @include shadow-hover;
      }
      &:nth-last-of-type(odd) {
        background-color: $bg-grey;
      }
      &:nth-last-of-type(even) {
        background-color: $white;
      }
      &__cell {
        border: 0;
        padding: $padding-sm;
        &__icon {
          &__check {
            color: $success;
          }
          &__times {
            color: $error;
          }
        }
      }
    }
  }
}
</style>
