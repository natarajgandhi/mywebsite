// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG'
const lcName = 'hamsterLC'
const policyName = 'hamsterPolicy'
const tgArn = '/* TODO: get target group ARN */'

createAutoScalingGroup(asgName, lcName)
  .then(() => createASGPolicy(asgName, policyName))
  .then((data) => console.log(data))

function createAutoScalingGroup(asgName, lcName) {
  // TODO: Create an auto scaling group
  var params = {
    AutoScalingGroupName: asgName,
    LaunchConfigurationName: lcName,
    MaxSize: 2,
    MinSize: 1,
    AvailabilityZones: [
      'us-east-1e',
      'us-east-1b'
    ],
    TargetGroupARNs: [
      "arn:aws:elasticloadbalancing:us-east-1:406157020781:targetgroup/hamsterTG/89662c0894c9fbf5"
    ],
  };
  return new Promise((resolve, reject) => {
    autoScaling.createAutoScalingGroup(params, (err, data) => {
      if (err) reject(err)
      else {
        resolve(data)
      }
    })
  })
}

function createASGPolicy(asgName, policyName) {
  // TODO: Create an auto scaling group policy
  const params = {
    AdjustmentType: 'ChangeInCapacity',
    AutoScalingGroupName: asgName,
    PolicyName: policyName,
    PolicyType: 'TargetTrackingScaling',
    TargetTrackingConfiguration: {
      TargetValue: 5,
      PredefinedMetricSpecification: {
        PredefinedMetricType: 'ASGAverageCPUUtilization'
      }
    }
  }
  return new Promise((resolve, reject) => {
    autoScaling.putScalingPolicy(params, (err, data) => {
      if (err) reject(err)
      else {
        resolve(data)
      }
    })
  })
}
