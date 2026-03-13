<template>
    <q-dialog 
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
        @show="setInitialValues"
    >
        <q-layout view="Lhh lpR fff" container class="bg-page">
            <q-header class="bg-secondary">
                <q-toolbar>
                    <q-toolbar-title>New Meal</q-toolbar-title>
                    <q-btn flat v-close-popup round dense icon="close" />
                </q-toolbar>
            </q-header>
            <q-form @submit="addEntryFormSubmit" class="q-gutter-md">
                <q-page-container>
                    <q-page padding>
                        <PageSeparator label="General Info" class="text-secondary"/>

                        <div class="row">
                            <q-input 
                                v-model="form.date" 
                                label="Date"
                                class="col-6" 
                            >
                                <template v-slot:prepend>
                                    <q-icon 
                                        :name="Icons.DATE"
                                    >
                                        <q-popup-proxy 
                                            transition-show="scale" 
                                            transition-hide="scale"
                                            cover 
                                        >
                                            <q-date v-model="form.date" :mask="Masks.DATE">
                                                <div class="row items-center justify-end q-gutter-sm">
                                                    <q-btn 
                                                        v-close-popup 
                                                        label="Set" 
                                                    />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>

                            <q-input 
                                v-model="form.time" 
                                label="Time"
                                class="col-6" 
                            >
                                <template v-slot:prepend>
                                    <q-icon :name="Icons.TIME">
                                        <q-popup-proxy
                                            cover
                                            transition-show="scale"
                                            transition-hide="scale"
                                            class="rounded-borders"
                                        >
                                            <q-card>
                                                <q-time 
                                                    v-model="form.time" 
                                                    :mask="Masks.TIME" 
                                                    format24h 
                                                    now-btn
                                                >
                                                    <div class="row items-center justify-end">
                                                        <q-btn 
                                                            v-close-popup 
                                                            label="Set" 
                                                            color="primary" 
                                                        />
                                                    </div>
                                                </q-time>
                                            </q-card>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                        <div class="row">
                            <q-select 
                                v-model="form.reason" 
                                :options="reasons" 
                                label="Reason" 
                                hide-dropdown-icon
                                map-options
                                class="col-6" 
                            >
                                <template v-slot:prepend>
                                    <q-icon :name=Icons.HUNGER />
                                </template>
                                <template v-slot:append>
                                    <Hint>
                                        Was it physical hunger or appetite, i.e. some physical reason to eat?
                                    </Hint>
                                </template>  
                            </q-select>
                            <q-select 
                                v-model="form.type" 
                                :options="types" 
                                label="Type" 
                                hide-dropdown-icon
                                map-options
                                class="col-6"   
                            >
                                <template v-slot:prepend>
                                    <q-icon :name=Icons.CHEATMEAL />
                                </template>
                                <template v-slot:append>
                                    <Hint>
                                        Planned deviation from the diet. Calories will be counted separately. 
                                        The number of planned cheat meals, if any, will also be reduced.
                                    </Hint>
                                </template>  
                            </q-select>
                        </div>
                        <div class="row">
                            <q-input 
                                v-model="form.comment" 
                                label="Comment"
                                class="col-12" 
                                autogrow
                            >
                                <template v-slot:prepend>
                                    <q-icon :name="Icons.COMMENT" />
                                </template>
                            </q-input>
                        </div>
                    </q-page>
                </q-page-container>
                <q-footer>
                    <q-btn 
                        size="lg"
                        no-caps
                        v-close-popup 
                        color="secondary"
                        type="submit" 
                        class="full-width" 
                        label="Save Meal"
                    />
                </q-footer>
            </q-form>
        </q-layout>
    </q-dialog>
</template>


<script setup lang="ts">
/*
    Imports
*/

import { date } from "quasar";
import { reactive } from "vue";
import { Icons } from "src/constants/icons";
import { Masks } from "src/constants/masks";
import { MealForm, MealReason, MealType } from "src/models/business";
import Hint from 'src/components/other/Hint.vue'
import PageSeparator from "src/components/other/PageSeparator.vue"


/*
    Stores
*/

import { useStoreDiary } from "src/stores/diary-store"
const sroteDiary = useStoreDiary()

import { useStoreApp } from 'src/stores/app-store'
const storeApp = useStoreApp()


/*
    Busines Logic
*/

const reasons = [
    {
        label: 'Hunger',
        value: 'hunger',
    },
    {
        label: 'Appetite',
        value: 'appetite',
    },
]

const types = [
    {
        label: 'Clean Meal',
        value: 'cleanMeal',
    },
    {
        label: 'Cheat Meal',
        value: 'cheatMeal',
    },
]

// add meal

const dafaultForm = {
  date: "",
  time: "",
  comment: null,
  reason: MealReason.HUNGER,
  type: MealType.CLEAN,
  foods: [],
};


const setInitialValues = () => {
  const nowDate = new Date();
  form.date = storeApp.selectedDateString;
  form.time = date.formatDate(nowDate, Masks.TIME);
};

const form = reactive({
  ...dafaultForm,
});

const resetForm = () => {
  Object.assign(form, dafaultForm);
  form.foods = [] // Почему то код выше не всегда сбрасывает это поле
};

const addEntryFormSubmit = () => {
    console.log('dafaultForm', dafaultForm)
    console.log('foods', form.foods)
    form.reason = form.reason.value // TODO: fix this and in UpdateForm
    form.type = form.type.value
    sroteDiary.addMeal(form as MealForm)
    resetForm()
};

// const addAndSaveToMenu = () => {
//   const food: FoodForm = {
//     name: form.title,
//     calories: form.calories,
//     protein: form.protein,
//     img: null
//   }
//   menuStore.addFood(food)
//   addEntryFormSubmit()
// };


</script>