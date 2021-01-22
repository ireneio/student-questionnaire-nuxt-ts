<template>
  <div class="loading">
    <div class="loading__center">
      <div class="loading__logo"></div>
      <div class="loading__words">
        <button class="btn btn--lasso" @click="$router.push('/f2e/landing')">Back to Home</button>
      </div>
      <div class="loading__words">by Ire.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { I18nFactory } from '~/utils/i18n'

@Component({
  layout: 'landing',
})
export default class f2eSuccess extends Vue {
  private i18nTarget(key: string): string {
    return I18nFactory.i18nTarget(key)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/main';

.loading {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  &__center {
    background-image: url(/background-index.jpg);
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__logo {
    position: relative;
    top: 33%;
    transform: translate(0, -50%);
    background-image: url(/logo_horizontal.jpg);
    width: 66vw;
    margin: 0 auto;
    height: 5vh;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__words {
    position: relative;
    top: 33%;
    transform: translate(0, -50%);
    color: $dark2;
    text-align: center;
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 10vh;
    letter-spacing: 0.24px;
    font-weight: 100;
  }
}
</style>
