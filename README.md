# project-identity-resolver
Reference implementation of UNTP link resolver and credential store

* Will implement [ISO-18975](https://www.iso.org/standard/85540.html)
* Will support any identifier type
* Will add credential store capabilites to host DPPs etc.

Development work is expected to start in July 2024.

## Storage Service

This repository contains an Express REST API that provides an endpoint to encrypt and store Verifiable Credentials.

The credentials endpoint provides the following functionality:

-   **Hash Computation**: It computes the hash of a given document, ensuring data integrity.
-   **Encryption**: The document is encrypted, adding a layer of security to publicly accessible documents.
-   **Storage**: The encrypted document is stored using the specified storage adapter.
-   **Data Retrieval**: Upon successful storage, the service returns three key pieces of information:
    -   The hash of the original document.
    -   A decryption key, essential for decrypting the encrypted document.
    -   The URI of the stored encrypted document.

### Prerequisites

-   [npm](https://www.npmjs.com/) (>= 9.8.1)
-   [yarn](https://yarnpkg.com/) (>= 1.22.21)

### Environment variables

An example env file `.env.example` can be found in the root directory. Duplicate and rename the file to `.env` and modify the variables as required.

### Usage

```bash
# Install dependencies
yarn install

# Run the app
yarn start

# Build the app
yarn build

# Run linter
yarn lint

# Run tests
yarn test
```

## Docker

```bash
# Build the image
docker build -t storage-service:latest .

# Local Storage - Start the container
docker run -d --env-file .env storage-service:latest

# Cloud Storage - Start the container 
docker run -d --env-file .env -p 3333:3333 \
-v path/to/local/gcp/service-account-file.json:/tmp/service-account-file.json \
storage-service:latest
```

### Example

#### Store Credential

```bash
# Request
curl -X POST http://localhost:3333/v1/credentials -H "Content-Type: application/json" -d '{
    "bucket": "verifiable-credentials",
    "data": {
        "field1": "value1",
        "field2": "value2"
    },
    "filename": "myFile"
}'

# Response
{
    "uri": "https://verifiable-credentials.storage.googleapis.com/myFile.json",
    "hash": "b9ef9745ec5ad95a030de384d6c8713f4e82f45ba9a4e694e0b4f785b3b4f8c61fe6cb5a388d31ee2fb919c00211f4eb55ef9a57f947bcda6545d5276ed0d2d5",
    "key": "a1b4fa1a361801a9e2f9709c663eba3bea71a455bae08e4acf62f8d596ece669"
}
```
