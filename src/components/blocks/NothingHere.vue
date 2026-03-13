<template>
  <div class="text-center q-pt-xl">
    <q-icon
      :name=Icons.LOGO
      size="100px"
      color="grey-7"
    />
    <div
      class="text-grey-7"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup>

    /*
      Imports
    */

      import { Icons } from 'src/constants/icons'

    /*
      Props
    */
  
      const props = defineProps({
        title: { type: String, required: false, default: "Nothing here" }
      })


</script>