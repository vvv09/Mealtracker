<template>
  <q-page class="q-pa-md q-gutter-y-md">
    <ReportsStatisticsCard/>
    <q-card
      v-for="report in storeStatistics.reportsSortedByDate" 
      :key="report.id"
    >
        <ReportItem 
          :report
        />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">

import ReportItem from "src/components/items/ReportItem.vue";
import ReportsStatisticsCard from "src/components/cards/ReportsStatisticsCard.vue";

import { useStoreStatistics } from 'src/stores/statistics-store'
const storeStatistics = useStoreStatistics()

</script>
