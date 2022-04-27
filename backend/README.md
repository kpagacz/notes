# The backend service
The architecture of the backend is serverless. The application relies on a couple of AWS Lambda functions.

## Documentation
The OpenAPI Specification of the backend lives in the `Notes-API.yaml` file.

## AWS Deployment
The backend is serviced by AWS Lambda functions that need to be updated with the latest code from this repository after provisioning the AWS Lambda itself (see `cloudformation/README.md` for information about provisioning). This can be done in a number of ways, among them:
* with a Github Action updating the code of AWS Lambdas on every push to the branch of this repository
* manually with AWS CLI

I have prepared a short bash script updating the functions using AWS CLI for simplicity. Setting up Github Actions would require setting up authentication to AWS from Github which I didn't want to do because:
* I don't want to support a deployment of this project (it was done as an excercise) long-term so I don't want to support the Github Actions that would require updated keys
* It would complicate the entire deployment process and I wanted to keep it as simple as possible (it would add steps of creating an AWS user with the tokens, adding then to Github as secrets of this repository and including them in Github Actions)

In summary, to deploy the backend you need to:
1. Provision the resources using Cloudformation yamls in `/cloudformation` or by running the deployment script inside `/cloudformation`
(see the [backend README]("../backend/README.md) for more information).
2. Clone the repository locally.
3. Install AWS CLI.
4. Authenticate to AWS using AWS CLI.
4. Install [the `zip` package](https://linux.die.net/man/1/zip)
5. Run the script `deploy-backend.sh` from the `backend` directory.

The last 4 steps are needed to update the code of the AWS Lambda functions consisting the serverless backend of this application. Alternatively, you could update the code of these functions manually via the AWS Console.

## Ideas for further development
* Introduce a common dependency layer with an already set up `aws.dynamoDB.documentClient` and a proper `aws` dependency instead of the
sidestepping hack currently implemented.
