<template>
    <q-dialog>
        <q-card style="min-width: 350px">
          <q-form
            @submit="addFoodFormSubmit"
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
                v-model="form.calories"
                label="Calories (in 100g)"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.CALORIES" />
                </template>
              </q-input>
  
              <q-input
                v-model="form.protein"
                label="Protein (in 100g)"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.PROTEIN" />
                </template>
              </q-input>

              <q-input
                v-model="form.fiber"
                label="Fiber (in 100g)"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.FIBER" />
                </template>
              </q-input>

              <q-input
                v-model="form.portion"
                label="Weight of pack"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon :name="Icons.PORTION" />
                </template>
              </q-input>

              <q-field label="Rating" stack-label>
                <template v-slot:prepend>
                  <q-icon :name="Icons.RATING" />
                </template>
                <template v-slot:control>
                  <q-rating
                    v-model="form.rate"
                    :max="5"
                    size="1.5em"
                    color="grey"
                    :icon="icons"
                    :color-selected="colors"
                  />
                </template>
              </q-field>
    
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn type="submit" v-close-popup label="Save" color="primary"/>
            </q-card-actions>
          </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">

  /*
    Imports
  */
 
    import { reactive } from 'vue'
    import { Icons } from 'src/constants/icons'
    import { ProductForm } from 'src/models/business'

  /*  
    Stores
  */
   
    import { useStoreMenu } from 'src/stores/menu-store'
    const storeMenu = useStoreMenu()

  /*
    Business Logic
  */ 

    const formDefault: ProductForm = {
      name: '',
      calories: null,
      protein: null,
      fiber: null,
      portion: 100,
      rate: 0,
    }
 
    const form = reactive({
      ...formDefault
    })

    const resetForm = () => {
      Object.assign(form, formDefault)
    }

    const addFoodFormSubmit = () => {
      storeMenu.addProduct(form as ProductForm)
      resetForm()
    }

    const icons = [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_neutral',
        'sentiment_satisfied',
        'sentiment_very_satisfied',
    ]

    const colors = [ 
        'red', 
        'deep-orange', 
        'orange', 
        'light-green', 
        'green' 
    ]
</script>