# Deployment
I have prepared this application for the deployment on AWS Cloud.

`notes-app.yaml` contains the Cloudformation `yaml` file that can be used to provision the resources on the AWS Cloud, including:
* the frontend React application using AWS Amplify
* the serverless backend using AWS Lambdas
* the data storage used by the backend (DynamoDB)
and other resources needed to provision the above.

# How to deploy
## Requirements
* an AWS Cloud account
* Github Personal Access Token

## Steps
1. Fork this repository
2. Deploy the Cloudformation yaml making sure to override its parameters: `AccessToken` and `Repository`. `AccessToken`
should be your Personal Access Token and `Repository` should be the URL to your fork of this repository.
If you don't override `Repository`, Cloudformation will try to pull `kpagacz/notes` repository instead of your fork.
If you don't provide `AccessToken`, Cloudformation won't be able to download the application from your fork due to the lack of
permissions. You can do this via the `deploy.sh` script I have provided which accepts two arguments (first one being the Access Token,
second one being the repository URL) or manually using AWS Console.
2. The script outputs the base URL of the backend API which you need to input as a variable to the frontend configuration file (`../frontend/src/config/config.js`). You can take this URL from the output of the script or manually from AWS Console of API Gateway resource provisioned by the
YAML file.
2. Update the code of the backend lambda functions (see [backend README]("../backend/README.ms") for more information).
3. Run the build for the main branch using AWS Amplify (via CLI or the AWS Console) because Cloudformation can only provision the resource.

At this point your frontend should be up and running.

# Architecture
The below link to the pricture presenting an overview of the provisioned AWS architecture.

[AWS architecture overview](aws-architecture.png)
