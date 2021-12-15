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
import { connect } from "react-redux";
import { 
  createPartSection, 
  loadPartSection,
  deletePartSection,
  updatePartSection,
} from 'src/modules/masters/partSection/action';
import isEmpty from 'is-empty';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import capitalize from 'src/utils/capitalize';
class PartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionName: '',
      button: 'ADD',
      ID: '',
    }
    this.loadPartSection = this.loadPartSection.bind(this);
  }

  // delete
  delete = (id) => {
    if (window.confirm("Are you sure?")) {  
      this.props.deletePartSection({id});  
    }  
  } 

  //edit
  edit = (data) => {
    this.setState({
      sectionName: data.Name,
      ID: data.ID,
      button: 'UPDATE'
    })
  }

  //clear
  clear = () => {
    this.setState({
      sectionName: '',
      button: 'ADD'
    })
  }

  add = e => {
    e.preventDefault();
    if(this.state.sectionName === "")
    {
      NotificationManager.warning("Section is required");
      return false;
    }

    const formData = this.state;
    const partSection = {};
    partSection.sectionName = capitalize(formData.sectionName);
    this.props.createPartSection(partSection);
    this.setState({sectionName: ''})
  };

  //update
  update = e => {
    e.preventDefault();
    if(this.state.sectionName === "")
    {
      NotificationManager.warning("Part Section is required");
      return false;
    }

    const formData = this.state;
    const datas = {};
    datas.sectionName = capitalize(formData.sectionName);
    datas.id = formData.ID;
    this.props.updatePartSection({datas});
    this.setState({sectionName: ''})
  }

  componentDidMount() {
    this.loadPartSection();
  }

  componentDidUpdate(prevProps) {
    this.loadPartSection();
  }

  loadPartSection = () => {
    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.props.pager.currentPage) {
      const query = {};
      query.pages = page;
      this.props.loadPartSection({ query });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleCar = e => {
    e.preventDefault();
    if(!isEmpty(this.state.sectionName))
    {
      const formData = this.state;
      const partSection = {};
      partSection.sectionName = formData.sectionName;
      this.props.createPartSection(partSection);
      this.setState({sectionName: ''})
    }
  };

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
                            id="sectionName" 
                            name="sectionName"
                            value={this.state.sectionName}
                            placeholder="Eg: Break System"
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
                <table className="table table-hover table-bordered table-striped text-center">
                    <thead>
                      <tr>
                          <th>
                            <span>#</span>
                          </th>
                          <th>
                              <span>Part Section</span>
                          </th>
                          <th>
                              <span>Action</span>
                          </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data ? data.map((item, index) => 
                        <tr>
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

PartSection.propTypes = {
  partSection: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  data: state.partSection.partSections,
  pager: state.partSection.pager
});


export default connect(
  mapStateToProps,
  { 
    createPartSection, 
    loadPartSection,
    deletePartSection,
    updatePartSection
  }
)( PartSection );
