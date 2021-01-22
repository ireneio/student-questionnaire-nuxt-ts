<template>
  <div>
    <div class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <div>
      <table class="table">
        <thead class="table__header">
          <tr>
            <th class="table__headerCell" v-for="item in tableHeaders" :key="item">
              <div class="table__headerCellText" v-if="item !== 'checkbox'">{{ item }}</div>
               <div class="table__headerCellText" v-if="item === 'checkbox'">
                <input type="checkbox" name="" id="" @change="$emit('row-checkbox-change')">
              </div>
            </th>
          </tr>
        </thead>
        <div class="table__divider"></div>
        <tbody class="table__body">
          <tr class="table__row table__row--selectable"  v-for="(row, index) in tableData" :key="index">
            <td class="table__cell" @click="$emit('row-click')" v-for="(colValue, colKey) in row" :key="colKey">
              <slot :name="colKey" :colValue="colValue" :colKey="colKey" :row="row">{{ colValue }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table__footer">
        <div class="table__pagination">
          <div class="table__paginationText">{{ currentIndexStart }} - {{ currentIndexEnd }} 列 (共 {{ tableData.length }} 列)</div>
          <div class="table__paginationBtnbox">
            <div class="table__paginationBtn table__paginationBtn--prev table__paginationBtn--disabledPrev" @click="$emit('page-update', 1)"></div>
            <div class="table__paginationBtn table__paginationBtn--next" @click="$emit('page-update', -1)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'

@Component
export default class BackendTablePageLayout extends Vue {
  @Prop({ default: [] }) readonly tableHeaders!: Array<string>

  @Prop({ default: [] }) readonly tableData!: Array<any>

  @Prop({ default: 0 }) readonly currentIndexStart!: number

  @Prop({ default: 10 }) readonly currentIndexEnd!: number
}
</script>
