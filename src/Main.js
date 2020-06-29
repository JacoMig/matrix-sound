import React, {useEffect, useRef, useState} from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui';
// import {TweenLite} from "gsap";
import SceneManager from './class/Scene'
import GridObject from './class/GridObject'
import Light from './class/Light'
import {onMouseMove, onMouseDown, onMouseUp} from './utils/handleEvents'
// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
// https://github.com/lachlantweedie/react-threejs-es6-boilerplate

const Main = () => {
    const planeREF = useRef(<HTMLElement></HTMLElement>)
  
    useEffect(() => {
        const Scene = new SceneManager()
        const camera = Scene.camera
        const gridObject = new GridObject(camera).gridObject
        const light = new Light(gridObject).light
        
     
        Scene.add( gridObject );
        Scene.add( light );
        Scene.render(planeREF.current)
        
        /* const gui = new dat.GUI();
        gui.add(light, 'intensity', 0, 2, 0.01);
        gui.add(light.position, 'x', -10, 10);
        gui.add(light.position, 'z', -10, 10);
        gui.add(light.position, 'y', -10, 10);  

        const gridObjRotation = new dat.GUI();
        gridObjRotation.add(gridObject.rotation, 'x', -1, 1);
        gridObjRotation.add(gridObject.rotation, 'z', -1, 1);
        gridObjRotation.add(gridObject.rotation, 'y', -1, 1);   

        
 */
        /* const cameraGUI = new dat.GUI();
        cameraGUI.add(camera.position, 'x', -1, 1);
        cameraGUI.add(camera.position, 'z', -10, 10);
        cameraGUI.add(camera.position, 'y', -1, 1); */

       
       
        
       // console.log(intersects)
        window.addEventListener( 'mousemove', (e) => onMouseMove(e, gridObject, camera), false );
        window.addEventListener( 'mousedown', (e) => onMouseDown(e, gridObject, camera), false );
        window.addEventListener( 'mouseup', onMouseUp, false );

       return (() => {
            window.removeEventListener( 'mousemove', (e) => onMouseMove(e, gridObject, camera), false );
            window.removeEventListener( 'mousedown', (e) => onMouseDown(e, gridObject, camera), false );
            window.removeEventListener( 'mouseup', onMouseUp, false );
       })
        
    }, [])

    return (
        <>
        <div id="plane" ref={planeREF}></div>
        </>
    )
}

export default Main