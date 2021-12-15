import React, { useState, useEffect } from "react";
import {
    CFormGroup,
    CLabel,
    CInput,
    CButton,
  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPartPrice, loadPartDetails } from "src/modules/enquiry/actions";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const PartPrice = (props) => {
    const [brand, setBrand] = useState("");
    const [productNumber, setproductNumber] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [remark, setRemark] = useState("");
    
    useEffect(() => {
        if(!props.partPrice) {
            partDetails();
        }
    }, []);

    function partDetails() {
        const datas = {};
        datas.partheaderID = props.partHeaderData.ID;
        props.loadPartDetails(datas);
    }


    function handleSubmit() {
        if(brand === "")
        {
            NotificationManager.warning("Brand is required");
            return false;
        }

        if(productNumber === "")
        {
            NotificationManager.warning("Product number is required");
            return false;
        }

        if(costPrice === "")
        {
            NotificationManager.warning("Cost price is required");
            return false;
        }

        if(salePrice === "")
        {
            NotificationManager.warning("Sale price is required");
            return false;
        }

        if(remark === "")
        {
            NotificationManager.warning("Remark is required");
            return false;
        }

        const datas = {};
        datas.brand = brand;
        datas.productNumber = productNumber;
        datas.costPrice = costPrice;
        datas.salePrice = salePrice;
        datas.remark = remark;
        datas.partheaderID = props.partHeaderData.ID;
        props.addPartPrice({datas});
    }

    const { priceData } = props;

    return(
        <>
            <NotificationContainer/>
            <tr>
                <td>
                    <CFormGroup className="text-left">
                        <CLabel htmlFor="appendedInput">Company/Brand</CLabel>
                            <div className="controls">
                                <CInput 
                                    type="text" 
                                    id="brand" 
                                    name="brand"
                                    placeholder="Eg: China"
                                    onChange={e => setBrand(e.target.value)}
                                    value={brand}
                                />
                            </div>
                    </CFormGroup>
                </td>
                <td>
                    <CFormGroup className="text-left">
                        <CLabel htmlFor="appendedInput">Product Number</CLabel>
                            <div className="controls">
                                <CInput 
                                    type="text" 
                                    id="productNumber" 
                                    name="productNumber"
                                    placeholder="Eg: 123456"
                                    onChange={e => setproductNumber(e.target.value)}
                                    value={productNumber}
                                />
                            </div>
                    </CFormGroup>
                </td>
                <td>
                    <CFormGroup className="text-left">
                        <CLabel htmlFor="appendedInput">Cost Price</CLabel>
                            <div className="controls">
                                <CInput 
                                    type="number" 
                                    id="costPrice" 
                                    name="costPrice"
                                    placeholder="Eg: 230"
                                    onChange={e => setCostPrice(e.target.value)}
                                    value={costPrice}
                                />
                            </div>
                    </CFormGroup>
                </td>
                <td>
                    <CFormGroup className="text-left">
                        <CLabel htmlFor="appendedInput">Sale Price</CLabel>
                            <div className="controls">
                                <CInput 
                                    type="number" 
                                    id="salePrice" 
                                    name="salePrice"
                                    placeholder="Eg: 340"
                                    onChange={e => setSalePrice(e.target.value)}
                                    value={salePrice}
                                />
                            </div>
                    </CFormGroup>
                </td>
            </tr>
            <tr>
                <td colSpan="4" className="no-top-border">
                    <CFormGroup className="text-left">
                        <CLabel htmlFor="appendedInput">Remark</CLabel>
                            <div className="controls">
                                <CInput 
                                    type="text" 
                                    id="remark" 
                                    name="remark"
                                    onChange={e => setRemark(e.target.value)}
                                    value={remark}
                                />
                            </div>
                    </CFormGroup>
                </td>
            </tr>
            <tr>
                <td colSpan="4" className="no-top-border">
                    <CButton type="button" color="secondary" className="mfe-3" to="/enquiry"><CIcon name="cil-x" /> Cancel</CButton>
                    <CButton onClick={() => handleSubmit()} type="button" color="primary" className="mfe-3" ><CIcon name="cil-save" /> Save</CButton>
                    {/* <CButton onClick={() => handleSubmit()} type="button" color="secondary" color="primary" ><CIcon name="cil-save" /> Save &#38; Continue</CButton> */}
                </td>
            </tr>
            <tr>
                <td colSpan="4">
                    <table className="table customTable">
                        <tr>
                            <th>Company/brand</th>
                            <th>Product Number</th>
                            <th>Cost Price</th>
                            <th>Sale Price</th>
                            <th>Remark</th>
                            <th>Edit/delete Price</th>
                        </tr>
                        {
                            priceData ? priceData.map((item, index) => {

                                return(
                                    <>
                                    { props.partHeaderData.ID === item.PartheaderID ?
                                        <>
                                            <tr>
                                                <td>{ item.Brand }</td>
                                                <td>{ item.ProductNumber }</td>
                                                <td>{ item.CostPrice }</td>
                                                <td>{ item.SellingPrice }</td>
                                                <td>{ item.Remark }</td>
                                                <button className="action-button">
                                                    <CIcon onClick={() => this.deleteEnquiry} name="cil-trash" height="18" alt="Delete"/>
                                                </button>
                                            </tr>
                                        </>
                                        :
                                        null
                                    }
                                    </>
                                )
                            }): null
                        }
                    </table>
                </td>
            </tr>
        </>
    )
}

//export default PartNumber;
PartPrice.propTypes = {
    enquiry: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    priceData: state.enquiry.priceData,
    partPriceSuccess: state.enquiry.partPriceSuccess
  });
  export default connect(
  mapStateToProps,
  { addPartPrice, loadPartDetails }
  )(PartPrice);