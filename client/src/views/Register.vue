<template>
    <div class="register">
        <div class="left-side">
            <div class="bg-overlay"></div>
        </div>
        <div class="right-side"></div>
    </div>
</template>

<script>

export default {
  name: 'Register'
}
</script>

<style lang="scss">
    .left-side {
        width: 50%;
        height: 100vh;
        background: url('../assets/images/banner.jpg') no-repeat;
        background-position: center center;
        background-size: cover;
        .bg-overlay {
            width: 100%;
            height: 100%;
            background: $dark-blue;
            opacity: $opacity-high;
        }
    }
    .right-side {
        width: 50%;
    }
</style>
