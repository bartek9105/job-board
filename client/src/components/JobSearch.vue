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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #E3E7F1;
        height: calc(100% - 69px);
        h1 {
            font-size: 25px;
            margin-bottom: 2.5rem;
        }
        &__jobForm {
            position: relative;
            &__input {
                width: 30rem;
                height: 2rem;
                border: 0;
                border-radius: 5px;
                padding-left: 1rem;
                color: #000;
            }
            &__searchIcon {
                color: #E14594;
                position: absolute;
                top: 8px;
                right: 10px;
            }
        }
    }
</style>
