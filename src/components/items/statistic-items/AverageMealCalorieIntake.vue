<template>
    <div class="text-center">
      <div class="text-primary text-h2">{{ storeStatistics.averageMealCaloriesIntake }}</div>
      <div class="text-caption">Average Day Intake</div>
      <q-separator spaced inset/>
    </div>
</template>

<script setup lang="ts">

  import { useStoreStatistics } from 'src/stores/statistics-store'
  const storeStatistics = useStoreStatistics()
    
</script>
