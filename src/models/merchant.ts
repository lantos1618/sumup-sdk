

export type LegalType = {
    id: number
    // Unique id

    full_description: string
    // Legal type description

    description: string
    // Legal type short description

    sole_trader: boolean
    // Sole trader legal type if true
}

export type MerchantCountryDetails = {
    currency: string
    // Currency ISO 4217 code

    iso_code: string
    // Country ISO code

    en_name: string
    // Country EN name

    native_name: string
    // Country native name
}

export type MerchantTimeOffsetDetails = {
    post_code: string
    // Postal code

    offset: number
    // UTC offset

    dst: boolean
    // Daylight Saving Time
}

export type MerchantAddress = {
    address_line1: string
    // Address line 1

    address_line2: string
    // Address line 2

    city: string
    // City

    country: string
    // Country ISO 3166-1 code

    region_id: number
    // Country region id

    region_name: string
    // Region name

    region_code: string
    // Region code

    post_code: string
    // Postal code

    landline: string
    // Landline number

    first_name: string
    // undefined

    last_name: string
    // undefined

    company: string
    // undefined

    country_details: MerchantCountryDetails,
    timeoffset_details: MerchantTimeOffsetDetails,

    state_id: string
}

export type MerchantDoingBusinessAsAddress = {
    address_line1: string
    // Address line 1

    address_line2: string
    // Address line 2

    city: string
    // City

    country: string
    // Country ISO 3166-1 code

    region_id: number
    // Country region id

    region_name: string
    // Country region name

    post_code: string
    // Postal code
}

export type MerchantDoingBusinessAs = {
    business_name: string
    // Doing business as name

    company_registration_number: string
    // Doing business as company registration number

    vat_id: string
    // Doing business as vat id

    website: string
    // Doing business as website

    email: string
    // Doing business as email

    address: MerchantDoingBusinessAsAddress
}

export enum MerchantMotoPayment {
    // UNAVAILABLE, ENFORCED, ON, OFF
    UNAVAILABLE = "UNAVAILABLE",
    ENFORCED = "ENFORCED",
    ON = "ON",
    OFF = "OFF"
}

export type MerchantSettings = {
    tax_enabled : boolean
    // Whether to show tax in receipts (saved per transaction)
    
    payout_type : string
    // Payout type
    
    payout_period : string
    // Payout frequency
    
    payout_on_demand_available : boolean
    // Whether merchant can edit payouts on demand
    
    payout_on_demand : boolean
    // Whether merchant will receive payouts on demand
    
    printers_enabled : boolean
    // Whether to show printers in mobile app
    
    payout_instrument:  string
    // Payout Instrument
    
    moto_payment : MerchantMotoPayment
    // Possible values: [UNAVAILABLE, ENFORCED, ON, OFF]
    // Whether merchant can make MOTO payments
    
    stone_merchant_code : string
    // Stone merchant code
    
    adyen_merchant_code : string
    // Adyen merchant code
    
    adyen_user : string
    // Adyen username
    
    adyen_password : string
    // Adyen password
    
    adyen_company : string
    // Adyen company
    
    daily_payout_email : boolean
    // Whether merchant will receive daily payout emails
    
    monthly_payout_email : boolean
    // Whether merchant will receive monthly payout emails
    
    gross_settlement : boolean
    // Whether merchant has gross settlement enabled
}

export type MerchantBankAccount = {
    bank_code: string
    // Bank code

    branch_code: string
    // Branch code

    swift: string
    // SWIFT code

    account_number: string
    // Account number

    iban: string
    // IBAN

    account_type: string
    // Type of the account

    account_category: string
    // Account category - business or personal

    account_holder_name: string
    // status string
    // Status in the verification process

    primary: boolean
    // The primary bank account is the one used for settlements

    created_at: string
    // Creation date of the bank account

    bank_name: string
    // Bank name
}

export type MerchantBusinessOwner = {
    first_name: string
    // BO's first name

    last_name: string
    // BO's last name of the user

    date_of_birth: string
    // Date of birth

    mobile_phone: string
    // Mobile phone number

    landline: string
    // BO's Landline

    ownership: number
    // Ownership percentage
}

export type VatRate = {
    id: number
    // Internal ID

    description: string
    // Description

    rate: number
    // Rate

    ordering: number
    // Ordering

    country: string
    // Country ISO code
}

export type MerchantProfileResponse = {
    merchant_code: string;
    company_name: string;
    website: string;
    legal_type: LegalType,
    merchant_category_code: string,
    mobile_phone: string,
    company_register_number: string,
    vat_id: string,
    permanent_certificate_access_code: string,
    // Permanent certificate access code (Portugal)

    nature_and_purpose: string
    // Nature and purpose of the business

    address: MerchantAddress,
    // Merchant address

    business_owners: MerchantBusinessOwner[],
    // Business owners

    doing_business_as: MerchantDoingBusinessAs,

    settings: MerchantSettings,

    vat_rates: VatRate,

    local: string,
    // merchant local (for internal use only)

    bank_accounts: MerchantBankAccount[],

    extdev: boolean,
    // true if the merchant is in extdev mode

    payout_zone_migration: boolean,
    // true if the merchant is in payout zone migration mode

    country: string,
    // merchant country (for internal use only)

}