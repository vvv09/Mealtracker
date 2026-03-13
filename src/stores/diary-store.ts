import { defineStore } from 'pinia'
import { ref, reactive, watch, computed } from "vue"
import type { Ref } from 'vue'
import { Masks } from 'src/constants/masks'
import type { Meal, MealForm, FoodForm } from 'src/models/business'
import { Food } from 'src/models/business'
import { uid, date, LocalStorage, Notify } from 'quasar'
import { MealReason, MealType } from 'src/models/business'
import type { UUID, DATE } from 'src/models/common'
import { useStoreApp } from 'src/stores/app-store'
import { useStoreProfile } from 'src/stores/profile-store'
import CalculationUtils from 'src/utils/calculation.utils'
import FoodCalculationUtils from 'src/utils/food.calculation.utils'
const { 
  calculatePortionCalories, 
  calculatePortionProtein,
  calculatePortionFiber 
} = FoodCalculationUtils

export const useStoreDiary = defineStore('diary', () => {
  
  /*
    state
  */

  const meals: Ref<Meal[]> = ref([])
  watch(meals.value, () => saveMeals()) 

  /*
    getters
  */
  
    const mealsForCurentDate = computed(() => {
      const cdm = meals.value
        .filter((meal) => meal.date == useStoreApp().selectedDateString)
      cdm.sort((a, b) => a.time <= b.time ? -1 : 1)
      return cdm
    })

    const currentDateHasMeals = computed(
      () => mealsForCurentDate.value && mealsForCurentDate.value.length
    )

    const cleanMealsForCurentDate = computed(() => 
      mealsForCurentDate.value.filter(m => m.type === MealType.CLEAN)
    )

    const caloriesRequirementForDay = computed(() => {
      const profileStore = useStoreProfile()
      const activity = profileStore.profile.activity
      if (activity === null) {
        console.error("Can not calculate BCR: no information about activity")
        return 0
      }
      const bmr = basicMetabolicRateForDay.value
      if (bmr === null) {
        console.error("Can not calculate DCR: no information about BMR")
        return 0
      }
      return CalculationUtils.calculateDailyCalorieRequirement({
        bmr, activity
      })  
    })

    const averageCalorieDeficitForDay = computed(() => {
      const dcr = caloriesRequirementForDay.value
      if (dcr === null) {
        console.error("Can not calculate ACD: no information about DCR")
        return 0
      }
      return CalculationUtils.calculateAverageCalorieDeficit({
        dcr
      }) 
    })

    const basicMetabolicRateForDay = computed(() => {
      const weight = 90 //latestWeightMeasurement.value?.weight
      if (weight === null) {
        console.error("Can not calculate BMR: no information about weight")
        return 0
      }
      const storeProfile = useStoreProfile()
      const height = storeProfile.profile.height
      if (height === null) {
        console.error("Can not calculate BMR: no information about height")
        return 0
      }
      const sex = storeProfile.profile.sex
      if (sex === null) {
        console.error("Can not calculate BMR: no information about sex")
        return 0
      }
      const age = storeProfile.age
      if (age === null) {
        console.error("Can not calculate BMR: no information about age")
        return 0
      }
      return CalculationUtils.calculateBasicMetabolicRate({
        weight, height, sex, age
      })
    })

    const mealsSinceStartDate = computed(() => {
      const lastDate: string = useStoreApp().selectedDateString
      const firstDate: string = useStoreProfile().profile.startDate
      return meals.value.filter(m => m.date >= firstDate &&  m.date <= lastDate)
    })

    const cleanMealsSinceStartDate = computed(
      () => mealsSinceStartDate.value.filter(m => m.type == MealType.CLEAN)
    )

    const cheatMealsSinceStartDate = computed(
      () => mealsSinceStartDate.value.filter(m => m.type == MealType.CHEAT)
    )    

  /*
    actions
  */

    const loadDiary = () => {
      loadMeals()
    }

    const addMeal = (mealForm: MealForm) => {
      console.log('addMeal', mealForm)
      const newMeal = Object.assign({}, mealForm, { 
        id: uid(),
        reason: mealForm.reason ?? MealReason.HUNGER,
        type: mealForm.type ?? MealType.CLEAN,
      })
      meals.value.push(newMeal)
      if (mealForm.type === MealType.CHEAT) useStoreProfile().decreaseCheatMealsLimitIfSet()
      Notify.create({
        //message: `Meal added to <span class="text-weight-bolder">${useAppStore().selectedDateString}</span>`,
        message: `Meal added`,
        position: 'top',
        html: true
      })
    }

    const updateMeal = (id: UUID, mealForm: MealForm) => {
      const index = meals.value.findIndex(m => m.id == id)
      const wasCheatMeal = meals.value[index].type === MealType.CHEAT
      const nowCheatMeal = mealForm.type === MealType.CHEAT
      if (wasCheatMeal && !nowCheatMeal) useStoreProfile().increaseCheatMealsLimitIfSet()
      else if (!wasCheatMeal && nowCheatMeal) useStoreProfile().decreaseCheatMealsLimitIfSet()
      Object.assign(meals.value[index], mealForm)
    }

    const deleteMeal = (id: UUID) => {
      const index = meals.value.findIndex(m => m.id == id)
      const isCheatMeal = meals.value[index].type === MealType.CHEAT
      meals.value.splice(index, 1)
      if (isCheatMeal) useStoreProfile().increaseCheatMealsLimitIfSet()
      Notify.create({
        message: 'Meal deleted',
        position: 'top'
      })
    }

    const addFoodToMeal = (mealId: UUID, foodForm: FoodForm) => {
      const food = Food.create(uid(), foodForm)
      const index = meals.value.findIndex(m => m.id == mealId)
      meals.value[index].foods.push(food)
      Notify.create({
        message: `Food added`,
        position: 'top',
        html: true
      })
    }

    const updateFoodInMeal = (id: UUID, updates: FoodForm) => {
      const allFoods = meals.value.flatMap(m => m.foods)
      const index = allFoods.findIndex(f => f.id == id)
      Object.assign(allFoods[index], updates)
    }

    const deleteFoodFromMeal = (id: UUID) => {
      const meal: Meal = findMealByFoodId(id)
      const index = meal.foods.findIndex(m => m.id == id)
      meal.foods.splice(index, 1)
      Notify.create({
        message: 'Food deleted',
        position: 'top'
      })
    }

    const dropDiary = () => {
      meals.value.length = 0
      //weightMeasurements.value.length = 0
      Notify.create({
        message: 'Diary is clear',
        position: 'top'
      })
    }

  

  /*
    helpers
  */

    const mealsStorageKey = 'meals'

    const saveMeals = () => {
      LocalStorage.set(mealsStorageKey, meals.value)
    }

    const loadMeals = () => {
      const saved = LocalStorage.getItem(mealsStorageKey)
      if (saved) Object.assign(meals.value, saved)
    }

    const findMealByFoodId = (foodId: UUID): Meal  => {
      return meals.value.flatMap(meal => 
        meal.foods.map(food => ({ meal, food }))
      ).find(({ food }) => food.id === foodId).meal
    }

  
  /*
    return
  */

  return {
    
    // state
    meals,

    // getters
    mealsForCurentDate,
    currentDateHasMeals,
    cleanMealsForCurentDate,
    caloriesRequirementForDay,
    averageCalorieDeficitForDay,
    basicMetabolicRateForDay,
    mealsSinceStartDate,
    cleanMealsSinceStartDate,
    cheatMealsSinceStartDate,

    // actions
    loadDiary,
    addMeal,
    updateMeal,
    deleteMeal,
    addFoodToMeal,
    updateFoodInMeal,
    deleteFoodFromMeal,
    dropDiary,
  
  }

});
