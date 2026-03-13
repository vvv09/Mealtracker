<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar :icon="Icons.FIBER" color="fiber" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Fiber Inteke</q-item-label>
      <q-item-label caption lines="2">
        Set your minimum daily fiber intake.</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label :class="storeProfile.profile.fiberIntake ? 'text-secondary' : 'text-negative'">{{ storeProfile.profile.fiberIntake ? storeProfile.profile.fiberIntake : 'Set' }}</q-item-label>
      <q-popup-proxy
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-card>
          <q-card-section>
            <q-input
              autofocus
              label="Fiber Intake"
              type="number"
              v-model="storeProfile.profile.fiberIntake"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
              label="Drop" 
              color="negative" 
              @click="storeProfile.profile.fiberIntake = null" 
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

    import { Icons } from "src/constants/icons"


  /*  
    Stores
  */

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()

</script>
