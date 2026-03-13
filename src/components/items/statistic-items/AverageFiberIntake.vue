<template>
  <q-item clickable v-ripple>

    <q-item-section avatar>
      <q-avatar color="fiber" text-color="white" :icon=Icons.FIBER />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">Average Fiber</q-item-label>
    </q-item-section>

    <q-item-section side top class="text-secondary text-h6">
      {{ storeStatistics.averageFiberIntake }}
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

  import { Icons } from 'src/constants/icons'

  import { useStoreStatistics } from 'src/stores/statistics-store'
  const storeStatistics = useStoreStatistics()
    
</script>
