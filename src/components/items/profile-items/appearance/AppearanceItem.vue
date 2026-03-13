<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar icon="tonality" color="grey-10" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Appearance</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label class="text-secondary">
          {{ modeName }}
      </q-item-label>
      <q-popup-proxy
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-card>
          <q-list separator>
            
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio
                  v-model="storeSettings.settings.darkMode"
                  :val="false"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Light</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio
                  v-model="storeSettings.settings.darkMode"
                  :val="true"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dark</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio
                  v-model="storeSettings.settings.darkMode"
                  val="auto"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Auto</q-item-label>
                <q-item-label caption>Follow the preference of your device</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
          <q-card-actions align="right">
            <q-btn 
              label="Ok" 
              color="primary" 
              flat 
              v-close-popup 
            />
          </q-card-actions>
        </q-card>
      </q-popup-proxy>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

  /*
    Imports
  */

    import { computed } from 'vue'
    import { Sex } from 'src/models/business'
    

 /*  
    Stores
  */

    import { useStoreSettings } from 'src/stores/settings-store'
    const storeSettings = useStoreSettings()  

  /*  
    Business logic
  */
  
  const sexes = [
    { label: 'Male', value: Sex.MALE, color: 'blue' },
    { label: 'Female', value: Sex.FEMALE, color: 'pink' },
  ]

  const modeName = computed(() => {
    const mode: boolean | string = storeSettings.settings.darkMode
    if (mode === 'auto') return 'Auto'
    if (mode) return 'Dark'
    return 'Light'
  })

</script>