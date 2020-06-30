import React, {useState, useEffect} from 'react';
import * as THREE from 'three';
import {onMouseDown} from '../utils/handleEvents';

const Fader = ({envelopeRack}) => {
    
    useEffect(() => {
        const faderGeo = new THREE.BoxGeometry( 0.05, 0.1, 0.3);
        const faderMaterial = new THREE.MeshPhongMaterial( {color: 0X999999,   flatShading: true,} );
        const faderObj = new THREE.Mesh( faderGeo, faderMaterial )
        faderObj.name = "fader"
        envelopeRack.add(faderObj)
    }, [])
    
    return null
}

export default Fader