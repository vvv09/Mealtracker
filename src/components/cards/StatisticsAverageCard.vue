<template>
  <q-card>
    <q-list separator>
      <q-item-label header class="text-subtitle1">Average Values</q-item-label>
      <AverageMealCalorieIntake/> 
      <AverageCleanMealCalorieIntake/> 
      <AverageCheatMealCaloriesIntake/>
      <q-item-label header class="text-center">Meals Ratio</q-item-label>
      <MealsRatio/>
      <q-item-label header class="text-subtitle1">Average Nutrients</q-item-label>
      <AverageProteinIntake/>
      <AverageFiberIntake/>
      
    </q-list>
  </q-card>
</template>

<script setup lang="ts">

  import AverageMealCalorieIntake from 'src/components/items/statistic-items/AverageMealCalorieIntake.vue'
  import AverageCleanMealCalorieIntake from 'src/components/items/statistic-items/AverageCleanMealCalorieIntake.vue'
  import AverageCheatMealCaloriesIntake from 'src/components/items/statistic-items/AverageCheatMealCaloriesIntake.vue'
  import MealsRatio from 'src/components/items/statistic-items/MealsRatio.vue'
  import AverageProteinIntake from 'src/components/items/statistic-items/AverageProteinIntake.vue'
  import AverageFiberIntake from 'src/components/items/statistic-items/AverageFiberIntake.vue'
  // import ErliestWeightMeasurement from 'src/components/items/statistic-items/ErliestWeightMeasurement.vue'
  // import LatestWeightMeasurement from 'src/components/items/statistic-items/LatestWeightMeasurement.vue'

</script>
