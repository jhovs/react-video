import { useEffect, useRef, useState } from "react";

function WebCamRecorder() {

  const videoRef = useRef<null | HTMLVideoElement>(null);
  const streamRef = useRef<null | MediaStream>(null);
  const[audioSource, setAudioSource] = useState <string | null>('');
  const[videoSource, setvideoSource] = useState <string | null>('');
  const[error, setError] = useState <null | Error>(null);


  useEffect(function(){
    async function prepareStream(){

      async function prepareStream(){

        function gotStream(stream: MediaStream) {
          streamRef.current = stream;
          if(videoRef.current){
            videoRef.current.srcObject = stream;
          }
        }
      }
    
      async function getStream(){
        async function getStream(){
          if (streamRef.current){
              streamRef.current.getTracks().forEach(track =>{
              track.stop();
            });
          }
          const constraints = {
            audio: {deviceId: audioSource === "" ? {exact: audioSource} : undefined}, 
            audio: {deviceId: videoSource === "" ? {exact: videoSource} : undefined} 
          };
          try{
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            gotStream(stream);
          }catch (error){
            setError(error);
          }
        }
        
      }

      await getStream();
    
    }
    
    prepareStream();

  }, []);
  
  return (
    <div>
     <select id="videoSource" name="videoSource" value={videoSource}></select>
     <select id="audioSource" name="audioSource" value={audioSource}></select>
     <video ref={videoRef} autoPlay muted playsInline></video>
     {error && <p>{error.message}</p>}
    </div>
  );
}

export default WebCamRecorder;
