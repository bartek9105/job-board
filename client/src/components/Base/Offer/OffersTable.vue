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
        @click="goToOffer(offer._id, offer.slug)"
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
          <check-circle-icon
            v-if="offer.isPromoted"
            size="1.5x"
            class="offers-table__body__row__cell__icon__check"
          />
          <x-icon
            v-else
            size="1.5x"
            class="offers-table__body__row__cell__icon__times"
          />
        </td>
        <td class="offers-table__body__row__cell" @click.stop="">
          <div class="offers-table__body__row__cell__icons-container">
            <edit-icon
              size="1.25x"
              class="offers-table__body__row__cell__icon offers-table__body__row__cell__icon__edit"
              @click="editOffer(offer._id)"
            />
            <x-icon
              size="1.5x"
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
import { CheckCircleIcon, XIcon, EditIcon } from 'vue-feather-icons'

export default {
  name: 'OffersTable',
  components: {
    CheckCircleIcon,
    XIcon,
    EditIcon
  },
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
    goToOffer(offerId, slug) {
      this.$router.push({ name: 'OfferDetails', params: { offerId, slug } })
    },
    editOffer(offerId) {
      this.$router.push({ path: `offer/${offerId}/edit` })
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
