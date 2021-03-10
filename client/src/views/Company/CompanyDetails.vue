<template>
  <div class="company">
    <BaseHero>
      <HeroContentContainer>
        <template v-if="!getIsLoading" v-slot:logo>
          <BaseCompanyLogo
            :avatar-url="getUser.avatarUrl"
            :img-width="100"
            :img-height="100"
          />
        </template>
        <template v-slot:details>
          <h1>{{ getUser.name }}</h1>
          <span>
            <map-pin-icon size="1.25x" />
            {{ getUser.location }}
          </span>
          <div>
            <span>
              <briefcase-icon size="1.25x" />
              {{ getUser.size }}
            </span>
            <span>
              <home-icon size="1.25x" />
              {{ getUser.industry }}
            </span>
          </div>
        </template>
      </HeroContentContainer>
    </BaseHero>
    <ContentContainer>
      <main>
        <section v-if="!getIsLoading">
          <h3>About us</h3>
          <p v-html="getUser.about" />
        </section>
        <BaseSpinner v-else />
      </main>
    </ContentContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeroContentContainer from '@/components/Base/UIContainers/HeroContentContainer'
import { MapPinIcon, BriefcaseIcon, HomeIcon } from 'vue-feather-icons'

export default {
  name: 'CompanyDetails',
  components: {
    HeroContentContainer,
    MapPinIcon,
    BriefcaseIcon,
    HomeIcon
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
    ...mapGetters(['getUser', 'getIsLoading'])
  },
  created() {
    this.fetchUser(this.userId)
  }
}
</script>
