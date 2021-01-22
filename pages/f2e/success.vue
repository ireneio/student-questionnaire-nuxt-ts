<template>
  <div class="loading">
    <div class="loading__warpUp"></div>
    <div class="loading__center" :style="{ 'background-image': `url(${i18nTarget('C0501') || '/people@3x.png'})` }"></div>
    <div class="loading__logo"></div>
    <div class="loading__words">by MAYO Human Capital Inc.</div>
    <div class="loading__warpDown"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { I18nFactory } from '~/utils/i18n'

@Component({
  layout: 'landing',
})
export default class f2eSuccess extends Vue {
  private timer: any = null

  private i18nTarget(key: string): string {
    return I18nFactory.i18nTarget(key)
  }

  private created() {
    if (!this.$route.query.type || this.$route.query.type.toString() !== 'success') {
      this.$router.push('/f2e?type=enabled')
    }
  }

  private beforeDestroy() {
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.loading {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  &__warpUp {
    background-image: url(/line_d@3x.png);
    width: 100vw;
    height: 20vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__warpDown {
    background-image: url(/line_e@3x.png);
    width: 100vw;
    height: calc(100vh - 20vh - 40vh - 5vh - 17px - 10vh);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__center {
    background-image: url(/people@3x.png);
    width: 60vw;
    margin-left: 20vw;
    margin-right: 20vw;
    height: 40vh;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__logo {
    background-image: url(/lassowordlogo@3x.png);
    width: 25vw;
    margin-left: 37.5vw;
    margin-right: 37.5vw;
    height: 5vh;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__words {
    color: #e2a638;
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 10vh;
    letter-spacing: 0.24px;
    font-weight: 100;
  }
}
</style>
