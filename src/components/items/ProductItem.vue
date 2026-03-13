<template>
  <q-slide-item
    @left="onSlideLeft"
    @click="openUpdateDialog"
    left-color="secondary"
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>

   
    <q-item>
      <FoodRatingItemAvatar :value="product.rate "/>

      <q-item-section>
          <q-item-label v-html=productNameWithSearchStringHighlited class="text-weight-bold"></q-item-label>
          <q-item-label>
            <CaloriesIndicator :value=product.calories?.toString() class="q-pl-none"/>
            <ProteinIndicator :value=product.protein?.toString() />
            <FiberIndicator :value=product.fiber?.toString() />
          </q-item-label>
      </q-item-section>
    </q-item>

  </q-slide-item>


  <q-dialog v-model="updateProductDialog">
    <q-card style="min-width: 350px">
      <q-form
        @submit="submitUpdate"
        class="q-gutter-md"
      >
        <q-card-section>
              <q-input
                v-model="updatForm.name"
                label="Name"
                autogrow
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.FOOD" />
                </template>
              </q-input>
  
              <q-input
                v-model="updatForm.calories"
                label="Calories"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.CALORIES" />
                </template>
              </q-input>
  
              <q-input
                v-model="updatForm.protein"
                label="Protein"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.PROTEIN" />
                </template>
              </q-input>

              <q-input
                v-model="updatForm.fiber"
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
                    v-model="updatForm.rate"
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
          <q-btn flat no-caps :icon="Icons.DELETE" color="negative" @click=showDeleteConfirmationDialog />
          <q-btn flat no-caps label="Ok" type="submit" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

  <q-dialog v-model="deleteConfirmationDialog">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar :icon=Icons.DELETE color="negative" text-color="white" />
        <span class="q-ml-sm">Really delete: <span class="text-weight-bold">{{ product.name }}</span> </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat no-caps label="Yes, delete it" color="negative" v-close-popup @click="storeMenu.deleteProduct(product.id)"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="createFoodDialog">
    <q-card style="min-width: 350px">
      <q-toolbar>
        <q-toolbar-title><span class="text-weight-bold">Create Food</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-form
        @submit="createFood"
        class="q-gutter-md"
      >
        <q-card-section>
          
          <q-input
            v-model="portion"
            label="Portion (g)"
            type="number"
          >
            <template v-slot:prepend>
              <q-icon :name="Icons.PORTION" />
            </template>
          </q-input>
        </q-card-section>
  
        <q-card-actions align="right" class="text-primary">
          <q-btn flat no-caps label="Add to Meal" type="submit" v-close-popup/>
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
    import { ProductForm, FoodForm } from "src/models/business"
    import type { Product } from 'src/models/business'
    import { UUID } from 'src/models/common'
    import { Masks } from 'src/constants/masks'
    import { date } from "quasar"

    import CaloriesIndicator from 'src/components/indicators/CaloriesIndicator.vue'
    import ProteinIndicator from 'src/components/indicators/ProteinIndicator.vue'
    import FiberIndicator from 'src/components/indicators/FiberIndicator.vue'
    import FoodRatingItemAvatar  from 'src/components/other/FoodRatingItemAvatar.vue'
 
 /*
    Stores
 */

    // import { useDiaryStore } from 'src/stores/diary'
    // const diaryStore = useDiaryStore()

    import { useStoreMenu } from 'src/stores/menu-store'
    const storeMenu = useStoreMenu()

    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()

    import { useStoreApp } from 'src/stores/app-store'
    const appStore = useStoreApp()

  /*
    props
  */
  
    const props = defineProps({
      product: { type: Object as PropType<Product> },
      mealId: { type: String as PropType<UUID> },
    }) 

  /*
    quasar
  */

    import { useQuasar } from "quasar"
    const $q = useQuasar()  

  /*
      Business Logic
  */

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

    // highlight search string in food name
    const productNameWithSearchStringHighlited = computed(() => {
      if (!appStore.appstate.searchProductString) return props.product.name
      let check = new RegExp(appStore.appstate.searchProductString, "ig");
      return props.product.name.toString().replace(check, function(matchedText,a,b){
        return ('<span class="bg-yellow-6">' + matchedText + '</span>');
      });
    })

    // update product

    const updateProductDialog = ref(false)

    const defaultUpdateForm = {
      name: '',
      calories: null,
      protein: null,
      fiber: null,
      rate: 0,
    }

    const openUpdateDialog = () => {
      updatForm.name = props.product.name
      updatForm.calories = props.product.calories
      updatForm.protein = props.product.protein
      updatForm.fiber = props.product.fiber
      updatForm.rate = props.product.rate
      updateProductDialog.value = true
    }

    const updatForm = reactive({
      ...defaultUpdateForm
    })

    const resetUpdateForm = () => {
      Object.assign(updatForm, defaultUpdateForm)
    }

    const submitUpdate = () => {
      storeMenu.updateProduct(props.product.id, updatForm as ProductForm)
      resetUpdateForm()
    }

  // delete product

  const deleteConfirmationDialog = ref(false)
  const showDeleteConfirmationDialog = () => {
    updateProductDialog.value = false,
    deleteConfirmationDialog.value = true
  }

  // add product as food to meal

  const createFoodDialog = ref(false)

  const onSlideLeft = ({ reset }) => {
    reset()
    createFoodDialog.value = true
  }

  const portion = ref(props.product.portion)

  const createFood = () => {

    storeDiary.addFoodToMeal(props.mealId, {
      name: props.product.name,
      productId: props.product.id,
      productCalories: props.product.calories,
      productProtein: props.product.protein,
      productFiber: props.product.fiber,
      productPack: props.product.portion,
      productRate: props.product.rate,
      portion: portion.value,
    })
  }
   
    

</script>