#!/bin/bash

aws cloudformation deploy \
--template-file ./notes-app.yaml \
--stack-name notes-app \
--parameter-overrides AccessToken=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 \
--capabilities CAPABILITY_NAMED_IAM

apiEndpoint=$(aws cloudformation describe-stacks --stack-name notes-app --query "Stacks[0].Outputs[0].OutputValue")
apiEndpoint=$(echo ${apiEndpoint} | sed 's/"//g')
echo "The default NotesAPI endpoint is:"
echo ${apiEndpoint}
echo "Make sure to input it in frontend/config/config.js"
