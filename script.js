const video = document.getElementById('video')
const toggleBtn = document.getElementById('toggleBtn')
let stream

// Turn the camera on
const turnCameraOn = async () => {
  let mediaStream = null
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({video: true})
    video.srcObject = mediaStream
    stream = mediaStream
  }
  catch (err) {
    console.log('Error: ', err)
  }
}

// Turn the camera off
const turnCameraOff = () => {
  if (stream) {
    const tracks = stream.getTracks()
    tracks.forEach(track => {
      track.stop()
    })
    video.srcObject = null;
    stream = null
  }
}

// Toggle the camera on/off
toggleBtn.addEventListener('click', () => {
  if (stream) {
    turnCameraOff()
    toggleBtn.textContent = 'Turn Camera On'
  } else {
    turnCameraOn()
    toggleBtn.textContent = 'Turn Camera Off'
  }
})

// Turn the camera on by default
turnCameraOn();