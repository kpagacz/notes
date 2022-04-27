# notes
A React application for creating and sharing notes.

## Deployment
I have prepared Cloudformation files provisioning the resources required to run this application. They reside in the `cloudformation` directory. You can read about the deployment process in `cloudformation/README.md`.

## Motivation
I have created this application in two weeks as a part of a technical interview. The "business requirements" of the application were:
* it's possible to share notes
* it should be possible to define expiration date of a note
* the notes should be protected by a password.

I purposefully have not asked for more business requirements knowing that it should be a part of the task because:
* I thought the task was purposefully vague as to not limit the interviewee too much
* The circumstance was an interview not a task to gather business requirements (which is usually a part of every day work)
* I already had a somewhat scalable solution in mind so I wasn't worried about facing scale issues, thus some of the usual concerns
faded away.

## Motivation for the choice of technology
For this project I decided to foray into at the time unknown territory which was first of all `React` and secondly setting up a serverless
backend - one technology I haven't worked in before and one approach to setting up backend that I haven't explored and only read about. I thought
such a relatively small task in the interview circumstance paradoxically makes a great excuse to do something which I haven't yet done. In the
hindsight, it might not have been the best decision.

`React` and setting up a serverless backend were completely new, so I was aware I might not make it on time with all the features I would have
liked to implement and as it turns out I was right - I haven't implemented the third point which was securing a note with a password, but I did
achieve the first two (with some caveats described below).

## The architecture
I decided to go with something I knew already which was AWS Cloud and I started planning the application with the assumption that I will be
using AWS for my resources, thus I decided to create a web application:
* a `React` frontend served by AWS Amplify
* an AWS Gateway API
* AWS Lambdas as a serverless backend
* DynamoDB as storage.

AWS Amplify deals with a lot of the usual problems of hosting static content - it's a scalable solution with possible different deployment stages
(development, production, etc...), deals with SSL certifications on its own. It also can deal with regionalization, so I thought it was an overall decent proposition.

An AWS Gateway as a middleman between the client applications and the serverless backend. It's a solution which does some work for the backend,
mainly passing HTTP requests from and to the backend with small modifications to the body that allow for a smooth communication between the two.

The AWS Gateway API can also be easily extended to support custom authentication schemas or the ones provided by AWS via AWS Cognito (something
which I wanted to try out, but ultimately didn't have time to do). It's also a scalable solution capable of handling hundred thounsands of
concurrent requests.

AWS Lambda is the preferred method for setting up serverless method using AWS Cloud so it was a no brainer. It's a scalable solution as well.

I chose DynamoDB as storage because I didn't need any relations between data representations in the application and it has smooth integration
with Lambdas as well as having better read and write capacity than usual relational alternatives provided by AWS.

## Known Issues
Business:
* The business requirements specified password protected notes but no real passowrd is being used in the application
* The business specified a possibility of adding an expiration date but the current implementation of the frontend application demands an
expiration date

## Areas for improvement:
* Writing tests (I did not find the time to write any tests which I think is truly unfortunate and my biggest regret - even more so than
not fulfilling one of the business requirements because I don't like returning not tested code)
* Poor or close to non-existant error handling
* Poor user facing error messaging
