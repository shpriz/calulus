import {defineStore} from "pinia";

// function _calcDose (age, weight ) {
//     return [age * weight ]
// }

var ismaximumDose = false

function getDose(weight, drug) {

    let doem = []
    let w = 0

    for (let i = 0; i < drug['drugDose']['perKg'].length; i++) {
        ismaximumDose = false
        w = weight * drug['drugDose']['perKg'][i]

        if (w <= drug['drugDose']['after14']['max'][0])
            doem.push(w)

        else {
            doem.push(drug['drugDose']['after14']['max'][0])
            ismaximumDose = true
        }
    }


    return doem
}

function getDosearray(weight, massiv, drug) {

    let doem = []
    let w = 0
    ismaximumDose = false

    for (let i = 0; i < massiv.length; i++) {
        w = weight * massiv[i]

        if (w <= drug['drugDose']['after14']['max'][0])
            doem.push(w)
        else {
            doem.push(drug['drugDose']['after14']['max'][0])
            ismaximumDose = true
        }
    }


    return doem
}

function getDoseByMass2(weight, drug) {

    let doses = []
    let w = 0

    for (let i = 0; i < drug['drugDose']['perKg'].length; i++) {

        w = weight * drug['drugDose']['perKg'][i]

        if (weight < 5) doses.push("вес ребенка менее 5 кг")

        else if (weight >= 5 && weight <= 6) {
            if (w < drug['drugDose']['before14']['byMass']["0"]["max"]) {
                doses.push(w)
                ismaximumDose = false
            } else {
                doses = drug['drugDose']['before14']['byMass']["0"]["max"]
                ismaximumDose = true
            }
        } else if (weight >= 7 && weight <= 9) {
            if (w < drug['drugDose']['before14']['byMass']["1"]["max"]) {
                doses.push(w)
                ismaximumDose = false
            } else {
                doses = drug['drugDose']['before14']['byMass']["1"]["max"]
                ismaximumDose = true
            }
        } else if (weight >= 10 && weight <= 15) {
            if (w < drug['drugDose']['before14']['byMass']["2"]["max"]) {
                doses.push(w)
                ismaximumDose = false
            } else {
                doses = drug['drugDose']['before14']['byMass']["2"]["max"]
                ismaximumDose = true
            }
        } else if (weight >= 16 && weight <= 23) {
            if (w < drug['drugDose']['before14']['byMass']["3"]["max"]) {
                doses.push(w)
                ismaximumDose = false
            } else {
                doses = drug['drugDose']['before14']['byMass']["3"]["max"]
                ismaximumDose = true
            }
        } else if (weight >= 24 && weight <= 30) {
            if (w < drug['drugDose']['before14']['byMass']["4"]["max"]) {
                doses.push(w)
                ismaximumDose = false
            } else {
                doses = drug['drugDose']['before14']['byMass']["4"]["max"]
                ismaximumDose = true
            }
        } else if (weight >= 31 && weight <= 34) {
            if (w < drug['drugDose']['before14']['byMass']["5"]["max"]) {
                doses.push(w)
                ismaximumDose = false
            } else {
                doses = drug['drugDose']['before14']['byMass']["5"]["max"]
                ismaximumDose = true
            }
        } else {
            doses = drug['drugDose']['perKg']
        }
    }
    return doses
}


function getDoseByMass(weight, drug) {

    let doses = []

    if (weight < 5) doses.push("вес ребенка менее 5 кг")
    else if (weight >= 5 && weight <= 6) doses = drug['drugDose']['before14']['byMass']["0"]["max"]
    else if (weight >= 7 && weight <= 9) doses = drug['drugDose']['before14']['byMass']["1"]["max"]
    else if (weight >= 10 && weight <= 15) doses = drug['drugDose']['before14']['byMass']["2"]["max"]
    else if (weight >= 16 && weight <= 23) doses = drug['drugDose']['before14']['byMass']["3"]["max"]
    else if (weight >= 24 && weight <= 30) doses = drug['drugDose']['before14']['byMass']["4"]["max"]
    else if (weight >= 31 && weight <= 34) doses = drug['drugDose']['before14']['byMass']["5"]["max"]
    else {
        doses = drug['drugDose']['perKg']
    }
    return doses
}


function getDoseByMassfrom35to60(weight) {
    let dose = []


    return dose;
}

function getDoseByMassmore60(weight) {
    let dose = []


    return dose;
}


export const useDrugStore = defineStore('drugStore', {
    state: () => {
        return {
            weightPerson: 0,
            agePerson: 0,
            agemonthPerson: 0,
            selectedDrugId: 0,
            drugs: [],
            dosePerKG: [],
            dose: [],
            maximized: false,
            enabled: false,
            counts: 1
        }
    },

    actions: {
        async fill() {
            this.drugs = (await import('@/data/drugs.json')).default;
        },

        getWeight(amount) {
            this.weightPerson = amount
        },

        getAge(amount) {
            this.agePerson = amount
        },

        getmonthAge(amount) {
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
            // let perkg = []
            let w = 0
            // let maxDoseAfter14 = 0
            // let maxDoseBefore14 = 0
            // let maxbyMass = 0
            let drug = ''

            if ((age !== 0 || monthage !== 0) && weight !== 0 && index !== 0) {

                drug = state.drugs[index]
                // perkg = state.drugs[index].drugDose.perKg
                // maxDoseAfter14 = state.drugs[index].drugDose.after14.max
                //
                // maxDoseBefore14 = state.drugs[index].drugDose.before14
                // maxbyMass = maxDoseBefore14.byMass


                // for (let i = 0; i < perkg.length; i++) {
                //     w = weight * perkg[i]
                //
                //     if (maxDoseAfter14.length > 1) {
                //         if (w <= maxDoseAfter14[i]) {
                //             state.maximized = false
                //             dose.push(w)
                //         } else {
                //             state.maximized = true
                //             dose.push(maxDoseAfter14[i])
                //         }
                //     } else {
                //         if (w <= maxDoseAfter14[0]) {
                //             state.maximized = false
                //             dose.push(w)
                //         } else {
                //             state.maximized = true
                //             dose.push(maxDoseAfter14[0])
                //         }
                //     }
                // }


                if (age < 14) { // less 14

                    switch (index) {
                        case 0:

                            break;


                        case 16:
                        case 11:
                        case 9:
                        case 8:
                        case 7:
                        case 6:
                        case 2:
                        case 1:

                            state.counts = drug['inputs_per_day']

                            for (let i = 0; i < drug['drugDose']['perKg'].length; i++) {
                                w = weight * drug['drugDose']['perKg'][i]

                                if (w < drug['drugDose']['after14']['max']) {
                                    ismaximumDose = false
                                    dose.push(w)
                                } else {
                                    ismaximumDose = true
                                    dose.push(drug['drugDose']['after14']['max'][0])
                                }
                            }

                            break;


                        case 3: //Пиразинамид

                            if (age >= 1 || monthage <= 11) {
                                ismaximumDose = false
                                if (weight < 35) {
                                    dose = getDoseByMass(weight, drug)

                                } else if (weight >= 35) {
                                    dose = getDose(weight, drug)
                                }
                            } else {
                                dose = getDosearray(weight, [30, 40], drug)

                                // ismaximumDose = true
                            }
                            break;

                        case 4: // Этамбутол
                            if (age < 14) {

                                ismaximumDose = false

                                if (weight < 35) {
                                    dose = getDoseByMass(weight, drug)

                                } else if (weight >= 35) {
                                    dose = getDose(weight, drug)
                                }
                            } else {
                                dose = getDosearray(weight, [15, 25], drug)

                                ismaximumDose = true
                            }
                            break;


                        case 5:

                            ismaximumDose = false

                            if (age <= 2 || (age < 1 && monthage <= 11)) {
                                ismaximumDose = true
                                if (monthage < 3) dose.push(weight * 10)
                                else if (monthage >= 3 && monthage < 6) dose.push(weight * 10)
                                else if (monthage >= 6 && age <= 2) {

                                    dose.push(weight * 20)

                                }


                            } else if (age > 2) {
                                w = weight * 20

                                if (age >= 3 && age <= 4) {
                                    ismaximumDose = false;
                                    if (w < 300) {
                                        dose.push(w);
                                    } else {
                                        dose.push(300);
                                        ismaximumDose = true;
                                    }
                                } else if (age >= 5 && age <= 6) {
                                    ismaximumDose = false;
                                    if (w < 350) {
                                        dose.push(w);
                                    } else {
                                        dose.push(350);
                                        ismaximumDose = true;
                                    }
                                } else if (age >= 7 && age < 9) {
                                    ismaximumDose = false;
                                    if (w < 400) {
                                        dose.push(w);
                                    } else {
                                        dose.push(400);
                                        ismaximumDose = true;
                                    }
                                } else if (age >= 9 && age <= 14) {
                                    if (w < 500) {
                                        dose.push(w);
                                    } else {
                                        dose.push(500);
                                        ismaximumDose = true;
                                    }
                                }
                            }


                            break;


                        case 10:
                            ismaximumDose = false
                            let ppp = getDoseByMass(weight, drug)
                            if (weight < 35) {
                                dose = ppp
                                ismaximumDose = true
                            } else if (weight >= 35) {
                                ismaximumDose = true
                                dose = getDose(weight, drug)
                            }
                            // }
                            // else {
                            //     dose = getDosearray(weight, [30, 40], drug)
                            //
                            //     ismaximumDose = true
                            // }
                            break;

                        case 12:

                            if (age < 14 && weight <= 35) {
                                ismaximumDose = false
                                if (weight < 34) {
                                    dose = getDoseByMass(weight, drug)
                                    ismaximumDose = true
                                } else if (weight >= 34) {
                                    dose = getDose(weight, drug)
                                    ismaximumDose = true
                                }
                            } else {
                                dose = getDosearray(weight, [15, 20], drug)

                                ismaximumDose = true

                            }


                            break;

                        case 13:

                            ismaximumDose = false
                            if (weight < 35) {
                                dose = getDoseByMass(weight, drug)
                                ismaximumDose = true

                            } else {
                                dose = getDose(weight, drug)
                            }

                            break;

                        case 14:
                            if (age < 1 && monthage <= 11) {
                                dose = getDosearray(weight, [200, 300], drug)
                            } else {
                                dose = getDosearray(weight, [200], drug)
                            }
                            break;

                        case 15:
                            if (age < 6) dose.push('неприменимо до 6 лет')
                            else if (age >= 6 && age < 12) {
                                if (weight >= 15 && weight <= 30) {
                                    state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю (с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                    dose.push(200)
                                } else if (weight < 15) {
                                    dose.push('недостаточный вес')
                                    state.counts = ''
                                } else {
                                    state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю(с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                    dose.push(400)
                                }
                            } else {
                                state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю(с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                dose.push(400)
                            }
                            break;

                        case 17:

                            if (weight >= 5) {
                                state.counts = 'Применяется только с карбапенемами!  В пересчете на клавулановую кислоту с каждой дозой карбапинемов (2-3 р/д)'
                                ismaximumDose = true
                                dose = getDoseByMass(weight, drug)
                            } else {
                                dose = getDoseByMass(weight, drug)
                                state.counts = ''
                                ismaximumDose = true
                            }
                            break;

                        case 18:
                            ismaximumDose = false
                            dose.push('неприменимо до 14 лет')
                            state.counts = ''

                            break;

                        case 19:
                            state.counts = '2 - 3 раза в день. Применяется только с амоксициллиновая + клавулановая кислота.'
                            dose = getDoseByMass(weight, drug)
                            break;

                        case 20:

                            ismaximumDose = false
                            if (age > 12) {
                                dose.push(10 * weight)
                                state.counts = '2 -3 раза в день'
                            } else {
                                dose.push('неприменимо до 12 лет')
                                state.counts = ''
                            }

                            break;

                        case 21:
                            ismaximumDose = false
                            if (age >= 3 && age <=5 ) {
                                dose.push(25 * weight)
                                state.counts = 2

                            }
                            else if (age >= 6 && age <= 11) {
                                dose.push(50 * weight)
                            }
                            else if (age >=12 ) {
                                dose.push(100 * weight)
                            }
                            else {
                                dose.push('неприменимо до 3 лет')
                                state.counts = ''
                            }

                            break;

                    }


                    // if (dose.length === 3) {
                    //     dose.splice(1, 0, ' - ')
                    //     dose.splice(3, 0, ' - ')
                    // }
                    if (dose.length === 2) {
                        dose.splice(1, 0, ' - ')

                        if (dose[0] === dose[2]) {
                            dose.splice(1, 3)
                        }
                    }

                    state.maximized = ismaximumDose
                    return dose

                } else if (age >= 14 && age <= 17) { // from 14 to 17

                    switch (index) {

                        case 0:


                            break;

                        case 1:
                        case 2:
                            dose = getDose(weight, drug)

                            break;

                        case 3:

                            if (age > 14 && weight >= 34) {
                                dose = getDosearray(weight, [20, 30], drug)
                                // dose.push(weight * 30)

                            } else if (age < 15 && weight <= 34) {
                                dose = getDosearray(weight, [30, 40], drug)
                            } else {
                                dose = getDosearray(weight, [20, 40], drug)

                            }


                            break;
                        case 4:
                            if (age > 14 && weight >= 34) {
                                dose = getDosearray(weight, [10, 20], drug)
                                // dose.push(weight * 30)

                            } else if (age < 15 && weight <= 34) {
                                dose = getDosearray(weight, [15, 25], drug)
                            }

                            else {
                                dose = getDosearray(weight, [15, 25], drug)

                            }

                            break;


                        case 5:
                            dose = getDose(weight, drug)

                            break;


                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 16:
                            state.counts = drug['inputs_per_day']

                            for (let i = 0; i < drug['drugDose']['perKg'].length; i++) {
                                w = weight * drug['drugDose']['perKg'][i]

                                if (w < drug['drugDose']['after14']['max']) {
                                    ismaximumDose = false
                                    dose.push(w)
                                } else {
                                    ismaximumDose = true
                                    dose.push(drug['drugDose']['after14']['max'][0])
                                }
                            }

                            break;

                        case 12: // Циклосерин

                            if (weight >= 34) dose = getDose(weight, drug)
                            else if (age < 15 && weight <= 34) {
                                dose = getDosearray(weight, [15, 20], drug)
                            } else {
                                dose = getDosearray(weight, [15, 20], drug)

                            }


                            break;
                        case 13:
                            ismaximumDose = true
                            dose.push(300)

                            if (weight <= 60) {
                                state.counts = state.drugs[index].drugDose.after14.less60
                            } else {
                                state.counts = state.drugs[index].drugDose.after14.more60
                            }

                            break;
                        case 14:
                            dose.push(10000)
                            dose.push(15000)
                            ismaximumDose = true

                            break;
                        case 15:
                            if (weight >= 15 && weight <= 30) {
                                state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю (с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                dose.push(200)
                            } else if (weight < 15) {
                                dose.push('недостаточный вес')
                                state.counts = ''
                            } else {
                                state.counts = 'ежедневно в первые 2 недели, затем 100 мг 3 раза в неделю(с 3 недели перерыв между приемом препарата не менее 48 часов)'
                                dose.push(400)
                            }


                            break;

                        case 17:
                            state.counts = ''
                            if (age >= 14 && weight > 23) {
                                state.counts = 'В пересчете на клавулановую кислоту с каждой дозой карбапенемов (2-3 р/д)'
                                dose = getDoseByMass(weight, drug)
                                ismaximumDose = true

                            } else {
                                dose = getDoseByMass(weight, drug)
                                state.counts = 'В пересчете на клавулановую кислоту с каждой дозой карбапенемов (2-3 р/д)'
                                ismaximumDose = true

                            }
                            break;
                        case 18:

                            if (age >= 14) {
                                if (weight >= 30) {
                                    dose.push('1000 + 1000 ')
                                    state.counts = '2 р/д в сочетнании с амоксициллин + клавулановая кислота в дозе 25-125 мг в пересчете на клавулановую кислоту с каждой дозой карбапенемов'
                                    ismaximumDose = true

                                } else {
                                    dose.push('недостаточный вес')
                                }
                            } else {
                                dose.push('неприменимо до 14 лет')
                                state.counts = ''
                            }

                            break;
                        case 19: // Меропенем
                            state.counts = ''
                            ismaximumDose = false
                            if (weight > 30) {
                                state.counts = '2 - 3 раза в день. Применяется только с амоксициллиновая + клавулановая кислота.'
                                dose = getDoseByMass(weight, drug)
                            } else {
                                state.counts = '3 раза в день. Применяется только с амоксициллиновая + клавулановая кислота.'
                                dose = getDoseByMass(weight, drug)
                            }


                            break;

                        case 20:
                            ismaximumDose = false
                            dose.push(10 * weight)
                            state.counts = '2 -3 раза в день'
                            break;
                        case 21:
                            state.counts = 2
                            if (age >=12 ) {
                                dose.push(100 * weight)
                            }


                            break;


                    }


                    if (dose.length === 2) {
                        dose.splice(1, 0, ' - ')

                        if (dose[0] === dose[2]) {
                            dose.splice(1, 3)
                        }
                    }

                    state.maximized = ismaximumDose
                    return dose
                } else if (age > 17 && age < 18) { // moree 17
                    dose.push('Service not available')


                    if (dose.length === 2) {
                        dose.splice(1, 0, ' - ')

                        if (dose[0] === dose[2]) {
                            dose.splice(1, 3)
                        }
                    }

                    state.maximized = ismaximumDose
                    return dose

                }

            }
            // return dose
        },

        getDrugById: (state) => {
            return (drugId) => state.drugs.find((drug) => drug.id === drugId)
        },

        isComissionNeed: (state) => {
            let index = state.selectedDrugId
            let desc = 'Требуется решение врачебной комиссии.'

            if (index !== 0) {
                let age = state.agePerson
                let isneed = state.drugs[index].is_comission.isneed
                let isvk = state.drugs[index].is_comission.is_VK

                if (isneed === true) {
                    if (age <= isvk) return ` ${desc} `
                }

            }
            return ''
        },

        isInformationNeed: (state) => {
            let index = state.selectedDrugId
            let desc = 'Необходимо наличие информированного согласия законного представителя на применение препарата'

            if (index !== 0) {
                let age = state.agePerson
                let isneed = state.drugs[index].is_information.isneed
                let isvk = state.drugs[index].is_information.is_VK

                if (isneed === true) {
                    if (age <= isvk) return ` ${desc} `
                }

            }
            return ''
        },

        originalTitle: (state) => {
            let index = state.selectedDrugId
            if (index !== 0) return state.drugs[index].original_title
            return ''
        },

        takiningDrugPerDay: (state) => {
            let index = state.selectedDrugId
            if (index !== 0) {
                let count = state.counts//state.drugs[index].inputs_per_day
                let description = ''
                if (count === undefined) {
                    count = ''
                }
                if (typeof (count) === "string") {
                    description = ' '
                } else
                    description = count > 1 ? 'раза в сутки' : 'раз в сутки'

                return `${count} ${description}`
            }
            return ''
        },

        wayTakiningDrug: (state) => {
            let index = state.selectedDrugId
            if (index !== 0) return state.drugs[index].way_takining_grug
            return ''
        }
    }
})