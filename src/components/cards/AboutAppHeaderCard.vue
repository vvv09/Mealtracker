<template>
    <q-card >
        <q-parallax style="height: 300px;">
            <template v-slot:media>
                <img src="/material.png">
            </template>

            <template v-slot:content="scope">
                <div
                    class="absolute column items-center"
                    :style="{
                        opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
                        top: (scope.percentScrolled * 60) + '%',
                        left: 0,
                        right: 0
                    }"
                >
                    <img src="/logo.png" style="width: 70px; height: 70px">
                    <div class="text-h4 text-white text-center q-mt-sm">Mealtracker</div>
                    <div class="text-body1 text-grey-3 text-center">
                        v 0.0.1
                    </div>
                </div>
            </template>
        </q-parallax>
    </q-card>
</template>