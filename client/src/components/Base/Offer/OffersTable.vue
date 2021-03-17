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
          {{ offer.category.name }}
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
            size="1.25x"
            class="offers-table__body__row__cell__icon__check"
          />
          <x-icon
            v-else
            size="1.25x"
            class="offers-table__body__row__cell__icon__times"
          />
        </td>
        <td class="offers-table__body__row__cell" @click.stop="">
          <div class="offers-table__body__row__cell__icons-container">
            <edit-icon
              size="1x"
              class="offers-table__body__row__cell__icon offers-table__body__row__cell__icon__edit"
              @click="editOffer(offer._id)"
            />
            <x-icon
              size="1.25x"
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
import { mapActions } from 'vuex'
import { dateISOToString } from '@/utils/date/dateISOToString'
import { CheckCircleIcon, XIcon, EditIcon } from 'vue-feather-icons'

export default {
  name: 'OffersTable',
  components: {
    CheckCircleIcon,
    XIcon,
    EditIcon
  },
  props: {
    offers: {
      type: Array,
      default: () => []
    }
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
    ...mapActions(['removeOffer']),
    goToOffer(offerId, slug) {
      this.$router.push({ name: 'OfferDetails', params: { offerId, slug } })
    },
    editOffer(offerId) {
      this.$router.push({ path: `offer/${offerId}/edit` })
    },
    deleteOffer(offerId) {
      this.removeOffer(offerId)
    },
    dateISOToString
  }
}
</script>

<style lang="scss" scoped>
.offers-table {
  color: rgba(24, 41, 82, 0.9);
  width: 100%;
  border-collapse: collapse;
  font-size: $font-content-lg;
  border-radius: $border-radius-sm;
  &__header {
    color: $dark-blue-light;
    background-color: $white;
    &__row {
      border-bottom: 1px solid $white-blue;
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
      background-color: $white;
      &:not(:last-of-type) {
        border-bottom: 1px solid $white-blue;
      }
      &:hover {
        @include shadow-hover;
        cursor: pointer;
        border-left-color: $dark-blue;
      }
      &__cell {
        border: 0;
        padding: 1.5rem 1rem;
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
