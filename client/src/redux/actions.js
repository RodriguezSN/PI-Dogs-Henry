import { CLEAN_DETAIL, FILTER_ORIGIN, FILTER_TEMPERAMENT, GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOG_BY_ID, GET_DOG_BY_NAME, ORDER_DOG } from "./actions-types"
import axios from "axios"

export const getAllDogs = () => {
    return async (dispatch)=>{
        try {
            const {data} = await axios.get(`http://localhost:3001/dogs`)
            const {apiResult, dbResult} = data
            const dataConcat = apiResult.concat(dbResult)
            return dispatch({
                type: GET_ALL_DOGS, payload: dataConcat
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const getDogByName = (name) => {
    return async (dispatch) => {
        if(name === ""){
            return dispatch(getAllDogs())
        }
        try {
            const {data} = await axios.get(`http://localhost:3001/dogs/name?name=${name}`)
            const {apiResult, dbResult} = data
            const dataConcat = apiResult.concat(dbResult)
            return dispatch({
                    type: GET_DOG_BY_NAME, payload: dataConcat
                })
        } catch (error) {
         console.log(error)   
        }
    }
}

export const getDogById = (origen, id) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:3001/dogs/${id}`)

            const perroFinal = null

            if(origen === "api"){
                perroFinal = data.apiResult
            }else if(origen === "db"){
                perroFinal = data.dbResult
            }
    
    return dispatch({
        type: GET_DOG_BY_ID, payload: perroFinal
    })
        } catch (error) {
            console.log(error)
        }
    }
}

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
}

export const orderDogs = (order) => {
    return {
        type: ORDER_DOG, payload: order
    }
}

export const filterTemperament = (temperament) => {
    return {
        type: FILTER_TEMPERAMENT, payload: temperament
    }
}

export const filterOrigin = (origin) => {
    return {
        type: FILTER_ORIGIN, payload: origin
    }
}

export const getAllTemperaments = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:3001/temperaments`)
            return dispatch({
                type: GET_ALL_TEMPERAMENTS, payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}