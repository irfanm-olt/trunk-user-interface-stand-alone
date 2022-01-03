import React from "react";
import CIcon from '@coreui/icons-react'
import { CButton, CInput } from "@coreui/react";
const EditenquiryPartHeaders = (props) => {
    return(
        props.enquiryPartHeaders.map((item, index) => {
            let partName = `parts-${index}`, quantity = `quantity-${index}`;
            if(item.PartNumber === 'parentHeader'){ return false}
                return <tr key={index}>
                    <td>
                        <select className="custom-select"  data-id={index}  name="partName" id={partName} value={ item.partName || props.changeKey !== "" ? item.partName: null} >
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
                            value={ item.quantity? item.quantity: null}
                        />
                    </td>
                    <td>
                        {
                            index === 0 ?
                            <>
                                <i onClick={() => props.add()} class="fa fa-plus clickable" aria-hidden="true"></i>
                            </>
                            :
                                <button onClick={() => props.delete(item)} className="action-button">
                                    <CIcon name="cil-trash" height="18" alt="Logo"/>
                                </button>
                        }
                    </td>
                </tr>
            //)
        })
    )
}

export default EditenquiryPartHeaders;