<template>
  <div v-if="storeDiary.mealsSinceStartDate.length">
  <div class="row q-px-sm items-center">
    <div class="col-1 text-center">
      <q-icon :name="Icons.CLEANMEAL" color="positive" size="xs"/>
    </div>
    <div class="col-10">
      <q-linear-progress  
        rounded 
        size="40px" 
        :value 
        color="positive" 
        track-color="warning"
        class="meal-rate q-mt-sm" 
      >
        <div class="absolute-full flex flex-center">
          <q-badge color="white text-h6 q-py-none" :text-color="`${rateColor}`" :label="`${value * 100}%`" />
        </div>
      </q-linear-progress>
    </div>
    <div class="col-1 text-center">
      <q-icon :name="Icons.CHEATMEAL" color="warning" size="xs"/>
    </div>
  </div>

  <div class="row q-px-xs justify-center">
    <div class="col-5">
       <div class="text-caption text-positive q-px-sm">
        {{ storeDiary.cleanMealsSinceStartDate.length }}
      </div>
    </div>
    <div class="col-5">
       <div class="text-caption text-warning text-right q-px-sm">
        {{ storeDiary.cheatMealsSinceStartDate.length }}
      </div>
    </div>
  </div>
  </div>
  <div v-else class="text-center">
  no data
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  import { Icons } from 'src/constants/icons'

  const rateColor=ref('positive')

  const value = computed(() => {
    const totalMeals = storeDiary.mealsSinceStartDate.length
    if (totalMeals === 0) return 1.00
    const cleanMeals = storeDiary.cleanMealsSinceStartDate.length
    return +(cleanMeals / totalMeals).toFixed(2) // sign + converts to number
  })

  /*  
    Stores
  */

  import { useStoreDiary } from 'src/stores/diary-store'
  const storeDiary = useStoreDiary()

  import { useStoreStatistics } from 'src/stores/statistics-store'
  const storeStatistics = useStoreStatistics()
    
</script>

<style lang="scss">
  .meal-rate {
    .q-linear-progress__track {
      opacity: 1;
    }
  }
</style>
