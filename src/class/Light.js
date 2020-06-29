import * as THREE from 'three';

export default function Light(object){
    const color = 0xFFFFFF;
    const intensity = 1;
    this.light = new THREE.DirectionalLight(color, intensity);
    this.light.position.set(-3, 0, 7);
    if(object){
        this.light.target = object
    }
    
}