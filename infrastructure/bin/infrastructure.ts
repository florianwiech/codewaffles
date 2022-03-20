#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WebStack } from "../lib/web-stack";
import { NetworkStack } from "../lib/network-stack";

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const rootDomain = "codewaffle.app";

const app = new cdk.App();

const tags = { project: "codewaffle" };

const network = new NetworkStack(app, "codewaffle-network", { env, tags, rootDomain });

new WebStack(app, "codewaffle-web", {
  env,
  tags,
  domain: rootDomain,
  certificate: network.rootCertificate,
  hostedZone: network.hostedZone,
});
