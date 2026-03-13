<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar icon="color_lens" color="accent" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Accent Color</q-item-label>
      <q-item-label caption lines="2">Set accent color for the app.</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn 
        size="12px" 
        dense 
        round
        icon=""
        color="accent"
      >
        <q-menu 
          anchor="bottom left" 
          self="bottom right" 
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-color
            v-model="storeSettings.settings.accentColor"
            no-header
            no-footer
            default-view="palette"
            class="my-picker"
          />
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

  /*
    Imports
  */

    import { ref } from 'vue'
    

  /*  
    Stores
  */

    import { useStoreSettings } from 'src/stores/settings-store'
    const storeSettings = useStoreSettings()

</script>