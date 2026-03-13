<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar icon="wc" color="blue-6" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Sex</q-item-label>
      <q-item-label caption lines="2">Required for calories calculation</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label 
        :class="storeProfile.profile.sex ? 'text-secondary' : 'text-negative'">
          {{ storeProfile.profile.sex ? storeProfile.profile.sex : 'Set' }}
      </q-item-label>
      <q-popup-proxy
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-card>
          <q-card-section>
            <q-option-group
              :options="sexes"
              type="radio"
              v-model="storeProfile.profile.sex"
            />
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn 
              label="Drop" 
              color="negative" 
              @click="storeProfile.profile.sex = null" 
              flat 
              v-close-popup 
            />
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

    import { Sex } from 'src/models/business'
    

  /*  
    Stores
  */

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()

  /*  
    Business logic
  */
  
  const sexes = [
    { label: 'Male', value: Sex.MALE, color: 'blue' },
    { label: 'Female', value: Sex.FEMALE, color: 'pink' },
  ]

</script>