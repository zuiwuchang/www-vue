<script setup lang="ts">
import { useBreakpointStore } from '@/stores/breakpoint'

import {
  NCard, NButton, NTable, NSpace,
} from 'naive-ui'

const breakpoint = useBreakpointStore()

const items = [
  { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
  { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
  { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
  { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
  { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
]
</script>
<template>
  <div class="flex flex-column gap-3">
    <n-card title="table">
      <p>
        爲手機顯示 table 通常都是糟糕的，因爲手機屏幕太小了，table 根本顯示不全，體驗很差
      </p>
      <p>
        但是我從
        <n-button tag="a" href="https://buefy.org/documentation/table" type="primary" text>
          buefy
        </n-button>
        學到一個好主意，在小屏幕中使用
        類似 card 的東西去顯示 table 內容
      </p>
      <p>
        改變窗口尺寸以查看下述表格顯示模式的變化
      </p>
    </n-card>

    <n-table :bordered="false" :single-line="false" v-if="breakpoint.md">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.gender }}</td>
        </tr>
      </tbody>
    </n-table>

    <n-card v-for="item in items" :key="item.id" v-if="!breakpoint.md">

      <n-table :bordered="false" :single-line="true">
        <tbody class="container">
          <tr>
            <td> <strong>ID:</strong></td>
            <td> {{ item.id }}</td>
          </tr>
          <tr>
            <td> <strong>First Name:</strong></td>
            <td> {{ item.first_name }}</td>
          </tr>
          <tr>
            <td> <strong>Last Name:</strong></td>
            <td> {{ item.last_name }}</td>
          </tr>
          <tr>
            <td> <strong>Date:</strong></td>
            <td> {{ item.date }}</td>
          </tr>
          <tr>
            <td> <strong>Gender:</strong></td>
            <td> {{ item.gender }}</td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
  </div>
</template>
