<template>
  <div>
    <BaseHero>
      <template v-slot:hero-content>
        <JobSearch :offers-number="offersNumber" @searchQuery="query" />
      </template>
    </BaseHero>
    <main>
      <section class="job-search-form">
        <Container>
          <JobSearchForm
            button-text="Search"
            button-text-clear="Clear filters"
            @clicked="formData"
          />
        </Container>
      </section>
      <section>
        <Container>
          <div v-if="getOffers" class="offers-list">
            <p class="offers-list__offers-info">
              {{ offersSearchInfo }}
            </p>
            <BaseOffersList :offers="getOffers" />
            <Pagination
              v-if="offersNumber"
              :pages="getOffers.pages"
              class="offers-list__pagination"
              @pageChange="pageNumber"
            />
          </div>
        </Container>
      </section>
    </main>
  </div>
</template>

<script>
import BaseHero from '@/components/Base/BaseHero'
import JobSearchForm from '@/components/Forms/JobSearchForm'
import JobSearch from '@/components/JobSearch'
import Pagination from '@/components/Pagination'
import Container from '@/components/Base/UIContainers/Container'
import BaseOffersList from '@/components/Base/BaseOffersList'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    BaseHero,
    JobSearchForm,
    JobSearch,
    Pagination,
    Container,
    BaseOffersList
  },
  data() {
    return {
      queries: {}
    }
  },
  methods: {
    ...mapActions(['fetchOffers']),
    formData(queries) {
      this.queries = { ...this.queries, ...queries }
      this.fetchOffers(this.queries)
    },
    pageNumber(page) {
      this.queries = { ...this.queries, page: page }
      this.fetchOffers(this.queries)
    },
    query(queryTitle) {
      this.queries = { ...this.queries, title: queryTitle }
      this.fetchOffers(this.queries)
    }
  },
  computed: {
    ...mapGetters(['getOffers']),
    offersNumber() {
      return this.getOffers ? this.getOffers.length : null
    },
    offersSearchInfo() {
      return `${this.getOffers.length} offers found for specified criteria`
    }
  },
  created() {
    this.fetchOffers({})
  }
}
</script>

<style lang="scss" scoped>
.job-search-form {
  background-color: $white;
}
.offers-list {
  &__offers-info {
    color: $dark-blue;
    font-weight: $font-bold;
    font-size: $font-content-lg;
    text-transform: uppercase;
    margin-bottom: $margin-lg;
  }
  &__pagination {
    margin-top: $margin-lg;
  }
}
</style>
