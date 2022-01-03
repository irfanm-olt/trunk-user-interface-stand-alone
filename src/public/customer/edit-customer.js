import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CInputFile,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCustomerbyID, updateCustomer } from '../../modules/customer/actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import configApi from '../../config/api';

import validator from 'validator';

import $ from 'jquery';
window.jquery = window.$ = $

class EditCustomer extends Component {
  constructor() {
    super();
    this.state = {
      companyName: '',
      contactPersonFirstname: '',
      contactPersonLastname: '',
      contactPersonMobile: '',
      contactPersonMobilePrefix: '+971',
      contactPersonEmail: '',
      companyPhone: '',
      companyPhonePrefix: '+971',
      emirates: '0',
      buildingNumber: '',
      street: '',
      address: '',
      profileImagefile: null,
      tradeLicenseFile: [],
      uploadLicense: [],
      formOpen: true,
      customerID: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

    // profile image button
    $(".profileUploader").on("click", function() {
      $(".profile-upload-button").trigger('click');
    });

    // trade licesnse button
    $(".tradeLicenseUploader").click(function(){
      $("#trade-license-files").trigger('click');
    });

    const ids = this.props.match.params.id;
    this.setState({
      customerID: ids,
    })
    const id = ids;
    this.props.loadCustomerbyID({id});
  }

  componentDidUpdate(prevProps) {
    const { 
      updateSuccess,
      updateError,
      customer,
    } = this.props;
    const { 
      updateSuccess: prevupdateSuccess,
      updateError: prevupdateError,
      customer: prevcustomer
    } = prevProps;

      if(customer != prevcustomer && customer === null) {
        NotificationManager.error("Customer doesn't exist");
        this.setState({formOpen: false})
      }
      if(customer && customer != prevcustomer) {
        this.setState({
            companyName: customer.CompanyName,
            contactPersonFirstname: customer.ContactpersonFirstname,
            contactPersonLastname: customer.ContactpersonLastname,
            contactPersonMobile: customer.ContactpersonMobile,
            contactPersonMobilePrefix: '+971',
            contactPersonEmail: customer.ContactpersonEmail,
            companyPhone: customer.CompanyPhone,
            companyPhonePrefix: '+971',
            emirates: customer.Emirates,
            buildingNumber: customer.BuildingNO,
            street: customer.Street,
            address: customer.Address,
        })
      }

    // update success
    if(updateSuccess && updateSuccess !== prevupdateSuccess) {
      NotificationManager.success("Customer updated successfully");
    }

    // update error
    if(updateError && updateError !== prevupdateError) {
      NotificationManager.error(updateError);
    }
    
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  // reset
  handleReset = (resetForm) => {
    if (window.confirm('Reset?')) {
      resetForm();
    }
  };

  onSubmit = async (e)  => {
    e.preventDefault();
    const customerData = this.state;
    var pattern = new RegExp(/^[0-9\b]+$/);

    // Company Name
    if(customerData.companyName === "") {
      NotificationManager.warning("Company name is required");
      return false;
    }

    // Mobile Number
    if (customerData.contactPersonMobile === "") {
      NotificationManager.warning("Mobile number is required!");
      return false;
    }else if(!pattern.test(customerData.contactPersonMobile)) {
      NotificationManager.warning("Please enter only number.");
      return false;
    }else if(customerData.contactPersonMobile.length !== 9) {
      NotificationManager.warning("Please enter valid phone number.");
      return false;
    }

    // Contact Email
    if(!validator.isEmail(customerData.contactPersonEmail)) {
      NotificationManager.warning("Enter valid email");
      return false;
    }
    this.props.updateCustomer( customerData );
  }

  render() {
    const { profileImagefile, tradeLicenseFile, formOpen, uploadLicense } = this.state;
    return (
      <CRow>
        <NotificationContainer/>
        <CCol xs="12" md="8" className="offset-2">
          <CCard>
            <CCardBody>
              {
                formOpen ?
                  <CForm className="form-horizontal" onSubmit={this.onSubmit}>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-email">Company Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="companyName" 
                            name="companyName"
                            value={this.state.companyName}
                            placeholder="Name of your company"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person First Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="contactPersonFirstname" 
                            name="contactPersonFirstname"
                            value={this.state.contactPersonFirstname}
                            placeholder="First name of contact person"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person Last Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="contactPersonLastname" 
                            name="contactPersonLastname"
                            value={this.state.contactPersonLastname}
                            placeholder="Last name of contact person"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person Mobile</CLabel>
                      </CCol>
                      <CCol xs="12" md="2">
                          <CInput 
                            type="tel" 
                            id="contactPersonMobilePrefix" 
                            name="contactPersonMobilePrefix"
                            value={this.state.contactPersonMobilePrefix}
                            readOnly="readOnly"
                          />
                      </CCol>
                      <CCol xs="12" md="6">
                          <CInput 
                            type="tel" 
                            id="contactPersonMobile" 
                            name="contactPersonMobile"
                            value={this.state.contactPersonMobile}
                            placeholder="55 555 5555"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person Email</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="contactPersonEmail" 
                            name="contactPersonEmail"
                            value={this.state.contactPersonEmail}
                            placeholder="Email ID of contact person"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Company Phone</CLabel>
                      </CCol>
                      <CCol xs="12" md="2">
                          <CInput 
                            type="tel" 
                            id="companyPhonePrefix" 
                            name="companyPhonePrefix"
                            value={this.state.companyPhonePrefix}
                            readOnly="readOnly"
                          />
                      </CCol>
                      <CCol xs="12" md="6">
                          <CInput 
                            type="tel" 
                            id="companyPhone" 
                            name="companyPhone"
                            value={this.state.companyPhone}
                            placeholder="66 666 6666"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Emirates</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CSelect name="emirates" id="emirates" value={this.state.emirates} placeholder="Emirates" onChange={this.onChange} >
                            <option value="0">Please select</option>
                            <option value="1">Abu Dhabi</option>
                            <option value="2">Dubai</option>
                            <option value="3">Sharjah</option>
                            <option value="4">Ajman</option>
                            <option value="5">Umm Al-Quwain</option>
                            <option value="6">Fujairah</option>
                          </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Building Number</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="buildingNumber" 
                            name="buildingNumber"
                            value={this.state.buildingNumber}
                            placeholder="Building Number"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Street</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="street" 
                            name="street"
                            value={this.state.street}
                            placeholder="Street Name"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Address</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="address" 
                            name="address"
                            value={this.state.address}
                            placeholder="Address"
                            onChange={this.onChange}
                          />
                      </CCol>
                    </CFormGroup>
                    
                    <CFormGroup row>
                        <CCol xs="12" md="12" className="text-center">
                          <CButton className="customer-create-button" type="submit" color="primary"><CIcon name="cil-save" /> Update Customer</CButton>
                        </CCol>
                    </CFormGroup>
                  </CForm>
                  :
                  <div className="text-center">Sorry! customer does not exist.</div>
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

EditCustomer.propTypes = {
  customerErrors: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  customerErrors: state.customerErrors,
  customer: state.customer.editCustomer,
  updateSuccess: state.customer.updateSuccess,
  updateError: state.customer.updateError
});
export default connect(
  mapStateToProps,
  { loadCustomerbyID, updateCustomer }
)(EditCustomer);
