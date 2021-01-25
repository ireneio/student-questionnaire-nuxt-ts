<template>
  <aside>
   <div class="logo"></div>
    <div class="tabs">
      <div class="tab" v-for="item in menuData" :key="item.label" :class="{ 'tab--current': Number(currentTab) === item.id }" @click="handleUpdateTab(item.label, item.url, 'primary', item.subtabs, item.id)">
        <div class="tab__title">
            <div class="tab__titleIcon" :style="`background-image:url(${item.iconUrl})`"></div>
            <div class="tab__titleText">{{ item.label }}</div>
        </div>
        <div class="subtabs" v-if="item.subtabs.length > 0" v-show="Number(currentTab) === item.id">
          <div class="subtab" v-for="subtabItem in item.subtabs" :key="subtabItem.label" @click.stop="handleUpdateTab(item.label, subtabItem.url, 'sub')">
            <div class="subtab__title">{{ subtabItem.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { SideMenuItem } from '~/types'

@Component
export default class BackendTabs extends Vue {
  @Prop({ default: [] }) readonly menuData!: Array<SideMenuItem>

  @Prop() readonly currentTab!: SideMenuItem

  private handleUpdateTab(label: string, url: string, type: string, subtabs: Array<SideMenuItem>, id: Number) : void {
    this.$emit('update-tab', { label, url, type, subtabs, id })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/utils/variables';

.logo {
  width: 160PX;
  height: 78px;
  // margin-top: 10px;
  // margin-bottom: 18px;
  background-image: url(/logo_horizontal_invert.jpg);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.tabs {
  padding-top: 4px;
}
.tab {
  color: $grey1;
  cursor: pointer;
  font-size: 16px;
  &__title {
    display: flex;
    align-items: center;
    margin-left: 21px;
    padding: 18px 0;

  }
  &__titleIcon {
    width: 30px;
    height: 30px;
    margin-right: 4px;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
  &--current {
    background-color: $primary;
    color: $dark3;
    font-weight: bold;
  }
}
.subtab {
  color: $white;
  background-color: $grey6;
  &__title {
    margin-left: 55px;
    padding: 18px 0;
    font-size: 14px;
  }
}
</style>
