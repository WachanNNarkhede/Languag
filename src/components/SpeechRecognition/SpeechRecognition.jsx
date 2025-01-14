import React, {useEffect} from "react";
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition'
import {IconMicrophone} from '@tabler/icons-react'

const SpeechRecognitionComponent = ({setSourcetext}) =>{

const {transcript, listening} = useSpeechRecognition()

useEffect(()=>{
    setSourcetext(transcript)
}, [transcript, setSourcetext])

const handLingVoiceRecording = () =>{
    if(listening){
        SpeechRecognition.stopListening();
        console.log("stop mic");
        
    }else {
        SpeechRecognition.startListening();
        console.log("start mic");
        
    }
}

return (
    <div>
        <IconMicrophone 
        size={22}
        className='text-gray-400'
         onClick={handLingVoiceRecording} />
       </div>
);

};

export default SpeechRecognitionComponent;