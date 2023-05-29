<template>

<div class="field">
    <label  class="label" for="selectInput">Лекарственный препарат</label>
    <div class="select" id="selectInput">
        <select 
            v-model="selected"
            @change.prevent="store.selectedIdDruf(selected)"
            >
            <option
                v-for="drug in store.drugs" 
                v-bind:value="drug.id">{{ drug.original_title }}
            </option>
        </select>
    </div>
</div>


</template>

<script setup>

import { useDrugStore } from '@/stores/drugStore_orig'
import { ref, onMounted } from 'vue'


const store = useDrugStore()

const selected = ref(0)

onMounted(()=>{
    store.fill()

})

</script>

<style lang="scss" scoped>

</style>