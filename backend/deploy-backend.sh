#!/bin/bash

# Two arrays of (directory)-(AWS Lambda function name) pairs
endpoints=("postNote" "getNote")
lambdaNames=("notesPostHandler" "notesGetHandler")

END=${#endpoints[@]}
for ((i=0;i<END;i++));
do
  endpoint=${endpoints[i]}
  lambda=${lambdaNames[i]}
  echo "Updating endpoint: ${endpoint}"
  zip -qqj ${endpoint}.zip ./src/${endpoint}/index.mjs
  response=$(aws lambda update-function-code --zip-file fileb://${endpoint}.zip --function-name $lambda --no-cli-pager)
  rm -rf ${endpoint}.zip
done
