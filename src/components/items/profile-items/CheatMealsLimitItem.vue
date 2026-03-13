<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar :icon="Icons.CHEATMEAL" color="warning" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Cheat Meals Limit</q-item-label>
      <q-item-label caption lines="2">
        Set a cheat meal limit. Each cheat meal will be subtracted from this number. You can increase the number as needed.    
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label :class="storeProfile.profile.cheatMealsLimit ? 'text-secondary' : 'text-negative'">{{ storeProfile.profile.cheatMealsLimit ? storeProfile.profile.cheatMealsLimit : 'Set' }}</q-item-label>
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
              v-model="storeProfile.profile.cheatMealsLimit"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
              label="Drop" 
              color="negative" 
              @click="storeProfile.profile.cheatMealsLimit = null" 
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
