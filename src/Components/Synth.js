import React, {useEffect, useState} from 'react'
import Tone from 'tone'
import Envelope from './Envelope'

const notes = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B",
}

const Synth = ({pickedObject, canvas}) => {
    
    const [fmSynth, setFmSynth] = useState(new Tone.FMSynth())
    const [envelope, setEnvelope] = useState({attack: 0.01, decay: 0.01, sustain: 1, release: 0.01})
    const [isWindowLoaded, setIsWindowLoaded] = useState(false);

    useEffect(() => {
        fmSynth.toMaster();
       // fmSynth.harmonicity.value = 10;
       window.addEventListener('load', ()=> setIsWindowLoaded(true))
    } ,[])    

    useEffect(() => {
        console.log(pickedObject)
        if(pickedObject && pickedObject.object.name.includes('plane')){
            let currNote = pickedObject.object.sound.note
            let currKey = pickedObject.object.sound.key
            fmSynth.triggerAttack(`${notes[currNote]}${currKey}`)
           console.log(fmSynth)
        }else {
            fmSynth.triggerRelease()
        }
        
    } ,[pickedObject])

    useEffect(() => {
        /* Object.keys(env => {
            fmSynth.envelope.attack.value = envelope.attack   
        }) */
        fmSynth.envelope.set(envelope)
    },[envelope])
    
    return (
        <>
          {isWindowLoaded && <Envelope canvas={canvas} envelope={envelope} setEnvelope={setEnvelope} />  }
        </>
    )
}


export default Synth