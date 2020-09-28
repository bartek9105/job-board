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
    .offer {
      display: flex;
      justify-content: space-between;
      max-width: 1087px;
      background: #fff;
      color: $theme-dark-blue;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
      padding: 20px 35px;
      margin-bottom: 16px;
      &__logo {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 135px;
        border-right: 1px solid #707070;
      }
      &__main {
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
        &__tags {
          display: flex;
          &__tag--light {
            @include tag-light;
          }
        }
        &__likeBtn {
          text-align: right;
          border: none;
          background: none;
          width: 20px;
          font-size: 20px;
        }
      }
    }
  }
</style>
