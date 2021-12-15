import * as Actions from './constants';


export function createCar({ manufacture, carName }) {
    return {
        type: Actions.ADD_CAR,
        manufacture,
        carName
    }
}

export function loadCar({query}) {
   return {
       type: Actions.LOAD_CAR,
       query
   }
}

export function deleteCar({id}) {
    return {
        type: Actions.DELETE_CAR,
        id
    }
}

export function updateCar({ datas }) {
    return {
        type: Actions.UPDATE_CAR,
        datas
    }
}