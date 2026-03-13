<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar icon="height" color="green-4" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Height</q-item-label>
      <q-item-label caption lines="2">
        Required for calories calculation
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label :class="storeProfile.profile.height ? 'text-secondary' : 'text-negative'">{{ storeProfile.profile.height ? storeProfile.profile.height : 'Set' }}</q-item-label>
      <q-popup-proxy
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-card>
          <q-card-section>
            <q-input
              autofocus
              label="Height"
              type="number"
              v-model="storeProfile.profile.height"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
              label="Drop" 
              color="negative" 
              @click="storeProfile.profile.height = null" 
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
    Stores
  */

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()

</script>
