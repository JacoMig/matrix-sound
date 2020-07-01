import React, {useState, useEffect} from 'react'
import * as THREE from 'three';
import Fader from './Fader';
import * as dat from 'dat.gui';
// https://codepen.io/kaolay/pen/bqKjVz?editors=1010
const Envelope = ({Scene, pickedObject}) => {
    const envelopeRack = new THREE.Object3D();
    useEffect(() => {
        
        const rackGeo = new THREE.BoxGeometry( 2, 0.3, 0.2);
        const rackMaterial = new THREE.MeshPhongMaterial( {color: 0XCCCCCC,   flatShading: true,} );
        const rack = new THREE.Mesh( rackGeo, rackMaterial )
        
        envelopeRack.add(rack) 
        envelopeRack.position.y = -1.2
        const gui = new dat.GUI();
        gui.add(envelopeRack.rotation, 'x', -10, 10);
        gui.add(envelopeRack.rotation, 'y', -10, 10);
        gui.add(envelopeRack.rotation, 'z', -10, 10);
        gui.add(envelopeRack.position, 'x', -10, 10);
        gui.add(envelopeRack.position, 'y', -10, 10);
        gui.add(envelopeRack.position, 'z', -10, 10);
        
      
       
        Scene.add(envelopeRack) 
    }, [])

    
    useEffect(() => {
        if(pickedObject && pickedObject.object.name === 'fader'){
            
            
            
        }
    }, [pickedObject])
    
    return <Fader envelopeRack={envelopeRack}/>
}

export default Envelope