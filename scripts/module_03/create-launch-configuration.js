const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

// HELP:https://github.com/hashicorp/terraform/issues/3749
// Declare local variables
// TODO: Create an autoscaling object
const autoscaling = new AWS.AutoScaling()

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))

function createLaunchConfiguration (lcName, profileArn) {
  // TODO: Create a launch configuration
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: 'ami-00eb20669e0990cb4',
    InstanceType: 't2.micro',
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [sgName],
    UserData: 'IyEvYmluL2Jhc2gKY3VybCAtLXNpbGVudCAtLWxvY2F0aW9uIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzgueCB8IHN1ZG8gYmFzaCAtCnN1ZG8geXVtIGluc3RhbGwgLXkgbm9kZWpzCnN1ZG8geXVtIGluc3RhbGwgLXkgZ2l0CmdpdCBjbG9uZSBodHRwczovL2dpdGh1Yi5jb20vYXlvaXNhaWFoL25vZGUtZXhwcmVzcy13ZWJzaXRlLmdpdCBoYmZsCmNkIGhiZmwKbnBtIGkKbnBtIHJ1biBzdGFydAoK'
  }
  console.log('11111111')
  return new Promise((resolve, reject) => {
    autoscaling.createLaunchConfiguration(params, (err, data) => {
      if(err) reject (err)
      else {
        resolve(data)
      }
    })
  })
}
