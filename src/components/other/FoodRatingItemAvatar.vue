<template>
    <q-item-section avatar>
        <q-avatar rounded :color text-color="white" :icon />
    </q-item-section>
</template>

<script setup lang=ts>

  import { computed } from "vue"
  
    const props = defineProps({
      value: { type: Number, required: true }
    })  


  // Rating
   const icon = computed(() => {
        if (props.value && props.value > 0 && props.value < 6) {
            return icons[props.value]
        }
        return icons[0]
    })

    const color = computed(() => {
        if (props.value && props.value > 0 && props.value < 6) {
            return colors[props.value]
        }
        return colors[0]
    })

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