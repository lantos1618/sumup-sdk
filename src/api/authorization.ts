import { type } from "os";
import { checkError } from "../models/shared";




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


export interface AuthorizationConfigClientCredentials {
  kind: "client_credentials";
  clientId: string;
  clientSecret: string;
  apiBaseURL: string;
  apiVersion: string;
}

export interface AuthorizationConfigPassword {
  kind: "password";
  username?: string;
  password?: string;
  apiBaseURL: string;
  apiVersion: string;
}

export interface AuthorizationConfigAuthorizationCode {
  kind: "authorization_code";
  authorizationCode?: string;
  clientId: string;
  clientSecret: string;
  apiBaseURL: string;
  apiVersion: string;
}

export interface AuthorizationConfigRefreshToken {
  kind: "refresh_token";
  refreshToken?: string;
  clientId: string;
  clientSecret: string;
  apiBaseURL: string;
  apiVersion: string;
}

export interface AuthorizationConfigBearer {
  kind: "bearer";
  clientId: string;
  clientSecret: string;
  apiBaseURL: string;
  apiVersion: string;
}

export type AuthorizationConfig =
  | AuthorizationConfigClientCredentials
  | AuthorizationConfigPassword
  | AuthorizationConfigAuthorizationCode
  | AuthorizationConfigRefreshToken
  | AuthorizationConfigBearer;

export class Authorization {
  authorizationConfig: AuthorizationConfig;

  constructor(authorizationConfig: AuthorizationConfig) {
    this.authorizationConfig = authorizationConfig;
  }

  public getApiBaseUrl(): string {
    return this.authorizationConfig.apiBaseURL;
  }
  public getApiVersion(): string {
    return this.authorizationConfig.apiVersion;
  }


  async getTokenUsingClientCredentials(): Promise<AccessToken> {
    console.debug('getTokenByClientCredentials');
    this.authorizationConfig = this.authorizationConfig as AuthorizationConfigClientCredentials;

    const method = 'POST';
    const query = {
      grant_type: GenerateAccessTokenRequestGrantType.CLIENT_CREDENTIALS,
      client_id: this.authorizationConfig.clientId,
      client_secret: this.authorizationConfig.clientSecret,
      scope: DEFAULT_USER_AUTHORIZATION_SCOPES.join(' '),
    }
    const queryUrl = '/token';
    const url = `${this.authorizationConfig.apiBaseURL}${queryUrl}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(query),
    });

    checkError(response, method, url, headers);

    return await response.json();
  }

  async getTokenUsingPassword(): Promise<AccessToken> {
    console.debug('getTokenByPassword');
    const method = 'POST';

    this.authorizationConfig = this.authorizationConfig as AuthorizationConfigPassword;

    const query = {
      grant_type: GenerateAccessTokenRequestGrantType.PASSWORD,
      // client_id: this.clientId,
      // client_secret: this.clientSecret,
      username: this.authorizationConfig.username,
      password: this.authorizationConfig.password,
      scope: DEFAULT_USER_AUTHORIZATION_SCOPES.join(' '),
    }
    const queryUrl = '/token';
    const url = `${this.authorizationConfig.apiBaseURL}${queryUrl}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      headers,
      method,
      body: JSON.stringify(query),
    });

    checkError(response, method, url, headers);

    return await response.json();
  }

  async getTokenUsingAuthorizationCode(): Promise<AccessToken> {
    console.debug('getTokenByAuthorizationCode');
    const method = 'POST';

    this.authorizationConfig = this.authorizationConfig as AuthorizationConfigAuthorizationCode;

    const query = {
      grant_type: GenerateAccessTokenRequestGrantType.AUTHORIZATION_CODE,
      client_id: this.authorizationConfig.clientId,
      client_secret: this.authorizationConfig.clientSecret,
      code: this.authorizationConfig.authorizationCode,
    }
    const queryUrl = '/token';
    const url = `${this.authorizationConfig.apiBaseURL}${queryUrl}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(query),
    });

    checkError(response, method, url, headers);

    return await response.json();
  }



  async getTokenUsingRefreshToken(): Promise<AccessToken> {
    console.debug('getTokenByRefreshToken');
    const method = 'POST';

    this.authorizationConfig = this.authorizationConfig as AuthorizationConfigRefreshToken;

    const query = {
      grant_type: GenerateAccessTokenRequestGrantType.REFRESH_TOKEN,
      client_id: this.authorizationConfig.clientId,
      client_secret: this.authorizationConfig.clientSecret,
      refresh_token: this.authorizationConfig.refreshToken,
    }

    const queryUrl = '/token';
    const url = `${this.authorizationConfig.apiBaseURL}${queryUrl}`;
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch(url, {

      method,
      headers,
      body: JSON.stringify(query),
    });

    checkError(response, method, url, headers);

    return await response.json();
  }


  async getTokenUsingBearerToken(): Promise<AccessToken> {
    this.authorizationConfig = this.authorizationConfig as AuthorizationConfigBearer;
    return {
      access_token: this.authorizationConfig.clientSecret,
      token_type: 'bearer',
      expires_in: 0,
    } as AccessToken;
  }

  public async getToken(): Promise<AccessToken> {
    switch (this.authorizationConfig.kind) {
      case "client_credentials":
        // get token using client credentials
        return await this.getTokenUsingClientCredentials();
      case "password":
        // get token using password
        return await this.getTokenUsingPassword();
      case "authorization_code":
        // get token using authorization code
        return await this.getTokenUsingAuthorizationCode();
      case "refresh_token":
        // get token using refresh token
        return await this.getTokenUsingRefreshToken();
      case "bearer":
        // get token using bearer token
        return await this.getTokenUsingBearerToken();
    }
  }
}