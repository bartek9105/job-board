<template>
  <footer class="footer">
    <Container>
      <div class="footer-container">
        <BaseLogo :job-text-color="jobTextColor" />
        <div class="footer__navs-container">
          <nav class="footer-nav">
            <ul>
              <li>About us</li>
              <li>Career</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </nav>
          <nav class="footer-nav">
            <ul>
              <li>Help</li>
              <li>Cookies</li>
              <li>Terms & conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </nav>
        </div>
        <div class="footer__socials">
          <span>Follow us</span>
          <div class="footer__socials-container">
            <a href="#">
              <i class="social-icon fab fa-linkedin" />
            </a>
            <a href="#" />
            <a href="#">
              <i class="social-icon fab fa-instagram" />
            </a>
            <a href="#">
              <i class="social-icon fab fa-github" />
            </a>
            <a href="#">
              <i class="social-icon fas fa-globe-americas" />
            </a>
          </div>
        </div>
      </div>
    </Container>
    <div class="footer-bottom">
      <span class="footer-bottom__text">2020 CodeJob. All rights reserved</span>
    </div>
  </footer>
</template>

<script>
import BaseLogo from '@/components/Base/BaseLogo'
import Container from '@/components/Base/UIContainers/Container'

export default {
  name: 'TheFooter',
  components: {
    BaseLogo,
    Container
  },
  data() {
    return {
      jobTextColor: '#182952'
    }
  }
}
</script>

<style lang="scss">
.footer {
  background-color: $white;
  &__navs-container {
    @include flex();
    .footer-nav {
      ul {
        margin-right: 80px;
        li:not(:last-of-type) {
          margin-bottom: $margin-sm;
        }
      }
    }
  }
  &__socials {
    @include flex(null, null, column);
    &-container {
      margin-top: $margin-md;
      .social-icon {
        font-size: $font-icon-md;
        margin-right: 20px;
      }
    }
  }
}
.footer-container {
  @include flex(space-between, null);
  font-size: $font-content-lg;
}
.footer-bottom {
  &__text {
    @include flex(center, center);
    background-color: $bg-grey;
    padding: $padding-md 0;
    font-size: $font-content-md;
  }
}
</style>
