
// ISO 4217 currency codes [https://en.wikipedia.org/wiki/ISO_4217]
// BGN, BRL, CHF, CLP, CZK, DKK, EUR, GBP, HRK, HUF, NOK, PLN, RON, SEK, USD]
export enum Currency {
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
export enum PersonalDetailsState {
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


export async function checkError(response: Response, method: string, url: string, headers: Headers| HeadersInit) {
    if (!response.ok) {
        let body: string = ""
        try {
            body = await response.text();

        } catch (error) {

        }
        throw {
            method,
            url,
            headers,
            status: response.status,
            statusText: response.statusText,
            body: body
        }
    }
}