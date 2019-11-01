// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-08bafab6567479b5e'
const instanceId = 'i-0ab38225b8a5e1b5d'

// detachVolume(volumeId)
// .then(() => attachVolume(instanceId, volumeId))

attachVolume(instanceId, volumeId)

function detachVolume (volumeId) {
  // TODO: Configure detachVolume params
  const params = {
    VolumeId: volumeId
  }
  return new Promise((resolve, reject) => {
    // TODO: Detach the volume
    return new Promise((resolve, reject) => {
      ec2.detachVolume(params, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  })
}

function attachVolume (instanceId, volumeId) {
  // TODO: Configure attachVolume params
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    // TODO: Attach the volume
    return new Promise((resolve, reject) => {
      ec2.attachVolume(params, (err, data) => {
        if (err) { console.log('error!!!'); reject(err)}
        else {
          console.log(data)
          resolve(data)
        }
      })
    })
  })
}
