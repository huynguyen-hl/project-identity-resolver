# project-identity-resolver
Reference implementation of UNTP link resolver and credential store

* Will implement [ISO-18975](https://www.iso.org/standard/85540.html)
* Will support any identifier type
* Will add credential store capabilites to host DPPs etc.

Development work is expected to start in July 2024.

## Overview

The service offers the following functionality:

-   **Hash Computation**:
    Computes the SHA-256 hash of a given document to ensure data integrity.
-   **Encryption**:
    Encrypts the document using AES-256-GCM for enhanced security.
-   **Storage**:
    Stores the encrypted document using the specified storage adapter
    (local file system or Google Cloud Storage).
-   **Data Retrieval**:
    Upon successful storage, the service returns:
    -   The hash of the original document.
    -   A decryption key for the encrypted document (if applicable).
    -   The URI of the stored encrypted document.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18.18.0)
-   [Yarn](https://yarnpkg.com/) (>= 1.22.21)

## Environment Variables

An example environment file `.env.example` is provided in the storage service directory.
Copy and rename it to `.env`,
then modify the variables as required.
The default values should be sufficient for local development.

## Usage

```bash
# Install dependencies
yarn install

# Build the app
yarn build

# Run the app and watch for changes
yarn dev

# Start the server once built
yarn start

# Run linter
yarn lint

# Run tests
yarn test
```

## Configuration

Configure the storage service using the following environment variables:

-   `STORAGE_TYPE`:
    The type of storage to use (`local` or `gcp` or `aws`).
-   `LOCAL_DIRECTORY`:
    The directory for local storage (default: `uploads` in the current directory).
-   `GOOGLE_APPLICATION_CREDENTIALS`:
    The path to the GCP service account file (if using GCP).
-   `REGION`:
    The AWS region to use (if using AWS).
-   `AWS_ACCESS_KEY_ID`:
    The AWS access key to use (if using AWS).
-   `AWS_SECRET_ACCESS_KEY`:
    The AWS secret access key to use (if using AWS).

## Storage Types

### Local Storage

For development purposes,
use the local storage service,
which stores files in the local file system.

Example:

```bash
# Set the storage type to local
export STORAGE_TYPE=local

# Run the app
yarn dev
```

### Google Cloud Storage

For production environments,
use Google Cloud Storage to store files in a GCP bucket.

Example:

```bash
# Set the storage type to gcp
export STORAGE_TYPE=gcp

# Set the path to the GCP service account file
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-file.json

# Build the app
yarn build

# Run the app
yarn start
```

### Amazon Web Services (AWS)

For the production environment, we recommend using IAM roles to enhance security and eliminate the need to hardcode AWS credentials.
To more details about using IAM roles, please refer to the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html).
Use Amazon Web Services to store files in an S3 bucket.

Example:

```bash
# Set the storage type to aws
export STORAGE_TYPE=aws

# Set the AWS region
export REGION=ap-southeast-2
export AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID # Local development only
export AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY # Local development only

# Build the app
yarn build

# Run the app
yarn start
```

## Cryptography

The cryptography service uses the following algorithms:

-   **Hash Algorithm**:
    SHA-256
-   **Encryption Algorithm**:
    AES-256-GCM

## Endpoints

### Store Credential

-   **URL**: `/v1/credentials`
-   **Method**: `POST`
-   **Request Body**:

    ```json
    {
        "bucket": "verifiable-credentials",
        "data": {
            "field1": "value1",
            "field2": "value2"
        },
        "id": "123e4567-e89b-12d3-a456-426614174000" // optional
    }
    ```

-   **Response**:

    ```json
    {
        "uri": "http://localhost:3333/v1/verifiable-credentials/123e4567-e89b-12d3-a456-426614174000.json",
        "hash": "computed-hash",
        "key": "encryption-key"
    }
    ```

### Store Document

-   **URL**: `/v1/documents`
-   **Method**: `POST`
-   **Request Body**:

    ```json
    {
        "bucket": "verifiable-credentials",
        "data": {
            "document": "content"
        },
        "id": "123e4567-e89b-12d3-a456-426614174000" // optional
    }
    ```

-   **Response**:

    ```json
    {
        "uri": "http://localhost:3333/v1/verifiable-credentials/123e4567-e89b-12d3-a456-426614174000.json",
        "hash": "computed-hash"
    }
    ```

## Docker

To run the storage service using Docker:

```bash
# Build the image
docker build -t storage-service:latest .

# Start the container using local storage
docker run -d --env-file .env -p 3333:3333 \
storage-service:latest

# Start the container using Google Cloud Storage
docker run -d --env-file .env -p 3333:3333 \
-e STORAGE_TYPE=gcp \
-v path/to/local/gcp/service-account-file.json:/tmp/service-account-file.json \
storage-service:latest

# Start the container using Amazon Web Services (AWS)
docker run -d --env-file .env -p 3333:3333 \
-e STORAGE_TYPE=aws \
-e REGION=ap-southeast-2 \
-e AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID \
-e AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET \
storage-service:latest
```

feat: add real-time data synchronization
fix: prevent memory leak in background tasks
refactor: improve code organization in storage service
test: add unit tests for storage service
