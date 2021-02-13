<template>
  <div>
    <BaseHero>
      <JobSearch @searchQuery="query" />
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
          <div class="offers-list">
            <p class="offers-list__offers-info">
              {{ foundOffersNumber }}
            </p>
            <BaseOffersList :offers="getOffers" @pageChange="pageNumber" />
          </div>
        </Container>
      </section>
    </main>
  </div>
</template>

<script>
import JobSearchForm from '@/components/Forms/JobSearchForm'
import JobSearch from '@/components/JobSearch'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    JobSearchForm,
    JobSearch
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
    ...mapGetters(['getOffers', 'getIsLoading']),
    foundOffersNumber() {
      return this.getOffers.data
        ? `${this.getOffers.data.length} offers found for specified criteria`
        : null
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
