import * as Actions from './constants';


export function createManufacture({ manufacture }) {
    return {
        type: Actions.ADD_MANUFACTURE,
        manufacture,
    }
}

export function loadManufacture({query}) {
   return {
       type: Actions.LOAD_MANUFACTURE,
       query
   }
}

export function deleteManufacture({id}) {
    return {
        type: Actions.DELETE_MANUFACTURE,
        id
    }
}

export function updateManufacture({ datas }) {
    return {
        type: Actions.UPDATE_MANUFACTURE,
        datas
    }
}