import * as THREE from 'three';
import * as dat from 'dat.gui';
export default function Light(object){
    const color = 0xFFFFFF;
    const intensity = 1;
    this.light = new THREE.DirectionalLight(color, intensity);
    this.light.position.set(-1, 0, 5);
    if(object){
        this.light.target = object
    } 
    const gui = new dat.GUI();
    gui.add(this.light, 'intensity', 0, 2, 0.01);
    gui.add(this.light.position, 'x', -10, 10);
    gui.add(this.light.position, 'z', -10, 10);
    gui.add(this.light.position, 'y', -10, 10);  
    
    
}