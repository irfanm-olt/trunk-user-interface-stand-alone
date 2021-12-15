import request from '../../utils/fetch';

export const createCustomer = ( formData ) => 
    request.post(`/customers/createCustomer`,  formData )


// fetch data
export const loadCustomer = ({ query }) => 
    request.post(`/customers/loadCustomers`, { query });

// delete data
export const deleteCustomer = ({ id }) =>
    request.post(`/customers/deleteCustomer`, { id })
