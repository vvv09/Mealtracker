<template>
  <q-drawer
    show-if-above
    :width="200"
    :breakpoint="400"
    :bordered="true"
  >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;">
      <q-list padding>
        <q-item
          v-for="route in storeApp.routes"
          :key="route.to"
          clickable 
          v-ripple
          :to="route.to"
        >
          <q-item-section avatar>
            <q-icon :name="route.icon" />
          </q-item-section>

          <q-item-section>
            {{ route.label }}
          </q-item-section>
        </q-item>
      <DrawerDarkModeToggleItem/>
      </q-list>
    </q-scroll-area>

    <q-img class="absolute-top" src="/material.png" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar rounded class="q-mb-sm">
          <img src="/logo.png">
        </q-avatar>
        <div class="text-weight-bolder text-h5">Mealtracker</div>
        <div>v 0.0.1</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script setup lang="ts">
  
  import { Icons } from 'src/constants/icons'
  import DrawerDarkModeToggleItem from 'src/components/items/DrawerDarkModeToggleItem.vue'

  import { useStoreApp } from 'src/stores/app-store'
  const storeApp = useStoreApp()

</script>
