#!/bin/bash

# exit when any command fails
set -e

REGION='eu-central-1'

BUCKET=$(aws ssm get-parameter --name "/codewaffle/web/bucket/name" --query Parameter.Value --output text --region $REGION)

echo "bucket: $BUCKET"

aws s3 sync build s3://$BUCKET --delete --region $REGION

DISTRIBUTION=$(aws ssm get-parameter --name "/codewaffle/web/distribution/id" --query Parameter.Value --output text --region $REGION)

aws cloudfront create-invalidation --region $REGION --distribution-id $DISTRIBUTION --paths "/index.html"
