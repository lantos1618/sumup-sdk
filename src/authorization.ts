
// sumup api 

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


type Checkout = {
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

enum AuthorizationScope {
    // https://developer.sumup.com/docs/online-payments/introduction/authorization/#authorization-scopes
    PAYMENTS = 'payments',
    PAYMENT_INSTRUMENTS = 'payment_instruments',
    TRANSACTION_HISTORY = 'transaction.history',
    USER_APP_SETTINGS = 'user.app-settings',
    USER_PROFILE_READ_ONLY = 'user.profile.read-only',
    USER_PROFILE = 'user.profile',
    USER_SUBACCOUNTS = 'user.subaccounts',
    USER_PAYOUT_SETTINGS = 'user.payout-settings',
    PRODUCTS = 'products',

}

type RequestUserAuthorizationRequest = {
    response_type: string,
    // The type of the expected response. The value must be code to indicate that you expect to receive an authorization code.
    client_id: string,
    // The client ID of your application that was generated when you registered it.
    // Example: fOcmczrYtYMJ7Li5GjMLLcUeC9dN
    redirect_uri: string,
    // The URL in your application where users will be sent after authorization.
    scope: AuthorizationScope,
    // A space-separated list of scopes for which you request authorization. If you don't specify any scopes in the request, your application will be granted authorization for the default scopes.
    // Example: payments
    state?: string,
    // A unique local state that can be used for correlating requests and responses and for preventing cross-site request forgery.
    // Example: 2cFCsY36y95lFHk4
}

type RequestUserAuthorizationResponse = {
    code: string,
}

enum GenerateAccessTokenRequestGrantType {
    AUTHORIZATION_CODE = 'authorization_code',
    REFRESH_TOKEN = 'refresh_token',
}

type GenerateAccessTokenRequest = {
    grant_type: GenerateAccessTokenRequestGrantType,
    // The grant type used for obtaining an access token.
    client_id: string,
    // The client ID of your application that was generated when you registered it.
    client_secret: string,
    // The client secret of your application that was generated when you registered it.
    code?: string,
    // The authorization code that you received from the authorization server.
    refresh_token?: string,
    // a required parameter if the grant_type is refresh_token. The refresh token that you received from the authorization server.
}

type GenerateAccessTokenResponse = {
    access_token: string,
    // The access token that you need to use in your requests to the SumUp API.
    token_type: string,
    // The type of the token. The value is always Bearer.
    expires_in: number,
    // The number of seconds until the access token expires.
    refresh_token: string,
    // The refresh token that you need to use to obtain a new access token.
    scope: string,
    // List of authorization scopes granted to your access token.
}


export class Authorization {
    // this API is and should be simple so we don't need to create a builder 

    private expiresAt?: Date;
    private accessToken?: string;

    constructor(private clientId: string, private clientSecret: string, private apiBaseURL: string) { }

    getApiBaseUrl(): string {
        return this.apiBaseURL;
    }

    // authentification OAuth2.0
    async requestUserAuthorization(authorization: RequestUserAuthorizationRequest): Promise<void> {
        const queryURL = "/authorize";
        const url = this.apiBaseURL + queryURL;
        const method = 'GET';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw await response.json();
        }
        // return await response.json() as RequestUserAuthorizationResponse;
    }

    async generateAccessToken(authorization: GenerateAccessTokenRequest): Promise<GenerateAccessTokenResponse> {
        const queryURL = "/token";
        const url = this.apiBaseURL + queryURL;
        const method = 'POST';
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw await response.json();
        }

        const json = await response.json() as GenerateAccessTokenResponse;

        // set the expiration date
        const expiresAt = new Date();
        if (this.expiresAt === undefined) {
            this.expiresAt = expiresAt;
        }
        this.expiresAt.setSeconds(expiresAt.getSeconds() + json.expires_in);

        return await response.json() as GenerateAccessTokenResponse;
    }

    isTokenExpired(): boolean {
        // see if now is after the expiration date
        if (this.expiresAt === undefined) {
            return true;
        }
        return new Date() > this.expiresAt;
    }

    async getToken(): Promise<string> {
        // if the token is set and not expired, return it
        // else, generate a new token and return it

        if (!this.isTokenExpired()) {
            if (this.accessToken) {
                return this.accessToken;
            } else {
                // generate a new token
                const token = await this.generateAccessToken({
                    grant_type: GenerateAccessTokenRequestGrantType.AUTHORIZATION_CODE,
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                });
                this.accessToken = token.access_token;
            }
        } else {
            // generate a new token
            const token = await this.generateAccessToken({
                grant_type: GenerateAccessTokenRequestGrantType.AUTHORIZATION_CODE,
                client_id: this.clientId,
                client_secret: this.clientSecret,
            });
            this.accessToken = token.access_token;
        }

        return this.accessToken;
    }
}
