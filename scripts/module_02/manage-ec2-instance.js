// Imports
const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-east-1'
})

// Declare local variables
const ec2 = new AWS.EC2()

function listInstances() {
  // TODO: List instances using ec2.describeInstances()
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) reject(err)
      else {
        resolve(data)
      }
    })
  })
}

function terminateInstance(instanceId) {
  // TODO: Terminate an instance with a given instanceId
  const params = {
    InstanceIds: ['i-0ff973d7900534d6d']
  }
  return new Promise((resolve, reject) => {
    ec2.terminateInstances(params, (err, data) => {
      if(err) reject(err)
      else {
        resolve(data)
      }
    })
  })
 
}

listInstances()
  .then(data => console.log(JSON.stringify(data, null, 4)))
// terminateInstance()
//   .then(data => console.log(data))
