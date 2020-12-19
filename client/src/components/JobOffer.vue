<template>
  <div class="offer">
    <div class="offer__logo">
      <img :src="'https://picsum.photos/75'" alt="logo" />
    </div>
    <div class="offer-main">
      <div class="offer-top">
        <div class="offer__title">
          {{ offer.title }}
        </div>
        <div class="offer__pay">
          <font-awesome-icon icon="money-bill-wave" class="offer__pay__icon" />
          {{ offer.salaryMin }} - {{ offer.salaryMax }} PLN
        </div>
        <div class="offer__city">
          <font-awesome-icon
            icon="map-marker-alt"
            class="offer__city__marker-icon"
          />
          {{ offer.location }}
        </div>
        <div v-if="offer.isPromoted" class="offer__promoted">
          Featured
        </div>
      </div>
      <div class="offer-tags">
        <div
          v-for="technology in offer.technologies.slice(0, 3)"
          :key="technology.id"
          class="offer__tag"
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
        <div class="offer__tag offer__tag--light">
          {{ offer.contract }}
        </div>
      </div>
    </div>
    <div class="offer-additional">
      <div class="offer-tags">
        <div class="offer__tag offer__tag--light">
          {{ offer.category }}
        </div>
        <div class="offer__tag offer__tag--light">
          {{ daysDifference(new Date(), offer.createdAt) }}d ago
        </div>
      </div>
      <button class="offer__like-btn">
        <font-awesome-icon icon="heart" />
      </button>
    </div>
  </div>
</template>

<script>
import { daysDifference } from '@/utils/daysDifference'

export default {
  name: 'JobOffer',
  props: {
    offer: Object
  },
  methods: {
    daysDifference
  }
}
</script>

<style lang="scss" scoped>
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
    max-width: 135px;
    margin-right: 35px;
    border-radius: 100%;
  }
  &-top {
    @include flex();
    margin-bottom: $margin-sm;
  }
  &-main {
    flex: 1;
  }
  &-top {
    @include flex(null, center);
  }
  &__title {
    font-size: $font-content-lg;
    margin-right: 40px;
  }
  &__pay {
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
  &-tags {
    @include flex();
  }
  &__tag {
    @include tag-dark;
    margin-right: 20px;
    &--sm {
      &:hover .offer__tag__list {
        display: block;
      }
    }
    &--light {
      @include tag-light;
      &:last-of-type {
        margin-right: 0;
      }
    }
    &__list {
      @include shadow;
      display: none;
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
  &-additional {
    @include flex(space-between, flex-end, column);
  }
  &__like-btn {
    background: none;
    font-size: $font-icon-sm;
  }
}
</style>
