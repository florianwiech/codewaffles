#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WebStack } from "../lib/web-stack";

// This template can only be deployed in the us-east-1 region.
// This is because the ACM Certificate must be created in us-east-1
const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: "us-east-1",
};

const app = new cdk.App();

new WebStack(app, "codewaffle-web", { env, tags: { project: "codewaffle" } });
