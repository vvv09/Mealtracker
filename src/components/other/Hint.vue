<template>
    <q-icon 
        :name=Icons.INFO 
        color="grey"
        size="xs"
        class="q-mr-lg"
    >
        <q-tooltip 
            class="bg-accent text-body2" 
            :offset="[10, 10]"
            style="width:200px;"
        >
            <slot/>
        </q-tooltip>
        </q-icon>
</template>

<script setup>
    import { Icons } from "src/constants/icons";
</script>