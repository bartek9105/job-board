<template>
  <div>
    <div v-for="company in companies" :key="company._id">
      <router-link
        :to="{
          name: 'CompanyDetails',
          params: { userId: company._id, slug: company.slug }
        }"
      >
        <BaseCompanyItem :company="company" />
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseCompanyItem from '@/components/Base/BaseCompanyItem'

export default {
  name: 'BaseCompaniesList',
  components: {
    BaseCompanyItem
  },
  props: {
    companies: Array
  }
}
</script>

<style></style>
