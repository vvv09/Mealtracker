<template>
    <q-badge 
        rounded 
        :color="alter ? 'transparent' : color" 
        :class="{'text-inherit' : alter}"
    >
        <q-icon
            :name=Icons.PROTEIN
            class="q-mr-xs"
            size="14px"
            :color="alter ? color : 'white'" 
        />
        {{ value }}
    </q-badge>
</template>

<script setup lang="ts">
  
    import { Icons } from "src/constants/icons"
  
    const props = defineProps({
      value: { type: Number, required: true },
      alter: { type: Boolean, required: false, default: false },
    })  

    const color = 'protein'

</script>