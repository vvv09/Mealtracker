<template>
  <q-item clickable @click="promptToDelete">
    <q-item-section top avatar>
      <q-avatar icon="dangerous" color="negative" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Delete Diary</q-item-label>
      <q-item-label caption lines="2">
       This will permanently delete all your diary data.
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

    import { useStoreDiary } from 'src/stores/diary-store'
    const storeDiary = useStoreDiary()


  /*
    Quasar
  */

    import { useQuasar } from "quasar"
    const $q = useQuasar()

  /*
    Business Logic
  */

    const promptToDelete = async () => {
      const title = 'Drop Diary?',
            message = 'Really drop all your data? This can not be undone!',
            okButtonTitle = 'Delete'

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
        storeDiary.dropDiary()
      }).onCancel(() => {})
    }

</script>
