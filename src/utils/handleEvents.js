import {TweenLite} from "gsap";
import * as THREE from 'three';
import {config} from '../config';
import {isTouchDevice} from './utils/isTouchDevice';
let isDown = false;
export let pickedObject = null;
const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(-100,-100);


const getMouse = (e) => {
    console.log(e)
    if(isTouchDevice()){
        mouse.x = ( e.touches[0].clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.touches[0].clientY / window.innerHeight ) * 2 + 1;
    }else {
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }
    
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
   pickedObject = null
}

let currMouseY = mouse.y
let movingMouse = ''
const intersectObject = (camera, objects, setPicked) => {
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects, true ); 
   // currMouseY = mouse.y
    if (pickedObject ) {
        if(pickedObject.name.includes("plane")){
            
            animateFrom(pickedObject)
        }
        
       // pickedObject = null
       // setPicked(null)
    } 
    
    if(intersects.length > 0){
        
        pickedObject = intersects[ 0 ].object;
       
        
        if(pickedObject.name.includes("plane")){
            animateTo(pickedObject)
            setPicked({object: pickedObject})
            console.log(pickedObject.name)
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
    console.log(e)
    getMouse(e)
    intersectObject(camera, object.children,setPicked)
}

export const onMouseUp = (setPicked) => {
    isDown = false;
    if(pickedObject){
        if(pickedObject.name.includes("plane")){
            animateFrom(pickedObject)
        }
       // currMouseY = -100
        setPicked(null)
    }
 }