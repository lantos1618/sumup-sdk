import { Currency, PersonalDetailsState } from "./shared"

export type CreateCheckoutRequest = {
    checkout_reference: string,
    // <= 90 characters
    // Unique ID of the payment checkout specified by the client application when creating the checkout resource.
    amount: number,
    currency: Currency,
    merchant_code: string,
    // Unique identifying code of the merchant profile.
    pay_to_email?: string,
    // Email address of the registered user (merchant) to whom the payment is made. It is highly recommended to use merchant_code instead of pay_to_email.
    description?: string,
    // Short description of the checkout visible in the SumUp dashboard. The description can contribute to reporting = "ng",
    //  allowing easier identification of a checkout.
    return_url?: string,
    // required if you want `browser` mechanism for 3ds
    // URL to which the user is redirected after the payment is completed. If not specified, the user is redirected to the SumUp dashboard.
    customer_id?: string,
    // Unique ID of the customer specified by the client application when creating the customer resource.
    redirect_url?: string,
    // required for 3DS payments
    // DO NOT CONFUSE WITH RETURN_URL! 
    // URL to which the user is redirected after the payment is completed. If not specified, the user is redirected to the SumUp dashboard.
    payment_type?: string,
    // Alternative payment method name

    personal_details?: {
        email?: string,
        first_name?: string,
        last_name?: string,
        tax_id?: string,
        address: {
            country?: string,
            city?: string,
            line_1?: string,
            state?: string | PersonalDetailsState,
            postal_code?: number,
            // /^d{5}$-?\d{4}?$/
        }
    }
}

export enum CreateCheckoutStatus {
    // Sumup doesn't have a collated enum for this so we have to make our own
    // PAID = 'PAID',
    PENDING = 'PENDING',
    UNPAID = 'UNPAID',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}


export type Mandate = {
    type?: string,
    // indicates the type of the mandate
    status?: string,
    // indicates the status of the mandate
    mandate_code?: string,
    // Unique ID of the mandate resource.
}

// possible 201, 400, 401, 403, 404, 409
export type CreateCheckoutResponse = {
    checkout_reference: string,
    // <= 90 characters
    // Unique ID of the payment checkout specified by the client application when creating the checkout resource.
    amount: number,
    currency: Currency,
    pay_to_email?: string,
    merchant_code: string,
    // Unique identifying code of the merchant profile.
    description?: string,
    // Short description of the checkout visible in the SumUp dashboard. The description can contribute to reporting = "ng",
    //  allowing easier identification of a checkout.
    return_url?: string,
    // https://developer.sumup.com/docs/online-payments/introduction/webhooks/
    // Sumup uses this as the webhook url... WHY?? bro just call it a webhook url
    // URL to which the user is redirected after the payment is completed. If not specified, the user is redirected to the SumUp dashboard.

    id?: string,
    // Unique ID of the checkout resource.
    status?: CreateCheckoutStatus,
    date?: Date,
    // Date and time of the checkout creation in the ISO 8601 format.
    valid_until?: Date,
    // Date and time of the checkout expiration in the ISO 8601 format.
    customer_id?: string,
    // Unique ID of the customer specified by the client application when creating the customer resource.
    mandate?: Mandate,
    transaction?: [],
    // List of transactions related to the payment.
}


export enum CheckoutStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    UNPAID = 'UNPAID',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}

export enum TransactionStatus {
    SUCCESSFUL = 'SUCCESSFUL',
    // Add other statuses as needed
}

export enum TransactionPaymentType {
    ECOM = 'ECOM',
    // Add other types as needed
}

export enum EntryMode {
    CUSTOMER_ENTRY = 'CUSTOMER_ENTRY',
    // Add other modes as needed
}


export type Transaction = {
    id: string,
    transaction_code: string,
    amount: number,
    currency: Currency,
    timestamp: string,
    status: TransactionStatus,
    payment_type: TransactionPaymentType,
    installments_count: number,
    merchant_code: string,
    vat_amount: number,
    tip_amount: number,
    entry_mode: EntryMode,
    auth_code: string,
    internal_id: number,
}

export type PaymentInstrument = {
    token: string,
}

export type ListCheckoutResponse = CheckoutType[]

export type ListCheckoutRequest = {
    checkout_reference: string
    // Filters the list of checkout resources by the unique ID of the checkout.
}


export type CheckoutType = {
    checkout_reference: string,
    amount: number,
    currency: Currency,
    pay_to_email: string,
    merchant_code: string,
    description: string,
    return_url: string,
    id: string,
    status: CheckoutStatus,
    date: string,
    valid_until: string,
    customer_id: string,
    mandate: Mandate,
    transactions: Transaction[],
    transaction_code: string,
    transaction_id: string,
    merchant_name: string,
    redirect_url: string,
    payment_instrument: PaymentInstrument,
}

export type GetCheckoutRequest = {
    checkout_reference: string
}


export type Card = {
    name: string,
    // Name of the cardholder as it appears on the payment card.
    number: string,
    // Number of the payment card. (without spaces)
    expiry_year: string,
    // possible values: 2-digit year, 4-digit year

    expiry_month: string,
    // possible values: [01, 02, 03, ..., 12]
    cvv: string,
    // Card verification value. 3 or 4 digits printed on the back of the card.
    zip_code?: string,
    // Possible values: >= 5 characters and <= 5 characters
    // Required five-digit ZIP code. Applicable only to merchant users in the USA.    
}

export enum ProcessCheckoutRequestPaymentType {
    // card, boleto, ideal, sofort, bancontact
    CARD = 'card',
    BOLETO = 'boleto',
    IDEAL = 'ideal',
    SOFORT = 'sofort',
    BANCONTACT = 'bancontact',
}


export type ProcessCheckoutMandate = {
    type: string,
    // Possible values: [recurrent]
    // Indicates the mandate type
    user_agent: string,
    // Operating system and web client used by the end user
    user_ip?: string,
    // IP address of the end user. Supports IPv4 and IPv6
}


export type ProcessCheckoutRequest = {
    checkout_reference: string,

    payment_type: ProcessCheckoutRequestPaymentType,
    // The payment method used for the checkout.

    installments?: number,
    // Number of installments for the payment. The value must be between 1 and 12.

    mandate?: ProcessCheckoutMandate,
    // Mandate details for the payment. Required if the payment_type is boleto.
    card?: Card,
    // Card details for the payment. Required if the payment_type is card.

    token?: string,
    // Required when using a tokenized card to process a checkout. Unique token identifying the saved payment card for a customer.

    customer_id?: string,
    // Required when token is provided. Unique ID of the customer.

}

export type SofortResponse = {
    next_step: {
        url: string,
        method: string,
        payload: {
            tx: string,
            rs: string,
            cs: string
        },
        full: string,
        mechanism: string[]
    }
};

export type IdealResponse = {
    next_step: {
        url: string,
        method: string,
        payload: {
            tx: string,
            rs: string,
            cs: string
        },
        full: string,
        mechanism: string[]
    }
};

export type BancontactResponse = {
    next_step: {
        url: string,
        method: string,
        payload: {
            tx: string,
            rs: string,
            cs: string
        },
        full: string,
        mechanism: string[]
    }
};

export type BoletoResponse = {
    checkout_reference: string,
    amount: number,
    currency: string,
    pay_to_email: string,
    merchant_code: string,
    description: string,
    id: string,
    status: string,
    date: string,
    merchant_name: string,
    boleto: {
        barcode: string,
        url: string
    },
    redirect_url: string,
    purpose: string,
    transactions: Transaction[]
};


export type ProcessCheckoutResponse = SofortResponse | IdealResponse | BancontactResponse | BoletoResponse;


export enum ProcessCheckoutNextStepMechanism {
    IFRAME = 'iframe',
    BROWSER = 'browser',
}

export type ProcessCheckoutNextStep = {
    url?: string,
    method?: string,
    redirect_url?: string,
    mechanism?: ProcessCheckoutNextStepMechanism[],
    payload?: any
}

export enum Purpose {
    SETUP_RECURRING_PAYMENT = 'SETUP_RECURRING_PAYMENT',
    CHECKOUT = 'CHECKOUT',
}


export type CancelCheckoutRequestStatus = {
    EXPIRED: 'EXPIRED',
}
export type CancelCheckoutResponse = {
    checkout_reference: string
    // <= 90 characters
    id?: string
    amount?: number
    currency?: Currency
    pay_to_email?: string
    merchant_code?: string
    description?: string
    purpose?: Purpose

    status?: CancelCheckoutRequestStatus,
    date?: Date,
    valid_until?: Date,
    merchant_name?: string,
    transactions?: Transaction[],
}


export type CancelCheckoutRequest = {
    checkout_reference: string
}
