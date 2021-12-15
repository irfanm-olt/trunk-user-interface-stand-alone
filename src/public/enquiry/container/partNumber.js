import React, { useState } from "react";
import {
    CFormGroup,
    CLabel,
    CInput,
    CButton,
  } from '@coreui/react';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPartNumber } from "src/modules/enquiry/actions";
import PartPrice from "./partPrice";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const PartNumber = (props) => {
    const [manufacture, setManufacture] = useState("");
    const [partNumber, setPartNumber] = useState("");

    function handleSelectChange(event) {
        setManufacture(event);
    }

    function handleSubmit() {
        if(manufacture.value === undefined)
        {
            NotificationManager.warning("Manufacuture is required");
            return false;
        }

        if(partNumber === undefined)
        {
            NotificationManager.warning("Part Number is required");
            return false;
        }

        const datas = {};
        datas.manufacture = manufacture.value;
        datas.partNumber = partNumber;
        datas.enquiryHeaderID = props.partHeaderData.ID;
        datas.enquiryID = props.partHeaderData.EnquiryID;
        datas.partID = props.partHeaderData.PartID;
        datas.parttypeID = props.partHeaderData.ParttypeID;
        datas.quantity = props.partHeaderData.Quantity;
        props.addPartNumber({datas});
    }

    const manufactureOptions = props.manufacture.data ? props.manufacture.data.map((item, index) => {
        return { value: item.ID, label: item.Name }
    }): null;
    const ManufactureName = props.manufactureID[0].manufacture.Name? props.manufactureID[0].manufacture.Name: null;
    const ManufactureID = props.manufactureID[0].manufacture.ID? props.manufactureID[0].manufacture.ID: null;
    const ManufactureData = {value: ManufactureID, label: ManufactureName};
    return(
        <>
            <tr>
                <td>
                    <NotificationContainer />
                    <CFormGroup className="text-left">
                        <CLabel htmlFor="appendedInput">Manufacture</CLabel>
                            <div className="controls">
                                <Select
                                    isClearable
                                    id="manufacture" 
                                    name="manufacture"
                                    value={manufacture? manufacture: setManufacture(ManufactureData)}
                                    options={manufactureOptions}
                                    placeholder="Eg: Toyota"
                                    onChange={handleSelectChange}
                                />
                            </div>
                    </CFormGroup>
                </td>
                <td>
                    <CFormGroup className="text-left">
                        <CLabel htmlFor="appendedInput">Parts number</CLabel>
                            <div className="controls">
                                <CInput 
                                    type="text" 
                                    id="partNumber" 
                                    name="partNumber"
                                    onChange={e => setPartNumber(e.target.value)}
                                    value={partNumber}
                                />
                            </div>
                    </CFormGroup>
                </td>
                <td>
                    <CFormGroup>
                        <CLabel htmlFor="appendedInput" className="text-center">{}</CLabel>
                            <div className="controls text-center" >
                                <CButton onClick={() => handleSubmit()} type="button" color="primary" className="mfe-3" ><CIcon name="cil-save" /> Save</CButton>
                            </div>
                    </CFormGroup>
                </td>
                <td>
                    <CFormGroup>
                        <CLabel htmlFor="appendedInput" className="text-center">{}</CLabel>
                            <div className="controls text-right" >
                                <CButton color="secondary" className="mfe-3" to="/enquiry"><CIcon name="cil-x" /> Cancel</CButton>
                                <CButton color="secondary" className="mfe-3" to="/enquiry">Delete</CButton>
                            </div>
                    </CFormGroup>
                </td>
            </tr>
            {
                props.data.partNumberData ? props.data.partNumberData.map((item, index) => {
                    {
                        return(
                        <>
                            {
                                item.PartNumber !== 'parentHeader' && item.PartID === props.partHeaderData.PartID && item.EnquiryID === props.partHeaderData.EnquiryID ?
                                <>
                                    <tr>
                                        <td colSpan="1">{item.manufacture.Name}</td>
                                        <td colSpan="2">{item.PartNumber}</td>
                                        <td><CButton onClick={() => props.addPrice(item)} className="price-button">Add Price</CButton></td>
                                    </tr>
                                    {
                                        item.ID === props.partPriceData.ID ?
                                        <>
                                            <PartPrice manufacture={props.manufacture} partHeaderData={props.partPriceData}/>
                                        </>
                                        :
                                        null
                                    }
                                </>
                                :null
                            }
                        </>
                        )
                    }
                }): null
            }
        </>
    )
}

//export default PartNumber;
PartNumber.propTypes = {
    enquiry: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    //
    data: state.enquiry
  });
  export default connect(
  mapStateToProps,
  { addPartNumber }
  )(PartNumber);