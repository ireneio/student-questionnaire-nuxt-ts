<template>
  <div>
    <main class="main">
      <!-- <header class="header">
        <div class="header__logo"></div>
        <div class="header__timer" v-if="$route.query.type === 'enabled'">
          {{ i18nTarget('C0301') || 'Time' }}<span class="header__time">{{ displayTime }}</span>
        </div>
      </header> -->
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { I18nFactory } from '~/utils/i18n'

@Component
export default class FrontendLayout extends Vue {
  private timer: number | null = null

  private get displayTime(): string {
    return this.msToTime(this.timer !== null ? this.timer : 0)
  }

  private msToTime(duration: number) {
    const milliseconds: number | string = parseInt(
        ((duration % 1000) / 100).toString()
      )
    let seconds: number | string = Math.floor((duration / 1000) % 60)
    let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60)
    let hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return minutes + ':' + seconds
  }

  private i18nTarget(key: string): string {
    return I18nFactory.i18nTarget(key)
  }

  private mounted() {
    setInterval(() => {
      this.timer === null ? (this.timer = 1000) : (this.timer += 1000)
    }, 1000)

    const timeout = setTimeout(() => {
      window.scrollTo(
        { top: 100, behavior: 'smooth' }
      )
      clearTimeout(timeout)
    }, 2000)
  }

  private beforeDestroy() {
    this.timer = null
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/utils/_variables.scss';
.header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  // height: 55px;
  width: 100%;
  // background-color: #fff;
  padding: 0 16px;
  padding-top: 18px;
  // background-image: url('/background-index.jpg');
  // background-repeat: no-repeat;
  // background-size: cover;
  &__timer {
    margin-left: auto;
    color: $grey1;
  }
  &__time {
    color: $primary;
    margin-left: 10px;
  }
  &__logo {
    width: 82px;
    height: 20px;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(/logo_lasso_word@3x.png);
  }
}
.main {
  // min-height: calc(100vh - 42px);
  // max-height: calc(100vh - 42px);
  // height: calc(100vh - 42px);
  overflow: hidden;
}
</style>
