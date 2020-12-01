<template>
  <footer>
    <div class="footer">
        <Logo :jobTextColor="jobTextColor"/>
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
                    <i class="social-icon fab fa-linkedin"></i>
                </a>
                <a href="#">
                    <i class="social-icon fab fa-facebook"></i>
                </a>
                <a href="#">
                    <i class="social-icon fab fa-instagram"></i>
                </a>
                <a href="#">
                    <i class="social-icon fab fa-github"></i>
                </a>
                <a href="#">
                    <i class="social-icon fas fa-globe-americas"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <span class="footer-bottom__text">2020 CodeJob. All rights reserved</span>
    </div>
  </footer>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: 'Footer',
  components: {
    Logo
  },
  data () {
    return {
      jobTextColor: '#182952'
    }
  }
}
</script>

<style lang="scss">
    .footer {
        @include flex (space-between, null);
        max-width: $container-width;
        margin: 0 auto;
        background: $white;
        padding: $padding-lg 0;
        font-size: $font-content-md;
        &__navs-container {
            @include flex ();
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
            @include flex (null, null, column);
            &-container {
                margin-top: $margin-md;
                .social-icon {
                    font-size: 24px;
                    margin-right: 20px;
                }
            }
        }
    }
    .footer-bottom {
        &__text {
            @include flex (center, center);
            background-color: $bg-grey;
            padding: $padding-md 0;
            font-size: $font-content-md;
        }
    }
</style>
