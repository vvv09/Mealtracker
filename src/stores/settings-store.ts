import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark, LocalStorage } from 'quasar'
import { useI18n } from 'vue-i18n'
import { setCssVar } from 'quasar'


export const useStoreSettings = defineStore('settings', () => {

  /*
    state
  */

    const { locale } = useI18n({ useScope: 'global' })

  
    const settings = reactive({
      showMobileFooter: false,
      offWhiteBackground: false,
      drawerType: 'default', // material
      darkMode: false, // false | true | 'auto'
      language: 'en-US',
      primaryCоlor: '#1976D2',
      secondaryColor: '#26A69A',
      accentColor: '#9C27B0',
      promptToDelete: true,
      useCaloriesFormula: true,
    })

    // watch darkMode
    watch(() => settings.darkMode, value => {
      Dark.set(value)
    }, { immediate: true })

    // watch language
    watch(() => settings.language, value => {
      locale.value = value
    }, { immediate: true })

    // watch primaryCоlor
    watch(() => settings.primaryCоlor, value => {
      setCssVar('primary', value, document.documentElement)
    }, { immediate: true })

    // watch secondaryColor
    watch(() => settings.secondaryColor, value => {
      setCssVar('secondary', value, document.documentElement)
    }, { immediate: true })

    // watch accentColor
    watch(() => settings.accentColor, value => {
      setCssVar('accent', value, document.documentElement)
    }, { immediate: true })

    // watch settings
    watch(settings, () => {
      saveSettings()
    })
  


  /*
    actions
  */

    const loadSettings = () => {
      const savedSettings = LocalStorage.getItem('settings')
      if (savedSettings) Object.assign(settings, savedSettings)
    }

    const dropColors = () => {
      settings.primaryCоlor = '#1976D2'
      settings.secondaryColor = '#26A69A'
      settings.accentColor = '#9C27B0'
    }

  /*
    helpers
  */

    const saveSettings = () => {
      LocalStorage.set('settings', settings)
    }

  /*
    return
  */
  
    return { 

      // state
      settings,

      // getters

      // actions
      loadSettings,
      dropColors,

    }
    
})