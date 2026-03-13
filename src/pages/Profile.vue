<template>
  <q-page class="q-pa-md q-gutter-y-md index-page start-with-primary-bg">

    <div class="q-pt-md text-center">
        <q-avatar
          size="100px" 
        >
          <img src="/avatar.png">
        </q-avatar>
        <div class="q-pt-md text-h5">
          User Name
        </div>
    </div>
    
    <div>
      <q-item-label header>Main Info</q-item-label>
      <q-card>
        <q-list padding>
          <BirthDateItem/>
          <q-separator spaced inset="item" />
          <SexItem/>
          <q-separator spaced inset="item"/>
          <HeightItem/>
          <q-separator spaced inset="item" />
          <ActivityItem/>
        </q-list>
      </q-card>
    </div>

    <div>
      <q-item-label header>Additional Info</q-item-label>
      <q-card>
        <q-list padding>
          <StartDateItem/>
          <q-separator spaced inset="item" />
          <TargetWeightItem/>
          <q-separator spaced inset="item" />
          <CaloriesLimitItem/>
          <q-separator spaced inset="item" />
          <CheatMealsLimitItem/>
          <q-separator spaced inset="item" />
          <ProteinIntakeItem/>
          <q-separator spaced inset="item" />
          <FiberIntakeItem/>
        </q-list>
      </q-card>
    </div>

    <div>
      <q-item-label header>Settings</q-item-label>
      <q-card>
        <q-list padding>
          <UseCaloriesFormulaItem/>
        </q-list>
      </q-card>
    </div>

    <div>
      <q-item-label header>Appearance</q-item-label>
      <q-card>
        <q-list padding>
          <AppearanceItem/>
          <PrimaryColorItem/>
          <SecondaryColorItem/>
          <AccentColorItem/>
          <SetDefaultColorsItem/>
        </q-list>
      </q-card>
    </div>

    <div>
      <q-item-label header>Data</q-item-label>
      <q-card>
        <q-list padding>
          <MealManagerItem/>
          <DropDiaryItem/>
        </q-list>
      </q-card>
    </div>

    <PageFooter/>
   
  </q-page>
</template>

<script setup lang="ts">

  import BirthDateItem from 'src/components/items/profile-items/BirthDateItem.vue'
  import SexItem from 'src/components/items/profile-items/SexItem.vue'
  import HeightItem from 'src/components/items/profile-items/HeightItem.vue'
  import ActivityItem from 'src/components/items/profile-items/ActivityItem.vue'
  import StartDateItem from 'src/components/items/profile-items/StartDateItem.vue'
  import TargetWeightItem from 'src/components/items/profile-items/TargetWeightItem.vue'
  import CaloriesLimitItem from 'src/components/items/profile-items/CaloriesLimitItem.vue'
  import CheatMealsLimitItem from 'src/components/items/profile-items/CheatMealsLimitItem.vue'
  import ProteinIntakeItem from 'src/components/items/profile-items/ProteinIntakeItem.vue'
  import FiberIntakeItem from 'src/components/items/profile-items/FiberIntakeItem.vue'
  import UseCaloriesFormulaItem from 'src/components/items/profile-items/UseCaloriesFormulaItem.vue'
  import PrimaryColorItem from 'src/components/items/profile-items/appearance/PrimaryColorItem.vue'
  import SecondaryColorItem from 'src/components/items/profile-items/appearance/SecondaryColorItem.vue'
  import AccentColorItem from 'src/components/items/profile-items/appearance/AccentColorItem.vue'
  import SetDefaultColorsItem from 'src/components/items/profile-items/appearance/SetDefaultColorsItem.vue'
  import AppearanceItem from 'src/components/items/profile-items/appearance/AppearanceItem.vue'
  import DropDiaryItem from 'src/components/items/profile-items/data/DropDiaryItem.vue'
  import MealManagerItem from 'src/components/items/profile-items/data/MealManagerItem.vue'
  import PageFooter from 'src/components/other/PageFooter.vue'


</script>

<style lang="scss">

  .avatar-border {
    border-radius: 50%;
    width: 116px;
    height: 116px;
    border:  8px solid $primary;
  }
  
</style>
