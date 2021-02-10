<template>
  <div class="company">
    <BaseHero>
      <HeroContentContainer>
        <template v-slot:logo>
          <BaseCompanyLogo
            :avatar-url="getUser.avatarUrl"
            :img-width="100"
            :img-height="100"
          />
        </template>
        <template v-slot:details>
          <h1>{{ getUser.name }}</h1>
          <span>
            <font-awesome-icon icon="map-marker-alt" />
            {{ getUser.location }}
          </span>
          <div>
            <span>
              <font-awesome-icon icon="file-signature" />
              {{ getUser.size }}
            </span>
            <span>
              <font-awesome-icon icon="clock" />
              {{ getUser.industry }}
            </span>
          </div>
        </template>
      </HeroContentContainer>
    </BaseHero>
    <ContentContainer>
      <main>
        <section>
          <h3>About us</h3>
          <p v-html="getUser.about" />
        </section>
        <section />
      </main>
    </ContentContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseHero from '@/components/Base/BaseHero'
import BaseCompanyLogo from '@/components/Base/BaseCompanyLogo'
import HeroContentContainer from '@/components/Base/UIContainers/HeroContentContainer'
import ContentContainer from '@/components/Base/UIContainers/ContentContainer'

export default {
  name: 'CompanyDetails',
  components: {
    BaseHero,
    ContentContainer,
    BaseCompanyLogo,
    HeroContentContainer
  },
  props: {
    userId: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    ...mapActions(['fetchUser'])
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created() {
    this.fetchUser(this.userId)
  }
}
</script>
