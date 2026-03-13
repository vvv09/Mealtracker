<template>
  <q-page class="q-pa-md q-gutter-y-md start-with-primary-bg">
    <DaySelectorCard/>

    <q-tab-panels 
      v-model="storeApp.appstate.diaryActiveTab" 
      animated
      class="bg-transparent "
    >
      <q-tab-panel name="diary" class="q-gutter-y-md q-pa-none">
        <DayCard/>
        <MealCard 
          v-for="meal in storeDiary.mealsForCurentDate" 
          :key="meal.id" 
          :meal
        />
        <div class="q-pa-md text-center">
          <AddMealBtn/>
        </div>
      </q-tab-panel>

      <q-tab-panel name="statistics" class="q-gutter-y-md q-pa-none">
        <StatisticsAverageCard/>
        <StatisticsNurishmentCard/>
        <div class="q-pa-md text-center">
          <CreateReportBtn/>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">

  // Components
  import DaySelectorCard from "src/components/cards/DaySelectorCard.vue";
  import DayCard from 'src/components/cards/DayCard.vue'
  import MealCard from 'src/components/cards/MealCard.vue'
  import AddMealBtn from 'src/components/buttons/AddMealBtn.vue'
  import CreateReportBtn from "src/components/buttons/CreateReportBtn.vue";
  import StatisticsAverageCard from "src/components/cards/StatisticsAverageCard.vue";
  import StatisticsNurishmentCard from "src/components/cards/StatisticsNurishmentCard.vue";

  import { useStoreDiary } from 'src/stores/diary-store'
  const storeDiary = useStoreDiary()

  import { useStoreApp } from 'src/stores/app-store'
  const storeApp = useStoreApp()  


</script>
