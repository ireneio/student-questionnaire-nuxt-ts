<template>
 <footer class="footer" :class="{ 'footer--full': $route.path === '/sys/login' }">
    <div class="lang">
      <div class="lang__icon"></div>
      <div class="lang__text">繁體中文</div>
    </div>
    <div class="copyright">{{ crText }}</div>
    <div class="privacy">隱私權政策 / 關於我們</div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BackendFooter extends Vue {
   @Prop({ default: 'crText' }) readonly crText!: string

   @Prop({ default: 'Index' }) readonly label!: string
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/utils/variables';

.footer {
  position: absolute;
  bottom: 0;
  width: calc(100vw - 250px);
  display: flex;
  align-items: center;
  padding: 18px 22px;
  color: $grey3;
  font-size: 12px;
  font-weight: 100;
  background-color: $grey1;
  &--full {
    width: 100vw;
  }
}
.privacy{
  margin-left: auto;
  margin-right: 44px;
  cursor: pointer;
}
.lang {
  display: flex;
  align-items: center;
  margin-right: auto;
  cursor: pointer;
  &__icon {
    width: 18px;
    height: 18px;
    margin-right: 2px;
    background-image: url(/icon_earth@3x.png);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>
