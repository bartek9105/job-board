<template>
  <div class="offer">
    <div class="offer__logo">
      <img :src="'https://picsum.photos/75'" alt="logo">
    </div>
    <div class="offer-main">
      <div class="offer-top">
        <div class="offer__title">{{ offer.title }}</div>
        <div class="offer__pay">{{ offer.salary }} PLN</div>
        <div class="offer__city">
          <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
          {{ offer.location }}
        </div>
      </div>
      <div class="offer-tags">
        <div class="offer__tag" v-for="technology in offer.technologies.slice(0, 4)" :key="technology.id">
          {{ technology }}
        </div>
        <div class="offer__tag offer__tag--sm" v-if="offer.technologies.length > 4"> + {{ offer.technologies.length - 4 }}
          <ul class="offer__tag__list">
            <li v-for="technology in offer.technologies.slice(4)" :key="technology.id">
              {{ technology }}
            </li>
          </ul>
        </div>
        <div class="offer__tag offer__tag--light">{{ offer.contract }}</div>
      </div>
    </div>
    <div class="offer-additional">
      <div class="offer-tags">
        <div class="offer__tag offer__tag--light">{{ offer.category }}</div>
        <div class="offer__tag offer__tag--light">3d ago</div>
      </div>
      <button class="offer__like-btn">
        <font-awesome-icon icon="heart"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobOffer',
  props: {
    offer: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .offer {
    @include shadow;
    display: flex;
    justify-content: space-between;
    background: #fff;
    color: $theme-dark-blue;
    padding: 20px 35px;
    margin-bottom: 16px;
    &:hover {
      @include shadow-hover;
      @include transition;
      cursor: pointer;
    }
    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 135px;
      margin-right: 35px;
    }
    &-top {
      display: flex;
      margin-bottom: 25px;
    }
    &-main {
      flex: 1;
    }
    &__title {
      font-size: 17px;
      margin-right: 40px;
    }
    &__pay {
      font-size: 14px;
      opacity: .8;
      margin-right: 40px;
    }
    &__city {
      font-size: 14px;
      opacity: .8;
      &-icon {
        margin-right: 10px;
      }
    }
    &-tags {
      display: flex;
    }
    &__tag {
      @include tag-dark;
      margin-right: 20px;
      &--sm {
        position: relative;
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
        list-style: none;
        font-size: 13px;
        color: $theme-dark-blue;
        background: #fff;
        color: #000;
        padding: 10px;
        border-radius: 2px;
        z-index: 1;
        li {
          margin-bottom: 3px;
        }
      }
    }
    &-additional {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }
    &__like-btn {
      text-align: right;
      border: none;
      background: none;
      width: 20px;
      font-size: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
