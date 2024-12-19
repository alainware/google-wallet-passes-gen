# Google Wallet Passes Generator

This project demonstrates how to generate Google Wallet passes using Node.js and Express.

## Author

| Author         |
|----------------|
| Irving Aguilar |

## Usage

The project was developed using Node.js `v20.14.0`.

### Pre-requisites

You should run the following command on your preferred terminal in order to install all the project dependencies:

```bash
$ npm i
```

The following system environment variables must be configured:

```text
GOOGLE_APPLICATION_CREDENTIALS=<path_to_application_credentials>
GOOGLE_WALLET_ISSUER_ID=<google_wallet_issuer_id>
GOOGLE_WALLET_PASS_CLASS_DEV=<pass_class_name>
```

### Execution

```bash
$ node app.js
```

### API Endpoints

```text
Create Pass Class -> localhost:3000/api/google-wallet-utils/create-pass-class
```
