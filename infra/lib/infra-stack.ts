import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SPADeploy } from 'cdk-spa-deploy';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class QuizAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // new SPADeploy(this, 'quizAppDeploy')
    //   .createSiteWithCloudfront({
    //     indexDoc: 'index.html',
    //     websiteFolder: '../dist'
    //   });
    new SPADeploy(this, 'QuizAppDeploy', { encryptBucket: true })
      .createSiteFromHostedZone({
        zoneName: 'rainfords.digital',
        subdomain: 'quiz',
        indexDoc: 'index.html',
        websiteFolder: '../dist'
      });
  }
}
