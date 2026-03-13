<template>
  <q-btn 
    flat 
    round 
    :icon="Icons.MORE"
  >
    <q-menu
      transition-show="scale"
      transition-hide="scale"
    >
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>Order DESC</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Back Up</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable class="text-negative" v-close-popup @click=promptToDelete>
          <q-item-section>Clear Archive</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
 
  import { ref } from 'vue'
  import { Icons } from 'src/constants/icons'

  import { useStoreStatistics } from 'src/stores/statistics-store'
  const storeStatistics = useStoreStatistics()

  import { useQuasar } from "quasar"
  const $q = useQuasar()  

  const promptToDelete = async () => {
      const title = 'Clear Archive',
            message = 'This action can not be undone! Proceed?',
            okButtonTitle = 'Yes, Clear Archive'

      $q.dialog({
        title,
        message,
        cancel: true,
        persistent: true,
        html: true,
        ok: {
          label: okButtonTitle,
          color: 'negative',
          noCaps: true
        },
        cancel: {
          color: 'primary',
          noCaps: true
        }
      }).onOk(() => {
        storeStatistics.clearArchive()
      }).onCancel(() => {})
    }
    
</script>