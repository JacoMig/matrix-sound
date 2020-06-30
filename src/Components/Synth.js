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

const Synth = ({pickedObject, Scene}) => {
    const [fmSynth, setFmSynth] = useState(new Tone.FMSynth())
    useEffect(() => {
        fmSynth.toMaster();
        console.log(Scene)
    } ,[])    

    useEffect(() => {
        console.log(pickedObject)
        if(pickedObject && pickedObject.object.name.includes('plane')){
            let currNote = pickedObject.object.sound.note
            let currKey = pickedObject.object.sound.key
            fmSynth.triggerAttack(`${notes[currNote]}${currKey}`)
           
        }else {
            fmSynth.triggerRelease()
        }
    } ,[pickedObject])
    
    return (
        <>
            <Envelope Scene={Scene} pickedObject={pickedObject}/>
        </>
    )
}


export default Synth