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
import { loadVehicle, loadMasters, addEnquiryCar } from 'src/modules/enquiry/actions';
import CreatableSelect from 'react-select/creatable';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
let errors = {};
class EnquiryCarDetail extends Component {
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
  }
  this.handleEnquiry = this.handleEnquiry.bind(this);
}

componentDidUpdate( prevProps ) {
    // enquiry car success
    const { addEnquirySuccess, data, enquiry } = this.props.data;
    const {addEnquirySuccess: prevSuccess} = prevProps.data;

    // load vehicle success
    const { loadVehicleSuccess } = this.props.data;
    const {loadVehicleSuccess: prevLoadVehicleSuccess} = prevProps.data;

    if (addEnquirySuccess && addEnquirySuccess !== prevSuccess) {
      localStorage.setItem('ENQUIRY-ID', data.ID);
      localStorage.setItem('MANUFACTURE', this.state.manufacture.label);

      this.props.history.push('./enquiry-parts-header');
    }
    
    if (loadVehicleSuccess && loadVehicleSuccess !== prevLoadVehicleSuccess) {
        this.setState({
          manufacture: {'label': this.props.data.vehicleData.make, 'value': this.props.data.vehicleData.make},
          carName: {'label': this.props.data.vehicleData.model, 'value': this.props.data.vehicleData.model},
          modelYear: this.props.data.vehicleData.manufacture_year,
          variant: this.props.data.vehicleData.model_desc
        });
    }

}

componentDidMount() {
  const enquiryID = 0;
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

    if(formData.manufacture.label === undefined)
    {
      NotificationManager.warning("Manufacture is required");
      return false
    }

    if(formData.carName.label === undefined)
    {
      NotificationManager.warning("Car is required");
      return false
    }

    if(formData.variant === "")
    {
      NotificationManager.warning("Variant is required");
      return false
    }

      const enquiry = {};
      enquiry.manufacture = formData.manufacture.label;
      enquiry.carName = formData.carName.label;
      enquiry.customer = formData.customer;
      enquiry.chassisNumber = formData.chassisNumber;
      enquiry.modelYear = formData.modelYear;
      enquiry.variant = formData.variant;
      this.props.addEnquiryCar(enquiry);
      
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
            <CCol xs="12" sm="6" lg="5" className="pfs-md-5 col-md-offset-1 col-lg-offset-1">
              <CFade timeout={300} in={this.state.showElements} unmountOnExit={true}>
                <CCard>
                  <CCollapse show={this.state.collapsed} timeout={1000}>
                    <CCardBody>
                        <CFormGroup>
                          <CLabel htmlFor="select">Add/Select Customer</CLabel>
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
                          <div className="hintText float-right link-to-customer">
                            <span>Can't find customer? </span><Link href="#" to="/customer/add-customer">Add new</Link>
                          </div>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="appendedInput">Manufacture</CLabel>
                          <div className="controls">
                            <CreatableSelect
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
                                  // <CButton type="button" color="primary"> Searching...</CButton>
                                  <button type="button" className="btn btn-primary" >Searching...</button>
                                  :
                                  <button 
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => { this.getVehicleInfo(this.state.chassisNumber) }}
                                  >
                                      <i class="fa fa-search" aria-hidden="true"></i> Search
                                  </button>
                                  // <CButton onClick={() => { this.getVehicleInfo(this.state.chassisNumber) }} type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                                }
                              </CInputGroupAppend>
                            </CInputGroup>
                            { errors.chassisNumber ? <div className="warning-text">{ errors.chassisNumber }</div> : null}
                          </div>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="appendedInput">Car</CLabel>
                          <div className="controls">
                            <CreatableSelect
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
                  <button type="button" className="btn btn-secondary custom-button"><i class="fa fa-times"></i> Cancel</button>
                  <button type="submit" className="btn btn-primary custom-button"><i class="fa fa-save"></i> Save</button>
                  <button type="submit" className="btn btn-primary custom-button"><i class="fa fa-arrow-right"></i> Save &#38; Continue</button>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </CForm>
      </>
    )
  }
}

EnquiryCarDetail.propTypes = {
  vehicle: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.enquiry
});
export default connect(
mapStateToProps,
{ loadVehicle, loadMasters, addEnquiryCar }
)(EnquiryCarDetail);
