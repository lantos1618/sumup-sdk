# Sumup Rest api typescript

This is not an official package, and is not supported by Sumup. It is a community package, and is not guaranteed to be up to date with the latest Sumup API. 


This is not perfect, the goal is to implement the minimum required to get paid. 


Recomendations to sumup: (I mean this in the nicest way possible)
- Fix the documentation, please mark your api with Backend/Frontend
- Fix the API QA process. You have typeo's in the documentation and API responses.
- Develop Stronger Webhook strategy.
- Please sandbox?
- Document url parameters. 
- Consolidate some of the responses. You have multiple return types for the same endpoint.


## API 
https://developer.sumup.com/docs/api/sum-up-rest-api/


- [Introduction](https://developer.sumup.com/docs/api/sum-up-rest-api/)
- Authorization
  - [Request authorization from users](https://developer.sumup.com/docs/api/request-authorization-from-users/)
  - [Generate a token](https://developer.sumup.com/docs/api/generate-a-token/)
- Checkouts
  - [Get available payment methods](https://developer.sumup.com/docs/api/get-available-payment-methods/)
  - [Create a checkout](https://developer.sumup.com/docs/api/create-a-checkout/)
  - [List checkouts](https://developer.sumup.com/docs/api/list-checkouts/)
  - [Retrieve a checkout](https://developer.sumup.com/docs/api/retrieve-a-checkout/)
  - [Process a checkout](https://developer.sumup.com/docs/api/process-a-checkout/)
  - [Deactivate a checkout](https://developer.sumup.com/docs/api/deactivate-a-checkout/)
- Customers
  - [Create a customer](https://developer.sumup.com/docs/api/create-a-customer/)
  - [Retrieve a customer](https://developer.sumup.com/docs/api/retrieve-a-customer/)
  - [Update a customer](https://developer.sumup.com/docs/api/update-a-customer/)
  - [Create a payment instrument](https://developer.sumup.com/docs/api/create-a-payment-instrument/)
  - [List payment instruments](https://developer.sumup.com/docs/api/list-payment-instruments/)
  - [Deactivate a payment instrument](https://developer.sumup.com/docs/api/deactivate-a-payment-instrument/)
- Transactions
  - [Retrieve a transaction](https://developer.sumup.com/docs/api/retrieve-a-transaction/)
  - [List transactions](https://developer.sumup.com/docs/api/list-transactions/)
- Payouts
  - [List payouts](https://developer.sumup.com/docs/api/list-payouts/)
  - [List transactions](https://developer.sumup.com/docs/api/list-transactions/)
- Refunds
  - [Refund a transaction](https://developer.sumup.com/docs/api/refund-a-transaction/)
- Receipts
  - [Retrieve receipt details](https://developer.sumup.com/docs/api/retrieve-receipt-details/)
- Account Details
  - [Retrieve an account](https://developer.sumup.com/docs/api/retrieve-an-account/)
- Personal Account
  - [Retrieve a personal profile](https://developer.sumup.com/docs/api/retrieve-a-personal-profile/)
- Merchant Account
  - [Retrieve a merchant profile](https://developer.sumup.com/docs/api/retrieve-a-merchant-profile/)
  - [Retrieve DBA](https://developer.sumup.com/docs/api/retrieve-dba/)
  - [List bank accounts](https://developer.sumup.com/docs/api/list-bank-accounts/)
  - [List settings](https://developer.sumup.com/docs/api/list-settings/)
- Subaccounts
  - [Create a subaccount](https://developer.sumup.com/docs/api/create-a-subaccount/)
  - [List subaccounts](https://developer.sumup.com/docs/api/list-subaccounts/)
  - [Update a subaccount](https://developer.sumup.com/docs/api/update-a-subaccount/)
  - [Deactivate a subaccount](https://developer.sumup.com/docs/api/deactivate-a-subaccount/)


TODO 
- [ ] Add tests
- [ ] Add more documentation
- [ ] Add more examples



Updates:
- 2023-05-15: Added support for Authentication
- 2023-05-15: Added support for Checkouts
- 2023-05-20: Fixed Authentication, added some api. Checkout + Merchant