<template>
    <q-dialog 
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <q-layout view="Lhh lpR fff" container class="bg-page">
            <q-header class="bg-secondary">
                <q-toolbar>
                    <q-toolbar-title>New Food</q-toolbar-title>
                    <q-btn flat v-close-popup round dense icon="close" />
                </q-toolbar>
            </q-header>
            <q-form @submit="addEntryFormSubmit" class="q-gutter-md">
                <q-page-container>
                    <q-page padding>
                        
                        <q-input 
                            v-model="storeApp.appstate.searchProductString" 
                            class="col"
                            label="Name" 
                            autogrow 
                            autofocus
                        >
                            <template v-slot:prepend>
                                <q-icon :name="Icons.MEAL" />
                            </template>
                            <template v-slot:append>
                                <q-icon 
                                    v-if="storeApp.appstate.searchProductString !== ''" 
                                    @click="storeApp.appstate.searchProductString = ''" 
                                    :name=Icons.CANCEL 
                                    class="cursor-pointer" 
                                />
                            </template>  
                        </q-input>

                        <transition
                            enter-active-class="animated fadeInUp"
                            leave-active-class="animated fadeOutDown"
                            mode="out-in"
                        >
                            <div
                                v-if="!storeMenu.productsSortedByName.length"
                            >
                               
                                <q-input v-model="form.productCalories" label="Calories (in 100g)" type="number">
                                    <template v-slot:prepend>
                                        <q-icon :name="Icons.CALORIES" />
                                    </template>
                                </q-input>

                                <q-input v-model="form.productProtein" label="Protein (in 100g)" type="number">
                                    <template v-slot:prepend>
                                        <q-icon :name="Icons.PROTEIN" />
                                    </template>
                                </q-input>

                                <q-input v-model="form.productFiber" label="Fiber (in 100g)" type="number">
                                    <template v-slot:prepend>
                                        <q-icon :name="Icons.FIBER" />
                                    </template>
                                </q-input>

                                <q-input v-model="form.portion" label="Weight of portion" type="number">
                                    <template v-slot:prepend>
                                        <q-icon :name="Icons.PORTION" />
                                    </template>
                                </q-input>

                                <div class="q-pa-md text-center">
                                    <q-btn-dropdown
                                        type="submit"
                                        split
                                        color="secondary"
                                        label="Add Food"
                                        v-close-popup 
                                        no-caps
                                        rounded
                                        :disable="!form.portion"
                                    >
                                        <q-list>
                                            <q-item clickable @click="addAndSaveToMenu" v-close-popup >
                                            <q-item-section>
                                                <q-item-label>Add and Save to Menu</q-item-label>
                                            </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-btn-dropdown>
                                </div>
                            </div>
                        </transition>

                        <transition
                            enter-active-class="animated fadeInUp"
                            leave-active-class="animated fadeOutDown"
                            mode="out-in"
                        >
                            <q-list 
                                separator 
                                v-if="storeMenu.productsSortedByName.length && storeApp.appstate.searchProductString"
                                class="q-mb-xl"
                            >
                                <ProductItem
                                    v-for="product in storeMenu.productsSortedByName" :key="product.id"
                                    :product
                                    :meal-id="mealId"
                                />
                            </q-list>
                        </transition>
                    </q-page>
                </q-page-container>
            </q-form>
        </q-layout>
    </q-dialog>
</template>


<script setup lang="ts">
/*
    Imports
*/

import { date } from "quasar";
import { ref, reactive, computed, PropType } from "vue";
import { Icons } from "src/constants/icons";
import { Masks } from "src/constants/masks";
import { FoodForm } from "src/models/business";
import ProductItem from 'src/components/items/ProductItem.vue';
import { UUID } from "src/models/common";


/*
    props
*/
  
const props = defineProps({
    mealId: { type: String as PropType<UUID> }
}) 



/*
    Stores
*/

import { useStoreDiary } from "src/stores/diary-store";
const sroteDiary = useStoreDiary();

import { useStoreApp } from 'src/stores/app-store'
const storeApp = useStoreApp()

import { useStoreMenu } from 'src/stores/menu-store'
const storeMenu = useStoreMenu()

/*
    Busines Logic
*/


// add food to meal

const dafaultForm: FoodForm = {
  name: "",
  productId: null,
  productCalories: null,
  productProtein: null,
  productFiber: null,
  productPack: 100,
  productRate: null,
  portion: null,
};

const form = reactive({
  ...dafaultForm,
});

const resetForm = () => {
  Object.assign(form, dafaultForm);
  storeApp.appstate.searchProductString = '';
};

const addEntryFormSubmit = () => {
    form.name = storeApp.appstate.searchProductString
    sroteDiary.addFoodToMeal(props.mealId, form as FoodForm)
    resetForm()
};

const addAndSaveToMenu = () => {
    console.log('addAndSaveToMenu invoked')
//   const food: FoodForm = {
//     name: form.title,
//     calories: form.calories,
//     protein: form.protein,
//     img: null
//   }
//   menuStore.addFood(food)
//   addEntryFormSubmit()
};


</script>