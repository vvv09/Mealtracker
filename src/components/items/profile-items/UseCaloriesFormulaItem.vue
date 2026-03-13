<template>
  <q-item tag="label">
    <q-item-section top avatar>
      <q-avatar :icon="Icons.CALORIES_FORMULA" :color text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Use Calories Formula</q-item-label>
      <q-item-label caption lines="2">
        Use daily calories suggestion based on Formula
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-toggle :color v-model="storeSettings.settings.useCaloriesFormula" val="battery" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

  /*
    Imports
  */

    import { Icons } from "src/constants/icons"


  /*  
    Stores
  */

  import { useStoreSettings } from 'src/stores/settings-store'
  const storeSettings = useStoreSettings()


  const color = 'light-blue-11'

</script>
