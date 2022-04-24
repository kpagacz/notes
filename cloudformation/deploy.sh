#!/bin/bash

aws cloudformation deploy \
--template-file ./notes-app.yaml \
--stack-name notes-app \
--parameter-overrides AccessToken=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 \
--capabilities CAPABILITY_NAMED_IAM
