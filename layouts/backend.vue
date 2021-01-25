<template>
  <div class="container container--fluid">
    <div class="row">
      <div class="col col--nowrap">
        <div class="aside">
          <BackendTabs :menuData="menuData" @update-tab="handleUpdateTab" :currentTab="currentTab" />
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
import { SideMenuItem, TabItem } from '~/types/index'

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

  private currentTabLabel: string = 'Placeholder'

  private getCurrentTabLabel(): string {
    const res = this.findCurrentTabHelper(this.menuData)
    if(typeof res === 'string') {
      return res
    } else {
      return 'Index'
    }
  }

  private setCurrentTabLabel(): void {
    this.currentTabLabel = this.getCurrentTabLabel()
  }

  private findCurrentTabHelper(data: Array<SideMenuItem>): string | Function | undefined {
    const ls = window.localStorage.getItem('tab')
    if(ls) {
      for(let i = 0; i < data.length; i++) {
        if(data[i].id === Number(ls)) {
          return data[i].label
        }
        if(data[i].subtabs) {
          const subtabs: SideMenuItem[] = data[i].subtabs || []
          for(let j = 0; j < subtabs.length; j++) {
            if(subtabs[j].id === Number(ls)) {
              return subtabs[j].label
            }
          }
        }
      }
    } else {
      return 'Cannot find Tab'
    }
  }

  private currentTab: string = '1'

  private handleUpdateTab({ label, url, type, subtabs, id }: TabItem) : void {
      if(type === 'primary') {
        this.currentTab = id.toString()
        localStorage.setItem('tab', id.toString())
        this.setCurrentTabLabel()
        if(url !== '') {
          this.$router.push(url)
        }
      } else if (type === 'sub') {
        if(url !== '') {
          this.setCurrentTabLabel()
          this.$router.push(url)
        }
      }
  }

  private initTab(): void {
    const tab = localStorage.getItem('tab')
    if(tab) {
      this.currentTab = tab
    } else {
      this.currentTab = '1'
    }
    this.setCurrentTabLabel()
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

  private created(): void {
    this.initTab()
  }
}
</script>
