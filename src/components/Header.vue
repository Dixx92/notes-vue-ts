<template>
  <div class="header">
    <a
      class="header__link"
      href="/"
      @click.prevent="toAllNotes"
    >
      <img
        src="@/assets/home.png"
        class="header__home-img"
        alt="home"
      >
    </a>

    <div class="header__title">{{ title }}</div>

    <Button v-if="!hiddenButton" @click="toCreateNote">
      Добавить
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useRoutes } from '@/composables/Routes.ts';
import Button from '@/components/ui/Button.vue';

defineProps<{
  title: string,
  hiddenButton?: boolean,
}>();

const { toAllNotes, toCreateNote } = useRoutes();
</script>

<style lang="stylus">
.header
  display flex
  justify-content space-between
  margin-bottom 24px
  font-size 32px
  line-height 40px

  &__link
    display flex

  &__home-img
    height 40px

  &__title
    display flex
    width 100%
    justify-content center
</style>
