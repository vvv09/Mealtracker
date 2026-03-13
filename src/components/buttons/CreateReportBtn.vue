<template>
  <q-btn 
    :icon-right=Icons.REPORT
    label="Create Report"
    no-caps
    flat
    rounded
    outline
    color="accent" 
    @click="storeStatistics.createReport('Переданный комментарий к отчету')"
  />
  <q-dialog v-model="showOverrideConfirmDialog">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar :icon=Icons.REPORT color="accent" text-color="white" />
        <span class="q-ml-sm">A report for this period already exists. Override it?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn label="Create" color="primary" v-close-popup @click="createReport"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showCreatingModel">
    <q-card>
      <q-card-section>
        <q-linear-progress 
          :value="progress" 
          size="20px"
          color="primary"
          class="q-mb-md full-width"
          animation-speed="2000"
          rounded
          stripe
        />
        <div class="text-center q-mb-sm">
          Report Generation: {{ Math.round(progress * 100) }}%
        </div>
      </q-card-section>
      <q-card-actions 
        align="right"
        v-if="!isGenerating && progress == 1"
      >
        <q-btn flat label="Close" color="primary" v-close-popup />
        <q-btn label="To Reports" color="primary" v-close-popup to="/archive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
 
  import { ref } from 'vue'
  import { Icons } from 'src/constants/icons'
    
  const showOverrideConfirmDialog = ref(false)
  const showCreatingModel = ref(false)

  const checkAndCreateReport = () => {
    const reportExists = true // TODO проверять наличие отчета по датам - продумать, какие отчеты считать дубликатами
    if (reportExists) showOverrideConfirmDialog.value = true
    else showCreatingModel.value = true // TODO показывать диалог создания отчета
  }

  const createReport = () => {
    console.log('creating report')
    showCreatingModel.value = true
    startReportGeneration()
  }

  import { useStoreStatistics } from 'src/stores/statistics-store'
  const storeStatistics = useStoreStatistics()


  // generation logick

  const progress = ref(0)
  const isGenerating = ref(false)

const startReportGeneration = () => {
  isGenerating.value = true
  progress.value = 0
  
  // Анимация от 0 до 100 за 2 секунды
  const startTime = performance.now()
  const duration = 2000 // 2 секунды
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    progress.value = Math.min(elapsed / duration, 1)
    
    if (progress.value < 1) {
      requestAnimationFrame(animate)
    } else {
      isGenerating.value = false
      // Здесь можно добавить логику завершения отчета
      console.log('Отчет сгенерирован!')
      storeStatistics.createReport('Переданный комментарий к отчету')
    }
  }
  
  requestAnimationFrame(animate)
}

</script>