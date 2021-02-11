<template>
  <table class="offers-table">
    <thead class="offers-table__header">
      <tr class="offers-table__header__row">
        <th
          v-for="(header, index) in tableHeaders"
          :key="index"
          class="offers-table__header__row__cell"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody class="offers-table__body">
      <tr
        v-for="offer in offers"
        :key="offer._id"
        class="offers-table__body__row"
      >
        <td
          class="offers-table__body__row__cell offers-table__body__row__cell__title"
        >
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
        <td class="offers-table__body__row__cell">
          <div class="offers-table__body__row__cell__icons-container">
            <font-awesome-icon
              icon="edit"
              class="offers-table__body__row__cell__icon offers-table__body__row__cell__icon__edit"
              @click="editOffer(offer._id)"
            />
            <font-awesome-icon
              icon="times"
              class="offers-table__body__row__cell__icon offers-table__body__row__cell__icon__delete"
              @click="deleteOffer(offer._id)"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dateISOToString } from '@/utils/date/dateISOToString'
import { mapActions } from 'vuex'
export default {
  name: 'OffersTable',
  props: {
    offers: Array
  },
  data() {
    return {
      tableHeaders: [
        'Title',
        'Category',
        'Status',
        'Created',
        'Expires',
        'Promoted',
        'Actions'
      ]
    }
  },
  methods: {
    dateISOToString,
    ...mapActions(['removeOffer']),
    goToOffer(offerId) {
      this.$router.push({ path: `/offer/${offerId}` })
    },
    editOffer(offerId) {
      this.$router.push({ path: `/offer/${offerId}/edit` })
    },
    deleteOffer(offerId) {
      this.removeOffer(offerId)
    }
  }
}
</script>

<style lang="scss" scoped>
.offers-table {
  @include shadow;
  width: 100%;
  border-collapse: collapse;
  font-size: $font-content-lg;
  color: $grey;
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
      border-left: 3px solid transparent;
      &:hover {
        @include shadow-hover;
        cursor: pointer;
        border-left-color: $dark-blue;
      }
      &:nth-last-of-type(odd) {
        background-color: $lighter-grey;
      }
      &:nth-last-of-type(even) {
        background-color: $white;
      }
      &:nth-last-of-type(odd),
      &:nth-last-of-type(even) {
        &:hover {
          background-color: $light-grey;
        }
      }
      &__cell {
        border: 0;
        padding: $padding-md;
        text-align: center;
        &__title {
          text-align: left;
        }
        &__icons-container {
          @include flex(center);
        }
        &__icon {
          color: $grey;
          &__check {
            color: $success;
          }
          &__times {
            color: $error;
          }
          &__edit {
            margin-right: 1rem;
          }
        }
      }
    }
  }
}
</style>