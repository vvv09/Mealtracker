<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar :icon="Icons.CALORIES_LIMIT" color="orange-9" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Calories Limit</q-item-label>
      <q-item-label caption lines="2">
        Set your daily calorie limit that you should not exceed.      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label :class="sroteProfile.profile.caloriesLimit ? 'text-secondary' : 'text-negative'">{{ sroteProfile.profile.caloriesLimit ? sroteProfile.profile.caloriesLimit : 'Set' }}</q-item-label>
      <q-popup-proxy
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-card>
          <q-card-section>
            <q-input
              autofocus
              label="Calories Limit"
              type="number"
              v-model="sroteProfile.profile.caloriesLimit"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
              label="Drop" 
              color="negative" 
              @click="sroteProfile.profile.caloriesLimit = null" 
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
    const sroteProfile = useStoreProfile()

</script>
