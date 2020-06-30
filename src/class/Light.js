import * as THREE from 'three';

export default function Light(object){
    const color = 0xFFFFFF;
    const intensity = 1;
    this.light = new THREE.DirectionalLight(color, intensity);
    this.light.position.set(-1, 0, 5);
    /* if(object){
        this.light.target = object
    } */
    
}