<template>
<q-item>
    <q-item-section top avatar>
      <q-avatar icon="start" color="blue-7" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Start Date</q-item-label>
      <q-item-label caption lines="2">First day of diary. Used for statistic</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label :class="storeProfile.profile.startDate ? 'text-secondary' : 'text-negative'">{{ storeProfile.profile.startDate ? storeProfile.profile.startDate : 'Set' }}</q-item-label>
      <q-popup-proxy 
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-date 
          v-model="storeProfile.profile.startDate"
          :mask="Masks.DATE"
          minimal
        >
          <div class="row items-center justify-end q-gutter-sm">
              <q-btn 
                label="Drop" 
                color="negative" 
                @click="storeProfile.profile.startDate = null" 
                flat 
                v-close-popup 
              />
              <q-btn 
                label="Ok" 
                color="primary" 
                flat 
                v-close-popup 
              />
          </div>
        </q-date>
        </q-popup-proxy>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
  /*
    Imports
  */

    import { Masks } from 'src/constants/masks'

  /*  
    Stores
  */

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()
    
</script>
