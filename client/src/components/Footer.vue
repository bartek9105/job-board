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
        max-width: 1087px;
        margin: 0 auto;
        background: #fff;
        padding: 50px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        &__navs-container {
            display: flex;
            .footer-nav {
                ul {
                    list-style: none;
                    margin-right: 80px;
                    li:not(:last-of-type) {
                        margin-bottom: 16px;
                    }
                }
            }
        }
        &__socials {
            display: flex;
            flex-direction: column;
            &-container {
                margin-top: 30px;
                .social-icon {
                    font-size: 24px;
                    margin-right: 20px;
                }
            }
        }
    }
    .footer-bottom {
        &__text {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $bg-grey;
            padding: 30px 0;
            font-size: 14px;
        }
    }
</style>
