<template>
    <div class="jobSearch">
        <h1>Search through over 509 code job offers</h1>
        <form class="jobSearch__jobForm" @submit.prevent>
            <input type="text" class="jobSearch__jobForm__input" placeholder="Type in job you are looking for" v-model="titleQuery" >
            <i class="fas fa-search jobSearch__jobForm__searchIcon"></i>
        </form>
    </div>
</template>

<script>

export default {
  data () {
    return {
      titleQuery: ''
    }
  }
}
</script>

<style lang="scss">
    .jobSearch {
        @include flex-center-column-xy;
        color: $white-blue;
        height: calc(100% - ($nav-height));
        h1 {
            font-size: 25px;
            margin-bottom: $section-m-md;
        }
        &__jobForm {
            position: relative;
            &__input {
                width: 30rem;
                height: 2rem;
                border: 0;
                border-radius: $border-radius-sm;
                padding-left: 1rem;
                color: #000;
            }
            &__searchIcon {
                color: $pink;
                position: absolute;
                top: 8px;
                right: 10px;
            }
        }
    }
</style>
