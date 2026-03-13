<template>
    <q-expansion-item>
        <template v-slot:header>
            <GradeItemAvatar :value="report.grade"/>
            <q-item-section side>
                <q-item-label class="text-weight-bolder">{{ report.startDate }} - {{ report.endDate }}</q-item-label>
                <q-item-label caption lines="2"> <span class="text-grey">days: {{ report.numberOfDays }}</span></q-item-label>
            </q-item-section>

            <q-separator vertical spaced/>

            <q-item-section>
                    <q-item-label>
                        <CaloriesIndicator :value=report.averageCalories.toString() class="q-pl-none"/>
                        <ProteinIndicator :value=report.averageProtein.toString() />
                        <FiberIndicator :value=report.averageFiber.toString() />
                    </q-item-label>
            </q-item-section>

            <q-item-section side>
                <div class="row items-center">
                    <q-icon :name=Icons.DECREASE color="positive" size="24px" />
                   <span class="text-weight-bolder"> 3,7 kg</span>
                </div>
            </q-item-section>

            
        </template>

        <q-card class="bg-page">
            <q-card-section v-if="report.comment" class="text-italic text-grey">
                {{ report.comment }}
            </q-card-section>
            <q-list bordered separator class="rounded-borders">
                <ReportPropItem label="Average Calories" :value=report.averageCalories />
                <ReportPropItem label="Average Calories from Cleanmeals" :value=report.averageCleanMealCalories />
                <ReportPropItem label="Average Calories from Cheatmeals" :value=report.averageCheatMealCalories />
                <ReportPropItem label="Average Meals in a Day" :value=report.averageMeals />
                <ReportPropItem label="Calories Limit" :value=report.caloriesLimit />
                <ReportPropItem label="Cheat Meals" :value=report.cheatMeals />
                <ReportPropItem label="Average Fiber" :value=report.averageFiber />
                <ReportPropItem label="Meals Ratio" :value=report.mealsRatio />
                <ReportPropItem label="Rate" :value=report.rate />
            </q-list>
            <q-card-section>
                My Menu During Period
            </q-card-section>
            <q-list separator>
                <ProductInPeriodValueItem 
                    v-for="product in report.nurishment" :key="product.productId" 
                    :product
                />
            </q-list>   
        </q-card>
    </q-expansion-item>
</template>

<script setup lang="ts">

    import { PropType } from "vue"
    import { Report } from "src/models/business"
    import { Icons } from "src/constants/icons"
    import ReportPropItem from "./ReportPropItem.vue";
    import ProductInPeriodValueItem from "./ProductInPeriodValueItem.vue";
    import CaloriesIndicator from 'src/components/indicators/CaloriesIndicator.vue'
    import ProteinIndicator from 'src/components/indicators/ProteinIndicator.vue'
    import FiberIndicator from 'src/components/indicators/FiberIndicator.vue'
    import GradeItemAvatar  from 'src/components/other/GradeItemAvatar.vue'

    const props = defineProps({
      report: { type: Object as PropType<Report> }
    }) 
    
</script>