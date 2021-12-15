import { combineReducers } from "redux";
import authReducer from './modules/auth/reducer';
import authErrorReducer from './modules/auth/errors'
import customerReducer from './modules/customer/reducer';
import customerErrorReducer from './modules/customer/errors';
import enquiryReducer from './modules/enquiry/reducer';
import manufactureReducer from './modules/masters/manufacture/reducer';
import carReducer from './modules/masters/car/reducer';
import partSectionReducer from './modules/masters/partSection/reducer';
import partReducer from './modules/masters/part/reducer';

//import errorReducer from "./errorReducers";
export default combineReducers({
  auth: authReducer,
  authErrors: authErrorReducer,
  customer: customerReducer,
  customerErrors: customerErrorReducer,
  manufacture: manufactureReducer,
  car: carReducer,
  partSection: partSectionReducer,
  part: partReducer,
  enquiry: enquiryReducer
});