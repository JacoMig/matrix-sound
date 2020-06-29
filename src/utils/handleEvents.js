import {TweenLite} from "gsap";
import * as THREE from 'three';
import {config} from '../config'
let isDown = false;
let pickedObject = null;
const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(-100,-100);

const getMouse = (e) => {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
}

const animateTo = (pickedObject) => {
    const new_color = new THREE.Color(0xffffff)
    TweenLite.to(pickedObject.material.color, 0.2, {
        r: new_color.r,
        g: new_color.g,
        b: new_color.b,
    }) 
    pickedObject.position.z = -0.03
}

const animateFrom = (pickedObject) => {
    const new_color = new THREE.Color(config.color)
    TweenLite.to(pickedObject.material.color, 1, {
        r: new_color.r,
        g: new_color.g,
        b: new_color.b,
    }) 
   
    pickedObject.position.z = 0
    pickedObject = null
}

const intersectObject = (camera, objects) => {
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects, true ); 
    
    if (pickedObject ) {
        animateFrom(pickedObject)
    } 

    if(intersects.length > 0){
        pickedObject = intersects[ 0 ].object;
        animateTo(pickedObject)
    }    
}

export const onMouseMove = (e, object, camera) => {
    if(isDown){
        getMouse(e)
        intersectObject(camera, object.children)
    }
}

export const onMouseDown = (e, object, camera) => {
    isDown = true;
    getMouse(e)
    intersectObject(camera, object.children)
}

export const onMouseUp = (e) => {
    isDown = false;
    if(pickedObject){
        animateFrom(pickedObject)
    }
 }