import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";
import { PublicHostedZone } from "aws-cdk-lib/aws-route53";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager/lib/certificate";
import { IPublicHostedZone } from "aws-cdk-lib/aws-route53/lib/hosted-zone";
import { ManagedPolicy, PermissionsBoundary } from "aws-cdk-lib/aws-iam";

export type NetworkStackProps = StackProps & {
  rootDomain: string;
};

export class NetworkStack extends Stack {
  readonly hostedZone: IPublicHostedZone;
  readonly rootCertificate: ICertificate;

  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    super(scope, id, props);

    const { rootDomain } = props;

    this.hostedZone = new PublicHostedZone(this, "HostedZone", {
      zoneName: rootDomain,
    });

    this.rootCertificate = new DnsValidatedCertificate(this, "CrossRegionRootCertificate", {
      domainName: rootDomain,
      hostedZone: this.hostedZone,
      region: "us-east-1", // ACM certificates that are used with CloudFront must be in the us-east-1 region
    });

    const permissionBoundary = ManagedPolicy.fromManagedPolicyArn(
      this,
      "PermissionBoundary",
      `arn:aws:iam::${Stack.of(this).account}:policy/restrict-codewaffle`,
    );
    PermissionsBoundary.of(this).apply(permissionBoundary);

    Tags.of(this.hostedZone).add("project", "codewaffle");
    Tags.of(this.rootCertificate).add("project", "codewaffle");
  }
}
