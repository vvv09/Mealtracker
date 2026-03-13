<template>
  <q-slide-item
    @left="initDeletion"
    @click="openDialog"
    left-color="negative"
  >
    <template v-slot:left>
      <q-icon :name=Icons.DELETE />
    </template>

    <q-item>
      <FoodRatingItemAvatar :value="food.productRate ?? 0"/>

      <q-item-section>
          <q-item-label class="text-weight-bold">{{ food.name }}</q-item-label>
          <q-item-label>
            <CaloriesIndicator :value=calculatePortionCalories(food).toString() class="q-pl-none"/>
            <ProteinIndicator :value=calculatePortionProtein(food).toString() />
            <FiberIndicator :value=calculatePortionFiber(food).toString() />
          </q-item-label>
      </q-item-section>
    </q-item>

  </q-slide-item>


  <q-dialog v-model="dialog">
    <q-card style="min-width: 350px">
      <q-toolbar>
        <q-toolbar-title><span class="text-weight-bold">Edit Food</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-form
        @submit="submit"
        class="q-gutter-md"
      >
        <q-card-section>
              <q-input
                v-model="form.name"
                label="Name"
                autogrow
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.FOOD" />
                </template>
              </q-input>

               <q-input
                v-model="form.portion"
                label="Portion (g)"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.PORTION" />
                </template>
              </q-input>

              <PageSeparator label="Food Info" class="text-grey" />
  
              <q-input
                v-model="form.productCalories"
                label="Calories"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.CALORIES" />
                </template>
              </q-input>
  
              <q-input
                v-model="form.productProtein"
                label="Protein"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.PROTEIN" />
                </template>
              </q-input>

              <q-input
                v-model="form.productFiber"
                label="Fiber"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.FIBER" />
                </template>
              </q-input>

              <q-field label="Rating" stack-label>
                <template v-slot:prepend>
                  <q-icon :name="Icons.RATING" />
                </template>
                <template v-slot:control>
                  <q-rating
                    v-model="form.productRate"
                    :max="5"
                    size="1.5em"
                    color="grey"
                    :icon="icons"
                    :color-selected="colors"
                  />
                </template>
              </q-field>

              
    
            </q-card-section>
  
        <q-card-actions align="between" class="text-primary">
          <q-btn flat no-caps :icon="Icons.DELETE" color="negative" @click="initDeletion({})" />
          <q-btn flat no-caps label="Save Changes" type="submit" v-close-popup/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang=ts>

  /*
    Imports
  */
  
    import { Icons } from "src/constants/icons"
    import { ref, reactive, computed, PropType } from "vue"
    import { FoodForm } from "src/models/business"
    import { Food, type Food as FoodType } from 'src/models/business'
    // import { Dialog } from '@capacitor/dialog'
    import { Masks } from 'src/constants/masks'
    import { date } from "quasar"

    import CaloriesIndicator from 'src/components/indicators/CaloriesIndicator.vue'
    import ProteinIndicator from 'src/components/indicators/ProteinIndicator.vue'
    import FiberIndicator from 'src/components/indicators/FiberIndicator.vue'
    import FoodRatingItemAvatar  from 'src/components/other/FoodRatingItemAvatar.vue'
    import PageSeparator from 'src/components/other/PageSeparator.vue'

 
 /*
    Stores
 */

    // import { useDiaryStore } from 'src/stores/diary'
    // const diaryStore = useDiaryStore()

    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()

    import { useStoreApp } from 'src/stores/app-store'
    const appStore = useStoreApp()

    import { useStoreSettings } from 'src/stores/settings-store'
    const storeSettings = useStoreSettings()

  /*
    props
  */
  
    const props = defineProps({
      food: { type: Object as PropType<Food> }
    }) 

    const foodInstance = computed(() => {
      return Food.create(props.food.id, props.food as FoodForm);
    });

    import FoodCalculationUtils from 'src/utils/food.calculation.utils'
    const { 
      calculatePortionCalories, 
      calculatePortionProtein,
      calculatePortionFiber 
    } = FoodCalculationUtils


  /*
    quasar
  */

    import { useQuasar } from "quasar"
    const $q = useQuasar()  

  /*
      Business Logic
  */
 
    // update food

    const dialog = ref(false)

    const formDefault: FoodForm = {
      name: '',
      productId: null,
      productCalories: null,
      productProtein: null,
      productFiber: null,
      productPack: null,
      productRate: null,
      portion: null,
    }

    const openDialog = () => {
      form.name = props.food.name
      form.productId = props.food.productId
      form.productCalories = props.food.productCalories
      form.productProtein = props.food.productProtein
      form.productFiber = props.food.productFiber
      form.productPack = props.food.productPack
      form.productRate = props.food.productRate
      form.portion = props.food.portion
      dialog.value = true
    }

    const form = reactive({
      ...formDefault
    })

    const resetForm = () => {
      Object.assign(form, formDefault)
    }

    const submit = () => {
      storeDiary.updateFoodInMeal(props.food.id, form as FoodForm)
      resetForm()
    }

    // delete food

    type DeleteParams = {
      reset?: () => void  // | undefined
    } 

    const initDeletion = ({ reset }: DeleteParams) => {
      if (storeSettings.settings.promptToDelete) promptToDelete(reset)
      else storeDiary.deleteFoodFromMeal(props.food.id)
    }

    const promptToDelete = async (reset) => {

      const details = `${ props.food.name } : `,
            title = 'Delete Food from Meal',
            messageStart = 'Delete this Food?',
            message = $q.platform.is.capacitor
                      ? `${ messageStart }\n\n${ details }`
                      : `
                        ${ messageStart }
                        <div class="q-mt-md text-weight-bold">
                          ${ details }
                        </div>
                      `,
            okButtonTitle = 'Delete'

      //TODO uncomment when capacitor - почему в src-capacitor теперь свои node модули? В Moneybals не так

      // if ($q.platform.is.capacitor) {
      //   const { value } = await Dialog.confirm({
      //     title,
      //     message,
      //     okButtonTitle
      //   })
      //   if (value) storeDiary.deleteFoodFromMeal(props.food.id)
      //   else reset()
      // }
      // else {
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
          storeDiary.deleteFoodFromMeal(props.food.id)
        }).onCancel(() => {
          reset()
        })
      //}
    }

   const icons =  [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_neutral',
        'sentiment_satisfied',
        'sentiment_very_satisfied',
    ];
    const colors = [
        'red', 
        'deep-orange', 
        'orange', 
        'light-green', 
        'green',
    ]
    

</script>