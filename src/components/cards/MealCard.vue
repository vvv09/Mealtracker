<template>
    <q-card class="meal-card">
      <q-card-section class="q-pa-sm">
        <div class="row items-center no-wrap">
          <div class="col">
            <q-badge 
              rounded 
              :color="mealTimeBadgeColor" 
              :label="meal.time" 
              style="font-size: 16px;" 
              class="q-pa-sm"
            />
          </div>

          <div class="col-auto q-gutter-x-sm">
            <MealReasonIndicator :reason="meal.reason"/>
            <MealTypeIndicator :type="meal.type"/>
            <q-btn color="grey" round flat :icon='Icons.OPTIONS'>
              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="updateDialog = true">
                    <q-item-section avatar>
                      <q-icon :name=Icons.EDIT />
                    </q-item-section>
                    <q-item-section>Edit Meal</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup @click="promptToDelete">
                    <q-item-section avatar>
                      <q-icon :name=Icons.DELETE color="negative"/>
                    </q-item-section>
                    <q-item-section class="text-negative">Delete Meal</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section v-if="meal.comment" class="text-italic text-grey">
        {{ meal.comment }}
      </q-card-section>
      <q-separator v-if="meal.comment"/>


      <q-list v-if="meal.foods" separator>
        <FoodItem v-for="food in meal.foods" :key="food.id" :food />
      </q-list>
      <q-separator v-if="meal.foods"/>


      <q-card-section class="row items-center justify-evenly">
        <AddFoodBtn :meal-id="meal.id"/>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-sm">
        <div class="row items-center no-wrap">
          <div class="col">
            <RateIndicator :rate="calcAvgRating"/>
          </div>

          <div class="col-auto">
            <CaloriesIndicator :value="calcTotalMealCalories.toString()"/>
            <ProteinIndicator :value="calcTotalMealProtein.toString()"/>
            <FiberIndicator :value="calcTotalMealFiber.toString()"/>
          </div>
        </div>
        
      </q-card-section>
      <UpdateMealDialog :meal v-model="updateDialog"/>
    </q-card>
</template>

<script setup lang="ts">

    import { ref, PropType } from 'vue'
    import { Meal, MealForm } from 'src/models/business'

    const props = defineProps({
      meal: { type: Object as PropType<Meal> }
    }) 

    // Components
    import MealReasonIndicator from '../indicators/MealReasonIndicator.vue'
    import MealTypeIndicator from '../indicators/MealTypeIndicator.vue'
    import RateIndicator from 'src/components/indicators/RateIndicator.vue'
    import CaloriesIndicator from 'src/components/indicators/CaloriesIndicator.vue'
    import ProteinIndicator from 'src/components/indicators/ProteinIndicator.vue'
    import FiberIndicator from 'src/components/indicators/FiberIndicator.vue'
    import AddFoodBtn from 'src/components/buttons/AddFoodBtn.vue'
    import FoodItem from 'src/components/items/FoodItem.vue'

    import { Icons } from "src/constants/icons"
    import { computed } from 'vue'

    import { useQuasar } from "quasar"
    const $q = useQuasar()  
    
    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()


    const mealTimeBadgeColor = computed(() => {
        return 'positive'
        // if clean and hunger - positive
        // if cheat and hunger - warning 
        // if clean and no appetite - negative
        // if cheat and no appetite - negative
    })

    const calcAvgRating = computed(() => {
      if (props.meal.foods) {
        const sum = props.meal.foods.reduce((acc, food) => acc + food.productRate, 0)
        const productsWithRatings = props.meal.foods.filter(food => food.productRate > 0)
        return Math.round(sum / productsWithRatings.length) 
      } else {
        return 0
      }
    })

    import UpdateMealDialog from 'src/components/dialogs/UpdateMealDialog.vue'

    import FoodCalculationUtils from 'src/utils/food.calculation.utils'
    const { 
      calculatePortionCalories, 
      calculatePortionProtein,
      calculatePortionFiber 
    } = FoodCalculationUtils


    const calcTotalMealCalories = computed(() => {
      if (props.meal.foods) {
        return props.meal.foods.reduce((acc, food) => acc + calculatePortionCalories(food), 0)
      } else {
        return 0
      }
    })

    const calcTotalMealProtein = computed(() => {
      if (props.meal.foods) {
        return props.meal.foods.reduce((acc, food) => acc + calculatePortionProtein(food), 0)
      } else {
        return 0
      }
    })

    const calcTotalMealFiber = computed(() => {
      if (props.meal.foods) {
        return props.meal.foods.reduce((acc, food) => acc + calculatePortionFiber(food), 0)
      } else {
        return 0
      }
    })

    // update meal

    const updateDialog = ref(false)


    // delete meal

    const promptToDelete = async () => {
      const entryDetails = `${ props.meal.time }`,
            title = 'Delete Food',
            messageStart = 'Delete this Food?',
            message = $q.platform.is.capacitor
                      ? `${ messageStart }\n\n${ entryDetails }`
                      : `
                        ${ messageStart }
                        <div class="q-mt-md text-weight-bold">
                          ${ entryDetails }
                        </div>
                      `,
            okButtonTitle = 'Delete'

      $q.dialog({
        title,
        message,
        cancel: true,
        persistent: true,
        html: true,
        ok: {
          label: okButtonTitle,
          color: 'negative',
          noCaps: true
        },
        cancel: {
          color: 'primary',
          noCaps: true
        }
      }).onOk(() => {
        storeDiary.deleteMeal(props.meal.id)
      }).onCancel(() => {})
    }
    


</script>
