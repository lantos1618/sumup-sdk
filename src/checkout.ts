
// sumup api 

import { Authorization } from "./authorization"

// ISO 4217 currency codes [https://en.wikipedia.org/wiki/ISO_4217]
// BGN, BRL, CHF, CLP, CZK, DKK, EUR, GBP, HRK, HUF, NOK, PLN, RON, SEK, USD]
enum Currency {
    BGN = 'BGN',
    BRL = 'BRL',
    CHF = 'CHF',
    CLP = 'CLP',
    CZK = 'CZK',
    DKK = 'DKK',
    EUR = 'EUR',
    GBP = 'GBP',
    HRK = 'HRK',
    HUF = 'HUF',
    NOK = 'NOK',
    PLN = 'PLN',
    RON = 'RON',
    SEK = 'SEK',
    USD = 'USD',
}

// AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO
enum PersonalDetailsState {
    AC = "AC",
    AL = "AL",
    AP = "AP",
    AM = "AM",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MT = "MT",
    MS = "MS",
    MG = "MG",
    PA = "PA",
    PB = "PB",
    PR = "PR",
    PE = "PE",
    PI = "PI",
    RJ = "RJ",
    RN = "RN",
    RS = "RS",
    RO = "RO",
    RR = "RR",
    SC = "SC",
    SP = "SP",
    SE = "SE",
    TO = "TO"
}

type CreateCheckoutRequest = {
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
    // URL to which the user is redirected after the payment is completed. If not specified, the user is redirected to the SumUp dashboard.
    customer_id?: string,
    // Unique ID of the customer specified by the client application when creating the customer resource.
    redirect_url?: string,
    // required for 3DS payments
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

enum CreateCheckoutStatus {
    // PAID = 'PAID',
    UNPAID = 'UNPAID',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}

type Mandate = {
    type?: string,
    // indicates the type of the mandate
    status?: string,
    // indicates the status of the mandate
    mandate_code?: string,
    // Unique ID of the mandate resource.
}

// possible 201, 400, 401, 403, 404, 409
type CreateCheckoutResponse = {
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


enum CheckoutStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    UNPAID = 'UNPAID',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}

enum TransactionStatus {
    SUCCESSFUL = 'SUCCESSFUL',
    // Add other statuses as needed
}

enum PaymentType {
    ECOM = 'ECOM',
    // Add other types as needed
}

enum EntryMode {
    CUSTOMER_ENTRY = 'CUSTOMER_ENTRY',
    // Add other modes as needed
}


type Transaction = {
    id: string,
    transaction_code: string,
    amount: number,
    currency: Currency,
    timestamp: string,
    status: TransactionStatus,
    payment_type: PaymentType,
    installments_count: number,
    merchant_code: string,
    vat_amount: number,
    tip_amount: number,
    entry_mode: EntryMode,
    auth_code: string,
    internal_id: number,
}

type PaymentInstrument = {
    token: string,
}

type ListCheckoutResponse = Checkout[]

type ListCheckoutRequest = {
    checkout_reference: string
    // Filters the list of checkout resources by the unique ID of the checkout.
}


type CheckoutType = {
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

type GetCheckoutRequest = {
    checkout_reference: string
}


type Card = {
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

enum CheckoutPaymentType {
    // card, boleto, ideal, sofort, bancontact
    CARD = 'card',
    BOLETO = 'boleto',
    IDEAL = 'ideal',
    SOFORT = 'sofort',
    BANCONTACT = 'bancontact',
}


type ProcessCheckoutMandate = {
    type: string,
    // Possible values: [recurrent]
    // Indicates the mandate type
    user_agent: string,
    // Operating system and web client used by the end user
    user_ip?: string,
    // IP address of the end user. Supports IPv4 and IPv6
}


type ProcessCheckoutRequest = {
    payment_type: CheckoutPaymentType,
    // The payment method used for the checkout.

    installments?: number,
    // Number of installments for the payment. The value must be between 1 and 12.

    mandate?: ProcessCheckoutMandate,
    // Mandate details for the payment. Required if the payment_type is boleto.
    card?: Card,
    // Card details for the payment. Required if the payment_type is card.

    token: string,
    // Required when using a tokenized card to process a checkout. Unique token identifying the saved payment card for a customer.

    customer_id?: string,
    // Required when token is provided. Unique ID of the customer.

}

type SofortResponse = {
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

type IdealResponse = {
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

type BancontactResponse = {
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

type BoletoResponse = {
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


type ProcessCheckoutResponse = SofortResponse | IdealResponse | BancontactResponse | BoletoResponse;


enum ProcessCheckoutNextStepMechanism {
    IFRAME = 'iframe',
    BROWSER = 'browser',
}

type ProcessCheckoutNextStep = {
    url?: string,
    method?: string,
    redirect_url?: string,
    mechanism?: ProcessCheckoutNextStepMechanism[],
    payload?: any
}

enum Purpose {
    SETUP_RECURRING_PAYMENT = 'SETUP_RECURRING_PAYMENT',
    CHECKOUT = 'CHECKOUT',
}


type CancelCheckoutRequestStatus = {
    EXPIRED: 'EXPIRED',
}
type CancelCheckoutResponse = {
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


type CancelCheckoutRequest = {
    checkout_reference: string
}

export class Checkout {
    // this API is and should be simple so we don't need to create a builder 

    constructor(private authorization: Authorization) {}

    async listCheckouts(checkout: ListCheckoutRequest): Promise<ListCheckoutResponse> {
        const queryURL = "/checkouts";
        const queryParameters = new URLSearchParams(checkout);
        const url = this.authorization.getApiBaseUrl() + queryURL + '?' + queryParameters.toString();
        const method = 'GET';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authorization.getToken()}`
            },
        });
        if (!response.ok) {
            throw await response.json();
        }
        return await response.json() as ListCheckoutResponse;

    }

    async getCheckout(checkout: GetCheckoutRequest): Promise<CheckoutType> {
        const queryURL = "/checkouts";
        // const queryParameters = new URLSearchParams(checkout);
        const url = this.authorization.getApiBaseUrl() + queryURL + '/' + checkout.checkout_reference;
        const method = 'GET';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authorization.getToken()}`
            },
        });


        if (!response.ok) {
            throw await response.json();
        }
        return await response.json() as CheckoutType;

    }

    async createCheckout(checkout: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
        const queryURL = "/checkouts";
        const url = this.authorization.getApiBaseUrl() + queryURL;
        const method = 'POST';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authorization.getToken()}`
            },
            body: JSON.stringify(checkout)
        });

        if (!response.ok) {
            throw await response.json();
        }
        return await response.json() as CreateCheckoutResponse;
    }

    async processCheckout(checkout: ProcessCheckoutRequest): Promise<ProcessCheckoutResponse | ProcessCheckoutNextStep> {
        // for some reason sumup thought it would be a good idea to have 
        // - card
        // - boleto
        // - ideal
        // - sofort
        // - bancontact
        // responses in the same endpoint without types... 
        // so lets map them to a type that we can differentiate

        const queryURL = "/checkouts";

        const url = this.authorization.getApiBaseUrl() + queryURL + '/' + checkout.token;
        const method = 'PUT';

        // response are 200, 202
        // 200 means the payment was processed
        // 202 means the payment is Accepted and is being processed

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(checkout)
        });

        if (response.status === 200) {
            return await response.json() as ProcessCheckoutResponse;
        }
        if (response.status === 202) {
            return await response.json() as ProcessCheckoutNextStep;
        }
        throw await response.json();
    }

    async cancelCheckout(checkout: CancelCheckoutRequest): Promise<CancelCheckoutResponse> {
        const queryURL = "/checkouts";

        const url = this.authorization.getApiBaseUrl() + queryURL + '/' + checkout.checkout_reference;
        const method = 'DELETE';

        // response are 200, 202
        // 200 means the payment was processed
        // 202 means the payment is Accepted and is being processed

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(checkout)
        });

        if (response.status === 200) {
            return await response.json() as CancelCheckoutResponse;
        }
        throw await response.json();
    }
}