import { defineStore } from 'pinia'
import { ref, reactive, watch, computed } from "vue"
import type { ComputedRef, Ref } from 'vue'
import type { Meal, MealForm, FoodForm, Report } from 'src/models/business'
import { Food } from 'src/models/business'
import { uid, date, LocalStorage, Notify } from 'quasar'
import { MealReason, MealType } from 'src/models/business'
import type { UUID, DATE } from 'src/models/common'
import { useStoreApp } from 'src/stores/app-store'
import { useStoreDiary } from 'src/stores/diary-store'
import { useStoreProfile } from 'src/stores/profile-store'
import { useStoreMenu } from './menu-store'
import CalculationUtils from 'src/utils/calculation.utils'
import FoodCalculationUtils from 'src/utils/food.calculation.utils'
const { 
  calculatePortionCalories, 
  calculatePortionProtein,
  calculatePortionFiber 
} = FoodCalculationUtils

export const useStoreStatistics = defineStore('statistics', () => {
  
  /*
    state
  */

  const reports: Ref<Report[]> = ref([])
  watch(reports.value, () => saveReports()) 

  /*
    getters
  */
  
  const reportsSortedByDate = computed(() => {
    return reports.value
  })

    const averageMeals: ComputedRef<number> = computed(() => {
      const selectedMeals = useStoreDiary().mealsSinceStartDate
      if(!selectedMeals) return 0

      return Math.round(selectedMeals.length / numberOfDays.value) 
    })

    const averageMealCaloriesIntake: ComputedRef<number> = computed(() => {
      const selectedMeals = useStoreDiary().mealsSinceStartDate
      if(!selectedMeals) return 0
      const allCalories = selectedMeals
        .flatMap(meal => meal.foods)
        .reduce((sum, food) => sum + calculatePortionCalories(food)!, 0);

      return Math.round(allCalories / numberOfDays.value) 
    })

    const averageCleanMealCaloriesIntake = computed(() => {
      const selectedMeals = useStoreDiary().cleanMealsSinceStartDate
      if(!selectedMeals) return 0
      const allCalories = selectedMeals
        .flatMap(meal => meal.foods)
        .reduce((sum, food) => sum + calculatePortionCalories(food)!, 0);

      return Math.round(allCalories / numberOfDays.value) 
    })

    const averageCheatMealCaloriesIntake = computed(() => {
      const selectedMeals = useStoreDiary().cheatMealsSinceStartDate
      if(!selectedMeals) return 0
      const allCalories = selectedMeals
        .flatMap(meal => meal.foods)
        .reduce((sum, food) => sum + calculatePortionCalories(food)!, 0);
      
      return Math.round(allCalories / numberOfDays.value) 
    })

    const averageProteinIntake = computed(() => {
      const selectedMeals = useStoreDiary().mealsSinceStartDate
      if(!selectedMeals) return 0
      const allProtein = selectedMeals
        .flatMap(meal => meal.foods)
        .reduce((sum, food) => sum + calculatePortionProtein(food)!, 0);

      return Math.round(allProtein / numberOfDays.value) 
    })

    const averageFiberIntake = computed(() => {
      const selectedMeals = useStoreDiary().mealsSinceStartDate
      if(!selectedMeals) return 0
      const allFiber = selectedMeals
        .flatMap(meal => meal.foods)
        .reduce((sum, food) => sum + calculatePortionFiber(food)!, 0);
      
      return Math.round(allFiber / numberOfDays.value)
    })

    const numberOfDays = computed(() => {
      const lastDate: string = useStoreApp().selectedDateString
      const firstDate: string = useStoreProfile().profile.startDate
      return date.getDateDiff(lastDate, firstDate, 'days') + 1
    })

    const averageDiaryProductsRate = computed(() => {
      // TODO препроверить расчет более внимательно
      // TODO после перепроверки отображать в статистике
      const selectedMeals = useStoreDiary().mealsSinceStartDate
      if(!selectedMeals) return 0
      const allRate = selectedMeals
        .reduce((sum, meal) => sum + averageMealProductsRating(meal)!, 0);
      
      return Math.round(allRate / numberOfDays.value)
    })

    // Переписанная computed функция возвращает отсортированный массив объектов
    const foodByProduct = computed(() => {
      const countMap = new Map<string, number>()
      const NO_PRODUCT_ID_KEY = 'NO_PRODUCT_ID'
      
      // Инициализация счетчика для Food без productId
      countMap.set(NO_PRODUCT_ID_KEY, 0)
    
      // Подсчет всех Food
      useStoreDiary().meals.flatMap(meal => meal.foods).forEach(food => {
        const key = food.productId || NO_PRODUCT_ID_KEY
        countMap.set(key, (countMap.get(key) || 0) + 1)
      })
    
      // Преобразование в массив объектов и сортировка
      const result: Array<{ productId: string, productName: string, count: number, percent: number,}> = []
    
      countMap.forEach((count, productId) => {
        const productName = productId === NO_PRODUCT_ID_KEY 
          ? 'Прочее' 
          : useStoreMenu().getById(productId)?.name || 'Неизвестный продукт'

        const total = useStoreDiary().mealsSinceStartDate.flatMap(meal => meal.foods).length
        const percent = CalculationUtils.calcPercentInTotal(count, total)
        
        result.push({ 
          productId, 
          productName,
          count,
          percent,
        })
      })
    
      // Сортировка: убывание по count, NO_PRODUCT_ID всегда последним
      result.sort((a, b) => {
        if (a.productId === NO_PRODUCT_ID_KEY) return 1  // a в конец
        if (b.productId === NO_PRODUCT_ID_KEY) return -1 // b в конец
        return b.count - a.count  // убывание количества
      })
      
      return result
  })

  /*
    actions
  */

    const loadArchive = () => {
      loadReports()
    }

    const createReport = (comment: string | undefined) => {
      console.log('creating report with comment', comment)
      console.log('startDate', useStoreProfile().profile.startDate)
      console.log('endDate', useStoreApp().selectedDateString)
      const newReport: Report = { 
        id: uid(),
        startDate: useStoreProfile().profile.startDate,
        endDate: useStoreApp().selectedDateString,
        numberOfDays: numberOfDays.value,
        rate: averageDiaryProductsRate.value,
        averageCalories: averageMealCaloriesIntake.value, // среднее количество калорий в день за период
        averageCheatMealCalories: averageCheatMealCaloriesIntake.value, // среднее количество калорий полученных от clean в день за период
        averageCleanMealCalories: averageCleanMealCaloriesIntake.value, // среднее количество калорий полученных от cheat в день за период
        averageProtein: averageProteinIntake.value, // среднее количество белков в день за период
        averageFiber: averageFiberIntake.value, // среднее количество клечатки в день за период
        averageMeals: averageMeals.value, // среднее количество приемов пищи в день за период
        mealsRatio: 0, // отношение clean к cheat
        caloriesLimit: useStoreProfile().profile.caloriesLimit, // лимит калорий установленный для периода - текущее значение из профайла на момент создания отчета
        cheatMeals: useStoreDiary().cheatMealsSinceStartDate.length, // количество clean cheat за период
        cleanMeals: useStoreDiary().cleanMealsSinceStartDate.length, // количество clean за период
        comment: comment ?? "Без комментария",
        nurishment: foodByProduct.value,
        grade: 0,
      }
      reports.value.push(calculateGrade(newReport))
    }

    const clearArchive = () => {
      reports.value.length = 0
      Notify.create({
        message: 'Archive is now Clear',
        position: 'top'
      })
    }

  

  /*
    helpers
  */

    const mealsStorageKey = 'reports'

    const saveReports = () => {
      LocalStorage.set(mealsStorageKey, reports.value)
    }

    const loadReports = () => {
      const saved = LocalStorage.getItem(mealsStorageKey)
      if (saved) Object.assign(reports.value, saved)
    }

    const averageMealProductsRating = (meal: Meal): number => {
      const sum = meal.foods.reduce((acc, food) => acc + food.productRate, 0)
      const productsWithRatings = meal.foods.filter(food => food.productRate > 0)
      return Math.round(sum / productsWithRatings.length) 
    }

    const calculateGrade = (report: Report): Report => {
      report.grade = 2
      return report
    }

    

  
  /*
    return
  */

  return {
    
    // state
    reports,

    // getters
    reportsSortedByDate,
    // getters for statistic
    averageMealCaloriesIntake,
    averageCleanMealCaloriesIntake,
    averageCheatMealCaloriesIntake,
    averageProteinIntake,
    averageFiberIntake,
    foodByProduct, //TODO придумать лучше название для этого расчета

    // actions
    loadArchive,
    createReport,
    clearArchive,
  
  }

});
