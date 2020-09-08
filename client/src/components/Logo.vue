<template>
  <div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" class="logo__text" width="114" height="30" viewBox="0 0 114 30">
      <text transform="translate(0 25)" fill="#e14594" font-size="25" font-family="Lato-Regular, Lato" letter-spacing="0.116em"><tspan x="0" y="0">Code</tspan><tspan y="0" fill="#fff">Job</tspan></text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="27.62" height="22.093" viewBox="0 0 27.62 22.093"><path d="M12.011,22.108l-2.632-.764a.519.519,0,0,1-.354-.643L14.916.411a.519.519,0,0,1,.643-.354l2.632.764a.519.519,0,0,1,.354.643l-5.89,20.29A.517.517,0,0,1,12.011,22.108ZM7.092,17.266l1.877-2a.518.518,0,0,0-.035-.742l-3.91-3.439,3.91-3.439A.514.514,0,0,0,8.969,6.9l-1.877-2a.518.518,0,0,0-.734-.022L.14,10.7a.514.514,0,0,0,0,.755l6.218,5.83a.515.515,0,0,0,.734-.022Zm14.12.026,6.218-5.83a.514.514,0,0,0,0-.755L21.212,4.873a.523.523,0,0,0-.734.022L18.6,6.9a.518.518,0,0,0,.035.742l3.91,3.444-3.91,3.439a.514.514,0,0,0-.035.742l1.877,2a.519.519,0,0,0,.734.026Z" transform="translate(0.025 -0.037)" fill="#e14594"/></svg>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss">
  .logo {
    display: flex;
    align-items: center;
    &__text {
      margin-right: 1rem;
    }
  }
</style>
