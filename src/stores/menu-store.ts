import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'
import { useStoreApp } from 'src/stores/app-store'

import type { UUID } from 'src/models/common'
import type { Ref } from 'vue'
import type { Product, ProductForm } from 'src/models/business'

export const useStoreMenu = defineStore('menu', () => {

  /*
    state
  */
  
    const products: Ref<Product[]> = ref([])
    watch(products.value, () => saveProducts()) 

  /*
    getters
  */
  
    // const productsSortedByName = computed(() => {
    //   const appStore = useStoreApp()
    //   let sorted = products.value.sort((a, b) => a.name <= b.name ? -1 : 1)
    //   if (!appStore.appstate.searchProductString) return sorted
    //   const needle = appStore.appstate.searchProductString.toLowerCase()
    //   return sorted.filter(product => product.name.toLowerCase().indexOf(needle) > -1)
    // })

    const productsSortedByName = computed(() => {
      const appStore = useStoreApp()
      
      // ✅ Копия + localeCompare
      let sorted = [...products.value].sort((a, b) => 
        a.name.localeCompare(b.name)
      )
      
      if (!appStore.appstate.searchProductString) return sorted
      
      const needle = appStore.appstate.searchProductString.toLowerCase()
      return sorted.filter(product => 
        product.name.toLowerCase().includes(needle)  // ✅ includes() вместо indexOf()
      )
    })

  /*
    actions
  */

    const loadMenu = () => {
      loadProducts()
    }

    const addProduct= (form: ProductForm) => {
      const newProduct: Product = Object.assign({}, form, { id: uid() })
      if (newProduct.calories === null) newProduct.calories = 0
      if (newProduct.protein === null) newProduct.protein = 0
      if (newProduct.fiber === null) newProduct.protein = 0
      if (newProduct.rate === null) newProduct.protein = 0
      products.value.push(newProduct)
      Notify.create({ message: 'Product added to menu' })
    }

    const getById = (id: UUID) => {
      const index = products.value.findIndex(f => f.id == id)
      return products.value[index]
    }

    const updateProduct = (id: UUID, updates: ProductForm) => {
      console.log('updating')
      const index = products.value.findIndex(f => f.id == id)
      Object.assign(products.value[index], updates)
    }

    const deleteProduct = (id: UUID) => {
      const index = products.value.findIndex(f => f.id == id)
      products.value.splice(index, 1)
      Notify.create({ message: 'Product deleted' })
    }

    

  /*
    helpers
  */

    const productsStorageKey = 'products'

    const saveProducts = () => {
      LocalStorage.set(productsStorageKey, products.value)
    }

    const loadProducts = () => {
      const saved = LocalStorage.getItem(productsStorageKey)
      if (saved) Object.assign(products.value, saved)
    }


  /*
    return
  */
  
    return { 

      // state
      products,

      // getters
      productsSortedByName,

      // actions
      loadMenu,
      addProduct,
      getById,
      updateProduct,
      deleteProduct,
      

    }
    
})