#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
