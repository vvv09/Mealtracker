<template>
  <q-item clickable v-ripple>

    <q-item-section avatar>
      <q-avatar color="warning" text-color="white" :icon=Icons.CHEATMEAL />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">Average Cheat Meal's Calories</q-item-label>
      <q-item-label caption lines="2">
        The number of calories from all cheat meals divided by the number of days passed
      </q-item-label>
    </q-item-section>

    <q-item-section side top class="text-secondary text-h6">
      {{ storeStatistics.averageCheatMealCaloriesIntake }}
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

  import { Icons } from 'src/constants/icons'

  import { useStoreStatistics } from 'src/stores/statistics-store'
  const storeStatistics = useStoreStatistics()  
    
</script>
