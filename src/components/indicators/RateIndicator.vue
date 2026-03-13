<template>
    <q-icon
        :name
        class="q-mr-xs"
        size="20px"
        :color
    />
</template>

<script setup>

const props = defineProps({
    rate: {type: Number}
})

import { computed } from 'vue'


    const name = computed(() => {
        if (isValidRate.value) return icons[props.rate]
        return icons[0]
    })

    const color = computed(() => {
        if (isValidRate.value) return colors[props.rate]
        return colors[0]
    })

    const isValidRate = computed(() => props.rate && props.rate > 0 && props.rate < 6)

    const icons = [
        'sentiment_neutral',
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_neutral',
        'sentiment_satisfied',
        'sentiment_very_satisfied',
    ]

    const colors = [ 
        'grey',
        'red', 
        'deep-orange', 
        'orange', 
        'light-green', 
        'green' 
    ]




</script>