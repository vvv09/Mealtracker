<template>
    <q-icon
        :name
        class="q-mr-xs"
        size="20px"
        :color
    />
</template>

<script setup lang="ts">
  
    import { Icons } from "src/constants/icons"
    import { MealType } from "src/models/business"
    import { computed, PropType } from 'vue'
  
    const props = defineProps({
      type: { type: String }
    }) 

    const name = computed(() => {
        if ( props.type === MealType.CLEAN ) return Icons.CLEANMEAL
        if ( props.type === MealType.CHEAT ) return Icons.CHEATMEAL
        return Icons.UNKNOWN
    })

    const color = 'warning'

</script>