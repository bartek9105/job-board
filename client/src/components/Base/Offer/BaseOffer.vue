<template>
  <div
    class="offer"
    :style="{ borderLeft: '5px solid' + offer.category.color }"
  >
    <div class="offer__logo">
      <BaseCompanyLogo
        :avatar-url="offer.creator.avatarUrl"
        :img-width="75"
        :img-height="75"
      />
    </div>
    <div class="offer-main">
      <div class="offer-top">
        <div class="offer-top-center">
          <div class="offer__title">
            {{ offer.title }}
          </div>
          <div v-if="!isSmall" class="offer__salary">
            <font-awesome-icon
              icon="money-bill-wave"
              class="offer__pay__icon"
            />
            {{ salaryRange }}
          </div>
          <div class="offer__city">
            <font-awesome-icon
              icon="map-marker-alt"
              class="offer__city__marker-icon"
            />
            {{ offer.location.city }}
          </div>
          <div v-if="offer.isRemote && !isMedium" class="offer__remote">
            Remote
          </div>
          <div v-if="offer.isPromoted" class="offer__promoted">
            Featured
          </div>
        </div>
        <div>
          <div v-if="!isSmall" class="offer-top-right">
            <div class="offer__category">
              {{ offer.category.name }}
            </div>
            <div class="offer__created">
              {{ daysDifference(new Date(), offer.createdAt) }}d ago
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isMedium" class="offer-bottom">
        <div
          v-for="technology in offer.technologies.slice(0, 3)"
          :key="technology.id"
          class="offer__technology"
        >
          {{ technology }}
        </div>
        <div
          v-if="offer.technologies.length > 3"
          class="offer__tag offer__tag--sm"
        >
          + {{ offer.technologies.length - 3 }}
          <ul class="offer__tag__list">
            <li
              v-for="technology in offer.technologies.slice(3)"
              :key="technology.id"
            >
              {{ technology }}
            </li>
          </ul>
        </div>
        <div class="offer__contract">
          {{ offer.contract }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { daysDifference } from '@/utils/date/daysDifference'
import { mapGetters } from 'vuex'

export default {
  name: 'BaseOffer',
  props: {
    offer: Object
  },
  computed: {
    ...mapGetters(['isSmall', 'isMedium']),
    salaryRange() {
      return `${this.offer.salary.salaryMin} - ${this.offer.salary.salaryMax} ${this.offer.salary.currency}`
    }
  },
  methods: {
    daysDifference
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .offer {
    align-items: center;
    &-top {
      margin-bottom: 0 !important;
      &-center {
        flex-direction: column;
      }
      &-right {
        flex-direction: column;
      }
    }
    &__category {
      margin-right: 0 !important;
      margin-bottom: 0.5rem;
    }
    &__title,
    &__salary {
      margin-bottom: 0.5rem;
    }
  }
}
@media (max-width: 576px) {
  .offer {
    padding: 0 !important;
    margin-bottom: 0.5rem !important;
    &__title {
      margin-right: 0 !important;
      width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &__logo {
      margin-right: 0 !important;
    }
  }
}
.offer {
  @include flex(space-between);
  @include shadow;
  background: $white;
  color: $dark-blue;
  padding: $padding-sm 35px;
  margin-bottom: $margin-sm;
  &:hover {
    @include shadow-hover;
    @include transition;
    cursor: pointer;
  }
  &__promoted {
    @include tag-dark;
    background: $pink;
  }
  &__logo {
    @include flex(center, center);
    margin-right: 35px;
    &__img {
      border-radius: 100%;
    }
  }
  &-top {
    @include flex(space-between, center);
    margin-bottom: $margin-sm;
    &-center {
      @include flex();
    }
  }
  &-main {
    flex: 1;
  }
  &__title {
    font-size: $font-content-lg;
    font-weight: $font-semi-bold;
    margin-right: 40px;
  }
  &__salary {
    font-size: $font-content-md;
    opacity: $opacity-high;
    margin-right: 40px;
    &__icon {
      margin-right: 0.5rem;
    }
  }
  &__city {
    font-size: $font-content-md;
    opacity: $opacity-high;
    margin-right: 40px;
    &__marker-icon {
      margin-right: 0.5rem;
    }
  }
  &-top-right {
    @include flex();
  }
  &__category {
    margin-right: 1rem;
    @include tag-light;
  }
  &__created {
    @include tag-light;
  }
  &-bottom {
    @include flex();
  }
  &__technology {
    @include tag-dark;
    margin-right: 1rem;
    &__list {
      @include shadow;
      position: absolute;
      top: 30px;
      left: 0;
      font-size: $font-content-sm;
      color: $dark-blue;
      background: $white;
      padding: 10px;
      border-radius: 2px;
      z-index: 1;
      li {
        margin-bottom: 3px;
      }
    }
  }
  &__contract {
    @include tag-light;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
