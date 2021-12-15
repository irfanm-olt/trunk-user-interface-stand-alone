import request from '../../../utils/fetch';

// add part
export const addPart = ({ partSection, partName }) => 
    request.post(`/parts/createPart`, { partSection, partName })

// fetch part
export const loadPart = ({ query }) => 
    request.post(`/parts/fetchPart`, {  query })

// fetch part section
export const fetchPartSection = () => 
    request.get(`/partSections/loadParts`)

// delete data
export const deletePart = ({ id }) =>
    request.post(`/parts/deleteParts`, { id })

// update data
export const updatePart = ({ datas }) =>
    request.post(`/parts/updateParts`, { datas })