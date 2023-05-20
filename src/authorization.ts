import { type } from "os";




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

export const DEFAULT_USER_AUTHORIZATION_SCOPES = [AuthorizationScope.PAYMENTS, AuthorizationScope.TRANSACTION_HISTORY, AuthorizationScope.USER_APP_SETTINGS, AuthorizationScope.USER_PROFILE_READ_ONLY];


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
  BEARER = 'bearer', // this is a custom grant type to allow for supplying an access token directly
}


export type GenerateAccessTokenRequest = {
  grant_type: GenerateAccessTokenRequestGrantType.AUTHORIZATION_CODE,
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

export type AccessToken = {
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


type AuthorizationConfigClientCredentials = {
  kind: 'client_credentials';
  clientId: string;
  clientSecret: string;
  apiBaseURL: string;

};
type AuthorizationConfigPassword = {
  kind: 'password';

  username?: string;
  password?: string;
  apiBaseURL: string;

};

type AuthorizationConfigAuthorizationCode = {
  kind: 'authorization_code';
  authorizationCode?: string;
  clientId: string;
  clientSecret: string;
  apiBaseURL: string;
};

type AuthorizationConfigRefreshToken = {
  kind: 'refresh_token';
  refreshToken?: string;
  clientId: string;
  clientSecret: string;
  apiBaseURL: string;
};

type AuthorizationConfigBearer = {
  kind: 'bearer';
  accessToken?: string;
  apiBaseURL: string;
};

type AuthorizationConfig = AuthorizationConfigClientCredentials |
  AuthorizationConfigPassword |
  AuthorizationConfigAuthorizationCode |
  AuthorizationConfigRefreshToken |
  AuthorizationConfigBearer;

  
export class Authorization {
  private config: AuthorizationConfig;
  private accessToken?: AccessToken;

  constructor(config: AuthorizationConfig) {
      this.config = config;
  }
  getApiBaseUrl(): string {
    return this.config.apiBaseURL;
  }

  public async getTokenByCode(): Promise<AccessToken> {
    const method = 'POST';
    const query = {
      grant_type: GenerateAccessTokenRequestGrantType.AUTHORIZATION_CODE,
      client_id: this.config.clientId,
      client_secret: this.clientSecret,
      code: this.authorizationCode,
    }
    const queryUrl = '/token';
    const url = `${this.config.apiBaseURL}${queryUrl}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      }
    }
    return await response.json();
  }

  public async getTokenByClientCredentials(): Promise<AccessToken> {
    console.debug('getTokenByClientCredentials');
    const method = 'POST';
    const query = {
      grant_type: GenerateAccessTokenRequestGrantType.CLIENT_CREDENTIALS,
      // client_id: this.clientId,
      // client_secret: this.clientSecret,
      scope: DEFAULT_USER_AUTHORIZATION_SCOPES.join(' '),
    }
    const queryUrl = '/token';
    const url = ``;
    // const url = `${this.apiBaseURL}${queryUrl}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw {
        method,
        url,
        query,
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      }
    }
    // update token
    this.accessToken = await response.json() as AccessToken;
    return await response.json();
  }
  public async getTokenByPassword() { }
  public async getRefreshToken(refreshToken: string) {

  }
  public async getToken() {
    // should probably check if token is expired
    switch (this.config.grantType) {
      case GenerateAccessTokenRequestGrantType.BEARER:
        return {
          access_token: this.config.accessToken,
          token_type: 'bearer',
        }
      case GenerateAccessTokenRequestGrantType.AUTHORIZATION_CODE:
        return await this.getTokenByCode();
      
      case GenerateAccessTokenRequestGrantType.CLIENT_CREDENTIALS:
        return await this.getTokenByClientCredentials();

      case GenerateAccessTokenRequestGrantType.REFRESH_TOKEN:
        if (!this.config.refreshToken) {
          throw new Error('Refresh token is required');
        }
        return await this.getRefreshToken(this.config.refreshToken);
      case GenerateAccessTokenRequestGrantType.PASSWORD:
        return await this.getTokenByPassword();
      default:
        return await this.getTokenByClientCredentials();
    }
    
  }

}
