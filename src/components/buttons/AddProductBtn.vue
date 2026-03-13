<template>
  <q-btn 
    flat 
    round 
    :icon="Icons.ADD" 
    @click="showDialog = true"
  />
  <AddMealDialog v-model="showDialog"/>
</template>

<script setup lang="ts">
 
  import { ref } from 'vue'
  import { Icons } from 'src/constants/icons'
  import AddMealDialog from "src/components/dialogs/AddProductDialog.vue"
    
  const showDialog = ref(false)

</script>