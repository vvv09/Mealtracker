<template>
    <q-item 
      tag="label"
      v-ripple 
      class="rounded-borders drawer-dark-mode-toggle-item"
    >
        <q-item-section>
          <q-item-label>Dark Mode</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="primary" v-model="storeSettings.settings.darkMode" val="dark" />
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
  import { useStoreSettings } from 'src/stores/settings-store'
  const storeSettings = useStoreSettings()

  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

</script>

<style lang="scss">

  .drawer-dark-mode-toggle-item {
    font-size: 1rem;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: 0.0125em;
    color: $grey;
  }

  
</style>