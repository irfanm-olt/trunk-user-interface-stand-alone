import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFade,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PartDetails from './container/partDetails';
import { 
  loadEnquiryCarDetails, 
  loadEnquiryPartDetails,
  deleteEnquiry,
} from 'src/modules/enquiry/actions';
import { Link } from 'react-router-dom';

class EnquiryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EnquiryID: '',
    }
  }

  componentDidMount() {
    this.loadEnquiryCarDetails();
  }

  // componentDidUpdate(prevProps) {
  //   this.loadEnquiryCarDetails();
  // }

  loadEnquiryCarDetails = () => {
    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.props.pager.currentPage) {
      const query = {};
      query.pages = page;
      this.props.loadEnquiryCarDetails({ query });
    }
  }

formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

getPartDetail(id){
  const datas = {};
  datas.enquiryID = id;
  this.props.loadEnquiryPartDetails(datas);
  this.setState({
    EnquiryID: id
  });
}

delete = (id) => {
  if (window.confirm("Are you sure?")) {
    this.props.deleteEnquiry({id});  
  }  
} 

edit = (id) => {
  if (window.confirm("Are you sure?")) {
    // this.props.history.push({
    //   pathname: './enquiry-vehicle',
    //   state: {
    //     enquiryID: id,
    //   },
    // })
    this.props.history.push(`./edit-enquiry-vehicle/${id}`);
  } 
}

render() {
  const { data, partDetails, pager } = this.props;
  return (
      <CRow className="text-center justify-content-center list-table">
          <CCol xs="12" sm="12" lg="12">
            <CFade>
              <CCard>
                <CCardBody>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <td>#</td>
                        <th>Customer</th>
                        <th>Chassis number</th>
                        <th>Vehicle</th>
                        <th>Item</th>
                        <th>Enquiry Date</th>
                        <th>Status</th>
                        {/* <th>Print</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      data ? data.map((item, index) => {
                          let date = new Date(item.CreatedOn);
                          let longMonth = date.toLocaleString('en-us', { month: 'long' });
                          let day = date.getDate();
                          let year = date.getFullYear();
                          let time = this.formatAMPM(date);
                          let items = item.enquiryPartHeaders;
                          return(
                            <>
                            <tr className='expandable-row'>
                              {/* <tr onClick={() => this.getPartDetail(item.ID)}> */}
                                <td onClick={() => this.getPartDetail(item.ID)} >{pager.pages && pager.pages.length ? pager.startIndex + index +1: index+1}</td>
                                <td onClick={() => this.getPartDetail(item.ID)} >{item.customer.CompanyName }</td>
                                <td onClick={() => this.getPartDetail(item.ID)} >{item.ChassisNO}</td>
                                <td onClick={() => this.getPartDetail(item.ID)} >{item.manufacture.Name}, {item.Year}, {item.car.CarName}, {item.Variant}</td>
                                <td onClick={() => this.getPartDetail(item.ID)} >{items.filter(e => e.PartNumber !== 'parentHeader').length}</td>
                                <td onClick={() => this.getPartDetail(item.ID)} >{day} { longMonth } { year }, {time}</td>
                                <td onClick={() => this.getPartDetail(item.ID)} ><span className='badge badge-pill badge-danger'>{items.filter(e => e.PartNumber !== 'parentHeader').length === 0 ? 'Pending': 'Open'}</span></td>
                                <td>
                                  {/* <button onClick={() => this.getPartDetail(item.ID)}>
                                    <CIcon name="cil-chevron-bottom" height="18" alt="view" />
                                  </button> */}
                                  <button onClick={() => this.edit(item.ID)} className="action-button">
                                    <CIcon name="cil-pencil" height="18" alt="edit"/>
                                  </button>
                                  <button onClick={() => this.delete(item.ID)} className="action-button">
                                    <CIcon name="cil-trash" height="18" alt="delete"/>
                                  </button>
                                </td>
                              </tr>
                              {
                                item.ID === this.state.EnquiryID ?
                                <PartDetails partDetails={partDetails}  />
                                :
                                null
                              }
                              
                            </>
                          )
                      }): null
                    }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="9">
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
            </CFade>
          </CCol>
      </CRow>
    )
  }
}

EnquiryList.propTypes = {
  enquiry: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.enquiry.enquiryList,
  pager: state.enquiry.pager,
  partDetails: state.enquiry.partDetails
});
export default connect(
mapStateToProps,
{ 
  loadEnquiryCarDetails, 
  loadEnquiryPartDetails,
  deleteEnquiry 
}
)(EnquiryList);
