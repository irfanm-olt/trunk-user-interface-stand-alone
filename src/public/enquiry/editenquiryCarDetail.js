import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CLabel,
  CSelect,
  CRow,
  CContainer,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { loadVehicle, loadMasters, updateEnquiryCar } from 'src/modules/enquiry/actions';
// import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; 
let errors = {};

class EditenquiryCarDetail extends Component {
constructor(props) {
  super(props);
  this.state = {
    collapsed: true,
    showElements: true,
    manufacture: '',
    carName: '',
    customer: '',
    chassisNumber: '',
    carID: '',
    modelYear: '',
    variant: '',
    submitButtonType: 'Save',
    enquiryID: ''
  }
  this.handleEnquiry = this.handleEnquiry.bind(this);
}

componentDidUpdate( prevProps ) {
    // enquiry car success
    const { enquiry, updateEnquirySuccess, data } = this.props.data;
    const { enquiry: prevEnquiry, updateEnquirySuccess: prevUpdateEnquirySuccess } = prevProps.data;
    // edit
    if(enquiry && enquiry !== prevEnquiry) {
        this.setState({
            chassisNumber: enquiry.ChassisNO,
            customer: enquiry.CustomerID,
            manufacture: {'label': enquiry.manufacture.Name, 'value': enquiry.manufacture.ID},
            carName: {'label': enquiry.car.CarName, 'value': enquiry.car.ID},
            modelYear: enquiry.Year,
            variant: enquiry.Variant,
            enquiryID: enquiry.ID
        })
    }
    // update
    if(updateEnquirySuccess && updateEnquirySuccess !== prevUpdateEnquirySuccess) {
      const id = this.props.match.params.id;
      this.props.history.push(`../edit-enquiry-parts-header/${id}`);
    }

}

componentDidMount() {
  
  if(this.props.match.params.id)
  {
    var enquiryID = this.props.match.params.id;
  }
  else 
  {
    var enquiryID = 0;
  }

  this.props.loadMasters({ enquiryID });

}

onChange = e => {
  this.setState({ [e.target.id]: e.target.value });
};

handleEnquiry = e => {
    e.preventDefault();
    const formData = this.state;
    

    if(formData.customer === "")
    {
      NotificationManager.warning("Customer is required");
      return false
    }

    if(formData.chassisNumber === "")
    {
      NotificationManager.warning("Chassis number is required");
      return false
    }

    if(formData.manufacture.value === undefined)
    {
      NotificationManager.warning("Manufacture is required");
      return false
    }

    if(formData.carName.value === undefined)
    {
      NotificationManager.warning("Car is required");
      return false
    }

    if(formData.variant === "")
    {
      NotificationManager.warning("Variant is required");
      return false
    }

    const datas = {};
    datas.manufacture = formData.manufacture.value;
    datas.carName = formData.carName.value;
    datas.customer = formData.customer;
    datas.chassisNumber = formData.chassisNumber;
    datas.modelYear = formData.modelYear;
    datas.variant = formData.variant;
    datas.enquiryID = formData.enquiryID;
    this.props.updateEnquiryCar({ datas });
      
};

handleChange1 = ( manufacture ) => {
    this.setState({ manufacture });
};

handleChange2 = ( carName ) => {
    this.setState({ carName });
};

getVehicleInfo = chassisNumber => {
  if(chassisNumber === "")
  {
    NotificationManager.warning("Chassis number is required");
    return false;
  }
  this.props.loadVehicle( chassisNumber );
}

render() {
  const { manufacture, customer, vehicleLoading, car, enquiry } = this.props.data;
  // car
  const carsOptions = car ? car.data.map((item, index) => {
    return { value: item.ID, label: item.CarName }
  }): null;

  // manufacture
  const manufactureOptions = manufacture ? manufacture.data.map((item, index) => {
    return { value: item.ID, label: item.Name }
  }): null;
  return (
    <>
        <CRow>
            <NotificationContainer/>
        </CRow>
        <CForm className="form-horizontal" onSubmit={this.handleEnquiry}>
          <CRow>
          <CCol xs="12" sm="6" lg="5" className="offset-1">
              <CFade timeout={300} in={this.state.showElements} unmountOnExit={true}>
                <CCard>
                  <CCollapse show={this.state.collapsed} timeout={1000}>
                    <CCardBody>
                        <CFormGroup>
                          <CLabel htmlFor="select">Customer</CLabel>
                          <div className="controls">
                            <CSelect custom
                                id="customer" 
                                name="customer"
                                onChange={this.onChange}
                                value={this.state.customer}
                            >
                              <option value="0">Please select</option>
                              {
                                customer ? customer.data.map((item, index) => {
                                  return(
                                    <option value={ item.ID }>{ item.CompanyName }</option>
                                  )
                                }):null
                              }
                            </CSelect>
                            { errors.customer ? <div className="warning-text">{ errors.customer }</div> : null}
                          </div>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="appendedInput">Manufacture</CLabel>
                          <div className="controls">
                            <Select
                                isClearable
                                id="manufacture" 
                                name="manufacture"
                                value={this.state.manufacture}
                                options={manufactureOptions}
                                placeholder="Eg: Toyota"
                                onChange={this.handleChange1}
                            />
                            { errors.manufacture ? <div className="warning-text">{ errors.manufacture }</div> : null}
                          </div>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="appendedInput">Model Year</CLabel>
                          <div className="controls">
                            <CInputGroup>
                              <CInput 
                                size="16" 
                                type="text"
                                id="modelYear" 
                                name="modelYear"
                                onChange={this.onChange}
                                value={this.state.modelYear}
                              />
                            </CInputGroup>
                            { errors.modelYear ? <div className="warning-text">{ errors.modelYear }</div> : null}
                          </div>
                        </CFormGroup>
                    </CCardBody>
                  </CCollapse>
                </CCard>
              </CFade>
            </CCol>
            <CCol xs="12" sm="6" lg="5" className="pr-md-5">
              <CFade timeout={300} in={this.state.showElements} unmountOnExit={true}>
                <CCard>
                  <CCollapse show={this.state.collapsed} timeout={1000}>
                    <CCardBody>
                        <CFormGroup>
                          <CLabel htmlFor="select">Chassis number</CLabel>
                          <div className="controls">
                            <CInputGroup>
                              <CInput 
                                type="text" 
                                placeholder="Chassis Number"
                                id="chassisNumber" 
                                name="chassisNumber"
                                onChange={this.onChange}
                                value={this.state.chassisNumber}
                              />
                              <CInputGroupAppend>
                                {
                                  vehicleLoading ?
                                  <CButton type="button" color="primary"> Searching...</CButton>
                                  :
                                  <CButton onClick={() => { this.getVehicleInfo(this.state.chassisNumber) }} type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                                }
                              </CInputGroupAppend>
                            </CInputGroup>
                            { errors.chassisNumber ? <div className="warning-text">{ errors.chassisNumber }</div> : null}
                          </div>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="appendedInput">Car</CLabel>
                          <div className="controls">
                            <Select
                                isClearable
                                id="carName" 
                                name="carName"
                                value={this.state.carName}
                                options={carsOptions}
                                placeholder="Eg: Etios"
                                onChange={this.handleChange2}
                            />
                            { errors.types ? <div className="warning-text">{ errors.types }</div> : null}
                          </div>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="appendedInput">Variant</CLabel>
                          <div className="controls">
                            <CInputGroup>
                              <CInput 
                                size="16" 
                                type="text"
                                id="variant" 
                                name="variant"
                                onChange={this.onChange}
                                value={this.state.variant}
                              />
                            </CInputGroup>
                            { errors.variant ? <div className="warning-text">{ errors.variant }</div> : null}
                          </div>
                        </CFormGroup>
                    </CCardBody>
                  </CCollapse>
                </CCard>
              </CFade>
            </CCol>
          </CRow>
          <div className="form-buttons align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol className="text-center" lg="12" sm="12">
                  <CButton color="secondary" className="mfe-3" to="/enquiry"><CIcon name="cil-x" /> Cancel</CButton>
                  <CButton type="submit" color="primary" ><CIcon name="cil-save" /> Update</CButton>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </CForm>
      </>
    )
  }
}

EditenquiryCarDetail.propTypes = {
  vehicle: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.enquiry
});
export default connect(
mapStateToProps,
{ loadVehicle, loadMasters, updateEnquiryCar }
)(EditenquiryCarDetail);
