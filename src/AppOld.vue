<!-- @format -->

<template>
  <div class="container">
    <div class="row">
      <p class="fs-3 mt-4">
        {{ counterData.doseTitle }}
      </p>
    </div>
    <div class="row">
      <p class="fs-2">Исходные данные</p>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="input-group mb-3">
          <span class="input-group-text" id="UserWeightInput">Вес, кг</span>
          <input
            type="text"
            max="100"
            min="0"
            maxlength="4"
            class="form-control"
            aria-label="UserWeight"
            v-model.number="counterData.weightPerson"
            v-autofocus
          />
          <span class="input-group-text">Возраст, лет</span>
          <input
            type="text"
            max="100"
            min="0"
            maxlength="3"
            class="form-control"
            aria-label="ageInput"
            v-model.number="counterData.ageinput"
          />
        </div>
      </div>

      <div class="col-md-6">
        <select
          class="form-select"
          aria-label="Drugs"
          v-model="counterData.drugItem"
          @change="onSelectChangeItem(event)"

          
        >
          <option value="0" disabled>Выберите препарат...</option>
          <option v-for="drug in store.drugs" :key="drug.id" v-bind:value="drug">
            {{ drug.original_title }} 
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <vOutputItem v-bind="counterData"/>
    </div>
  </div>
</template>

<script setup>
import { useDrugStore } from '@/stores/drugStore_orig';
import { ref, reactive } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';
import vOutputItem from '@/components/OutputItem.vue';

// TODO: использовать реактивный компонент

const store = useDrugStore()
store.fill();




const counterData = reactive({
  doseTitle:
    'Калькулятор дозировок противотуберкулезных препаратов для лечения туберкулеза и латентной туберкулезной инфекции у детей и подростков',
  drugItem: [],
  weightPerson: 0,
  ageinput: 0
});

const onSelectChangeItem = event => {
  counterData.dr = event.target.value
}


</script>

<style scoped></style>
