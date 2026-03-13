<template>
  <div class="row items-center no-wrap q-py-sm">
    <div class="col-2 text-center">
      <q-btn 
        v-if="!storeApp.isSelectedDateStartDate"
        @click="decrementDate"
        color="grey-7" 
        round 
        flat 
        icon="arrow_back_ios"
        size="sm"
      />
    </div>
    
    <div class="col-8 text-center">
      <div>
        <div class="text-caption">{{ storeApp.selectedDateString }}</div>
        <div class="text-h6">day {{ storeApp.selectedDateDayNumber }}</div>
        <div class="text-caption" :class="caption.class">{{ caption.title }}</div>
      </div>
      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
        <q-date 
            v-model="selectedDateString"
            :mask="Masks.DATE"
            :options="dateIsSelectable"
            minimal
        >
            <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Today" color="primary" flat v-close-popup @click='setDateStringToday'/>
                <q-btn label="Close" color="primary" flat v-close-popup />
            </div>
        </q-date>
      </q-popup-proxy>
    </div>
   

    <div class="col-2 text-center">
      <q-btn 
        v-if="!storeApp.isSelectedDateTodayDate"
        @click="incrementDate"
        color="grey-7" 
        round 
        flat 
        icon="arrow_forward_ios"
        size="sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

  /*
    Imports
  */

    import { ref, computed, watch } from 'vue'
    import { date } from "quasar"
    import { Masks } from 'src/constants/masks'

  /*  
    Stores
  */

    import { useStoreApp } from 'src/stores/app-store'
    const storeApp = useStoreApp()

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()


    
  /*
    Business Logic
  */
   
    const caption = computed(() => {
      if (storeApp.isSelectedDateTodayDate) return {title: 'Today', class: 'text-positive'}
      return {title: 'History', class: 'text-grey-5'}
    })

    // to disable dates in calendar before start date and after today
    const dateIsSelectable = (currentDate: string) => {
      const dateTarget = date.extractDate(currentDate, 'YYYY/MM/DD')
      const dateFrom = date.extractDate(storeProfile.profile.startDate, Masks.DATE)
      const dateTo = new Date()
      return date.isBetweenDates(dateTarget, dateFrom, dateTo, { onlyDate: true, inclusiveFrom: true, inclusiveTo: true })  
    }

    const setDateStringToday = () => {
      selectedDateString.value = date.formatDate(new Date(), Masks.DATE)
    }

    //Workaround: needed because q-date doesn't work with Date() type
    const selectedDateString = ref(
      date.formatDate(storeApp.appstate.selectedDate, Masks.DATE)
    )

    watch(selectedDateString, (newValue) => {
      const newDate = date.extractDate(newValue, Masks.DATE)
      storeApp.appstate.selectedDate = newDate
    })

    const incrementDate = () => {
      storeApp.toNextDate()
      selectedDateString.value = date.formatDate(storeApp.appstate.selectedDate, Masks.DATE)
    }

    const decrementDate = () => {
      storeApp.toPrevDate()
      selectedDateString.value = date.formatDate(storeApp.appstate.selectedDate, Masks.DATE)
    }
    //Workaround

</script>
