import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'react-notifications/lib/notifications.css';
const PartDetails = (props) => {
    //const { partDetails } = props.partDetails;
    return(
        <>
            <tr>
                <td colSpan="9">
                    <table className="table table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Parts</th>
                                <th>Quantity</th>
                                <th>Manufacture</th>
                                <th>Parts Number</th>
                                <th>Company/Brand</th>
                                <th>Cost Price</th>
                                <th>Sale Price</th>
                            </tr>
                        </thead>
                        {
                            props.partDetails ? props.partDetails.map((item, index) => {
                                return(
                                    <tr>
                                        <td>{ index+1 }</td>
                                        <td>{ item.part.Name }</td>
                                        <td>{ item.Quantity }</td>
                                        <td>{ item.manufacture.Name }</td>
                                        <td>{ item.PartNumber  }</td>
                                        <td>
                                            <table className="table">
                                                {
                                                    item.enquiryPartDetails.map((item, index) => {
                                                        return(
                                                            <tr>
                                                                <td>{ item.Brand }</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </table>
                                        </td>
                                        <td>
                                            <table className="table">
                                                {
                                                    item.enquiryPartDetails.map((item, index) => {
                                                        return(
                                                            <tr>
                                                                <td>{ item.CostPrice }</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </table>
                                        </td>
                                        <td>
                                            <table className="table">
                                                {
                                                    item.enquiryPartDetails.map((item, index) => {
                                                        return(
                                                            <tr>
                                                                <td>{ item.SellingPrice }</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </table>
                                        </td>
                                    </tr>
                                )
                            }):null 
                        }
                    </table>
                </td>
            </tr>
        </>
    )
}

//export default PartNumber;
PartDetails.propTypes = {
    enquiry: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
  });
  export default connect(
  mapStateToProps,
  {  }
  )(PartDetails);