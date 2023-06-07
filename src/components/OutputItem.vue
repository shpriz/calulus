<!-- @format -->

<template>
  <div>
  <h3 class="title is-3 has-text-info-dark">Результаты расчета:</h3>

  <div class="level-left">
    <div class="level-item">
      <h4 class="is-4"><span class="has-text-info-dark mr-2">Лекарственный препарат:</span>  {{ store.originalTitle }}
        
        </h4> 
    </div>
    <div class="level-item">
      
    </div>
  </div>

<div class="columns mt-3">
  <div class="column is-5">
      <div class="level-left">
        <h4 class="is-5 has-text-info-dark mr-2">Дозировка, мг:</h4>
          <div class="level-item" v-for="dailydose in store.getDose">
            <h4 class="is-4">{{ dailydose }}</h4>
          </div>
      </div>
     
        <div v-if="store.maximized" class="column">
          <div class="level-left">
            <p class="level-item help has-background-danger-light	">Вы достигли максимальной суточной дозы!</p>
          </div>
      </div>
    
    </div>

      
      <div class="column is-7">
        <h4 class="is-4">
          <span class="has-text-info-dark">Прием</span> {{ store.takiningDrugPerDay }}
        </h4>
      </div>
  </div>

  <div class="columns">
    <div class="column">
      <div class="level-left">
        <h4 class="is-4 level-item has-text-info-dark">Способ введения: </h4>
        <div class="level-item" v-for="way in store.wayTakiningDrug">
          <h4 class="is-4"> {{ way }}&nbsp;</h4>
        </div>
      </div>
    </div>

  </div>
  <div class="">
    <h4 class="is-4 has-text-danger-dark"> {{ store.isInformationNeed }}</h4>
    <h4 class="is-4 has-text-danger-dark"> {{ store.isComissionNeed }}</h4>
  </div>
 

  

  
  
  
  {{ store.agePerson }} -
        {{ store.getDose }} - <br>
        {{ store.getDrugById(store.selectedDrugId) }} - <br>
  </div>
</template>

<script setup>
/* 
   imports
*/

import { useDrugStore } from '@/stores/drugStore_orig'
import {ref} from 'vue'



const store = useDrugStore()

const drug = ref(0)



</script>

<style lang="scss" scoped></style>
