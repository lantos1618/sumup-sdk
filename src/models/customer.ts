export interface PersonalDetailsAddress {
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

export interface CreateCustomerPersonalDetails {
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

export interface CreateCustomerRequest {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}

export interface CreateCustomerResponse {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}



export interface GetCustomerRequest {
    customer_id: string;
}

export interface GetCustomerResponse {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}

export interface UpdateCustomerRequest {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}

export interface UpdateCustomerResponse {
    customer_id: string;
    // Unique ID of the customer.
    personal_details: CreateCustomerPersonalDetails;
}