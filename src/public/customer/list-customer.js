import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCustomer, deleteCustomer } from 'src/modules/customer/actions';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';

class ListCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.loadCustomer = this.loadCustomer.bind(this);
  }

  delete = (id) => {
    if (window.confirm("Are you sure?")) {  
      this.props.deleteCustomer({id});  
    }  
  } 

  componentDidUpdate() {
    this.loadCustomer();
  }

  componentDidMount() {
    this.loadCustomer();
  }

  loadCustomer = () => {
    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.props.pager.currentPage) {
      const query = {};
      query.pages = page;
      this.props.loadCustomer({ query });
    }
  }

  render() {
    const { data, pager } = this.props;
    console.log("Pager", pager);
    return (
      <>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardBody>
                <table className="table table-hover table-bordered table-striped">
                  <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Contact Person</th>
                        <th>Contact Mobile</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    { data ? data.map((item, index) => {
                        return(
                          <tr>
                            <td>{pager.pages && pager.pages.length ? pager.startIndex + index +1: index+1}</td>
                            <td>{ item.CompanyName }</td>
                            <td>{ item.ContactpersonFirstname + 	item.ContactpersonLastname }</td>
                            <td>{ item.ContactpersonMobile }</td>
                            <td>{ item.ContactpersonEmail }</td>
                            <td>
                                {/* <button className="action-button">
                                  <CIcon onClick={() => this.edit(item)} name="cil-pencil" height="20" alt="Edit"/>
                                </button> */}
                                <button className="action-button">
                                  <CIcon onClick={() => this.delete(item.ID)} name="cil-trash" height="18" alt="Delete"/>
                                </button>
                            </td>
                          </tr>
                        )
                    })
                    : null  
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="6">
                        <div className="float-right">
                          { pager.pages && pager.pages.length &&
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

ListCustomer.propTypes = {
  customer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.customer.customers,
  pager: state.customer.pager
});
export default connect(
  mapStateToProps,
  { loadCustomer, deleteCustomer }
)(ListCustomer);
