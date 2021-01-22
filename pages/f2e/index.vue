<template>
  <div class="wrapper">
    <div class="dialog" v-if="(currentQuestion+1) <= questions.length">
      <div class="dialog__triangle dialog__triangleL"></div>
      <div class="dialog__pfp">
        <div></div>
      </div>
      <div class="dialog__dialogBox">
        {{ questions.length ? questions[currentQuestion].title : '' }}
      </div>
    </div>
    <div class="dialog" v-else>
      <div class="dialog__triangle dialog__triangleL"></div>
      <div class="dialog__pfp">
        <div></div>
      </div>
      <div class="dialog__dialogBox">
        預設問題
      </div>
    </div>
    <div class="dialog" v-show="currentAnswer !== null">
      <div class="dialog__triangle dialog__triangleR"></div>
      <div class="dialog__dialogBox response">{{ currentAnswer }}</div>
    </div>
    <div class="uxWrapper">
      <div class="options__wrapper topWrapper">
        <div class="options__title">{{ i18nTarget('C0302') || 'Perhaps...' }}</div>
        <div class="options__box">
          <div class="options">
            <div
              class="options__ring"
              :class="{ 'options__ring--selected': currentAnswer === 1 }"
              @click="handleSelectOption(1)"
            >
              <div class="options__number">1</div>
            </div>
            <div class="options__caption">{{ i18nTarget('C0303') || 'N/A' }}</div>
          </div>
          <div class="options">
            <div
              class="options__ring"
              :class="{ 'options__ring--selected': currentAnswer === 2 }"
              @click="handleSelectOption(2)"
            >
              <div class="options__number">2</div>
            </div>
            <div class="options__caption">{{ i18nTarget('C0304') || 'Sporadic' }}</div>
          </div>
          <div class="options">
            <div
              class="options__ring"
              :class="{ 'options__ring--selected': currentAnswer === 3 }"
              @click="handleSelectOption(3)"
            >
              <div class="options__number">3</div>
            </div>
            <div class="options__caption">{{ i18nTarget('C0305') || 'Semi' }}</div>
          </div>
          <div class="options">
            <div
              class="options__ring"
              :class="{ 'options__ring--selected': currentAnswer === 4 }"
              @click="handleSelectOption(4)"
            >
              <div class="options__number">4</div>
            </div>
            <div class="options__caption">{{ i18nTarget('C0306') || 'Relative' }}</div>
          </div>
          <div class="options">
            <div
              class="options__ring"
              :class="{ 'options__ring--selected': currentAnswer === 5 }"
              @click="handleSelectOption(5)"
            >
              <div class="options__number">5</div>
            </div>
            <div class="options__caption">{{ i18nTarget('C0307') || 'Frequent' }}</div>
          </div>
          <div class="options">
            <div
              class="options__ring"
              :class="{ 'options__ring--selected': currentAnswer === 6 }"
              @click="handleSelectOption(6)"
            >
              <div class="options__number">6</div>
            </div>
            <div class="options__caption">{{ i18nTarget('C0308') || 'Consistent' }}</div>
          </div>
        </div>
      </div>
      <div class="options__wrapper bottomWrapper">
        <div class="progBar">
          <div class="progBar__bar">
            <!-- <v-progress-linear
              style="border-radius: 15px;"
              color="#e2a638"
              height="13"
              :value="progress"
              striped
              rounded
            >
            </v-progress-linear> -->
          </div>
          <span class="progBar__number">{{ isNaN(parseInt(progress)) ? 0 : parseInt(progress) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { $axios } from '~/utils/api'
import { Answer, Questionnaire } from '~/types/index'
import { I18nFactory } from '~/utils/i18n'
import f2eLanding from '~/pages/f2e/landing.vue'

@Component({
  layout: 'frontend',
})
export default class f2eIndex extends Vue {
  private get browserLanguage(): string {
    return navigator.language
  }

  private get progress(): number {
    return ((this.currentQuestion + 1) / this.questions.length) * 100
  }

  private expiration: Date | null = null

  private questions: Array<Questionnaire> = []

  private answers: Array<Answer> = []

  private currentQuestion: number = 0

  private currentAnswer: number | null = null

  private timer: null | number = 0

  private get getInvitationKey(): string {
    // @ts-ignore
    const uri: string = encodeURIComponent(this.$route.params.InvitationKey) || ''
    // @ts-ignore
    return decodeURIComponent(uri)
  }

  private get displayTime(): string {
    return ''
  }

  private startTime: Date = new Date()

  private async selectOptionHelper(option: number): Promise<any> {
    this.currentAnswer = option
    this.answers[this.currentQuestion].scale = option
    if ((this.currentQuestion+1) ===  this.questions.length) {
      // done with the survey, initiate submission
      try {
        await this.sendSubmitAssessmentRequest()
        this.$router.push('/f2e/success?type=success')
      } catch (e) {
        // error dialog
        this.$router.push({ name: 'f2e-error', params: { statusCode: e.message }, query: { type: 'success' } })
      }
    } else {
      setTimeout(() => {
        this.currentQuestion += 1
        this.currentAnswer = null
      }, 800)
    }
  }

  private throttleTimer: number | null = null

  private throttleHelper(func: Function, funcArgs: Array<any>, throttleValue: number): void {
    if (this.throttleTimer === null) {
      this.throttleTimer = Number(Date.now())
      func.apply(null, funcArgs)
    } else {
      const lastClicked = Number(new Date(this.throttleTimer))
      const currentClick = Number(Date.now())
      if (currentClick - lastClicked > throttleValue) {
        func.apply(null, funcArgs)
        this.throttleTimer = currentClick
      }
    }
  }

  private async handleSelectOption(option: number): Promise<any> {
    await this.throttleHelper(this.selectOptionHelper, [option], 1200)
  }

  private dateFormatHelper(
    date: number | Date,
    dateSymbol = '/',
    withTime = true,
    timeSymbol = ':'
  ): string {
    const toDate = new Date(date)
    const year = toDate.getFullYear().toString()
    const month = (toDate.getMonth() + 1).toString().length < 2 ? '0' + (toDate.getMonth() + 1).toString() : (toDate.getMonth() + 1).toString()
    const day = toDate.getDate().toString().length < 2 ? '0' + toDate.getDate().toString() : toDate.getDate().toString()

    const hour = toDate.getHours().toString().length < 2 ? '0' + toDate.getHours().toString() : toDate.getHours().toString()
    const minutes = toDate.getMinutes().toString().length < 2 ? '0' + toDate.getMinutes().toString() : toDate.getMinutes().toString()
    const seconds = toDate.getSeconds().toString().length < 2 ? '0' + toDate.getSeconds().toString() : toDate.getSeconds().toString()

    const dateStr = `${year}${dateSymbol}${month}${dateSymbol}${day}`
    const timeStr = `${hour}${timeSymbol}${minutes}${timeSymbol}${seconds}`
    if (!withTime) {
      return dateStr
    }
    return dateStr + ' ' + timeStr
  }

  private async sendSubmitAssessmentRequest(): Promise<any> {
    const requestBody = {
      Contents: [
        {
          InvitationKey: this.getInvitationKey,
          AnswerStartTime: this.dateFormatHelper(this.startTime),
          AnswerEndTime: this.dateFormatHelper(new Date()),
          Items: this.answers.map((item: Answer) => ({
            ItemId: item.id,
            Scale: item.scale
          }))
        }
      ]
    }
    const result = await $axios.post(
      '/Client/UpdateAssessmentScales',
      requestBody
    )
    if (result) {
      switch (result.data.StatusCode) {
        case 0:
          return result.data
        case 99003:
          throw new Error('資料格式錯誤')
        default:
          throw new Error('Error')
      }
    }
  }

  private i18nTarget(key: string): string {
    return I18nFactory.i18nTarget(key)
  }

  private disableselect(e: any): boolean {return false}

  private initDisableSelect(): void {
    document.onselectstart = function() { return false }
    document.onmousedown = this.disableselect
  }

  private initData(): void {
    try {
      if (!this.$route.query.type || this.$route.query.type.toString() !== 'enabled') {
        throw new Error('Required Key Missing')
      }
      this.questions = JSON.parse(this.$route.params.questions)
      this.answers = JSON.parse(this.$route.params.answers)
    } catch(e) {
      this.$router.push({ name: 'f2e-error', params: { statusCode: '99203' }, query: { type: 'success' } })
    }
  }

  private initTimer(): void {
    this.startTime = new Date()
    this.interval = setInterval(() => {
      this.timer === null ? (this.timer = 1000) : (this.timer += 1000)
    }, 1000)
  }

  private interval: any = null

  private async created() {
    // this.initData()
    this.initTimer()
  }

  private mounted() {
    this.initDisableSelect()
  }

  private beforeDestroy() {
    this.interval = null
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/utils/_variables.scss';
.wrapper {
  min-height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow: hidden;
  min-width: 100vw;
  height: 100vh;
  padding: 32px 16px;
  // margin-top: 16px;
  background-image: url('/background-index.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.options {
  flex: 0 0 calc(33% - 16px);
  margin: 0 8px 8px 8px;
  text-align: center;
  color: $black;
  &__ring {
    cursor: pointer;
    background-color: $white;
    border-radius: 5px;
    text-align: center;
    padding: 10px 0px;
    &--selected {
      background-color: $primary;
      color: $white;
    }
  }
  &__wrapper {
    border-radius: 10px;
    background-color: $white;
    padding: 18px 16px;
    box-shadow: 2px 3px 4px rgba($color: $black, $alpha: .3);
  }
  &__title {
    font-size: 17px;
    margin-bottom: 14px;
    font-weight: 500;
  }
  &__box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -8px -8px -8px;
  }
  &__caption {
    font-size: 14px;
    margin-top: 4px;
  }
}
.uxWrapper {
  position: absolute;
  bottom: 32px;
  left: 16px;
  right: 16px;
}
.topWrapper {
  // margin-top: 26px;
  background-color: rgba($color: $grey1, $alpha: .75);
  color: $dark3;
}
.bottomWrapper {
  margin-top: 0px;
  padding: 0;
  background-color: transparent;
}
.dialog {
  position: relative;
  display: flex;
  margin-bottom: 30px;
  &__triangle {
    position: absolute;
    width: 16px;
    height: 17px;
    top: 15px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__triangleL {
    left: 71px;
    background-image: url(/talkbox_corner_l.svg);
  }
  &__triangleR {
    right: 0px;
    background-image: url(/talkbox_corner_r.svg);
  }
  &__pfp {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    margin-right: 20px;
    padding: 7px;
    box-shadow: 2px 3px 4px rgba($color: $black, $alpha: .3);
    background-color: $white;
    > div {
      height: 42px;
      width: 42px;
      border-radius: 50%;
      background-color: $white;
      background-image: url(/people_b.svg);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  &__dialogBox {
    flex: 0 0 calc(100% - 15% - 20px - 15% - 28px);
    border-radius: 10px;
    background-color: $white;
    padding: 14px;
    font-size: 17px;
    color: $dark3;
    box-shadow: 2px 3px 4px rgba($color: $black, $alpha: .3);
  }
}
.response {
  flex: 0 0 20%;
  margin-left: auto;
  margin-right: 13px;
  text-align: center;
  color: $primary;
  font-size: 17px;
}
.progBar {
  margin-top: 28px;
  display: flex;
  align-items: center;
  &__number {
    flex: 0 0 10%;
    position: absolute;
    right: 0;
    color: $grey1;
  }
  &__bar {
    flex: 0 0 88%;
    margin-top: 2px;
  }
}
</style>
