import {TweenLite} from "gsap";
import * as THREE from 'three';
import {config} from '../config'
let isDown = false;
export let pickedObject = null;
const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(-100,-100);

const getMouse = (e) => {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
}

const animateTo = (pickedObject) => {
    console.log('animateTo')
    const new_color = new THREE.Color(0xffffff)
    TweenLite.to(pickedObject.material.color, 0.2, {
        r: new_color.r,
        g: new_color.g,
        b: new_color.b,
    }) 
    pickedObject.position.z = -0.03
}

const animateFrom = (pickedObject) => {
    console.log('animateFrom')
    const new_color = new THREE.Color(config.color)
    TweenLite.to(pickedObject.material.color, 1, {
        r: new_color.r,
        g: new_color.g,
        b: new_color.b,
    }) 
   
    pickedObject.position.z = 0
  //  pickedObject = null
}

const intersectObject = (camera, objects, setPicked) => {
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects, true ); 
    
    if (pickedObject ) {
        if(pickedObject.name.includes("plane")){
            console.log('call animateFrom')
            animateFrom(pickedObject)
        }
        
        pickedObject = null
       // setPicked(null)
    } 
    
    if(intersects.length > 0){
        
        pickedObject = intersects[ 0 ].object;
       
        
        if(pickedObject.name.includes("plane")){
            animateTo(pickedObject)
            setPicked({object: pickedObject})
            console.log(pickedObject.name)
        }
        
        if(pickedObject.name.includes("fader")){
            setPicked({object: pickedObject, mouse})
        }
    }    
}

export const onMouseMove = (e, object, camera, setPicked) => {
    if(isDown){
        getMouse(e)
        intersectObject(camera, object.children, setPicked)
    }
}

export const onMouseDown = (e, object, camera, setPicked) => {
    isDown = true;
    getMouse(e)
    intersectObject(camera, object.children,setPicked)
}

export const onMouseUp = (setPicked) => {
    isDown = false;
    if(pickedObject){
        if(pickedObject.name.includes("plane")){
            animateFrom(pickedObject)
        }
        
        setPicked(null)
    }
 }