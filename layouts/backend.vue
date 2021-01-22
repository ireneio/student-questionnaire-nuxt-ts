<template>
  <div class="container container--fluid">
    <div class="row">
      <div class="col col--nowrap">
        <div class="aside">
          <BackendTabs :menuData="menuData" />
        </div>
        <div class="main">
          <BackendHeader username="User" :label="currentTabLabel" @logout="handleLogout" />
          <main class="body">
            <Nuxt />
          </main>
          <BackendFooter crText="Copyright © 2021 Ire. All rights reserved." />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { $authVerify } from '~/utils/api'
import Token from '~/utils/token'
import BackendHeader from '~/components/BackendHeader.vue'
import BackendFooter from '~/components/BackendFooter.vue'
import BackendTabs from '~/components/BackendTabs.vue'
import { SideMenuItem } from '~/types/index'

@Component({
  components: {
    BackendHeader,
    BackendFooter,
    BackendTabs
  }
})
export default class DefaultLayout extends Vue {
  private menuData: Array<SideMenuItem> = [
    { label: 'App Overview', iconUrl: '/home@3x.png', url: '/sys/', id: 1, subtabs: [] },
    { label: 'Adult Survey', iconUrl: '/load@3x.png', url: '/sys/recruitment', id: 2, subtabs: [] },
    { label: 'Student Survey', iconUrl: '/business@3x.png', url: '/sys/student', id: 3, subtabs: [ { label: 'Services', url: '/sys/student/', id: 3 }, { label: 'Analysis', url: '/sys/student/analysis', id: 3 } ] },
    { label: 'Survey Setting', iconUrl: '/icon_paper_a@3x.png', url: '/sys/survey', id: 4, subtabs: [ { label: 'AI Matrix', url: '/sys/survey/', id: 4 }, { label: 'Mail Invitation', url: '/sys/survey/invitation', id: 4 }, { label: 'SMS Invitation', url: '/sys/survey/sms', id: 4 } ] },
    { label: 'Account Setting', iconUrl: '/business_setting@3x.png', url: '/sys/account', id: 5, subtabs: [ { label: 'Student', url: '/sys/account/', id: 5 }, { label: 'Adult', url: '/sys/account/opening', id: 5 }, { label: 'CMS Account', url: '/sys/account/permission', id: 5 } ] }
  ]

  private get currentTabLabel(): string {
    // const find = this.menuData.find((tab: SideMenuItem) => tab.url === this.$route.path)
    const ls = window.localStorage.getItem('tab')
    if(ls) {
      const find = this.menuData.find((tab: SideMenuItem) => tab.id === Number(ls))
      if(find) {
        return find.label
      }
    }
    return 'Index'
  }

  private async handleLogout(): Promise<void> {
    try {
      const token = Token.getToken()
      if(token) {
        const config = {
          headers: {
            Authorization: Token.getToken()
          }
        }
        await $authVerify.post('/api/account/Signout', {}, config)
        Token.deleteToken()
      } else {
        throw new Error('ENONE Y')
      }
    } catch(e) {
      // error
      console.error(e.message)
    } finally {
      this.$router.push('/sys/login')
    }
  }
}
</script>
