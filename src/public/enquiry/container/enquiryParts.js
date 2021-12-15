import React from "react";
import { CButton } from "@coreui/react";
import PartNumber from './partNumber';
const EnquiryParts = (props) => {
    return(
        props.enquiryParts ? props.enquiryParts.map((item, index) => {
            return(
                <>
                {
                    item.PartNumber === 'parentHeader' ? 
                    <>
                        <tr key={item}>
                            <td width="25%">
                                {index+1}
                            </td>
                            <td width="25%">
                                <div>{item.part.Name}</div>
                            </td>
                            <td width="25%">
                                <div>{item.Quantity}</div>
                            </td>
                            <td width="25%">
                                <CButton onClick={() => props.addPartNumber(item)} color="primary">Add Part number</CButton>
                            </td>
                        </tr>
                        {
                            item.ID === props.partHeaderData.ID?
                                <PartNumber 
                                    addPrice={props.addPrice.bind(this)}
                                    manufacture={props.manufacture} 
                                    partHeaderData={props.partHeaderData}
                                    partPriceData={props.partPriceData}
                                    enquiryParts={props.enquiryParts.data} 
                                    manufactureID={props.manufactureID.data}
                                />
                            :null
                        }
                    </>
                    : null

                } 
                </>
            )
        }): null
    )
}

export default EnquiryParts;