<template>
  <div>
    <div class="wrapper" v-if="allowRender" v-show="!loading">
      <div class="logo"></div>
      <section class="section privacy" v-show="!privacyOpened">
        <div class="privacy__text" v-html="i18nTarget('C0101')" v-if="i18nTarget('C0101') !== ''"></div>
        <div class="privacy__text" v-else>
          填答時，請仔細閱讀每項敘述，然後判斷該敘述與您目前實際情況符合程度。並沒有標準答案，請您依照自身真實狀況進行填答。
          <br />
          <br />
          測評有特殊設計，會從各方面評估您測評結果的可參考度，請認真專注在每一題的作答即可。
          <br />
          <br />
          CAT職能認知測評結果報告會同時提供面談參考題目，讓企業可以進一步深入詢問並了解您的相關經驗與職能等級。
          <br />
          <br />
          如果您已經準備就緒，請點選確認按鈕開始作答。
        </div>
        <div class="privacy__btn privacy__btn--closed" @click="handleReadPrivacy" v-show="!privacyOpened">
          {{ i18nTarget('C0103') || 'privacy policy' }}
        </div>
        <div class="privacy__checkbox" v-show="!privacyOpened">
          <label class="checkbox" for="privacy" :class="{ 'checkbox--checked': privacy }">
            <input type="checkbox" v-model="privacy" id="privacy">
          </label>
          <label class="privacy__checkboxText" for="privacy">{{ i18nTarget('C0102') || 'I agree to the' }} {{ i18nTarget('C0103') || 'privacy policy' }}</label>
        </div>
      </section>
      <div class="buttonBox" v-show="!privacyOpened">
        <button @click="handleStart" class="button" :class="{ 'button--disabled': !privacy }">{{ i18nTarget('C0104') || 'START' }}</button>
      </div>
      <div class="privacyBox" v-show="privacyOpened">
        <div class="privacyBox__banner privacy__btn privacy__btn--opened" @click="handleClosePrivacy">
          {{ i18nTarget('C0103') || 'privacy policy' }}
        </div>
        <div class="privacyBox__text" v-html="privacyText" v-show="privacyText"></div>
        <div class="privacyBox__text" v-if="!privacyText">
          Placeholder
        <br />
        <div class="privacyBox__secTitle">Placeholder</div>
        <ul class="privacyBox__list">
          <li>Placeholder</li>
          <li>Placeholder</li>
        </ul>
        </div>
        <div class="privacy__checkbox">
          <label class="checkbox" for="privacy" :class="{ 'checkbox--checked': privacy }">
            <input type="checkbox" v-model="privacy" id="privacy">
          </label>
          <label class="privacy__checkboxText" for="privacy">{{ i18nTarget('C0102') || 'I agree to the' }} {{ i18nTarget('C0103') || 'privacy policy' }}</label>
        </div>
        <div class="buttonBox privacyBox__btnBox">
          <button @click="handleStart" class="button" :class="{ 'button--disabled': !privacy || clicked === 'invalid' }">{{ i18nTarget('C0104') || 'START' }}</button>
        </div>
      </div>
    </div>
    <!-- <div class="loading" v-show="loading"></div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { $axios } from '~/utils/api'
import { I18nFactory } from '~/utils/i18n'
import { eventStopDefault } from '~/utils/helpers'
import { Answer, Questionnaire } from '~/types/index'

@Component({
  layout: 'landing'
})
export default class f2eLanding extends Vue {
  private loading: boolean = false

  private privacy: boolean = false

  private clicked: boolean | string = false

  private handleStart(): void {
    if (this.clicked === 'invalid') {
      return
    }
    if (this.privacy) {
      if (!this.clicked) {
        this.clicked = true
        this.loading = true
        this.timer = null
        this.timer = setTimeout(() => {
        this.loading = false
          try {
            const key : string = this.$route.query.InvitationKey.toString()
            if (key === 'undefined' || key === '') {
              throw new Error('Err')
            }
            this.$router.push({
              name: 'f2e',
              params: {
                InvitationKey: key,
                questions: JSON.stringify(this.questions),
                answers: JSON.stringify(this.answers)
              },
              query: { type: 'enabled' } })
          } catch (e) {
            this.clicked = 'invalid'
            // this.$router.push({ name: 'f2e-error', params: { statusCode: 'Required Key Missing' }, query: { type: 'success' } })
          }
        }, 800)
      } else {
        setTimeout(() => {
          this.clicked = false
        }, 1200)
      }
    }
  }

  private timer: any = null

  private i18nTarget(key: string): string {
    return I18nFactory.i18nTarget(key)
  }

  private get i18nData(): any {
    return I18nFactory.getI18nData
  }

  private allowRender: boolean = false

  private privacyOpened: boolean = false

  private handleReadPrivacy($event: Event): void {
    eventStopDefault($event)
    this.privacyOpened = true
    window.scrollTo(0, 0)
  }

  private handleClosePrivacy(): void {
    window.scrollTo(0, 99999)
    this.privacyOpened = false
  }

  private expiration: Date | null = null

  private get getInvitationKey(): string {
    // @ts-ignore
    const uri: string = encodeURIComponent(this.$route.query.InvitationKey) || ''
    // @ts-ignore
    return decodeURIComponent(uri)
  }

  private async sendGetAssessmentRequest(): Promise<any> {
    const requestBody = {
      Conditions: [
        {
          InvitationKey: this.getInvitationKey
        }
      ]
    }
    const result = await $axios.post('/Client/GetAssessment', requestBody)
    if (result) {
      switch (result.data.StatusCode) {
        case 0:
          this.expiration = new Date(result.data.Results[0].ExpirationTime)
          return result.data.Results[0]
        case 99203:
        case 99003:
          throw new Error(result.data.StatusCode.toString())
        default:
          throw new Error(result.data.StatusCode.toString())
      }
    }
  }

  private questions: Array<Questionnaire> = []

  private answers: Array<Answer> = []

  private privacyText: string = ''

  private async initAssessment() {
    try {
      if (!this.$route.query.InvitationKey || this.$route.query.InvitationKey === 'undefined') {
        // throw new Error('Required Key Missing')
      }
      // await I18nFactory.init()
      // const result = await this.sendGetAssessmentRequest()

      // this.questions = result.Items.map((item: any) => ({
      //   id: item.ItemId,
      //   title: item.Item
      // }))
      // this.answers = result.Items.map((item: any) => ({
      //   id: item.ItemId,
      //   scale: null
      // }))
      // this.privacyText = result.PrivacyPolicy
      this.allowRender = true
    } catch(e) {
      // this.$router.push({ name: 'f2e-error', params: { statusCode: e.message.toString() }, query: { type: 'success' } })
    }
  }

  private async created() {
    await this.initAssessment()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/utils/_variables.scss';

.wrapper {
  height: calc(100vh - 42px);
  overflow: hidden;
  min-width: 100vw;
  padding-top: 42px;
  background-image: url(/background-index.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.logo {
  width: 258px;
  height: 65px;
  background-image: url(/logo_horizontal.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: $primary;
}
.titleBox {
  margin-top: 37px;
  padding: 0 59px;
  &__name {
    color: $primary;
    font-size: 24px;
    margin-bottom: 9px;
  }
  &__desc {
    font-size: 21px;
    margin-bottom: 33px;
    color: $black;
  }
  &__footer {
    font-size: 15px;
    margin-bottom: 53px;
    color: $black;
  }
}
.prologue {
  margin-top: 120px;
  margin-bottom: 107px;
  padding: 0 59px;
  color: $black;
}
.section {
  // padding: 0 45px;
  &__box {
    margin-top: 120px;
  }
  &__box1 {
    margin-top: 95px;
  }
  &__icon {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 30px;
    color: $primary;
    width: 65px;
    height: 65px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__desc {
    text-align: center;
    color: $black;
    font-size: 15px;
  }
  &__icon1 {
    background-image: url(/clock.svg);
  }
  &__icon2 {
    background-image: url(/idea.svg);
  }
  &__icon3 {
    background-image: url(/cardiogram.svg);
  }
  &__icon4 {
    background-image: url(/book.svg);
  }
}
.loading {
  height: 100vh;
  overflow: hidden;
  background-color: $white;
  background-image: url(/loading@3x.png);
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.privacy {
  margin-top: 40px;
  &__text {
    padding: 0 45px;
    padding-top: 45px;
    margin-bottom: 40px;
    font-size: 17px;
    color: $dark3;
  }
  &__checkbox {
    padding-top: 30px;
    width: 100vw;
    background-color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  &__checkboxText {
    margin-left: 5px;
  }
  &__highlight {
    color: $primary;
  }
  &__btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    text-transform: capitalize;
    font-size: 12px;
    margin-bottom: 12px;
    &--closed {
      &:after {
        content: '';
        margin-top: 3px;
        margin-left: 4px;
        border-left: 4px solid transparent;
        border-top: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid $dark3;
     }
    }
    &--opened {
      &:after {
        content: '';
        margin-top: 7px;
        margin-left: 4px;
        border-left: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid $dark3;
     }
    }
  }
}
.button {
  background-color: $primary;
  opacity: 1 !important;
  width: 150px;
  font-size: 21px;
  color: $white;
  padding: 12px 43px;
  border-radius: 31px;
  letter-spacing: 0.42px;
  border: none;
  cursor: pointer;
  &--disabled {
    background-color: $grey3;
    cursor: not-allowed;
  }
}
.checkbox {
  cursor: pointer;
  display: block;
  width: 16px;
  height: 16px;
  background-color: $white;
  border-radius: 3px;
  border: 1px solid $primary;
  > input {
    display: none;
  }
  &--checked {
    background-color: $primary;
    &:before {
      display: block;
      content: '';
      width: 2px;
      height: 6px;
      background-color: $white;
      transform: rotate(-40deg) translateX(0px) translateY(7px);
    }
    &:after {
      display: block;
      content: '';
      width: 2px;
      height: 9px;
      background-color: $white;
      transform: rotate(40deg) translateX(4px) translateY(-8px);
    }
  }
}
.buttonBox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  background-color: $white;
}
.privacyBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: $dark3, $alpha: .35);
  overflow: auto;
  &__banner {
    padding: 13px 0;
    color: $dark3;
    margin-bottom: 0;
    cursor: pointer;
  }
  &__text {
    height: 55vh;
    overflow: auto;
    color: $white;
    background-color: $white;
    margin: 0 20px;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 12px;
    box-shadow: 2px 3px 4px rgba($color: $black, $alpha: .3);
  }
  &__secTitle {
    color: $primary;
    font-size: 17px;
    margin-top: 14px;
    margin-bottom: 12px;
  }
  &__list {
    font-weight: 100;
    padding-left: 20px;
    list-style-type: decimal;
  }
  &__btnBox {
    padding-bottom: 32px;
    .line {
      margin-bottom: 0;
    }
  }
}
</style>
