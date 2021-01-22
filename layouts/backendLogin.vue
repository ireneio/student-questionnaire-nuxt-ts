<template>
<div class="container container--fluid">
  <div class="row">
    <div class="col">
      <div class="main">
        <main class="body body--full">
          <Nuxt />
        </main>
        <BackendFooter crText="Copyright © 2021 Ire. All rights reserved." />
      </div>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import Vue from 'vue'
import BackendFooter from '~/components/BackendFooter.vue'

@Component({
  components: {
    BackendFooter
  }
})
export default class BackendLogin extends Vue {

}
</script>
