<template>
  <div class="offersContainer">
    <div class="offer" v-for="offer in jobOffers" :key="offer._id">
      <div class="offer__logo">Logo</div>
      <div class="offer__main">
        <div class="offer__main__top">
          <div class="offer__main__top__title">{{ offer.title }}</div>
          <div class="offer__main__top__pay">{{ offer.salary }} PLN</div>
          <div class="offer__main__top__city">
            <i class="offer__main__top__city__icon fas fa-map-marker-alt"></i> {{ offer.location }}
          </div>
        </div>
        <div class="offer__main__tags">
          <div class="offer__main__tags__tag" v-for="technology in offer.technologies.slice(0, 3)" :key="technology.id">
            {{ technology }}
          </div>
          <div class="offer__main__tags__tag--light">{{ offer.contract }}</div>
        </div>
      </div>
      <div class="offer__additional">
        <div class="offer__additional__tags">
          <div class="offer__additional__tags__tag--light">{{ offer.category }}</div>
          <div class="offer__additional__tags__tag--light">3d ago</div>
        </div>
        <button class="offer__additional__likeBtn">
          <i class="far fa-heart"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobOffer',
  props: {
    jobOffers: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .offersContainer {
    max-width: 1087px;
    margin: 0 auto;
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
      &__main {
        flex: 1;
        &__top {
          display: flex;
          &__title {
            font-size: 17px;
            margin-right: 40px;
            margin-bottom: 25px;
          }
          &__pay {
            font-size: 14px;
            opacity: .8;
            margin-right: 40px;
          }
          &__city {
            font-size: 14px;
            opacity: .8;
            &__icon {
              margin-right: 10px;
            }
          }
        }
        &__tags {
          display: flex;
          &__tag {
            @include tag-dark;
            margin-right: 20px;
          }
          &__tag--light {
            @include tag-light;
          }
        }
      }
      &__additional {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        &__tags {
          display: flex;
          &__tag--light {
            @include tag-light;
          }
          &__tag--light:first-of-type {
            margin-right: 20px;
          }
        }
        &__likeBtn {
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
    }
  }
</style>
