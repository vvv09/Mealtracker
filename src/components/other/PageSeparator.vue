<template>
    <div class="text-primary q-mt-lg text-caption q-mx-md text-center">
      {{ label }}
    </div>
</template>

<script setup>
    const defineProps = defineProps({
        label: {type: String}
    })
</script>