<template>  
    <q-input 
        v-model="storeApp.appstate.searchProductString" 
        outlined 
        class="col"
        label="Search"
    >
        <template v-slot:prepend>
            <q-icon :name=Icons.SEARCH />
        </template>  
        <template v-slot:append>
            <q-icon 
                v-if="storeApp.appstate.searchProductString !== ''" 
                @click="storeApp.appstate.searchProductString = ''" 
                :name=Icons.CANCEL 
                class="cursor-pointer" 
            />
        </template>  
    </q-input>
</template>    

<script setup lang=ts>
    import { Icons } from "src/constants/icons"
    import { useStoreApp } from 'src/stores/app-store'
    const storeApp = useStoreApp()
</script>