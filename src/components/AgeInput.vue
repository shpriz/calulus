<template>
    <div>
        <label class="label">Возраст пациента</label>
        <div class="columns">
            <div class="column is-6">
                <div class="field">
                    <div class="control has-icons-left">
                        годы
                        <input 
                            v-model="ageInput"
                            @change.prevent="store.getAge(ageInput)"
                            class="input" 
                            type="number" 
                            min="0"
                            max="17"
                            maxlength="3"
                        >
                        

                    </div>
                </div>
            </div>

            <div class="column is-6">
                <div class="field">
                    <div class="control has-icons-left">
                        месяцы
                        <input 
                            v-model="monthInput"
                            @change.prevent="store.getmonthAge(monthInput)"
                            class="input" 
                            type="number" 
                            min="0"
                            max="11"
                            maxlength="2"
                        >
                        

                    </div>
                </div>
            </div>
        </div>
       



    </div>
    

    <!-- <div class="columns">
        <div class="column">
            <div class="card-content">
                <div class="field">

                    <div class="control has-icons-left has-icons-right">
                        <input 
                            v-model="ageInput"
                            @change.prevent="store.getAge(ageInput)"
                            class="input" 
                            type="number" 
                            min="0"
                            max="200"
                            maxlength="4"
                        >
                        
                    </div>
                    
                </div>
    </div>
        </div>
        <div class="column">
            <div class="control has-icons-left has-icons-right">
                        <input 
                            v-model="ageInput"
                            @change.prevent="store.getAge(ageInput)"
                            class="input" 
                            type="number" 
                            min="0"
                            max="200"
                            maxlength="4"
                        >
                        
                    </div>
        </div>
    </div> -->





    
</template>

<script setup>

import { useDrugStore } from '@/stores/drugStore_orig'
import { ref } from 'vue'


const store = useDrugStore()
const ageInput = ref(0)

const monthInput = ref(0)

</script>

<style lang="scss" scoped>

</style>