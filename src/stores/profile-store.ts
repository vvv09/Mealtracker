import { defineStore } from 'pinia'
import { reactive, watch, computed } from 'vue'
import { LocalStorage } from 'quasar'
import { Masks } from 'src/constants/masks'
import { date } from 'quasar'

export const useStoreProfile = defineStore('profile', () => {

  /*
    state
  */
  
    const profile = reactive({
      birthdate: null,
      sex: null,
      height: null,
      activity: null,
      //additional
      startDate: date.formatDate(new Date(), Masks.DATE),
      targetWeight: null,
      caloriesLimit: null,
      proteinIntake: null,
      fiberIntake: null,
      cheatMealsLimit: null,
    })

    watch(profile, () => saveProfile())

  /*
    getters
  */
  
    const age = computed(() => {
      if (!profile.birthdate) return null
      const userBirthdate = date.extractDate(profile.birthdate, Masks.DATE)
      return date.getDateDiff(new Date(), userBirthdate,  'years') - 1
    })

    const notEnoughDataForCaloriesCalculation = computed(() => {
      return !(profile.birthdate && profile.sex && profile.height && profile.activity)
    })



  /*
    actions
  */

    const loadProfile = () => {
      const saved = LocalStorage.getItem('profile')
      if (saved) Object.assign(profile, saved)
    }

    const decreaseCheatMealsLimitIfSet = () => {
      if (profile.cheatMealsLimit !== null && profile.cheatMealsLimit > 0) {
        profile.cheatMealsLimit = profile.cheatMealsLimit - 1
      }
    }

    const increaseCheatMealsLimitIfSet = () => {
      if (profile.cheatMealsLimit !== null) {
        profile.cheatMealsLimit = profile.cheatMealsLimit + 1
      }
    }

  /*
    helpers
  */

    const saveProfile = () => {
      LocalStorage.set('profile', profile)
    }


  /*
    return
  */
  
    return { 

      // state
      profile,

      // getters
      age,
      notEnoughDataForCaloriesCalculation,

      // actions
      loadProfile,
      decreaseCheatMealsLimitIfSet,
      increaseCheatMealsLimitIfSet,

    }
    
})