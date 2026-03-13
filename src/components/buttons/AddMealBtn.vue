<template>
  <q-btn 
    :icon=Icons.ADD 
    label="Add Meal"
    no-caps
    flat
    rounded
    outline
    color="accent" 
    @click="showDialog = true"
  />
  <AddMealDialog v-model="showDialog"/>
</template>

<script setup lang="ts">
 
  import { ref } from 'vue'
  import { Icons } from 'src/constants/icons'
  import AddMealDialog from "src/components/dialogs/AddMealDialog.vue"
    
  const showDialog = ref(false)

</script>