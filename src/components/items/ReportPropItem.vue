<template>
  <q-item>
    <q-item-section>
        <q-item-label overline>{{ label }}</q-item-label>
        <q-item-label class="text-accent">{{ value }}</q-item-label>
        <q-item-label caption v-if="comment">{{ comment }}</q-item-label>
    </q-item-section>

    <q-item-section avatar>
      <q-icon color="positive" name="bluetooth" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

    const props = defineProps({
      label: { type: String },
      value: { type: Number },
      comment: { type: String, required: false },
    }) 
    
</script>