import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CachePolicy, Distribution } from "aws-cdk-lib/aws-cloudfront";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager/lib/certificate";
import { IPublicHostedZone } from "aws-cdk-lib/aws-route53/lib/hosted-zone";
import { AaaaRecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

export type WebStackProps = StackProps & {
  domain: string;
  hostedZone: IPublicHostedZone;
  certificate: ICertificate;
};

export class WebStack extends Stack {
  constructor(scope: Construct, id: string, props: WebStackProps) {
    super(scope, id, props);

    const { domain, hostedZone, certificate } = props;

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

    new AaaaRecord(this, "Alias", {
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

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
