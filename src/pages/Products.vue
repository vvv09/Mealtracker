<template>
  <q-page class="q-pa-md q-gutter-y-md">
    
    <SearchProductBlock />

    <transition
      appear
      enter-active-class="animated jackInTheBox slower"
    >
      <NothingHere
        v-if="!storeMenu.productsSortedByName.length"
      />
    </transition>

    <q-card v-if="storeMenu.productsSortedByName.length" class="q-py-md">
      <q-list 
        separator
        bordered
      >
        <ProductItem
          v-for="product in storeMenu.productsSortedByName" :key="product.id"
          :product
        />
      </q-list>
    </q-card>

  </q-page>
</template>

<script setup lang="ts">

  /*
    Imports
  */
 
    import SearchProductBlock from 'src/components/blocks/SearchProductBlock.vue'
    import ProductItem from 'src/components/items/ProductItem.vue'
    import NothingHere from 'src/components/blocks/NothingHere.vue'

  /*  
    Stores
  */
   
    import { useStoreMenu } from 'src/stores/menu-store'
    const storeMenu = useStoreMenu()

</script>
