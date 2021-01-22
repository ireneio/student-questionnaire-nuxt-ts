<template>
  <div class="mask" v-show="active"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BackendHeader extends Vue {
   @Prop({ default: true }) readonly active!: boolean
}
</script>
