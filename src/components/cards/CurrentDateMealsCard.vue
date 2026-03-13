<template>
    <q-card>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="primary" :name=Icons.MEAL />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ storeDiary.mealsForCurentDate.length }}</q-item-label>
            <q-item-label caption>Meals</q-item-label>
          </q-item-section>

          <q-item-section avatar>
            <RateIndicator size="45px" :rate="calcAvgDateRating"/>
          </q-item-section>
        </q-item>
    </q-card>
</template>

<script setup lang="ts">

    import { Icons } from "src/constants/icons"
    import { computed } from 'vue'
    import RateIndicator from 'src/components/indicators/RateIndicator.vue'

    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()

    const calcAvgDateRating = computed(() => {
      const dayMeals = storeDiary.mealsForCurentDate
      if(!dayMeals) return 0
      let sum = 0
      let count = 0
  
      for (const meal of dayMeals) {
        for (const food of meal.foods) {
          if (food.productRate != null && food.productRate > 0) {
            sum += food.productRate
            count++
          }
        }
      }
  
      return count > 0 ? Math.round(sum / count) : 0  // ✅ Округление в конце
    })

</script>