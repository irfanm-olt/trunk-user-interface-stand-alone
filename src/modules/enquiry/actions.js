import * as Actions from "./constants";

export function loadVehicle(chassisNumber) {
    return {
        type: Actions.LOAD_VEHICLE,
        chassisNumber,
    }
}

export function loadMasters({ enquiryID  }) {
    return {
        type: Actions.LOAD_MASTER,
        enquiryID
    }
}

export function loadCarsbyManufacture({id}) {
    return {
        type: Actions.LOAD_CARS_BY_MANUFACTURE,
        id
    }
}

export function loadParts({ enquiryID }) {
    return {
        type: Actions.LOAD_PARTS,
        enquiryID
    }
}

export function addEnquiryCar({ manufacture, carName, customer, chassisNumber, modelYear, variant }) {
    return {
        type: Actions.ADD_ENQUIRY_CAR,
        manufacture,
        carName,
        customer,
        chassisNumber,
        modelYear,
        variant
    }
}

export function updateEnquiryCar({ datas }) {
    return {
        type: Actions.UPDATE_ENQUIRY_CAR,
        datas
    }
}

export function addEnquiryPartHeader({ datas }) {
    return {
        type: Actions.ADD_ENQUIRY_PART_HEADER,
        datas
    }
}

export function updateEnquiryPartHeader({ datas }) {
    return {
        type: Actions.UPDATE_ENQUIRY_PART_HEADER,
        datas
    }
}

export function addPartNumber({ datas }) {
    return {
        type: Actions.ADD_PART_NUMBER,
        datas
    }
}


export function loadEnquiryPartHeader({ enquiryID }) {
    return {
        type: Actions.LOAD_ENQUIRY_PART_HEADER,
        enquiryID
    }
}

// ADD PART PRICE
export function addPartPrice({ datas }) {
    return {
        type: Actions.ADD_PART_PRICE,
        datas
    }
}

// DELETE PART PRICE
export function deletePartPrice({ id }) {
    return {
        type: Actions.DELETE_PART_PRICE,
        id
    }
}

//  LOAD PART PRICE
export function loadPartDetails({ partheaderID }) {
    return {
        type: Actions.LOAD_PART_DETAILS,
        partheaderID
    }
}

// LOAD ENQUIRY CAR DETAILS /* LIST ENQUIRY
export function loadEnquiryCarDetails({ query }) {
    return {
        type: Actions.LOAD_ENQUIRY_CAR_DETAILS,
        query
    }
}

//  LOAD ENQUIRY PART DETAILS
export function loadEnquiryPartDetails({ enquiryID }) {
    return {
        type: Actions.LOAD_ENQUIRY_PART_DETAILS,
        enquiryID
    }
}

// DELETE ENQUIRY
export function deleteEnquiry({ id }) {
    return {
        type: Actions.DELETE_ENQUIRY,
        id
    }
}



