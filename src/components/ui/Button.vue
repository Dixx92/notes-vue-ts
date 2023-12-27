<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.button
  padding 8px 12px
  border-radius 8px
  background-color #006978
  color #EEF9FB
  font-size 18px
  line-height 24px
  font-weight 400

  &:hover
    background-color #0097A7
    cursor pointer
</style>
