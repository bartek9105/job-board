<template>
  <div>
    <BaseHero>
      <template v-slot:hero-content>
        <form class="company-search-form" @submit.prevent>
          <div class="company-search-form__item">
            <label for="company" class="company-search-form__item__label"
              >Company name</label
            >
            <input v-model="company.name" type="text" name="company" />
          </div>
          <div class="company-search-form__item">
            <label for="location" class="company-search-form__item__label"
              >Location</label
            >
            <input v-model="company.location" type="text" name="location" />
          </div>
          <div class="company-search-form__item">
            <label for="industry" class="company-search-form__item__label"
              >Industry</label
            >
            <input v-model="company.industry" type="text" name="industry" />
          </div>
          <BaseButton @click.native="searchCompany">
            Search
          </BaseButton>
        </form>
      </template>
    </BaseHero>
    <Container>
      <div v-if="!getIsLoading">
        <BaseCompaniesList :companies="getUsers" class="company-items" />
      </div>
      <div v-else>
        <BaseSpinner />
      </div>
    </Container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseCompaniesList from '@/components/Base/Company/BaseCompaniesList'

export default {
  name: 'CompaniesList',
  components: {
    BaseCompaniesList
  },
  data() {
    return {
      company: {}
    }
  },
  methods: {
    ...mapActions(['fetchUsers']),
    searchCompany() {
      this.fetchUsers(this.company)
      this.company = {}
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getIsLoading'])
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style lang="scss">
.company-search-form {
  @include flex(center, center);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  grid-column-gap: 1rem;
  max-width: $container-width;
  height: calc(100% - #{$nav-height * 2});
  margin: 0 auto;
  &__item {
    @include flex(null, null, column);
    &__label {
      @include input-name;
      color: $white;
      margin-bottom: $margin-sm;
    }
  }
}
.company-items {
  position: relative;
  top: -100px;
  max-width: $container-width;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}
</style>
