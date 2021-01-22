<template>
  <div class="error" style="background-color:#fff !important;">
    <div class="error__title">Error</div>
    <div class="error__text">
      <div class="error__code"><b>{{ code }}</b></div>
      <em class="error__desc">Please report to Customer Service.</em>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({
  layout: ''
})
export default class f2eError extends Vue {
  private code : string = ''

  private created() {
    if (this.$route.params.statusCode) {
      this.code = this.$route.params.statusCode
    } else {
      this.code = 'Required Key Missing'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/utils/_variables.scss';

.error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__code {
    color: $primary;
    font-size: 20px;
  }
  &__desc {
    display: block;
    font-size: 14px;
    margin-top: 12px;
    color: $grey5;
    font-style: italic;
  }
  &__text {
    font-size: 16px;
    text-align: center;
    > span {
      font-size: 12px;
    }
  }
  &__title {
    font-size: 36px;
    font-weight: bold;
    color: $primary;
    margin-bottom: 12px;
    padding: 10px 14px;
    border: 2px solid $primary;
  }
}
</style>
