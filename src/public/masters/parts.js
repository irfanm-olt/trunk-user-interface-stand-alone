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
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { 
  createPart, 
  loadPart,
  deletePart,
  updatePart,
} from 'src/modules/masters/part/actions';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';
class Part extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partSection: '',
      partName: '',
      button: 'ADD',
      ID: '',
    }
    this.loadPart = this.loadPart.bind(this);
  }

  delete = (id) => {
    if (window.confirm("Are you sure?")) {  
      this.props.deletePart({id});  
    }  
  } 

  edit = (data) => {
    this.setState({
      partSection: { 'value': data.PartsectionID, 'label': data.partSection.Name },
      partName: data.Name,
      ID: data.ID,
      button: 'UPDATE'
    })
  }

  // //update
  update = e => {
    e.preventDefault();
    const formData = this.state;
    if(formData.partSection === "")
    {
      NotificationManager.warning("Part Section is required");
      return false;
    }

    if(formData.partName === "")
    {
      NotificationManager.warning("Part Name is required");
      return false;
    }
    
    const datas = {};
    datas.partSection = formData.partSection.value;
    datas.partName = formData.partName;
    datas.id = formData.ID;
    this.props.updatePart({datas});
    this.setState({partName: '', partSection: ''});
  }

  clear = () => {
    this.setState({
      partSection: '',
      partName: '',
      button: 'ADD',
    })
  }

  componentDidMount() {
    this.loadPart();
  }

  componentDidUpdate() {
    this.loadPart();
  }

  loadPart = () => {
    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.props.pager.currentPage) {
      const query = {};
      query.pages = page;
      this.props.loadPart({ query });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChange = ( partSection ) => {
    this.setState({ partSection });
  };

  add = e => {
    e.preventDefault();
    if(!isEmpty(this.state.partSection))
    {
      const formData = this.state;
      const part = {};
      part.partSection = formData.partSection.value;
      part.partName = formData.partName
      this.props.createPart(part);
      this.setState({partName: '', partSection: ''})
    }
  };

  render() {
    const { partSection, part, pager } = this.props;
    const options = partSection ? partSection.map((item, index) => {
      return { value: item.ID, label: item.Name }
    }): null;
    return (
      <>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardBody>
                <CForm className="form-horizontal" noValidate onSubmit={this.state.button === 'ADD' ? this.add: this.update}>
                  <CFormGroup row>
                      <CCol xs="4" md="4">
                        <CreatableSelect
                          isClearable
                          id="partSection" 
                          name="partSection"
                          value={this.state.partSection}
                          options={options}
                          placeholder="Eg: Toyota"
                          onChange={this.handleChange}
                        />
                      </CCol>
                      <CCol xs="4" md="4">
                        <CInput 
                            type="text" 
                            id="partName" 
                            name="partName"
                            value={this.state.partName}
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
                <table className="table table-hover table-bordered table-striped text-center">
                    <thead>
                      <tr>
                          <th>
                            <span>#</span>
                          </th>
                          <th>
                              <span>Parts</span>
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
                      {part ? part.map((item, index) => 
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.Name}</td>
                            <td>
                                {item.partSection.Name}
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
                        <td colSpan="4">
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

Part.propTypes = {
  partSection: PropTypes.object.isRequired,
  part: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  partSection: state.part.partSection,
  part: state.part.parts,
  pager: state.part.pager
});


export default connect(
  mapStateToProps,
  { 
    createPart, 
    loadPart,
    deletePart,
    updatePart 
  }
)( Part );
