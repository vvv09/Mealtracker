<template>
  <q-card>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-primary">Consumed Products</div>
            <div class="text-subtitle2"> ratio of the number of food consumptions</div>
            <div class="text-subtitle2 text-grey-7"> total food consumptions: {{ totalFood }}</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Top by calories (kKal)</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Top by portion (g)</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-list separator>
        <ProductInPeriodValueItem 
          v-for="product in storeStatistics.foodByProduct" :key="product.productId" 
          :product
        />
      </q-list>
    </q-card>
</template>

<script setup lang="ts">

  import { computed } from 'vue'

  import ProductInPeriodValueItem from 'src/components/items/ProductInPeriodValueItem.vue'

  import { useStoreDiary } from 'src/stores/diary-store'
  const storeDiary = useStoreDiary()

  import { useStoreStatistics } from 'src/stores/statistics-store'
  const storeStatistics = useStoreStatistics()

  const totalFood = computed(() => storeDiary.meals.flatMap(meal => meal.foods).length)

</script>
