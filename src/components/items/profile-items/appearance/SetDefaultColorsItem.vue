<template>
  <q-item clickable @click="promptToDrop">
    <q-item-section top avatar>
      <q-avatar icon="replay" color="orange" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Set Default Colors</q-item-label>
      <q-item-label caption lines="2">
       Drop all tree colors to its default values.
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">


  /*  
    Stores
  */

  import { useStoreSettings } from 'src/stores/settings-store'
  const storeSettings = useStoreSettings()


  /*
    Quasar
  */

    import { useQuasar } from "quasar"
    const $q = useQuasar()

  /*
    Business Logic
  */

    const promptToDrop = async () => {
      const title = 'Really?',
            message = 'Are you sure you want to drop all tree colors to their default values?',
            okButtonTitle = 'Ok'

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
        storeSettings.dropColors()
      }).onCancel(() => {})
    }

</script>
