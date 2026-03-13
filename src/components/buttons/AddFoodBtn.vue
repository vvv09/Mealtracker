<template>
    <q-btn 
      :icon=Icons.ADD 
      label="Food"
      no-caps
      rounded 
      dense 
      flat
      size="sm" 
      color="accent" 
      class="q-pr-sm"
      @click="showDialog = true"
    />
    <AddFoodDialog v-model="showDialog" :meal-id="mealId"/> 
</template>

<script setup lang="ts">
 
  import { ref, PropType } from 'vue'
  import { Icons } from 'src/constants/icons'
  import AddFoodDialog from "src/components/dialogs/AddFoodDialog.vue"
  import { UUID } from 'src/models/common'
    
  const showDialog = ref(false)

  const props = defineProps({
    mealId: { type: String as PropType<UUID> }
  }) 

</script>