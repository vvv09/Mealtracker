<template>
  <q-item clickable @click="openDialog = true">
    <q-item-section top avatar>
      <q-avatar icon="storage" color="blue-5" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Edit Diary Food Entries</q-item-label>
      <q-item-label caption lines="2">
       Manage food storrage.
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      
    </q-item-section>
  </q-item>
  <q-dialog 
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn dense flat icon="close" @click="openDialog = false">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="openDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >


    <q-card>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Food Storage</q-toolbar-title>
        <q-btn flat v-close-popup round dense icon="close" />
      </q-toolbar>

      <q-separator />

      <q-card-section class="full-page-height scroll">
        <q-list separator v-if="storeDiary.meals">
          <MealStorageItem
            v-for="meal in storeDiary.meals"
            :key="meal.id"
            :meal
          />
        </q-list>        
      </q-card-section>

      <q-separator />

      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          <q-item-section>
            <q-item-label>total: {{ storeDiary.meals.length }}</q-item-label>
            <q-item-label caption class="text-grey-2">total caloties: {{ storeDiary.meals.flatMap(meal => meal.foods).length }}</q-item-label>
          </q-item-section>
         </q-toolbar-title>
      </q-toolbar>

    </q-card>


  </q-dialog>
</template>

<script setup lang="ts">

  /*
    Imports
  */
    import { ref } from 'vue'
    import MealStorageItem from 'src/components/items/MealStorageItem.vue'


  /*  
    Stores
  */

    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()

    import { useStoreApp } from 'src/stores/app-store'
    const storeApp = useStoreApp()


  /*
    Quasar
  */

    import { useQuasar } from "quasar"
    const $q = useQuasar()

  /*
    Business Logic
  */

    const openDialog = ref(false)

</script>

<style lang="scss" scoped>

  .full-page-height {
    height: calc(100vh - 100px);
  }

</style>
