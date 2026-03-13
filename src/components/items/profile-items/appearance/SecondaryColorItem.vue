<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar icon="color_lens" color="secondary" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Secondary Color</q-item-label>
      <q-item-label caption lines="2">Set secondary color for the app.</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn 
        size="12px" 
        dense 
        round
        icon=""
        color="secondary"
      >
        <q-menu 
          anchor="bottom left" 
          self="bottom right" 
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-color
            v-model="storeSettings.settings.secondaryColor"
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

  import { useStoreSettings } from 'src/stores/settings-store'
  const storeSettings = useStoreSettings()

</script>