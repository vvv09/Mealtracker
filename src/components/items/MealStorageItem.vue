<template>
  <q-slide-item
    @right="promptToDelete"
    right-color="negative"
  >
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item>     
      <q-item-section side top>
        <q-item-label overline>{{ meal.date }}</q-item-label>
        <q-item-label caption>{{ meal.time }}</q-item-label>
        <q-badge 
          v-if="isOutsideDiaryRange"
          class="q-mt-sm"
          rounded 
          color="negative" 
        />
      </q-item-section>      
      <q-item-section>
        <q-item-label class="text-weight-medium">{{ meal.title }}</q-item-label>
        <q-item-section caption>
          id: {{ meal.id }}
        </q-item-section> 
      </q-item-section>
    </q-item>
    <q-list dense >
      <q-item v-for="food in meal.foods" :key="food.id">
        <q-item-section side>
          {{ food.name }}
        </q-item-section>
        <q-item-section>
          {{ food.productCalories * food.portion / 100 }} kKal
        </q-item-section>
      </q-item>
    </q-list>

  </q-slide-item>
</template>

<script setup lang="ts">

  /*
    imports
  */
    import { computed } from 'vue'
    import { useQuasar } from 'quasar'
    import { date } from 'quasar'
    import { Masks } from 'src/constants/masks'

  /*  
    Stores
  */

    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()

    import { useStoreApp } from 'src/stores/app-store'
    const storeApp = useStoreApp()

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()


  /*
    props
  */
  
    const props = defineProps({
      meal: {
        type: Object,
        required: true
      }
    })  


  /*
    quasar
  */
  
    const $q = useQuasar()

  /*
    Business Logic
  */

  // check status
  const isOutsideDiaryRange = computed(() => {
    const lastDate: string = date.formatDate(storeApp.appstate.selectedDate, Masks.DATE)
    const firstDate: string = storeProfile.profile.startDate
    const mealDate = props.meal.date
    return mealDate < firstDate || mealDate > lastDate
  })

  // delete entry
  const promptToDelete = async ({ reset }) => {

    const entryDetails = `
          date: ${ props.meal.date } |
          time: ${ props.meal.time } |
          calories: ${ props.meal.calories } |
          protein: ${ props.meal.protein } |
          hunger: ${ props.meal.hunger } |
          id: ${ props.meal.id } |
          is outside diary range: ${ isOutsideDiaryRange.value }
          `,
          title = 'Delete Meal?',
          messageStart = props.meal.title,
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
    }).onCancel(() => {
      reset()
    })
  }

</script>