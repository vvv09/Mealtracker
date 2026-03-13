<template>
    <q-rating
        :max="5"
        size="1.5em"
        color="grey"
        :icon="icons"
        :color-selected="ratingColors"
    />
</template>

<script setup>
    const icons = [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_neutral',
        'sentiment_satisfied',
        'sentiment_very_satisfied',
    ]

    const ratingColors = [ 
        'red', 
        'deep-orange', 
        'orange', 
        'light-green', 
        'green' 
    ]

</script>