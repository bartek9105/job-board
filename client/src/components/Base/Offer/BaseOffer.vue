<template>
  <div class="offer" :style="{ borderLeft: '5px solid' + '#345' }">
    <BaseCompanyLogo
      class="offer__logo"
      :avatar-url="offer.creator.avatarUrl"
      :img-width="75"
      :img-height="75"
    />
    <div class="offer-main">
      <div class="offer-top">
        <div class="offer-top-center">
          <span class="offer__title">{{ offer.title }}</span>
          <span v-if="!isSmall" class="offer__salary">
            {{ salaryRange(offer.salary) }}
          </span>
          <div class="offer__city">
            <map-pin-icon size="1.25x" class="offer__marker-icon" />
            <span>{{ offer.location.city }}</span>
          </div>
          <span v-if="offer.isRemote && !isMedium" class="offer__remote">
            Remote
          </span>
          <span v-if="offer.isPromoted" class="offer__promoted">Featured</span>
        </div>
        <div v-if="!isSmall" class="offer-top-right">
          <span class="offer__category">{{ offer.category }}</span>
          <span class="offer__created">
            {{ daysDifference(new Date(), offer.createdAt) }}
          </span>
        </div>
      </div>
      <div v-if="!isMedium" class="offer-bottom">
        <BaseTagsList :tags="offer.technologies" :limit="3" />
        <BaseMoreTechnologiesList
          v-if="offer.technologies.length > 3"
          :technologies="offer.technologies"
        />
        <span class="offer__contract">{{ offer.contract }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MapPinIcon } from 'vue-feather-icons'
import daysDifference from '@/utils/date/daysDifference'
import salaryRange from '@/utils/salaryRange'
import BaseTagsList from '@/components/Base/BaseTagsList'
import BaseMoreTechnologiesList from '@/components/Base/BaseMoreTechnologiesList'

export default {
  name: 'BaseOffer',
  components: {
    MapPinIcon,
    BaseTagsList,
    BaseMoreTechnologiesList
  },
  props: {
    offer: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['isSmall', 'isMedium'])
  },
  methods: {
    daysDifference,
    salaryRange
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
  @include transition;
  background: $white;
  color: $dark-blue;
  padding: 0.75rem 2.25rem;
  margin-bottom: $margin-sm;
  border-radius: $border-radius-sm;
  &:hover {
    @include shadow-hover;
    cursor: pointer;
  }
  &__promoted {
    @include tag-dark;
    background: $pink;
  }
  &__logo {
    @include flex(center, center);
    margin-right: 2rem;
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
  }
  &__city {
    @include flex(null, center);
    font-size: $font-content-md;
    opacity: $opacity-high;
  }
  &__marker-icon {
    margin-right: 0.5rem;
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
    @include flex(null, center);
  }
  &__contract {
    @include tag-light;
    margin-left: 0.5rem;
  }
}
</style>
