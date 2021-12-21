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
import { loadParts, updateEnquiryPartHeader} from 'src/modules/enquiry/actions';
import 'react-notifications/lib/notifications.css';
import EnquiryPartHeaders from './container/editenquiryPartHeaders';
let EnquiryID = '';
let Manufacture = '';

class EditenquiryPartHeader extends Component {
constructor(props) {
  super(props);
  this.state = {
    collapsed: true,
    showElements: true,
    enquiryPartHeaders: [],
    deletedRecord: [],
    changeKey: '',
  }
}

componentDidUpdate(prevProps) {
    const { partHeaders, updateHeaderSuccess } = this.props.data;
    const { partHeaders: prevpartHeaders, updateHeaderSuccess: prevupdateHeaderSuccess } = prevProps.data;
    if(partHeaders && partHeaders !== prevpartHeaders) {
      partHeaders.map((item, index) => {
        this.setState((prevState) => ({
            enquiryPartHeaders: [...prevState.enquiryPartHeaders, { index: Math.random(), partName: `${item.PartID}`, quantity: `${item.Quantity}`, headerID: `${item.ID}` }],
        }));
      })
    }

    if (updateHeaderSuccess && updateHeaderSuccess !== prevupdateHeaderSuccess) {
      const id = this.props.match.params.id;
      this.props.history.push(`../edit-enquiry-parts/${id}`);
    }
}

componentDidMount() {
  const enquiryID = this.props.match.params.id;
  this.props.loadParts({ enquiryID });
}

handleChange = (e) => {
  if (["partName", "quantity"].includes(e.target.name)) {
      let enquiryPartHeaders = [...this.state.enquiryPartHeaders]
      enquiryPartHeaders[e.target.dataset.id][e.target.name] = e.target.value;
  } else {
      this.setState({ [e.target.name]: e.target.value })
  }
  this.setState({ changeKey: e.target.id })
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
  
  const datas = { formData: this.state, enquiryID: this.props.match.params.id }
  const parts = {};
  parts.datas = datas;
  this.props.updateEnquiryPartHeader(parts);
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
      enquiryPartHeaders: this.state.enquiryPartHeaders.filter(r => r !== record),
      deletedRecord: this.state.deletedRecord.concat(record)
  });
}


render() {
  const { parts } = this.props.data;
  let { enquiryPartHeaders, changeKey } = this.state;
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
                        <thead>
                          <tr>
                            <th>Add/Select part name</th>
                            <th>Quantity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <EnquiryPartHeaders 
                            add={this.addNewRow} 
                            delete={this.clickOnDelete.bind(this)} 
                            enquiryPartHeaders={enquiryPartHeaders} 
                            part={parts} 
                            changeKey={changeKey}
                          />
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3">
                              <CButton onClick={() => this.props.history.goBack()} color="secondary" className="mfe-3" to="/enquiry"><CIcon name="cil-x" /> Cancel</CButton>
                              <CButton type="submit" color="primary" ><CIcon name="cil-save" /> Update</CButton>
                            </td>
                          </tr>
                        </tfoot>
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

EditenquiryPartHeader.propTypes = {
  enquiry: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.enquiry
});
export default connect(
mapStateToProps,
{ loadParts, updateEnquiryPartHeader }
)(EditenquiryPartHeader);
