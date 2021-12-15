import request from '../../../utils/fetch';

// add data
export const addCar = ({ manufacture, carName }) => 
    request.post(`/cars/createCar`, { manufacture, carName })

// fetch data
export const loadCar = ({query}) => 
    request.post(`/cars/loadCar`, {query})

// fetch manufature
export const fetchManufactures = () => 
    request.get(`/manufactures/loadManufactures`)

// delete data
export const deleteCar = ({ id }) =>
    request.post(`/cars/deleteCar`, { id })

// update data
export const updateCar = ({ datas }) =>
    request.post(`/cars/updateCar`, { datas })