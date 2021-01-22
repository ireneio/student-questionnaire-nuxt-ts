<template>
  <header class="header">
    <h1 class="header__title">{{ label }}</h1>
    <div class="status">
      <div class="status__dp"></div>
      <div class="status__email">{{ username }}</div>
      <div class="status__cog" @click="$emit('logout')"></div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BackendHeader extends Vue {
   @Prop({ default: 'User' }) readonly username!: string

   @Prop({ default: 'Index' }) readonly label!: string
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/utils/variables';

.header {
  display: flex;
  align-items: center;
  height: 83px;
  padding: 0 22px;
  &__title {
    font-size: 22px;
  }
}
.status {
  display: flex;
  align-items: center;
  margin-left: auto;
  &__dp {
    width: 38px;
    height: 38px;
    background-color: $grey4;
    border-radius: 50%;
    background-image: url(/business@3x.png);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  &__email {
    margin-left: 12px;
  }
  &__cog {
    width: 30px;
    height: 30px;
    margin-left: 16px;
    margin-top: 5px;
    background-image: url(/logout-512.png);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}
</style>
