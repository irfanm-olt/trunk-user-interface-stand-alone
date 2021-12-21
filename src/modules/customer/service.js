import request from '../../utils/fetch';

// create
export const createCustomer = ( formData ) => 
    request.post(`/customers/createCustomer`,  formData )

// update
export const updateCustomer = ( formData ) => 
    request.post(`/customers/updateCustomer`,  formData )

// fetch data
export const loadCustomer = ({ query }) => 
    request.post(`/customers/loadCustomers`, { query });

// load customer by id
export const loadCustomerByID = ({ id }) =>
    request.post(`/customers/getCustomerbyID`, { id })

// delete data
export const deleteCustomer = ({ id }) =>
    request.post(`/customers/deleteCustomer`, { id })
