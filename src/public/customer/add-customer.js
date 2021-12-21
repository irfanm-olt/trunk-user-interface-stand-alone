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
import { createCustomer } from '../../modules/customer/actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import validator from 'validator';

import $ from 'jquery';
window.jquery = window.$ = $

class AddCustomer extends Component {
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
      profileImagefile: '',
      tradeLicenseFile: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.removeTradeLicense = this.removeTradeLicense.bind(this);
    this.saveTradeLicenseFiles = this.saveTradeLicenseFiles.bind(this);
    this.saveProfileImageFile = this.saveProfileImageFile.bind(this);
  }

  componentDidUpdate( prevProps ) {
    const { 
      createSuccess,
      createError,
    } = this.props;
    const { 
      createSuccess: prevCreateSuccess, 
      createError: prevcreateError,
    } = prevProps;

    // create success
    if(createSuccess && createSuccess !== prevCreateSuccess) {
        Object.keys(this.state).map((key, index) => {
            this.setState({[key] : ""});
        });
        NotificationManager.success("Customer created successfully");
    }

    // create success
    if(createError !== null && createError !== prevcreateError) {
        NotificationManager.error(createError);
    }

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

    //Company Name
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

    const formData = new FormData();
    formData.append("companyName", customerData.companyName);
    formData.append("contactPersonFirstname", customerData.contactPersonFirstname);
    formData.append("contactPersonLastname", customerData.contactPersonLastname);
    formData.append("contactPersonMobile", customerData.contactPersonMobile);
    formData.append("contactPersonEmail", customerData.contactPersonEmail);
    formData.append("companyPhone", customerData.companyPhone);
    formData.append("emirates", customerData.emirates);
    formData.append("buildingNumber", customerData.buildingNumber);
    formData.append("street", customerData.street);
    formData.append("address", customerData.address);
    formData.append("profileImagefile", customerData.profileImagefile);
    for (const key of Object.keys(this.state.tradeLicenseFile)) {
      formData.append('tradeLicenseFile', this.state.tradeLicenseFile[key])
    }
    this.props.createCustomer( formData );
  }

  // Save Profile Images
  saveProfileImageFile = (e) => {
    this.setState({
      profileImagefile: e.target.files[0]
    });
  }

  // Save Trade License
  saveTradeLicenseFiles = (e) => {
    this.setState({ tradeLicenseFile: e.target.files })
  }

  closeProfilePreviewContainer = () => {
    this.setState({
      profileImagefile: ''
    })
  }

  removeTradeLicense = (key) => {
    const { tradeLicenseFile } = this.state;
    const fileListArr = Array.from(tradeLicenseFile);
    fileListArr.splice(key, 1);
    this.setState({
      tradeLicenseFile: fileListArr
    })
  }

  render() {
    const { profileImagefile, tradeLicenseFile } = this.state;
    return (
      <CRow>
        <NotificationContainer/>
        <CCol xs="12" md="8" className="offset-2">
          <CCard>
            <CCardBody>
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
                        value="+971"
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
                        value="+971"
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
                      <CLabel htmlFor="hf-password">Adress</CLabel>
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
                  <CCol md="4">
                      <CLabel htmlFor="hf-password">Upload trade license</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <div className='profile-container'>
                      <CInputFile id="trade-license-files" name="tradeLicenseFile" onChange={this.saveTradeLicenseFiles} multiple/>
                      {
                        Object.keys(tradeLicenseFile).map((key, index) => 
                          <div className='profile-image-preview-container trade-link'>
                            <img
                              src={tradeLicenseFile[key]? URL.createObjectURL(tradeLicenseFile[key]) : null} 
                              alt={tradeLicenseFile[key]? tradeLicenseFile[key].name : null}/>
                            <div onClick={() => this.removeTradeLicense(key)} className="profile-close-container">
                              <i class="fa fa-trash fa-lg"></i>
                            </div>
                          </div>
                        )
                      }
                      <div className='tradeLicenseUploader'>
                        <div className='icon-container'>
                          <i class="fa fa-image fa-2x"></i>
                          <p className='icon-text'>Upload trade license</p>
                        </div>
                      </div>
                    </div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                      <CLabel htmlFor="hf-password">Upload profile image/  company logo</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                      <div className='profile-container'>
                        <CInputFile className="profile-upload-button" id="file-input" name="profileImagefile" onChange={this.saveProfileImageFile}/>
                        {
                          profileImagefile !== '' ?
                          <div className='profile-image-preview-container'> 
                            <img
                              src={profileImagefile? URL.createObjectURL(profileImagefile) : ''} 
                              alt={profileImagefile? profileImagefile.name : null}/>
                            <div onClick={this.closeProfilePreviewContainer} className="profile-close-container">
                              <i class="fa fa-trash fa-lg"></i>
                            </div>
                          </div>
                          :
                          <></>
                        }
                        <div className='profileUploader'>
                          <div className='icon-container'>
                            <i class="fa fa-image fa-2x"></i>
                            <p className='icon-text'>Upload profile image</p>
                          </div>
                        </div>
                      </div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol xs="12" md="12" className="text-center">
                      <CButton className="customer-create-button" type="submit" color="primary"><CIcon name="cil-save" /> CREATE CUSTOMER</CButton>
                    </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

AddCustomer.propTypes = {
  customerErrors: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  customerErrors: state.customerErrors,
  customer: state.customer,
  createSuccess: state.customer.createSuccess,
  createError: state.customer.createError,
});
export default connect(
  mapStateToProps,
  { createCustomer }
)(AddCustomer);
