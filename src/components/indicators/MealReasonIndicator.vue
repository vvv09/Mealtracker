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
    import { MealReason } from "src/models/business";
    import { computed, PropType } from 'vue'
  
    const props = defineProps({
      reason: { type: String }
    })  

    const name = computed(() => {
        if ( props.reason === MealReason.HUNGER ) return Icons.HUNGER
        if ( props.reason === MealReason.APPETITE ) return Icons.APPETITE
        return Icons.UNKNOWN
    })

    const color = 'positive'

</script>