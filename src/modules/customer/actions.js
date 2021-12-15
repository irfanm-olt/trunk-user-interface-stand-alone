import * as Actions from "./constants";

export function createCustomer( formData ) {
    return {
        type: Actions.CREATE_CUSTOMER,
        formData
    }
}


 export function loadCustomer({ query }) {
    return {
        type: Actions.LOAD_CUSTOMER,
        query
    }
}

export function deleteCustomer({id}) {
    return {
        type: Actions.DELETE_CUSTOMER,
        id
    }
}