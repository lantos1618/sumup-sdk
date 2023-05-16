

export enum AuthorizationScope {
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

export const DEFAULT_USER_AUTHORIZATION_SCOPES = [ AuthorizationScope.PAYMENTS, AuthorizationScope.TRANSACTION_HISTORY, AuthorizationScope.USER_APP_SETTINGS, AuthorizationScope.USER_PROFILE_READ_ONLY ];


export type RequestUserAuthorizationRequest = {
    response_type: string
    // must be 'code'
    // The type of the expected response. The value must be code to indicate that you expect to receive an authorization code.
    client_id: string,
    // The client ID of your application that was generated when you registered it.
    // Example: fOcmczrYtYMJ7Li5GjMLLcUeC9dN
    redirect_uri: string,
    // The URL in your application where users will be sent after authorization.
    scope: AuthorizationScope[],
    // A space-separated list of scopes for which you request authorization. If you don't specify any scopes in the request, your application will be granted authorization for the default scopes.
    // Example: payments
    state?: string,
    // A unique local state that can be used for correlating requests and responses and for preventing cross-site request forgery.
    // Example: 2cFCsY36y95lFHk4
}

export type RequestUserAuthorizationResponse = {
    code: string,
}

export enum GenerateAccessTokenRequestGrantType {
    AUTHORIZATION_CODE = 'authorization_code',
    REFRESH_TOKEN = 'refresh_token',
    CLIENT_CREDENTIALS = 'client_credentials',
    PASSWORD = 'password',
}


export type GenerateAccessTokenRequest = {
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

export type GenerateAccessTokenResponse = {
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
    private expiresAt?: Date;
    private accessToken?: string;

    constructor(private clientId: string, private clientSecret: string, private apiBaseURL: string, private authorization_code?: string, private refreshToken?: string ) { }

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
            },
            body: JSON.stringify(authorization),
        });

        if (!response.ok) {
            throw await {
                url,
                status: response.status,
                statusText: response.statusText,
                body: await response.text(),
            }
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
        // Check for existing access token
        if (this.accessToken) {
            return this.accessToken;
        }

        // Check for existing refresh token
        if (this.refreshToken) {
            // generate a new token using refresh token
            const token = await this.generateAccessToken({
                grant_type: GenerateAccessTokenRequestGrantType.REFRESH_TOKEN,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                refresh_token: this.refreshToken,
            });
            this.accessToken = token.access_token;
            this.refreshToken = token.refresh_token;
            return this.accessToken;
        }

        // If an authorization code is provided, use it to generate a new token
        if (this.authorization_code) {
            const token = await this.generateAccessToken({
                grant_type: GenerateAccessTokenRequestGrantType.AUTHORIZATION_CODE,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: this.authorization_code,
            });
            this.accessToken = token.access_token;
            this.refreshToken = token.refresh_token;
            return this.accessToken;
        }

        // If no refresh token or authorization code, use client credentials to generate a new token
        const token = await this.generateAccessToken({
            grant_type: GenerateAccessTokenRequestGrantType.CLIENT_CREDENTIALS,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        });
        this.accessToken = token.access_token;
        this.refreshToken = token.refresh_token;
        return this.accessToken;
    }
}
