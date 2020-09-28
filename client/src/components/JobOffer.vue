<template>
  <div class="offer">
    <div class="offer__logo">Logo</div>
    <div class="offer__main">
      <div class="offer__main__top">
        <div class="offer__main__top__title">Regular front end developer</div>
        <div class="offer__main__top__pay">7000 - 10000 PLN</div>
        <div class="offer__main__top__city">
          <i class="offer__main__top__city__icon fas fa-map-marker-alt"></i> Warsaw
        </div>
      </div>
      <div class="offer__main__tags">
        <div class="offer__main__tags__tag">HTML</div>
        <div class="offer__main__tags__tag">CSS</div>
        <div class="offer__main__tags__tag">Angular 9</div>
        <div class="offer__main__tags__tag--light">B2B</div>
      </div>
    </div>
    <div class="offer__additional">
      <div class="offer__additional__tags">
        <div class="offer__additional__tags__tag--light">Front end</div>
        <div class="offer__additional__tags__tag--light">3d ago</div>
      </div>
      <button class="offer__additional__likeBtn">
        <i class="far fa-heart"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'JobOffer',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['fetchJobOffers'])
  },
  computed: {
    ...mapGetters(['getJobOffers'])
  },
  mounted () {
    this.fetchJobOffers()
  }
}
</script>

<style lang="scss">
  .offer {
    display: flex;
    justify-content: space-between;
    max-width: 1087px;
    background: #fff;
    color: $theme-dark-blue;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    padding: 20px 35px;
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
</style>
