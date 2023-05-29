const APP_ID = "5e2ebfceccb24a7d96c012965add827a";
// Token expires on May 30, 2023 2:11 AM UTC
const TOKEN = "007eJxTYHj/oN5psXLL4iPa3g/dJ2+W9FJI1+f6tWVRS5/VpONbpa0UGExTjVKT0pJTk5OTjEwSzVMszZINDI0szUwTU1IsjMwTv2QXpzQEMjI4qqxiYWSAQBCfhSE3MTOPgQEAZqAfoQ==";
const CHANNEL = "main";

const cameraSelect = document.getElementById('cameraSelect');

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {};

const joinStream = async () => {
  const selectedCamera = cameraSelect.value;

  client.on('user-published', handleUserJoined);
  client.on('user-left', handleUserLeft);

  const UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

  const cameraTrack = selectedCamera
    ? await AgoraRTC.createCameraVideoTrack({ cameraId: selectedCamera })
    : await AgoraRTC.createCameraVideoTrack();

  const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();

  localTracks = [microphoneTrack, cameraTrack];

  if (cameraTrack) {
    const player = `<div class="video-container" id="user-container-${UID}">
      <div class="video-player" id="user-${UID}"></div>
    </div>`;
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

    cameraTrack.play(`user-${UID}`);
  }

  await client.publish(localTracks);

  document.getElementById('join-btn').style.display = 'none';
  document.getElementById('stream-controls').style.display = 'flex';
};

const handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  if (mediaType === 'video') {
    let player = document.getElementById(`user-container-${user.uid}`);
    if (player != null) {
      player.remove();
    }

    player = `<div class="video-container" id="user-container-${user.uid}">
                  <div class="video-player" id="user-${user.uid}"></div> 
           </div>`;
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

    user.videoTrack.play(`user-${user.uid}`);
  }

  if (mediaType === 'audio') {
    user.audioTrack.play();
  }
};

const handleUserLeft = async (user) => {
  delete remoteUsers[user.uid];
  document.getElementById(`user-container-${user.uid}`).remove();
};

// Actualizar opciones del selector de cámara y capturar evento de cambio
const updateCameraOptions = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();

    cameraSelect.innerHTML = '<option value="">Seleccionar cámara</option>'; // Limpiar opciones existentes

    devices.forEach((device) => {
      if (device.kind === 'videoinput') {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Cámara ${cameraSelect.length + 1}`;
        cameraSelect.appendChild(option);
      }
    });
  } catch (error) {
    console.error('Error al enumerar los dispositivos:', error);
  }
};


// Llamar a la función para inicializar las opciones del selector de cámara
updateCameraOptions();

let leaveAndRemoveLocalStream = async () => {
    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()
    document.getElementById('join-btn').style.display = 'block'
    document.getElementById('stream-controls').style.display = 'none'
    document.getElementById('video-streams').innerHTML = ''
}

let toggleMic = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

document.getElementById('join-btn').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)