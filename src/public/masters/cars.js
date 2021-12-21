import React, { Component } from 'react'
import {
  CForm,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PropTypes from "prop-types";
import CreatableSelect from 'react-select/creatable';
import { connect } from "react-redux";
import { createCar, loadCar, deleteCar, updateCar } from 'src/modules/masters/car/actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';
class Make extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacture: '',
      carName: '',
      button: 'ADD',
      ID: '',
    }
    this.loadCar = this.loadCar.bind(this);
  }

  delete = (id) => {
    if (window.confirm("Are you sure?")) {  
      this.props.deleteCar({id});  
    }  
  } 

  edit = (data) => {
    this.setState({
      manufacture: { 'value': data.ManufactureID, 'label': data.manufacture.Name },
      carName: data.CarName,
      ID: data.ID,
      button: 'UPDATE'
    })
  }

  //update
  update = e => {
    e.preventDefault();
    const formData = this.state;
    if(formData.manufacture === "")
    {
      NotificationManager.warning("Manufacture is required");
      return false;
    }

    if(formData.carName === "")
    {
      NotificationManager.warning("Car is required");
      return false;
    }
    
    const datas = {};
    datas.manufacture = formData.manufacture.value;
    datas.carName = formData.carName;
    datas.id = formData.ID;
    this.props.updateCar({datas});
    this.setState({carName: '', manufacture: ''})
  }

  clear = () => {
    this.setState({
      manufacture: '',
      button: 'ADD',
      carName: ''
    })
  }

  componentDidMount() {
    this.loadCar();
  }

  componentDidUpdate( prevProps ) {
    const { 
      createSuccess,
      createError,
      deleteSuccess,
      deleteError,
      updateSuccess,
      updateError
    } = this.props;
    const { 
      createSuccess: prevCreateSuccess, 
      createError: prevcreateError,
      deleteSuccess: prevdeleteSuccess ,
      deleteError: prevdeleteError,
      updateSuccess: prevupdateSuccess,
      updateError: prevupdateError
    } = prevProps;

    // create success
    if(createSuccess && createSuccess !== prevCreateSuccess) {
        NotificationManager.success("Car created successfully");
    }

    // create success
    if(createError !== null && createError !== prevcreateError) {
        NotificationManager.error(createError);
    }

    // delete success
    if(deleteSuccess && deleteSuccess !== prevdeleteSuccess) {
        NotificationManager.warning("Car deleted successfully");
    }

    // delete error
    if(deleteError && deleteError !== prevdeleteError) {
        NotificationManager.error(deleteError);
    }
    // update success
    if(updateSuccess && updateSuccess !== prevupdateSuccess) {
      NotificationManager.success("Car updated successfully");
    }

    // update error
    if(updateError && updateError !== prevupdateError) {
      NotificationManager.error(updateError);
    }
    this.loadCar();
  }

  loadCar = () => {
    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.props.pager.currentPage) {
      const query = {};
      query.pages = page;
      this.props.loadCar({ query });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChange = ( manufacture ) => {
    this.setState({ manufacture });
  };

  add = e => {
    e.preventDefault();
    const formData = this.state;
    if(formData.manufacture === "")
    {
      NotificationManager.warning("Manufacture is required");
      return false;
    }

    if(formData.carName === "")
    {
      NotificationManager.warning("Car is required");
      return false;
    }
    
    const car = {};
    car.manufacture = formData.manufacture.value;
    car.carName = formData.carName
    this.props.createCar(car);
    this.setState({carName: '', manufacture: ''})

  };

  render() {
    const { manufacture, car, pager } = this.props;
    const options = manufacture ? manufacture.map((item, index) => {
      return { value: item.ID, label: item.Name }
    }): null;
    return (
      <>
        <CRow>
        <NotificationContainer/>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardBody>
                <CForm className="form-horizontal" noValidate onSubmit={this.state.button === 'ADD' ? this.add: this.update}>
                  <CFormGroup row>
                      <CCol xs="4" md="4">
                        <CreatableSelect
                          isClearable
                          id="manufacture" 
                          name="manufacture"
                          value={this.state.manufacture}
                          options={options}
                          placeholder="Eg: Toyota"
                          onChange={this.handleChange}
                        />
                      </CCol>
                      <CCol xs="4" md="4">
                        <CInput 
                            type="text" 
                            id="carName" 
                            name="carName"
                            value={this.state.carName}
                            placeholder="Eg: Yaris"
                            onChange={this.onChange}
                          />
                      </CCol>
                      <CCol xs="4" md="2">
                        <CButton type="submit" className="float-right btn-block" color="primary"><CIcon name="cil-save" />&nbsp;
                           { this.state.button }
                        </CButton>
                      </CCol>
                      <CCol xs="4" md="2">
                        <CButton onClick={() => this.clear()} type="button" className="float-right btn-block" color="secondary"><CIcon name="cil-x" />&nbsp;
                           CLEAR
                        </CButton>
                      </CCol>
                  </CFormGroup>
                </CForm>
                <table className="table table-striped">
                    <thead>
                      <tr>
                          <th>
                            <span>#</span>
                          </th>
                          <th>
                              <span>Car</span>
                          </th>
                          <th>
                            <span>Manufacture</span>
                          </th>
                          <th>
                              <span>Action</span>
                          </th>
                      </tr>
                    </thead>
                    <tbody>
                      {car ? car.map((item, index) => 
                        <tr className='expandable-row'>
                            <td>{pager.pages && pager.pages.length ? pager.startIndex + index +1: index+1}</td>
                            <td>{item.CarName}</td>
                            <td>
                                {item.manufacture.Name}
                            </td>
                            <td>
                                <button className="action-button">
                                  <CIcon onClick={() => this.edit(item)} name="cil-pencil" height="18" alt="Edit"/>
                                </button>
                                <button className="action-button">
                                  <CIcon onClick={() => this.delete(item.ID)} name="cil-trash" height="18" alt="Delete"/>
                                </button>
                            </td>
                        </tr>
                      ):'null'}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4">
                          <div className="float-right">
                            {pager.pages && pager.pages.length > 0 &&
                                <ul className="pagination">
                                    <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                        <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                                    </li>
                                    <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                        <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Previous</Link>
                                    </li>
                                    {pager.pages.map(page =>
                                        <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                            <Link id={pager.currentPage} to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                        </li>
                                    )}
                                    <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                        <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                                    </li>
                                    <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                        <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                                    </li>
                                </ul>
                            }                    
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

Make.propTypes = {
  manufacture: PropTypes.object.isRequired,
  car: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  manufacture: state.car.manufactures,
  car: state.car.cars,
  pager: state.car.pager,
  createSuccess: state.car.createSuccess,
  createError: state.car.createError,
  deleteSuccess: state.car.deleteSuccess,
  deleteError: state.car.deleteError,
  updateSuccess: state.car.updateSuccess,
  updateError: state.car.updateError
});


export default connect(
  mapStateToProps,
  { createCar, loadCar, deleteCar, updateCar }
)( Make );
