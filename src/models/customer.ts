export type PersonalDetailsAddress = {
    city: string
    // City name from the address.

    country: string
    // Two letter country code formatted according to ISO3166-1 alpha-2.

    line1: string
    // First line of the address with details of the street name and number.

    line2: string
    // Second line of the address with details of the building, unit, apartment, and floor numbers.

    postal_code: string
    // Postal code from the address.

    state: string
    // State name or abbreviation from the address.
}

export type CreateCustomerPersonalDetails = {
    first_name: string
    // First name of the customer.

    last_name: string
    // Last name of the customer.

    email: string
    // Email address of the customer.

    phone: string
    // Phone number of the customer.

    birthdate: Date
    // Date of birth of the customer.
    // this should be birth_date but the api is wrong

    address: PersonalDetailsAddress
}

export type CreateCustomerRequest = {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}

export type CreateCustomerResponse = {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}



export type GetCustomerRequest = {
    customer_id: string;
}

export type GetCustomerResponse = {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}

export type UpdateCustomerRequest = {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}

export type UpdateCustomerResponse = {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}

export type CreateCustomerPaymentInstrumentRequestCard = {
    name: string
    // Name of the cardholder.
    number: string
    // Card number.
    expiry_year: string
    // Expiry month of the card. >= 2 characters and <= 4 characters
    expiry_month: string
    // Expiry month of the card. [01, 02, ..., 12]
    cvv: string
    // Card verification value. >= 3 characters and <= 4 characters
    zip_code?: string
    // Zip code of the cardholder.
    // only required for US cards

}
export type CreateCustomerPaymentInstrumentRequest = {
    customer_id: string
    type: "card",
    // indicates the type of the payment instrument
    card: CreateCustomerPaymentInstrumentRequestCard

}

enum CardType {
    AMEX = "AMEX",
    CUP = "CUP",
    DINERS = "DINERS",
    DISCOVER = "DISCOVER",
    ELO = "ELO",
    ELV = "ELV",
    HIPERCARD = "HIPERCARD",
    JCB = "JCB",
    MAESTRO = "MAESTRO",
    MASTERCARD = "MASTERCARD",
    VISA = "VISA",
    VISA_ELECTRON = "VISA_ELECTRON",
    VISA_VPAY = "VISA_VPAY",
    UNKOWN = "UNKNOWN",
}

export type CreateCustomerPaymentInstrumentResponse = {
    token: string,
    // Unique ID of the payment instrument.
    active: boolean,
    // Indicates whether the payment instrument is active or not.
    // to deactivate a payment instrument, use the DELETE request.
    type: "card",
    // Indicates the type of the payment instrument.
    card: {
        last_4_digits: string
        // Last 4 digits of the card number.
        type: CardType
        // Type of the card.
    },

    mandate: {
        type: string,
        // Indicates the type of the mandate.
        status: string,
        // Indicates the status of the mandate.
        merchant_code: string,
        // merchant code of the mandate.
    },
    created_at: string,
    // Date and time when the payment instrument was created.

}

export type ListCustomerPaymentInstrumentsRequest = {
    customer_id: string
}
export type ListCustomerPaymentInstrumentsResponse = Array<CreateCustomerPaymentInstrumentResponse>

export type DeactivateCustomerPaymentInstrumentRequest = {
    customer_id: string
    payment_instrument_token: string
}