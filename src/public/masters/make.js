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
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import { 
    createManufacture, 
    loadManufacture, 
    deleteManufacture,
    updateManufacture
} from 'src/modules/masters/manufacture/actions';
import 'react-notifications/lib/notifications.css';
import capitalize from 'src/utils/capitalize';

class Make extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacture: '',
      button: 'ADD',
      ID: '',
    }
    this.loadManufacture = this.loadManufacture.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    this.loadManufacture();
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
        NotificationManager.success("Manufacture created successfully");
    }

    // create success
    if(createError !== null && createError !== prevcreateError) {
        NotificationManager.error(createError);
    }

    // delete success
    if(deleteSuccess && deleteSuccess !== prevdeleteSuccess) {
        NotificationManager.warning("Manufacture deleted successfully");
    }

    // delete error
    if(deleteError && deleteError !== prevdeleteError) {
        NotificationManager.error(deleteError);
    }
    // update success
    if(updateSuccess && updateSuccess !== prevupdateSuccess) {
      NotificationManager.success("Manufacture updated successfully");
    }

    // update error
    if(updateError && updateError !== prevupdateError) {
      NotificationManager.error(updateError);
    }

    this.loadManufacture();
  }

  loadManufacture = () => {
    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.props.pager.currentPage) {
      const query = {};
      query.pages = page;
      this.props.loadManufacture({ query });
    }
  }

  delete = (id) => {
    if (window.confirm("Are you sure?")) {  
      this.props.deleteManufacture({id});  
    }  
  } 

  edit = (data) => {
    this.setState({
      manufacture: data.Name,
      ID: data.ID,
      button: 'UPDATE'
    })
  }

  clear = () => {
    this.setState({
      manufacture: '',
      button: 'ADD'
    })
  }


  add = e => {
    e.preventDefault();
    if(this.state.manufacture === "")
    {
      NotificationManager.warning("Manufacture is required");
      return false;
    }

    const formData = this.state;
    const car = {};
    car.manufacture = capitalize(formData.manufacture);
    this.props.createManufacture(car);
    this.setState({manufacture: ''})
  };

  update = e => {
    e.preventDefault();
    if(this.state.manufacture === "")
    {
      NotificationManager.warning("Manufacture is required");
      return false;
    }

    const formData = this.state;
    const datas = {};
    datas.manufacture = capitalize(formData.manufacture);
    datas.id = formData.ID;
    this.props.updateManufacture({datas});
    this.setState({manufacture: ''})
  }

  render() {
    const { data, pager } = this.props;
    return (
      <>
        <CRow>
          <NotificationContainer/>
        </CRow>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardBody>
                <CForm className="form-horizontal" noValidate onSubmit={this.state.button === 'ADD' ? this.add: this.update}>
                  <CFormGroup row>
                      <CCol xs="4" md="8">
                        <CInput 
                            type="text" 
                            id="manufacture" 
                            name="manufacture"
                            value={this.state.manufacture}
                            placeholder="Eg: Toyota"
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
                              <span>Manufacture</span>
                          </th>
                          <th>
                              <span>Action</span>
                          </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data ? data.map((item, index) => 
                        <tr className='expandable-row'>
                            <td>{pager.pages && pager.pages.length ? pager.startIndex + index +1: index+1}</td>
                            <td>
                                {item.Name}
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
                      ):null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3">
                          <div className="float-right">
                            {pager.pages && pager.pages.length &&
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
};


const mapStateToProps = state => ({
  data: state.manufacture.manufactures,
  pager: state.manufacture.pager,
  createSuccess: state.manufacture.createSuccess,
  createError: state.manufacture.createError,
  deleteSuccess: state.manufacture.deleteSuccess,
  deleteError: state.manufacture.deleteError,
  updateSuccess: state.manufacture.updateSuccess,
  updateError: state.manufacture.updateError
});


export default connect(
  mapStateToProps,
  { 
    createManufacture, 
    loadManufacture, 
    deleteManufacture, 
    updateManufacture 
  }
)( Make );
