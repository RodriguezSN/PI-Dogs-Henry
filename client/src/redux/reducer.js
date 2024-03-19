import { CLEAN_DETAIL, FILTER_ORIGIN, FILTER_TEMPERAMENT, GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOG_BY_ID, GET_DOG_BY_NAME, ORDER_DOG } from "./actions-types"

const initialState = {
    allDogs: [],
    allDogsCopy: [],
    allTemperaments: [],
    allTemperamentsCopy: [],
    detailDog: [],
    filterTemperament: "default",
    filterOrigin: "default"
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_ALL_DOGS: 
            return {
                ...state,
                allDogs: action.payload,
                allDogsCopy: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload,
                allTemperamentsCopy: action.payload
            }
        case GET_DOG_BY_NAME:
            return {
                ...state,
                allDogs: action.payload
            }
        case GET_DOG_BY_ID:
            return {
                ...state,
                detailDog: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detailDog: {}
            }
        case ORDER_DOG: {
            switch(action.payload){
                case "ascendente":{
                    const allDogsASC = [...state.allDogs].sort( (a,b) => a.nombre.localeCompare(b.nombre))
                    return {
                        ...state,
                        allDogs: allDogsASC
                    }
                }
                case "descendente": {
                    const allDogsDES = [...state.allDogs].sort( (a,b) => b.nombre.localeCompare(a.nombre))
                    return {
                        ...state,
                        allDogs: allDogsDES
                    }
                }
                case "menosPeso": {
                    const allDogsMenosPeso = [...state.allDogs].sort( (a,b) => {
                        const pesoA = parseInt(a.peso.split(" - ")[1])
                        const pesoB = parseInt(b.peso.split(" - ")[1])
                        return pesoA - pesoB
                    })
                    return {
                        ...state,
                        allDogs: allDogsMenosPeso
                    }
                }
                case "masPeso": {
                    const allDogsMasPeso = [...state.allDogs].sort( (a,b) => {
                        const pesoA = parseInt(a.peso.split(" - ")[1])
                        const pesoB = parseInt(b.peso.split(" - ")[1])
                        return pesoB - pesoA
                    })
                    return{
                        ...state,
                        allDogs: allDogsMasPeso
                    }
                }
                default: {
                    return {
                        ...state
                    }
                }
            }
        }
        case FILTER_TEMPERAMENT: 
            if(state.filterOrigin !== "default"){
                const allDogsFilterOrigin = state.filterOrigin === "api" ? [...state.allDogs].filter((dog) => dog?.origin === "api") : [...state.allDogs].filter( (dog) => dog?.origin === "db")
                const allDogsFilterTemperament = action.payload === "default" ? allDogsFilterOrigin : allDogsFilterOrigin.filter( (dog) => dog?.allTemperaments.some((temperamento) => temperamento === action.payload))
                return {
                    ...state,
                    allDogs:allDogsFilterTemperament,
                    filterTemperament: action.payload
                }
            }
        case FILTER_ORIGIN: 
        if(state.filterTemperament !== "default" ){
            const allDogsFilterTemperament = [...state.allDogs].filter( (dog) => dog.temperamento.some( temperamento => temperamento === state.filterTemperament))
            if(action.payload === "api"){
                const allDogsFilterOrigin = allDogsFilterTemperament.filter((dog) => dog?.origin === "api")
                return {
                    ...state,
                    allDogs: allDogsFilterOrigin,
                    filterOrigin: action.payload
                }
            }else{
                const allDogsFilterOrigin = action.payload === "default" ? allDogsFilterTemperament : allDogsFilterTemperament.filter((dog) => dog?.origin === "db")
                return {
                    ...state,
                    allDogs: allDogsFilterOrigin,
                    filterOrigin: action.payload
                }
            }
        }else{
            if(action.payload === "api"){
                const allDogsFilterOrigin = action.payload === "default" ? [...state.allDogs] : [...state.allDogs].filter((dog) => dog?.origin === "api")
                return {
                    ...state,
                    allDogs: allDogsFilterOrigin,
                    filterOrigin: action.payload
                }
            }else{
                const allDogsFilterOrigin = action.payload === "default" ? [...state.allDogs] : [...state.allDogs].filter((dog) => dog?.origin === "db")
                return {
                    ...state,
                    allDogs: allDogsFilterOrigin,
                    filterOrigin: action.payload
                }
            }
        }
        default: 
        return {
            ...state
        }
    }
}

export default reducer

