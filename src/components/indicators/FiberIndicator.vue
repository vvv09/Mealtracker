<template>
    <q-badge 
        rounded 
        color="transparent"
    >
        <q-icon
            :name=Icons.FIBER
            class="q-mr-xs"
            size="14px"
            color="grey" 
        />
        <span class="text-fiber text-weight-bold">{{ value }}</span>
    </q-badge>
</template>

<script setup lang="ts">
  
    import { Icons } from "src/constants/icons"
  
    const props = defineProps({
      value: { type: String, default: '-' },
    })  

</script>