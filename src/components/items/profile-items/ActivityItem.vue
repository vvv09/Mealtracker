<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar icon="monitor_heart" color="red-8" text-color="white" square class="rounded-borders"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Activity</q-item-label>
      <q-item-label caption lines="2">Required for calories calculation</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label :class="storeProfile.profile.activity ? 'text-secondary' : 'text-negative'">{{ storeProfile.profile.activity ? activity : 'Set' }}</q-item-label>
      <q-popup-proxy
        cover 
        transition-show="scale"
        transition-hide="fade"
      >
        <q-card>
            <q-list separator>
              <q-item 
                tag="label" 
                v-ripple
                v-for="a in activities" :key=a.value
              >
                <q-item-section avatar>
                  <q-radio v-model="storeProfile.profile.activity" :val="a.value"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ a.title }}</q-item-label>
                  <q-item-label caption>{{ a.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          <q-card-actions align="right">
            <q-btn 
              label="Drop" 
              color="negative" 
              @click="storeProfile.profile.activity = null" 
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
    import { computed } from 'vue'
    import { Activity } from 'src/models/business'

  /*  
    Stores
  */

    import { useStoreProfile } from 'src/stores/profile-store'
    const storeProfile = useStoreProfile()

  /*  
    Business logic
  */

    const activity = computed(() => {
        if (!storeProfile.profile.activity) return 'Set'
        return activities.filter(a => a.value === storeProfile.profile.activity)[0].title
    })
    const activities = [
      { label: 'Минимальные нагрузки (сидячая работа)', value: Activity.K_1, title: 'Минимальная' },
      { label: 'Небольшая дневная активность, легкие тренировки 1-3 раза в неделю', value: Activity.K_2, title: 'Небольшая' },
      { label: 'Работа средней тяжести или тренировки 3-5 раз в неделю', value: Activity.K_3, title: 'Средняя' },
      { label: 'Повышенная активность: интенсивные нагрузки или занятия 4-5 раз в неделю', value: Activity.K_4, title: 'Повышенная' },
      { label: 'Высокая активность: ежедневные тренировки', value: Activity.K_5, title: 'Высокая' },
      { label: 'Очень высокая активность: ежедневные интенсивные тренировки или тренировки 2 раза в день', value: Activity.K_6, title: 'Очень высокая' },
      { label: 'Тяжелая физическая работа или интенсивные тренировки 2 раза в день', value: Activity.K_7, title: 'Тяжелая' },
    ]

 


</script>
