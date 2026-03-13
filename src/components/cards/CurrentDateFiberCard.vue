<template>
  <q-card>
    <q-card-section class="q-pa-xs text-center">
      <q-circular-progress
        show-value
        font-size="12px"
        :value="percentage"
        size="50px"
        :thickness="0.22"
        color="fiber"
        track-color="grey-3"
        class="q-ma-sm"
      >
        <q-icon color="fiber" :name=Icons.FIBER size="lg"/>
      </q-circular-progress>
    </q-card-section>

    <q-card-section class="q-pa-xs text-center">
      <q-item clickable class="q-pa-none">
        <q-item-section>
          <q-item-label>{{ totalPerDate }} </q-item-label>
          <q-item-label caption><span 
            :class="amountLeft <= 0 ? 'text-warning' : 'text-positive'"
            class="col text-caption text-right"
          > 
            {{ amountLeft <= 0 ? 'left' : 'exc' }} {{ Math.abs(amountLeft) }}
          </span></q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">

    import { Icons } from "src/constants/icons"
    import { computed } from 'vue'

    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()

    import FoodCalculationUtils from 'src/utils/food.calculation.utils'
    const { calculatePortionFiber } = FoodCalculationUtils

    const totalPerDate = computed(() => {
      const dayMeals = storeDiary.mealsForCurentDate
      if(!dayMeals) return 0
      return dayMeals
        .flatMap(meal => meal.foods)
        .reduce((sum, food) => sum + calculatePortionFiber(food)!, 0);
    })

    const value = 82

    // Calories limit
    const percentage = computed(() => storeProfile.profile.fiberIntake ? (totalPerDate.value/storeProfile.profile.fiberIntake) * 100 : 0)
    const caloriesLimitHighlight = computed(() => {
      if (!storeProfile.profile.caloriesLimit) return 'positive'
      if (totalPerDate.value <= storeProfile.profile.fiberIntake) return 'positive'
      return 'negative'
    })
    const amountLeft = computed(() => storeProfile.profile.fiberIntake ? totalPerDate.value - storeProfile.profile.fiberIntake : 0)



</script>