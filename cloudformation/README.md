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
permissions.
3. Run the build for the main branch using AWS Amplify (via CLI or the AWS Console) because Cloudformation can only provision the resource.

At this point your frontend should be up and running.
