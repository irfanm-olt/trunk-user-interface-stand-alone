import * as Actions from './constants';


export function createPart({ partSection, partName }) {
    return {
        type: Actions.ADD_PART,
        partSection,
        partName
    }
}

export function loadPart({ query }) {
   return {
       type: Actions.LOAD_PART,
       query
   }
}

export function deletePart({id}) {
    return {
        type: Actions.DELETE_PART,
        id
    }
}

export function updatePart({ datas }) {
    return {
        type: Actions.UPDATE_PART,
        datas
    }
}