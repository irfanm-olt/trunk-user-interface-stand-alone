import request from '../../../utils/fetch';

// add data
export const addPartSection = ({ sectionName }) => 
    request.post(`/partSections/createPartSection`, { sectionName })

// fetch data
export const loadPartSection = ({query}) => 
    request.post(`/partSections/loadPartSection`, {query})

// delete data
export const deletePartSection = ({ id }) =>
    request.post(`/partSections/deletePartSection`, { id })

// update data
export const updatePartSection = ({ datas }) =>
    request.post(`/partSections/updatePartSection`, { datas })