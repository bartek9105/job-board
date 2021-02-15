<template>
  <div class="toggle">
    <input id="switch" type="checkbox" /><label for="switch">Toggle</label>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch'
}
</script>

<style lang="scss" scoped>
.toggle {
  @include flex();
}

input[type='checkbox'] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 40px;
  height: 20px;
  background: $light-blue;
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 4px;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

input:checked + label {
  background: $dark-blue;
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 13px;
}
</style>
