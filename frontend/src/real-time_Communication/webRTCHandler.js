import { setLocalStream, setRemoteString } from "../features/room/roomSlice";
import { store } from "../store";
import Peer from "simple-peer";
import { signalPeerData } from "./ioClientConnection";
const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: {
    width: { min: 640, ideal: 1920 },
    height: { min: 400, ideal: 1080 },
    aspectRatio: { ideal: 1.7777777778 },
  },
};

export const getLocalStreamValue = (audioOnly = false, callbackFunc) => {
  const constraints = audioOnly ? onlyAudioConstraints : defaultConstraints;
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((error) => {
      console.log(error);
    });
};

// ===========================================================
const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:relay.metered.ca:80",
      },
      {
        urls: "turn:relay.metered.ca:80",
        username: "58c11c5ab287bc9adfbc82d6",
        credential: "dmGOQHx75D4uls8C",
      },
      {
        urls: "turn:relay.metered.ca:443",
        username: "58c11c5ab287bc9adfbc82d6",
        credential: "dmGOQHx75D4uls8C",
      },
      {
        urls: "turn:relay.metered.ca:443?transport=tcp",
        username: "58c11c5ab287bc9adfbc82d6",
        credential: "dmGOQHx75D4uls8C",
      },
    ],
  };
};
// ===========================================================
const getConfiguration2 = () => {
  const turnIceServer = null;
  if (turnIceServer) {
  } else {
    return {
      iceServers: {
        urls: "stun:stun.l.google.com:19302",
      },
    };
  }
};

let peers = {};
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const loaclStream = store.getState().room.localStream;
  if (isInitiator) {
    console.log("isInitiator");
  } else {
    console.log("not as isInitiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: loaclStream,
  });
  console.log("peers", peers);

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    console.log("remote stream came from other user");
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      remoteStream
    );
    console.log("direct connection established");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { signal, connUserSocketId } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStream = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteString(newRemoteStream));
};

export const closeAllConnection = () => {
  Object.entries(peers).forEach((mappedObj) => {
    const connUserSocketId = mappedObj[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeaveRoom = (data) => {
  const { connUserSocketId } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStream = remoteStreams?.filter(
    (remoteStream) => remoteStream?.connUserSocketId !== connUserSocketId
  );
  store.dispatch(setRemoteString(newRemoteStream));
};

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
