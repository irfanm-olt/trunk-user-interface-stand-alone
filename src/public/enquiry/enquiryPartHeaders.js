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
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadParts, addEnquiryPartHeader } from 'src/modules/enquiry/actions';
import 'react-notifications/lib/notifications.css';
import EnquiryPartHeaders from './container/enquiryPartHeaders';
let EnquiryID = '';
let Manufacture = '';

class EnquiryPartHeader extends Component {
constructor(props) {
  super(props);
  this.state = {
    collapsed: true,
    showElements: true,
    enquiryPartHeaders: [{ index: Math.random(), partName: '', quantity: '' }]
  }
}

componentDidUpdate(prevProps) {
  // enquiry part header success
  const { addHeaderSuccess } = this.props.data;
  const {addHeaderSuccess: prevSuccess} = prevProps.data;
  if (addHeaderSuccess && addHeaderSuccess !== prevSuccess) {
    this.props.history.push('/enquiry/enquiry-parts');
  }
}

componentDidMount() {
  EnquiryID = localStorage.getItem('ENQUIRY-ID');
  Manufacture = localStorage.getItem('MANUFACTURE');
  this.props.loadParts();
}

handleChange = (e) => {
  if (["partName", "quantity"].includes(e.target.name)) {
      let enquiryPartHeaders = [...this.state.enquiryPartHeaders]
      enquiryPartHeaders[e.target.dataset.id][e.target.name] = e.target.value;
  } else {
      this.setState({ [e.target.name]: e.target.value })
  }
}

handleSubmit = (e) => {
  // submit
  e.preventDefault();
  let ManufactureEntry = [];
  for(var i=0;i<this.state.enquiryPartHeaders.length;i++)
  {
      if(this.state.enquiryPartHeaders[i].partName==='' || this.state.enquiryPartHeaders[i].quantity==='')
      {
          NotificationManager.warning("Please Fill up Required Field.");
          return false;
      }
      ManufactureEntry.push(this.state.enquiryPartHeaders[i].partName);
  }

  // check duplicate entry
  if(this.hasDuplicates(ManufactureEntry))
  {
      NotificationManager.warning("Duplicate entry not permitted!");
      return false;
  }
  
  const datas = { formData: this.state, enquiryID: EnquiryID }
  const parts = {};
  parts.datas = datas;
  this.props.addEnquiryPartHeader(parts);
}

hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

addNewRow = () => {
  this.setState((prevState) => ({
      enquiryPartHeaders: [...prevState.enquiryPartHeaders, { index: Math.random(), partName: "", quantity: "" }],
  }));
}


clickOnDelete(record) {
  this.setState({
      enquiryPartHeaders: this.state.enquiryPartHeaders.filter(r => r !== record)
  });
}


render() {
  const { parts } = this.props.data;
  let { enquiryPartHeaders } = this.state;
  return (
      <CRow className="text-center justify-content-center">
        <NotificationContainer/>
        <CCol xs="12" sm="12" lg="10">
          <CFade in={this.state.showElements} unmountOnExit={true}>
            <CCard>
              <CCollapse show={this.state.collapsed} timeout={1000}>
                <CCardBody>
                    <h4>Add Parts &#38; Quantity</h4>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                      <table className="table">
                        <tr>
                          <th>Add/Select part name <br /> <CButton onClick={() => this.addMore()}>Add new parts</CButton></th>
                          <th>Quantity</th>
                          <th>Action</th>
                        </tr>
                        <EnquiryPartHeaders add={this.addNewRow} delete={this.clickOnDelete.bind(this)} enquiryPartHeaders={enquiryPartHeaders} part={parts} />
                        <tr>
                          <td colSpan="3">
                            <CButton onClick={() => this.props.history.goBack()} color="secondary" className="mfe-3" to="/enquiry"><CIcon name="cil-x" /> Cancel</CButton>
                            <CButton type="submit" color="secondary" ><CIcon name="cil-save" /> Save</CButton>
                          </td>
                        </tr>
                      </table>
                    </form>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    )
  }
}

EnquiryPartHeader.propTypes = {
  enquiry: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.enquiry
});
export default connect(
mapStateToProps,
{ loadParts, addEnquiryPartHeader }
)(EnquiryPartHeader);
