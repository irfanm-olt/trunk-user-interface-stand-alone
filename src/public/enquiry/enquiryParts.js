import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CFade,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { NotificationContainer } from 'react-notifications';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadParts, addEnquiryPartHeader, loadEnquiryPartHeader } from 'src/modules/enquiry/actions';
import 'react-notifications/lib/notifications.css';
import EnquiryParts from './container/enquiryParts';
let EnquiryID = '';

class EnquiryPart extends Component {
constructor(props) {
  super(props);
  this.state = {
    collapsed: true,
    showElements: true,
    partHeaderData: [],
    partPriceData: [],
  }
}

componentDidMount() {
  EnquiryID = localStorage.getItem('ENQUIRY-ID');
  const enquiry = {};
  enquiry.enquiryID = EnquiryID;
  this.props.loadEnquiryPartHeader(enquiry);
}

addPartNumber(data) {
  this.setState({
    partHeaderData: data
  });
}

addPrice(data) {
  this.setState({
    partPriceData: data
  })
}

saveEnquiry() {
  localStorage.removeItem("ENQUIRY-ID");
  localStorage.removeItem("MANUFACTURE");
  this.props.history.push('./enquiry-list')
}

render() {
  const { partNumberData, manufactureData, manufactureID } = this.props.data;
  const { partHeaderData, partPriceData } = this.state;
  return (
      <CRow className="text-center justify-content-center">
        <NotificationContainer/>
        <CCol xs="12" sm="12" lg="10">
          <CFade in={this.state.showElements} unmountOnExit={true}>
            <CCard>
              <CCollapse show={this.state.collapsed} timeout={1000}>
                <CCardBody>
                    <h4>Add Part Number</h4>
                      <table className="table">
                        <EnquiryParts 
                          addPartNumber={this.addPartNumber.bind(this)}
                          addPrice={this.addPrice.bind(this)}
                          partPriceData={partPriceData}
                          enquiryParts={partNumberData} 
                          manufactureID={manufactureID}
                          manufacture={manufactureData} 
                          partHeaderData={partHeaderData} 
                        />
                        <tr>
                          <td colSpan="4">
                            <CButton onClick={() => this.props.history.goBack()} color="secondary" className="mfe-3" to="/enquiry"><CIcon name="cil-x" /> Cancel</CButton>
                            <CButton onClick={() => this.saveEnquiry()} type="submit" color="primary" ><CIcon name="cil-save" /> Save</CButton>
                          </td>
                        </tr>
                      </table>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    )
  }
}

EnquiryPart.propTypes = {
  enquiry: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.enquiry
});
export default connect(
mapStateToProps,
{ loadParts, addEnquiryPartHeader, loadEnquiryPartHeader }
)(EnquiryPart);
