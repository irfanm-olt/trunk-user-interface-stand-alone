import request from '../../../utils/fetch';

// add data
export const addManufacture = ({ manufacture }) =>
    request.post(`/manufactures/createManufacture`, { manufacture })

// fetch data
export const loadManufacture = ({ query }) =>
    request.post(`/manufactures/loadManufacture`, {query})

// delete data
export const deleteManufacture = ({ id }) =>
    request.post(`/manufactures/deleteManufacture`, { id })

// update data
export const updateManufacture = ({ datas }) =>
    request.post(`/manufactures/updateManufacture`, { datas })