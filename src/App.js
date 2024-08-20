/*import React, { useState, useRef, useEffect } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";
import './App.css';

const APP_ID ="2d37054ef004447386e373375b4ac741";
const TOKEN = "007eJxTYLigeria5dHxVmn+NJ2tXouEb8664nK7y32+iaTx/xfK7FkKDEYpxuYGpiapaQYGJiYm5sYWZqnG5sbG5qZJJonJ5iaGBp2H0xoCGRnMWhaxMjJAIIjPwpCbmJnHwAAAzoIdSg==";
const CHANNEL_NAME = "main";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

function App() {
  const [joined, setJoined] = useState(false);
  const videoContainer = useRef(null);
  const localTracks = useRef([]);
  const remoteUsers = useRef({});

  const joinChannel = async () => {
    await client.join(APP_ID, CHANNEL_NAME, TOKEN, null);
    localTracks.current = await AgoraRTC.createMicrophoneAndCameraTracks();
    const [audioTrack, videoTrack] = localTracks.current;
    videoTrack.play(videoContainer.current);
    await client.publish([audioTrack, videoTrack]);
    setJoined(true);
  };

  const leaveChannel = async () => {
    localTracks.current.forEach(track => track.stop());
    localTracks.current.forEach(track => track.close());
    await client.leave();
    setJoined(false);
  };

  useEffect(() => {
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const player = document.createElement("div");
        player.id = user.uid;
        player.style.width = "320px";
        player.style.height = "240px";
        videoContainer.current.append(player);
        remoteVideoTrack.play(player);
      }
    });

    client.on("user-unpublished", (user) => {
      const player = document.getElementById(user.uid);
      if (player) player.remove();
    });
  }, []);

  return (
    <div className="App">
      <h1>Agora Video Call</h1>
      <div ref={videoContainer} style={{ display: 'flex', flexWrap: 'wrap' }}></div>
      {joined ? (
        <button onClick={leaveChannel}>Leave Call</button>
      ) : (
        <button onClick={joinChannel}>Join Call</button>
      )}
    </div>
  );
}

export default App;*/

///

import React, { useState, useRef, useEffect } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";
import './App.css';


//const APP_ID = process.env.REACT_APP_AGORA_APP_ID;
//const TOKEN = process.env.REACT_APP_AGORA_TOKEN;
//const CHANNEL_NAME = process.env.REACT_APP_AGORA_CHANNEL_NAME;
const APP_ID ="2d37054ef004447386e373375b4ac741";
const TOKEN = "007eJxTYLigeria5dHxVmn+NJ2tXouEb8664nK7y32+iaTx/xfK7FkKDEYpxuYGpiapaQYGJiYm5sYWZqnG5sbG5qZJJonJ5iaGBp2H0xoCGRnMWhaxMjJAIIjPwpCbmJnHwAAAzoIdSg==";
const CHANNEL_NAME = "main";


const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

function App() {
  const [joined, setJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const videoContainer = useRef(null);
  const localTracks = useRef([]);
  const remoteUsers = useRef({});

  const joinChannel = async () => {
    await client.join(APP_ID, CHANNEL_NAME, TOKEN, null);
    localTracks.current = await AgoraRTC.createMicrophoneAndCameraTracks();
    const [audioTrack, videoTrack] = localTracks.current;
    videoTrack.play(videoContainer.current);
    await client.publish([audioTrack, videoTrack]);
    setJoined(true);
  };

  const leaveChannel = async () => {
    localTracks.current.forEach(track => track.stop());
    localTracks.current.forEach(track => track.close());
    await client.leave();
    setJoined(false);
  };

  const toggleMic = () => {
    const audioTrack = localTracks.current[0];
    if (micOn) {
      audioTrack.setEnabled(false);
    } else {
      audioTrack.setEnabled(true);
    }
    setMicOn(!micOn);
  };

  const toggleCam = () => {
    const videoTrack = localTracks.current[1];
    if (camOn) {
      videoTrack.setEnabled(false);
    } else {
      videoTrack.setEnabled(true);
    }
    setCamOn(!camOn);
  };

  useEffect(() => {
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const player = document.createElement("div");
        player.id = user.uid;
        player.className = "video-box";
        videoContainer.current.append(player);
        remoteVideoTrack.play(player);
      }
    });

    client.on("user-unpublished", (user) => {
      const player = document.getElementById(user.uid);
      if (player) player.remove();
    });
  }, []);

  return (
    <div className="App">
      <h1>Agora Video Call</h1>
      <div ref={videoContainer} className="video-container"></div>
      {joined ? (
        <>
          <div className="controls">
            <button onClick={leaveChannel}>Leave Call</button>
            <button onClick={toggleMic}>{micOn ? 'Mute Mic' : 'Unmute Mic'}</button>
            <button onClick={toggleCam}>{camOn ? 'Turn Off Camera' : 'Turn On Camera'}</button>
          </div>
        </>
      ) : (
        <button onClick={joinChannel} className="join-button">Join Call</button>
      )}
    </div>
  );
}

export default App;





