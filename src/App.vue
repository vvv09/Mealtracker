<template>
  <router-view />
</template>

<script setup lang="ts">


import { useStoreMenu } from 'src/stores/menu-store'
import { useStoreSettings } from 'src/stores/settings-store'
import { useStoreDiary } from 'src/stores/diary-store'
import { useStoreProfile } from 'src/stores/profile-store'
import { useStoreStatistics } from './stores/statistics-store'
const storeMenu = useStoreMenu(),
      storeSettings = useStoreSettings(),
      storeDiary = useStoreDiary(),
      storeProfile = useStoreProfile(),
      storeStatistics = useStoreStatistics()


import { onMounted } from 'vue'
onMounted(() => {
  storeSettings.loadSettings()
  storeMenu.loadMenu()
  storeDiary.loadDiary()
  storeStatistics.loadArchive()
  storeProfile.loadProfile()
})
</script>
