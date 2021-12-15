import * as Actions from './constants';


export function createPartSection({ sectionName }) {
    return {
        type: Actions.ADD_PART_SECTION,
        sectionName,
    }
}

export function loadPartSection({ query }) {
   return {
       type: Actions.LOAD_PART_SECTION,
       query
   }
}

export function deletePartSection({id}) {
    return {
        type: Actions.DELETE_PART_SECTION,
        id
    }
}

export function updatePartSection({ datas }) {
    return {
        type: Actions.UPDATE_PART_SECTION,
        datas
    }
}