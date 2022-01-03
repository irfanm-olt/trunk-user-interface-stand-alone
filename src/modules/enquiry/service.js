import request from '../../utils/fetch';

export const loadVehicle = (chassisNumber) =>
  request.get(`https://car-insurance.salama.ae/motor/search/vehicle/chassisnumbers/ajax/?chassisnumber=`, chassisNumber);

  // fetch manufature
export const fetchManufactures = () => 
request.get(`/manufactures/loadManufactures`)

// fetch car
export const fetchCars = () => 
request.get(`/cars/loadCars`)

// fetch customers
export const fetchCustomers = () => 
    request.get(`/customers/loadCustomer`)

// fetch parts
export const fetchParts = () =>
    request.get(`/parts/fetchPartsAll`);

// add enquiry car
export const addEnquiryCar = ({ manufacture, carName, customer, chassisNumber, modelYear, variant }) =>
    request.post(`/enquiryCarDetails/createEnquiryCarDetails`, { manufacture, carName, customer, chassisNumber, modelYear, variant });

// add part number
export const addPartNumber = ({ datas }) =>
    request.post(`/enquiryPartHeaders/addPartNumber`, { datas });

// load enquiry parts
export const loadEnquiryPartHeader = ({ enquiryID }) => 
    request.post(`/enquiryPartHeaders/loadEnquiryPartHeader`, { enquiryID });

// load part headers
export const loadPartHeader = ({ enquiryID }) => 
    request.post(`/enquiryPartHeaders/loadPartHeader`, { enquiryID });

// get manufacture id by enquiry id
export const getManufactureByID = ({ enquiryID }) => 
    request.post(`/enquiryCarDetails/getManufactureByID`, { enquiryID });

// get cars by manufacture id
export const getCarsByManufacture = ({id}) => 
    request.post(`/enquiryCarDetails/getCarsbyManufacture`,  {id} );

// add enquiry part header
export const addEnquiryPartHeader = ({ datas }) =>
    request.post(`/enquiryPartHeaders/createEnquiryPartHeader`, { datas });

// add enquiry part header
export const updateEnquiryPartHeader = ({ datas }) =>
    request.post(`/enquiryPartHeaders/updateEnquiryPartHeader`, { datas });

// add price 
export const addpartPrice = ({ datas }) =>
    request.post(`/enquiryPartDetails/createEnquiryPartDeatils`, { datas });

// delete part price
export const deletepartPrice = ({ id }) =>
    request.post(`/enquiryPartDetails/deleteEnquiryPartDeatils`, id)

// load part details
export const loadEnquiryPartDetails = ({ partheaderID }) => 
    request.post(`/enquiryPartDetails/loadEnquiryPartDeatils`, { partheaderID });

// load enquiry car details
export const loadEnquiryCarDetails = ({ query }) => 
    request.post(`/enquiryCarDetails/loadEnquiryCarDetail`, { query });

// load enquiry part details
export const loadPartDetail = ({ enquiryID }) =>
    request.post(`/enquiryPartDetails/loadPartDeatil`, { enquiryID });

// delete enquiry
export const deleteEnquiry = ({ id }) => 
    request.post(`/enquiryCarDetails/deleteEnquiry`, { id });

// get enquiry by id
export const getEnquirybyID = ({ enquiryID }) => 
    request.post(`/enquiryCarDetails/getEnquirybyID`, { enquiryID })

// update enquiry
export const updateEnquiryCar = ({ datas }) => 
    request.post(`/enquiryCarDetails/updateEnquiryCarDetails`, { datas })