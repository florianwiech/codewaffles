import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { CachePolicy, Distribution } from "aws-cdk-lib/aws-cloudfront";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";

export class WebStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domain = "codewaffle.app";

    const certificate = new Certificate(this, "Certificate", {
      domainName: domain,
      validation: CertificateValidation.fromDns(),
    });

    const bucket = new Bucket(this, "Bucket");

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new S3Origin(bucket),
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
      },
      defaultRootObject: "index.html",
      certificate,
      domainNames: [domain],
    });

    Tags.of(certificate).add("project", "codewaffle");
    Tags.of(distribution).add("project", "codewaffle");

    new StringParameter(this, "BucketArnParameter", {
      parameterName: "/codewaffle/web/bucket/arn",
      stringValue: bucket.bucketArn,
      tier: ParameterTier.STANDARD,
    });

    new StringParameter(this, "BucketNameParameter", {
      parameterName: "/codewaffle/web/bucket/name",
      stringValue: bucket.bucketName,
      tier: ParameterTier.STANDARD,
    });

    new StringParameter(this, "CloudFrontIdParameter", {
      parameterName: "/codewaffle/web/distribution/id",
      stringValue: distribution.distributionId,
      tier: ParameterTier.STANDARD,
    });
  }
}
