<template>
    <div class="card-content">
        <div class="field">
            <label class="label">Вес пациента, кг</label>
            <div class="control">
                <input 
                v-model="weightInput"
                @change.prevent="store.getWeight(weightInput)"
                class="input" 
                min="0" 
                max="150"
                maxlength="3"
                type="number" 
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDrugStore } from '@/stores/drugStore_orig'
import { ref } from 'vue'


const store = useDrugStore()
const weightInput = ref(0)


</script>

<style lang="scss" scoped>

</style>