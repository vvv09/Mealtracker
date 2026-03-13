<template>
  <q-card class="day-card">
    <q-card-section class="row q-px-sm q-pb-none">
      <CurrentDateMealsCard class="col-12" />
    </q-card-section >
    <q-card-section class="row q-pa-sm q-col-gutter-x-xs">
      <div class="col-4"><CurrentDateCaloriesCard/></div>
      <div class="col-4"><CurrentDateProteinCard/></div>
      <div class="col-4"><CurrentDateFiberCard/></div>
    </q-card-section >
  </q-card>
</template>

<script setup lang="ts">

  import CurrentDateMealsCard from 'src/components/cards/CurrentDateMealsCard.vue'
  import CurrentDateCaloriesCard from 'src/components/cards/CurrentDateCaloriesCard.vue'
  import CurrentDateProteinCard from 'src/components/cards/CurrentDateProteinCard.vue'
  import CurrentDateFiberCard from 'src/components/cards/CurrentDateFiberCard.vue'

</script>
