<template>
  <div @click.self="showMoreFilters = false">
    <div class="job-search">
      <form class="job-search__job-form" @submit.prevent>
        <div class="job-search__input-unit">
          <input
            v-model="query.title"
            type="text"
            class="job-search__job-form__input job-search__job-form__input--title"
            placeholder="Title or keyword"
          />
          <search-icon size="1.25x" class="job-search__job-form__icon" />
        </div>
        <div class="job-search__input-unit">
          <input
            v-model="query.location"
            type="text"
            class="job-search__job-form__input"
            placeholder="Location"
            @click="showPropositionsList = true"
          />
          <map-pin-icon size="1.25x" class="job-search__job-form__icon" />
          <SearchPropositionsList
            v-if="showPropositionsList"
            v-on-clickaway="hidePropositionsList"
            class="job-search__propositions-list"
            :list-items="locations"
            @item="emitedLocation"
          >
            <map-pin-icon size="1x" />
          </SearchPropositionsList>
        </div>
        <button
          type="button"
          class="job-search__job-form__filter-btn"
          @click="$emit('showMoreFilters')"
        >
          <filter-icon size="1.25x" class="job-search__job-form__filter-icon" />
        </button>
        <button class="job-search__btn" @click="emitQuery">
          <search-icon size="1.5x" class="job-search__job-form__icon--btn" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { SearchIcon, MapPinIcon, FilterIcon } from 'vue-feather-icons'
import SearchPropositionsList from '@/components/SearchPropositionsList'
import { mixin as clickaway } from 'vue-clickaway'
import locations from '@/constants/locations'

export default {
  components: {
    SearchIcon,
    MapPinIcon,
    FilterIcon,
    SearchPropositionsList
  },
  mixins: [clickaway],
  data() {
    return {
      query: {
        title: '',
        location: ''
      },
      showPropositionsList: false
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutsideFilterHandler)
  },
  created() {
    this.locations = locations
  },
  methods: {
    emitQuery() {
      this.$emit('searchQuery', this.query)
    },
    clickOutsideFilterHandler(evt) {
      if (!this.$el.contains(evt.target)) {
        this.showMoreFilters = false
      }
    },
    hidePropositionsList() {
      this.showPropositionsList = false
    },
    emitedLocation(location) {
      this.query.location = location
      this.hidePropositionsList()
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search {
  max-width: $container-width;
  margin: $margin-center;
  color: $white-blue;
  text-align: center;
  &__propositions-list {
    z-index: 1;
    width: 100%;
    position: absolute;
    top: 65px;
    left: 0;
  }
  &__btn {
    background-color: $pink;
    border-radius: 0 8px 8px 0;
    &:hover {
      background-color: $pink-hover;
    }
  }
  &__input-unit {
    position: relative;
  }
  &__job-form {
    margin-top: 45px;
    width: 100%;
    display: grid;
    grid-template-columns: (65% 20% auto auto);
    &__filter-btn {
      background-color: $dark-blue;
      &:hover {
        background-color: $dark-blue-hover;
      }
    }
    &__filter-icon {
      color: $white;
    }
    &__input {
      @include shadow;
      border: 0 !important;
      width: 100%;
      height: 65px;
      padding-left: 3rem;
      &--title {
        border-right: 1px solid $dark-blue-lighter !important;
        border-radius: 0.5rem 0 0 0.5rem;
      }
    }
    &__icon {
      color: $dark-blue;
      position: absolute;
      top: 22px;
      left: 15px;
      &--btn {
        color: $white;
      }
    }
    button {
      @include shadow;
    }
  }
}
</style>
