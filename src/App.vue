<!-- @format -->


<template>
    <div class="container is-max-widescreen">
        <div class="card">
           
                <div class="card-content">
                  <form>
                    <div class="content">
                        <h2 class="title has-text-centered is-2 mt-5">Калькулятор дозировок противотуберкулезных препаратов для лечения туберкулеза и латентной туберкулезной инфекции у детей и подростков</h2>
                        <div class="level-left">
                            <div class="level-item">
                                <vAgeInput />
                            </div>
                            <div class="level-item">
                                <vWeightInput />
                            </div>
                            <div class="level-item">
                                <vSelectInput 
                                />
                            </div>
                        </div>
                        <vOutputItem/>
                    </div>
                </form>
                </div>
        </div>
    </div>
</template>

<script setup>
/*
  import 
*/
import vWeightInput from '@/components/WeightInput.vue'
import vAgeInput from '@/components/AgeInput.vue'
import vSelectInput from '@/components/SelectInput.vue'
import vOutputItem from '@/components/OutputItem.vue'
import { ref } from 'vue'
import { useDrugStore } from '@/stores/drugStore_orig'

const store = useDrugStore()



const selected = ref([])
const ageInput = ref('')
const weightInput = ref(0)

const getDose = (w, m, s) =>{
    store 
} 
</script>

<style lang="scss" >

</style>