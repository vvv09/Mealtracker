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
        if (props.value && props.value > 0 && props.value < icons.length) {
            return icons[props.value]
        }
        return icons[0]
    })

    const color = computed(() => {
        if (props.value && props.value > 0 && props.value < colors.length) {
            return colors[props.value]
        }
        return colors[0]
    })

    const icons = [
        'sym_o_question_mark',
        'sym_o_skull',
        'sym_o_thumb_up',
    ]

    const colors = [ 
        'grey',
        'red',
        'green' 
    ]

</script>