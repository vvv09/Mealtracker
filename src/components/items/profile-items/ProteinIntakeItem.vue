<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar :icon="Icons.PROTEIN" color="protein" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Protein Inteke</q-item-label>
      <q-item-label caption lines="2">
        Set your minimum daily protein intake.</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label :class="storeProfile.profile.proteinIntake ? 'text-secondary' : 'text-negative'">{{ storeProfile.profile.proteinIntake ? storeProfile.profile.proteinIntake : 'Set' }}</q-item-label>
      <q-popup-proxy
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-card>
          <q-card-section>
            <q-input
              autofocus
              label="Protein Intake"
              type="number"
              v-model="storeProfile.profile.proteinIntake"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
              label="Drop" 
              color="negative" 
              @click="storeProfile.profile.proteinIntake = null" 
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
