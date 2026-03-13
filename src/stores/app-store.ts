import { defineStore } from 'pinia'
import { ref, reactive, watch, computed } from "vue"
import { LocalStorage } from 'quasar'
import { Icons } from 'src/constants/icons'
import type { Ref } from 'vue'
import { date } from 'quasar'
import { Masks } from 'src/constants/masks'
import { useStoreProfile } from 'src/stores/profile-store'

interface NavItemProps {
  to: string,
  icon: string,
  label: string,
}


export const useStoreApp = defineStore('app', () => {
  
  /*
    state
  */

  // here is all that should be stored wetween reloads
  const appstate = reactive({
    drawerOpen: false,
    selectedDate: new Date(), //надо ли сторить?
    searchProductString: '',//надо ли сторить?
    diaryActiveTab: 'diary', // 'diary' | 'statistics'
  })

  // watch appstate
  watch(appstate, () => {
    saveAppstate()
  })

  const routes: Ref<NavItemProps[]>= ref([
    {
      to: '/diary',
      icon: Icons.DIARY,
      label: 'diary',
    },
    {
      to: '/archive',
      icon: Icons.ARCHIVE,
      label: 'archive',
    },
    {
      to: '/products',
      icon: Icons.PRODUCTS,
      label: 'products',
    },
    {
      to: '/profile',
      icon: Icons.PROFILE,
      label: 'profile',
    },
    {
      to: '/settings',
      icon: Icons.SETTINGS,
      label: 'settings',
    },
    {
      to: '/about',
      icon: Icons.ABOUT,
      label: 'about',
    },
  ])

  /*
    getters
  */
  
    const selectedDateString = computed(() => {
      return date.formatDate(appstate.selectedDate, Masks.DATE)
    })

    const selectedDateDayNumber = computed(() => {
      return date.getDateDiff(appstate.selectedDate, getStartDate(), 'days') + 1
    })

    const isSelectedDateStartDate = computed(() => {
      return date.isSameDate(appstate.selectedDate, getStartDate(), 'date')
    })

    const isSelectedDateTodayDate = computed(() => {
      return date.isSameDate(appstate.selectedDate, getTodayDate(), 'date')
    })


  /*
    actions
  */

  const loadAppstate = () => {
    const savedAppstate = LocalStorage.getItem('appstate')
    if (savedAppstate) Object.assign(appstate, savedAppstate)
  }

  const toPrevDate = () => {
    if (isSelectedDateStartDate.value) return
    const prevDate = date.subtractFromDate(appstate.selectedDate, { days: 1 })
    appstate.selectedDate = prevDate
  }
      
  const toNextDate = () => {
    if (isSelectedDateTodayDate.value) return
    const nextDate = date.addToDate(appstate.selectedDate, { days: 1 })
    appstate.selectedDate = nextDate
  }

  /*
    helpers
  */

  const saveAppstate = () => {
    LocalStorage.set('appstate', appstate)
  }

  const getStartDate = () => {
    const storeProfile = useStoreProfile()
    return date.extractDate(storeProfile.profile.startDate, Masks.DATE)
  }

  const getTodayDate = () => {
    const todayDate = date.formatDate(new Date(), Masks.DATE)
    return date.extractDate(todayDate, Masks.DATE)
  }

  /*
    return
  */

  return {
    routes,
    
    // state
    appstate,

    // getters
    selectedDateString,
    selectedDateDayNumber,
    isSelectedDateStartDate,
    isSelectedDateTodayDate,

    // actions
    toPrevDate,
    toNextDate,
    loadAppstate,
  }

});
