<template>
  <q-item>
    <q-item-section class="col-6">
      <q-item-label class="q-mt-sm">{{ product.productName }}</q-item-label>
    </q-item-section>

    <q-item-section >
      <q-linear-progress  
        rounded 
        size="40px" 
        :value="product.percent" 
        color="primary" 
        class="q-mt-sm" 
      >
        <div class="absolute-full flex flex-center">
          <q-badge 
            color="white text-h6 q-py-none" 
            text-color="primary" 
            :label="`${product.percent * 100}%`" 
          />
        </div>
      </q-linear-progress>
    </q-item-section>
  </q-item>
</template>

<script setup lang=ts>

  /*
    Imports
  */
  
    import { computed, PropType } from "vue"
    import type { ProductNurishmentCount } from 'src/models/business'

  /*
    props
  */
  
    const props = defineProps({
      product: { type: Object as PropType<ProductNurishmentCount> }
    }) 

  /*
    quasar
  */

    import { useQuasar } from "quasar"
    const $q = useQuasar()  

</script>