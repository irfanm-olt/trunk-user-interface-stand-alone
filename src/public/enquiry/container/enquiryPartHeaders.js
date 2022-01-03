import React from "react";
import CIcon from '@coreui/icons-react'
import { CInput, CButton } from "@coreui/react";
const EnquiryPartHeaders = (props) => {
    return(
        props.enquiryPartHeaders.map((item, index) => {
            let partName = `parts-${index}`, quantity = `quantity-${index}`;
            return(
                <tr key={item}>
                    <td>
                        <select className="custom-select"  data-id={index}  name="partName" id={partName}>
                            <option value="">Select Part Name</option>
                        {
                            props.part? props.part.map((item, index) => {
                            return <optgroup label={item.Name}>
                                {
                                item.parts ? item.parts.map((item, index) => {
                                    return <option value={item.ID}>{item.Name}</option>
                                }): null
                                }
                            </optgroup>
                            }): null
                        }
                        </select>
                    </td>
                    <td>
                        <CInput
                            placeholder="Enter Quantity"
                            className="custom-select" 
                            data-id={index} 
                            id={quantity} 
                            name="quantity"
                            type="number"
                        />
                    </td>
                    <td>
                        {
                            index === 0?
                            <a  onClick={() => props.add()} name="add" height="25" alt="Logo"><CButton className="btn-primary">+ ADD</CButton></a>
                            :
                            <button onClick={() => props.delete(item)} className="action-button">
                                <CIcon name="cil-trash" height="18" alt="Logo"/>
                            </button>
                        }
                    </td>
                </tr>
            )
        })
    )
}

export default EnquiryPartHeaders;