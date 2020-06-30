import React, {useState, useEffect} from 'react'
import * as THREE from 'three';
import Fader from './Fader';

const Envelope = ({Scene, pickedObject}) => {
    const envelopeRack = new THREE.Object3D();
    useEffect(() => {
        
        const geometry = new THREE.BoxGeometry( 2, 0.3, 0.2);
        const material = new THREE.MeshPhongMaterial( {color: 0XCCCCCC,   flatShading: true,} );
        const plane = new THREE.Mesh( geometry, material )
        
        envelopeRack.add(plane) 
        envelopeRack.position.y = -1.2
        Scene.add(envelopeRack) 
    }, [])

    useEffect(() => {
        if(pickedObject && pickedObject.object.name === 'fader'){
            console.log(pickedObject.object.position.y, pickedObject.mouse.y/100)
            pickedObject.object.position.y -= pickedObject.mouse.y/100
        }
    }, [pickedObject])
    
    return <Fader envelopeRack={envelopeRack}/>
}

export default Envelope