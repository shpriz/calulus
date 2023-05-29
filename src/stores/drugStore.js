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
            dose:['неприменимо'], 
            maximized: false,
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
          
            if  ((age !== 0 | monthage !== 0) & weight !== 0 && index !== 0) {
                state.counts = 1


                perkg = state.drugs[index].drugDose.perKg
                let maxDoseAfter14 = state.drugs[index].drugDose.after14.max

                

                if (age > 14 || (weight >= 35 && age < 14) ) {  // Расчет дозы препарата для лиц старше 14 лет
                    state.counts = 1

                    for (let i = 0; i < perkg.length; i++){
                        if (weight*perkg[i] < maxDoseAfter14[0] ) {
                            state.maximized = false
                            let w =  weight*perkg[i]
                            if (w !== 0 || w !== null){
                                dose.length = 0
                                dose.push(w)
                            }
                               
                        }
                            
                        else {
                            state.maximized = true
                            dose.length = 0
                            dose.push(maxDoseAfter14[0])
                        }

                    }

                    if (index === 13 && age > 14) {
                        if (weight <= 60) { state.counts = state.drugs[index].drugDose.after14.less60 }
                        else {state.counts = state.drugs[index].drugDose.after14.more60}
                    }
                    else {
                        state.counts = state.drugs[index].drugDose.after14.less60
                    }

                    if (index === 15 ) {
                        if (age < 6 ) state.counts = 0
                    }

                    if (index === 18 ) {
                        if (weight > 30) {
                            state.counts = state.drugs[index].notes
                            dose.length = 0
                            dose.push('1000 + 1000')
                        }
                    }

                    if (index === 19 ) {
                        state.counts = 'применяетс я только с амоксициллин + клавуланововая кислота ' + 3 + ' '
                    }
                    
                    if (index === 21 ) {
                        if (age > 14 && age < 17 ) {
                            // dose.push(100)
                            state.counts = 2
                        }
                    }

                }
                else {  // расчет дозы препарата для лиц младше 14 лет
                    state.counts = 1

                    dose = []
                    let maxDoseBefore14 = state.drugs[index].drugDose.before14
                    let maxbyMass = maxDoseBefore14.byMass
                    state.maximized = false
                    let w = 0
                

                    

                    state.counts = 1

                    switch(index){
                        case 1:
                        case 2:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                            if (age < 1) {
                                if (monthage < 3){
                                    for (let i = 0; i < maxDoseBefore14.m3.length; i++){
                                        w = weight * perkg[i]
                                        if (w < maxDoseBefore14.m3.max ) {
                                            state.maximized = false
                                            dose.push(w) 
                                        }
                                        else {
                                            state.maximized = true
                                            dose.push(maxDoseBefore14.m3[i])
                                        }

                                    }
                                }
                                else {
                                    if (monthage >= 3 && monthage < 6) {
                                        for (let i = 0; i < maxDoseBefore14.m6.length; i++){
                                            w = weight * perkg[i]
                                            if (w < maxDoseBefore14.m6[i] ) {
                                                state.maximized = false
                                                dose.push(w)
                                                } 
                                            else {
                                                state.maximized = true
                                                dose.push(maxDoseBefore14.m6[i])
                                            }
                                        }

                                    }
                                }
                            } // end age < 1



                            else {

                                if (monthage > 6 && age < 2){
                                    
                                    for (let i = 0; i < maxDoseBefore14.y2.length; i++){
                                        w = weight * perkg[i]
                                        if (w < maxDoseBefore14.y2[i]) {
                                            state.maximized = false
                                            dose.push(w)
                                            } 
                                        else {
                                            state.maximized = true
                                            dose.push(maxDoseBefore14.y2[i])
                                        }
                                    }
                                }

                                if (monthage >= 2 && age < 4){
                                    
                                    for (let i = 0; i < maxDoseBefore14.y4.length; i++){
                                        w = weight * perkg[i]
                                        if (w < maxDoseBefore14.y4[i]) {
                                            state.maximized = false
                                            dose.push(w)
                                            } 
                                        else {
                                            state.maximized = true
                                            dose.push(maxDoseBefore14.y4[i])
                                        }
                                    }
                                }

                                if (monthage >= 4 && age < 6){
                                    
                                    for (let i = 0; i < maxDoseBefore14.y6.length; i++){
                                        w = weight * perkg[i]
                                        if (w < maxDoseBefore14.y6[i]) {
                                            state.maximized = false
                                            dose.push(w)
                                            } 
                                        else {
                                            state.maximized = true
                                            dose.push(maxDoseBefore16.y6[i])
                                        }
                                    }
                                }


                                if (monthage >= 6 && age < 9){
                                    
                                    for (let i = 0; i < maxDoseBefore14.y9.length; i++){
                                        w = weight * perkg[i]
                                        if (w < maxDoseBefore14.y9[i]) {
                                            state.maximized = false
                                            dose.push(w)
                                            } 
                                        else {
                                            state.maximized = true
                                            dose.push(maxDoseBefore16.y9[i])
                                        }
                                    }
                                }

                                if (monthage >= 9 && age <= 14){
                                    
                                    for (let i = 0; i < maxDoseBefore14.y14.length; i++){
                                        w = weight * perkg[i]
                                        if (w < maxDoseBefore14.y14[i]) {
                                            state.maximized = false
                                            dose.push(w)
                                            } 
                                        else {
                                            state.maximized = true
                                            dose.push(maxDoseBefore16.y14[i])
                                        }
                                    }
                                }

                            }


                            
                        break;
                        
                       
            

                        case 3:
                        case 4:
                        case 10:
                        case 12:
                        case 17:
                        
                        state.counts = 1
                        if (weight <= 6){
                            for (let i = 0; i < maxbyMass.kg6.max.length; i++){
                                w = weight * perkg[i]
                               
                                if ( w < maxbyMass.kg6.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                }
                                else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg6.max[i])
                                }
                               
                            }
                        } 

                        if (weight > 6 && weight <= 9) {
                            for (let i = 0; i < maxbyMass.kg9.max.length; i++){
                                w = weight * perkg[i]
                            
                                if ( w < maxbyMass.kg9.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                }
                                else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg9.max[i])
                                }
                            
                            }
                        }
                        
                        if (weight > 9 && weight <= 15) {
                            for (let i = 0; i < maxbyMass.kg15.max.length; i++){
                                w = weight * perkg[i]
                               
                                if ( w < maxbyMass.kg15.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                }
                                else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg15.max[i])
                                }
                               
                            }
                        }


                        if (weight > 15 && weight <= 23) {
                            for (let i = 0; i < maxbyMass.kg23.max.length; i++){
                                w = weight * perkg[i]
                               
                                if ( w < maxbyMass.kg23.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                }
                                else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg23.max[i])
                                }
                               
                            }
                        }
                        if (weight > 23 && weight <= 30) {
                            for (let i = 0; i < maxbyMass.kg30.max.length; i++){
                                w = weight * perkg[i]
                               
                                if ( w < maxbyMass.kg30.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                }
                                else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg30.max[i])
                                }
                               
                            }
                        }
                        if (weight > 30 && weight <= 34) {
                            for (let i = 0; i < maxbyMass.kg34.max.length; i++){
                                w = weight * perkg[i]
                               
                                if ( w < maxbyMass.kg34.max[i]) {
                                    state.maximized = false
                                    dose.push(w)
                                }
                                else {
                                    state.maximized = true
                                    dose.push(maxbyMass.kg34.max[i])
                                }
                               
                            }
                        }

                        break;

                        default:
                               dose.push(0)
                            break;
                        // default:
                        //     for (let i = 0; i < perkg.length; i++){
                        //         if (weight*perkg[i] < maxDoseAfter14[0] ) {
                        //             state.maximized = false
                        //             let w =  weight*perkg[i]
                        //             if (w !== 0 | w !== null){
                        //                 dose.length = 0
                        //                 dose.push(w)
                        //             }
                                       
                        //         }
                                    
                        //         else {
                        //             state.maximized = true
                        //             dose.length = 0
                        //             dose.push(maxDoseAfter14[0])
                        //         }

                        // break
                    }


                        
                    // if (index === 5 ) {
                    //     state.counts = 1

                    //     if (age === 0 & monthage <= 11 ) {
                    //         for (let i = 0; i < perkg.length; i++){
                    //             w =  weight * perkg[i]
                                
                    //             if ( w > maxDoseBefore14.m3[0]){
                    //                 state.maximized = true
                    //                 dose.push(maxDoseBefore14.m3[0])
                    //             }
                    //             else {
                    //                 state.maximized = false
                    //                 if (w !== 0 | w !== null){
                    //                     dose.push(w)
                    //                 }
                    //             }
                    //         }


                    //         if (monthage < 3 ) {
                    //             dose.push(maxDoseBefore14.m3)
                    //             state.maximized = true

                    //             }     
                            
                    //         if (monthage >= 3 & monthage < 6 ){
                    //             dose.push(maxDoseBefore14.m6)
                    //             state.maximized = true

                    //         }

                    //         if (monthage >= 6 & monthage <=11) {
                    //             dose.push(maxDoseBefore14.y2)
                    //             state.maximized = true
                    //         }

                    //     }
                    //     else {
                    //     state.maximized = false

                    //     if (age < 2) {
                    //         dose.push(maxDoseBefore14.y2[0])
                    //         state.maximized = true
                    //     }
                    //     else {

                    //         if (age >= 2 & age < 3) {
                    //             for (let i = 0; i < perkg.length; i++){
                    //                 w =  weight * perkg[i]
                                    
                    //                 if ( w > maxDoseBefore14.y2[0]){
                    //                     state.maximized = true
                    //                     dose.push(maxDoseBefore14.y2[0])
                    //                 }
                    //                 else {
                    //                     state.maximized = false
                    //                     let w =  weight*perkg[i]
                    //                     if (w !== 0 | w !== null){
                    //                         dose.push(w)
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     }

                    //     if (age >= 3 & age <= 4) {
                    //         state.maximized = false
                    //         for (let i = 0; i < perkg.length; i++){
                    //             w =  weight * perkg[i]
                                
                    //             if ( w > maxDoseBefore14.y4[0]){
                    //                 state.maximized = true
                    //                 dose.push(maxDoseBefore14.y4[0])
                    //             }
                    //             else {
                    //                 state.maximized = false
                    //                 dose.push(w)
                    //             }
                    //         }

                    //     }

                    //     if (age > 4 & age <= 6) {
                    //         state.maximized = false
                    //         for (let i = 0; i < perkg.length; i++){
                    //             w =  weight * perkg[i]
                                
                    //             if ( w > maxDoseBefore14.y6[0]){
                    //                 state.maximized = true
                    //                 dose.push(maxDoseBefore14.y6[0])
                    //             }
                    //             else {
                    //                 state.maximized = false
                    //                 dose.push(w)
                    //             }
                    //         }
                    //     }

                    //     if (age >= 7 & age < 9) {
                    //         state.maximized = false
                    //         for (let i = 0; i < perkg.length; i++){
                    //             w =  weight * perkg[i]
                                
                    //             if ( w > maxDoseBefore14.y9[0]){
                    //                 state.maximized = true
                    //                 dose.push(maxDoseBefore14.y9[0])
                    //             }
                    //             else {
                    //                 state.maximized = false
                    //                 dose.push(w)
                    //             }
                    //         }
                    //     }

                    //     if (age >= 9 & age <= 14) {
                    //         state.maximized = false
                    //         for (let i = 0; i < perkg.length; i++){
                    //             w =  weight * perkg[i]
                                
                    //             if ( w > maxDoseBefore14.y14[0]){
                    //                 state.maximized = true
                    //                 dose.push(maxDoseBefore14.y14[0])
                    //             }
                    //             else {
                    //                 state.maximized = false
                    //                 dose.push(w)
                    //             }
                    //         }
                    //     }




                    //     }
                     //}

                  //  if (index === 3 | index === 4 | index === 5 | index === 10 | index === 12 | index === 13 | index === 17 ) {
                        // state.counts = 1
                        // if (weight <= 6){
                        //     for (let i = 0; i < maxbyMass.kg6.max.length; i++){
                        //         w = weight * perkg[i]
                               
                        //         if ( w < maxbyMass.kg6.max[i]) {
                        //             state.maximized = false
                        //             dose.push(w)
                        //         }
                        //         else {
                        //             state.maximized = true
                        //             dose.push(maxbyMass.kg6.max[i])
                        //         }
                               
                        //     }
                        // } 
    
       
                        // if (weight > 6 & weight <= 9) {
                        //     for (let i = 0; i < maxbyMass.kg9.max.length; i++){
                        //         w = weight * perkg[i]
                            
                        //         if ( w < maxbyMass.kg9.max[i]) {
                        //             state.maximized = false
                        //             dose.push(w)
                        //         }
                        //         else {
                        //             state.maximized = true
                        //             dose.push(maxbyMass.kg9.max[i])
                        //         }
                            
                        //     }
                        // }
                        
                        // if (weight > 9 & weight <= 15) {
                        //     for (let i = 0; i < maxbyMass.kg15.max.length; i++){
                        //         w = weight * perkg[i]
                               
                        //         if ( w < maxbyMass.kg15.max[i]) {
                        //             state.maximized = false
                        //             dose.push(w)
                        //         }
                        //         else {
                        //             state.maximized = true
                        //             dose.push(maxbyMass.kg15.max[i])
                        //         }
                               
                        //     }
                        // }


                        // if (weight > 15 & weight <= 23) { 
                        //     for (let i = 0; i < maxbyMass.kg23.max.length; i++){
                        //         w = weight * perkg[i]
                               
                        //         if ( w < maxbyMass.kg23.max[i]) {
                        //             state.maximized = false
                        //             dose.push(w)
                        //         }
                        //         else {
                        //             state.maximized = true
                        //             dose.push(maxbyMass.kg23.max[i])
                        //         }
                               
                        //     }
                        // }
                        // if (weight > 23 & weight <= 30) {
                        //     for (let i = 0; i < maxbyMass.kg30.max.length; i++){
                        //         w = weight * perkg[i]
                               
                        //         if ( w < maxbyMass.kg30.max[i]) {
                        //             state.maximized = false
                        //             dose.push(w)
                        //         }
                        //         else {
                        //             state.maximized = true
                        //             dose.push(maxbyMass.kg30.max[i])
                        //         }
                               
                        //     }
                        // }
                        // if (weight > 30 & weight <= 34) {
                        //     for (let i = 0; i < maxbyMass.kg34.max.length; i++){
                        //         w = weight * perkg[i]
                               
                        //         if ( w < maxbyMass.kg34.max[i]) {
                        //             state.maximized = false
                        //             dose.push(w)
                        //         }
                        //         else {
                        //             state.maximized = true
                        //             dose.push(maxbyMass.kg34.max[i])
                        //         }
                               
                        //     }
                        // }
                    //}

                    if (index === 14) {
                        
                    }

                    if (index === 15 ) {
                        if ((age > 6 & age < 12 ) & (weight >= 15 & weight <= 30 )){
                        state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю (с 3 недели перерыв между приемом препарата не менее 48 часов)'
                        
                        dose.push(200)
                        }

                        if (age > 12 && weight > 30) {
                            dose.push(400)
                            state.counts = 'ежедневно в первые 2 недели, затем 200 мг 3 раза в неделю (с 3 недели перерыв между приемом препарата не менее 48 часов)'

                        }

                    }

                    

                    if (index === 17 ) {
                        state.counts = 'применяется только с карбапенемами! В пересчете на клавулановую кислоту с каждой дозой карбапинемов (2-3) '
                    }

                    if (index === 18) {
                        state.counts = 0
                    }
                    if (index === 19 ) {
                        state.counts = 'применяетс я только с амоксициллин + клавуланововая кислота ' + 3 + ' '
                    }



                    

                    // if (index === 19) {
                    //     state.counts = 'применяетс я только с амоксициллин + клавуланововая кислота ' + 3
                    // }

                    if (index === 21 ) {
                        dose.length = 0
                        if (age < 3 ) { 
                            dose.length = 0
                            dose.push(0)
                            state.counts = 2
                        }

                        if (age >=3 && age <= 5 ) {
                            dose.splice(0, dose.length);
                            dose.push(50)
                            state.counts = 2
                        }

                        if (age >=6 && age <= 11 ) {
                            dose.splice(0, dose.length);
                            dose.push(60)
                            state.counts = 2
                        }

                        if (age > 11 && age <= 14 ) {
                            dose.splice(0, dose.length);
                            dose.push(100)
                            state.counts = 2
                        }
                       
                    }

                }
                    
            }

            return dose

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