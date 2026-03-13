<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Home
        </q-toolbar-title>

        <q-chip 
          :icon=Icons.CHEATMEAL 
          color="white" 
          text-color="primary"
          v-if="storeProfile.profile.cheatMealsLimit"
          class="q-mr-md"
        > 
          {{ storeProfile.profile.cheatMealsLimit }}
        </q-chip>

        <transition
          mode="out-in"
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutRight"
        >
          <div v-if="route.name === 'diary'">
            
            <q-tabs
              v-if="isDesktop()"
              v-model="storeApp.appstate.diaryActiveTab"
              dense
              no-caps
              inline-label
              class="text-white"
            >
              <q-tab name="diary" :icon=Icons.DIARY label="Meals" />
              <q-tab name="statistics" :icon=Icons.STATISTICS label="Statistics" />
            </q-tabs>
            <q-btn 
              v-else-if="storeApp.appstate.diaryActiveTab === 'statistics'"
              :icon=Icons.DIARY 
              rounded 
              dense 
              flat
              @click="storeApp.appstate.diaryActiveTab = 'diary'"
            />
            <q-btn 
              v-else-if="storeApp.appstate.diaryActiveTab === 'diary'"
              :icon=Icons.STATISTICS 
              rounded 
              dense 
              flat
              @click="storeApp.appstate.diaryActiveTab = 'statistics'"
            />
          </div>
          <div v-else-if="route.name === 'products'">
            <AddProductBtn/>
          </div>
          <div v-else-if="route.name === 'archive'">
            <ArchiveMenuBtn/>
          </div>
          <div v-else class="not-remove-it"> 
            Quasar v{{ $q.version }}
          </div>
        </transition>
      </q-toolbar>
    </q-header>

    <Drawer v-model="leftDrawerOpen"/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Drawer from './Drawer.vue'
  import AddProductBtn from 'src/components/buttons/AddProductBtn.vue'
  import ArchiveMenuBtn from 'src/components/buttons/ArchiveMenuBtn.vue'
  import { Icons } from 'src/constants/icons'
  import isDesktop from 'src/utils/isDesktop'


  const leftDrawerOpen = ref(false);

  import { useStoreApp } from 'src/stores/app-store'
  const storeApp = useStoreApp()  

  import { useStoreProfile } from 'src/stores/profile-store'
  const storeProfile = useStoreProfile()

  function toggleLeftDrawer () {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }

  /*  
    Routing
  */
    
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

</script>
