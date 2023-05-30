import { defineStore } from "pinia";

// function _calcDose (age, weight ) {
//     return [age * weight ]
// }



export const useDrugStore = defineStore('drugStore', {
    state: () => {
        return {
            weightPerson: 0,
            agePerson: 0, 
            agemonthPerson: 0,
            selectedDrugId:0,
            drugs: [],
            dosePerKG:[],
            dose:[],
            maximized: false,
            enabled: false,
            counts: 1
        }
    },

    actions: {
        async fill() {
            this.drugs = (await import('@/data/drugs.json')).default;
        },

        getWeight(amount){
            this.weightPerson = amount
        },

        getAge(amount){
            this.agePerson = amount
        },

        getmonthAge(amount){
            this.agemonthPerson = amount
        },


        selectedIdDruf(amount) {
            this.selectedDrugId = amount
        }

       
    },

    getters: {
        getDose: (state) => {
            let age = state.agePerson
            let monthage = state.agemonthPerson
            let weight = state.weightPerson
            let index = state.selectedDrugId
            let dose = []
            let perkg = []
            let w = 0
            let maxDoseAfter14 = 0
            let maxDoseBefore14 = 0
            let maxbyMass = 0

            if  ((age !== 0 || monthage !== 0) && weight !== 0 && index !== 0) {
                state.counts = 1
                state.maximized = false

                perkg = state.drugs[index].drugDose.perKg
                maxDoseAfter14 = state.drugs[index].drugDose.after14.max

                maxDoseBefore14 = state.drugs[index].drugDose.before14
                maxbyMass = maxDoseBefore14.byMass



                console.log(perkg)

                if (age > 14  ) {  // Расчет дозы препарата для лиц старше 14 лет || (weight >= 35 && age <= 14)


                    for (let i = 0; i < perkg.length; i++) {
                        if (weight * perkg[i] < maxDoseAfter14[i]) {

                            w = weight * perkg[i]
                            if (w !== 0 || w !== null) {
                                dose.push(w)
                            }
                        } else {
                            state.maximized = true
                            state.enabled = true
                            dose.push(maxDoseAfter14[i])
                        }
                    }


                    if (index === 13) {

                        if (weight <= 60) {
                            state.counts = state.drugs[index].drugDose.after14.less60
                        } else {
                            state.counts = state.drugs[index].drugDose.after14.more60
                        }

                    }

                    if (index === 14 ) {
                        dose.length=0;
                        for (let i=0; i < maxDoseAfter14.length; i++) {
                            dose.push(maxDoseAfter14[i])
                        }
                    }

                    if (index === 17) {
                        state.counts = 'применяется только с карбапенемами! В пересчете на клавулановую кислоту с каждой дозой карбапенемов (2-3) '
                    }

                    if (index === 18) {
                        if (weight > 30) {
                            state.counts = state.drugs[index].notes
                            dose.push('1000 + 1000')
                        }

                    }


                    if (index === 19) {
                        state.counts = 'применяется только с амоксициллин + клавуланововая кислота ' + 3 + ' '

                    }


                if (index ===  21){
                    dose.length = 0;
                    if (age >=14 && age < 17) {
                        for (let i = 0; i < maxDoseBefore14.y9.length; i++) {
                            w = weight * perkg[i]
                            if (w < maxDoseBefore14.y9[i]) {
                                state.maximized = false
                                dose.push(w)
                                state.counts = 2

                            } else {
                                state.maximized = true
                                dose.push(maxDoseBefore14.y9[i])
                                state.counts = 2

                            }
                        }
                    }
                    else {
                        if (weight < 50){
                            state.maximized = false

                            w = weight * 500
                            if (w < 1000) {
                                state.maximized = false
                                dose.push(w)

                            } else {
                                state.maximized = true
                                dose.push(1000)
                            }

                            w = weight * 750
                            if (w < 1000) {
                                state.maximized = false
                                dose.push(w)

                            } else {
                                state.maximized = true
                                dose.push(1000)
                            }

                        }
                        else
                        {
                            state.maximized = true
                            dose.push(1000)

                        }
                    }
                  }

                }
                else {  // расчет дозы препарата для лиц младше 14 лет



                    state.maximized = false

                    for (let i = 0; i < perkg.length; i++) {
                         w = weight * perkg[i]
                         if (w < maxDoseAfter14) {
                            state.maximized = false
                            dose.push(w)
                             }
                         else {
                             state.maximized = true
                             state.enabled = true
                             dose.push(maxDoseAfter14[0])
                         }
                    }


                        if (index === 11) {
                            if (age > 7 && age < 14) {
                                for (let i = 0; i < maxDoseBefore14.y2.length; i++) {
                                    w = weight * perkg[i]
                                    if (w < maxDoseBefore14.y2.max) {
                                        state.maximized = false
                                        dose.push(w)
                                    } else {
                                        state.maximized = true
                                        dose.push(maxDoseBefore14.y2[i])

                                    }

                                }
                                state.counts = state.drugs[index].drugDose.after14.less60

                            } else {
                                dose.push('неприменимо')
                                state.counts = state.drugs[index].drugDose.after14.more60

                            }
                        }

                        if (index === 14 ) {


                            for (let i = 0; i < perkg.length; i++) {
                                if (weight * perkg[i] < maxDoseAfter14[i]) {

                                    w = weight * perkg[i]
                                    if (w !== 0 || w !== null) {

                                        dose.push(w)
                                    }
                                } else {
                                    state.maximized = true
                                    state.enabled = true
                                    dose.push(maxDoseAfter14[i])
                                }
                            }

                            if (age < 1 && monthage <= 11){
                                dose.length = 0;
                                for (let i = 0; i < maxDoseBefore14.m3.length; i++) {
                                    w = weight * perkg[i]
                                    if (w < maxDoseBefore14.m3.max) {
                                        state.maximized = false
                                        dose.push(w)
                                    } else {
                                        state.maximized = true
                                        dose.push(maxDoseBefore14.m3[i])

                                    }

                                }
                            }

                            if (age > 7 && age < 14 ){
                                dose.length =0;

                            }


                        }

                         if (index === 15) {
                             state.counts = ''

                             if (age < 6) {
                                 dose.length = 0;
                                 dose.push('неприменимо')
                             }

                             else {
                                 if ( age < 12) {
                                     state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю (с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                     dose.push(200)

                                     if (weight >= 15 && weight <= 30) {
                                         state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю (с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                         dose.push(200)
                                     }
                                     else {
                                         dose.length = 0;
                                         dose.push('неприменимо')
                                     }
                                 }

                                 if (age >= 12 && age <= 14) {

                                     if (weight > 30) {
                                         dose.push(400)
                                         state.counts = 'ежедневно в первые 2 недели, затем 200 мг 3 раза в неделю (с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                     }
                                     else {
                                         dose.push('Наверное 200')
                                         state.counts = ''
                                     }

                                 }
                                 else {
                                     dose.length = 0;
                                     dose.push('неприменимо')
                                 }
                             }
                         }
                    if (index === 17) {

                        state.counts = 1
                        if (weight <= 6) {
                            for (let i = 0; i < maxbyMass.kg6.max.length; i++) {
                                w = weight * perkg[i]

                                if (w < maxbyMass.kg6.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                } else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg6.max[i])
                                }

                            }
                        }

                        if (weight > 6 && weight <= 9) {
                            for (let i = 0; i < maxbyMass.kg9.max.length; i++) {
                                w = weight * perkg[i]

                                if (w < maxbyMass.kg9.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                } else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg9.max[i])
                                }

                            }
                        }

                        if (weight > 9 && weight <= 15) {
                            for (let i = 0; i < maxbyMass.kg15.max.length; i++) {
                                w = weight * perkg[i]

                                if (w < maxbyMass.kg15.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                } else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg15.max[i])
                                }

                            }
                        }


                        if (weight > 15 && weight <= 23) {
                            for (let i = 0; i < maxbyMass.kg23.max.length; i++) {
                                w = weight * perkg[i]

                                if (w < maxbyMass.kg23.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                } else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg23.max[i])
                                }

                            }
                        }
                        if (weight > 23 && weight <= 30) {
                            for (let i = 0; i < maxbyMass.kg30.max.length; i++) {
                                w = weight * perkg[i]

                                if (w < maxbyMass.kg30.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                } else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg30.max[i])
                                }

                            }
                        }
                        if (weight > 30 && weight <= 34) {
                            for (let i = 0; i < maxbyMass.kg34.max.length; i++) {
                                w = weight * perkg[i]

                                if (w < maxbyMass.kg34.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                } else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg34.max[i])
                                }

                            }
                        }


                    }

                     if (index === 21) {

                         if (age < 3) {
                             dose.length = 0;
                             dose.push('неприменимо')
                             state.counts = 0
                         } // end age < 1


                         else {

                             if (age >= 3 || age <= 5) {
                                 for (let i = 0; i < maxDoseBefore14.y2.length; i++) {
                                     w = weight * perkg[i]
                                     if (w < maxDoseBefore14.y2[i]) {
                                         state.maximized = false
                                         dose.push(w)
                                         state.counts = 2

                                     } else {
                                         state.maximized = true
                                         dose.push(maxDoseBefore14.y2[i])
                                         state.counts = 2
                                     }
                                 }
                             }

                             if (age > 5 && age <= 11) {

                                 for (let i = 0; i < maxDoseBefore14.y6.length; i++) {
                                     w = weight * perkg[i]
                                     if (w < maxDoseBefore14.y6[i]) {
                                         state.maximized = false
                                         dose.push(w)
                                         state.counts = 2

                                     } else {
                                         state.maximized = true
                                         dose.push(maxDoseBefore14.y6[i])
                                         state.counts = 2

                                     }
                                 }
                             }

                             if (age > 11 && age <= 14) {

                                 for (let i = 0; i < maxDoseBefore14.y9.length; i++) {
                                     w = weight * perkg[i]
                                     if (w < maxDoseBefore14.y9[i]) {
                                         state.maximized = false
                                         dose.push(w)
                                         state.counts = 2

                                     } else {
                                         state.maximized = true
                                         dose.push(maxDoseBefore14.y9[i])
                                         state.counts = 2

                                     }
                                 }
                             }
                         }
                     }





                }
                return dose
            }

        },

        getDrugById: (state) => {
            return (drugId) => state.drugs.find((drug) => drug.id === drugId)
          },

          originalTitle : (state) => {
            let index = state.selectedDrugId
            if (index !== 0 ) return state.drugs[index].original_title
            return ''
        },

        wayTakiningDrug : (state) => {
            let index = state.selectedDrugId
            if (index !== 0 ) return state.drugs[index].way_takining_grug
            return ''
        },

        takiningDrugPerDay: (state) => {
            let index = state.selectedDrugId
            if (index !== 0 ) {
            let count  =  state.counts//state.drugs[index].inputs_per_day
            if (count === undefined) { count = 1 }

            let description = count > 1 ? 'раза в день' : 'раз в день'
             return `${count} ${description}`
            }
            return ''
        },

        isInformationNeed: (state) => {
            let index = state.selectedDrugId
            let desc = 'Необходимо наличие информированного согласия законного представителя на применение препарата'
            
            if (index !== 0 )
            { 
                let age = state.agePerson
                let isneed = state.drugs[index].is_information.isneed
                let isvk = state.drugs[index].is_information.is_VK
               
                if ( isneed === true) 
                {
                    if (age <= isvk) return ` ${desc} `
                }
                    
            }
            return ''
        },

        isComissionNeed: (state) => {
            let index = state.selectedDrugId
            let desc = 'Требуется решение врачебной комиссии.'
            
            if (index !== 0 )
            { 
                let age = state.agePerson
                let isneed = state.drugs[index].is_comission.isneed
                let isvk = state.drugs[index].is_comission.is_VK
               
                if ( isneed === true) 
                {
                    if (age <= isvk) return ` ${desc} `
                }
                    
            }
            return ''
        }
    }
})