const { stream } = require("undici-types");

//const { stream } = require("undici-types");
const socket = io('/');
const videoGrid = document.getElementById("video-grid");

const myPeer = new Peer(undefined , {
    path : '/peerjs',
    host : '/',
    port : '443'
})



let myVideoStream;
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

socket.emit('join-room', ROOM_ID);

socket.on('user-connetcted', ()=>
{
    connectToNewUser(userId , stream);
})

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });

  videoGrid.append(video);
};
