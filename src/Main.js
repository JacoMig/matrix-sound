import React, {useEffect, useRef, useState} from 'react'
// import {TweenLite} from "gsap";
import SceneManager from './class/Scene'
import GridObject from './class/GridObject'
import Light from './class/Light'
// import Gui from './class/Gui'
import {onMouseMove, onMouseDown, onMouseUp} from './utils/handleEvents'
import Synth from './Components/Synth'
import {isTouchDevice} from './utils/isTouchDevice';
import BackgroundOrientation from './Components/BackgroundOrientation';
// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
// https://github.com/lachlantweedie/react-threejs-es6-boilerplate




const Main = () => {
    const canvasREF = useRef(<HTMLElement></HTMLElement>)
    const [picked, setPicked] = useState(null)
    const [Scene, setScene] = useState(new SceneManager())
    const [orientation, setOrientation] = useState('')
    
    const onResize = () => {
        setOrientation(() => (
            isTouchDevice() && window.orientation !== 90 ? 'portrait' : 'landscape'
        ))

    }

    useEffect(() => {
        // const Scene = new SceneManager()

        setOrientation(() => (
            isTouchDevice() && window.orientation !== 90 ? 'portrait' : 'landscape'
        ))

        const camera = Scene.camera
        const gridObject = new GridObject(camera).gridObject
        const light = new Light(gridObject).light
        //  const GUI = new Gui()
        
        Scene.add( gridObject );
        Scene.add( light );
       
        
        if(isTouchDevice()){
            window.addEventListener( 'touchmove', (e) => onMouseMove(e, Scene.scene, camera, setPicked), false );
            window.addEventListener( 'touchstart', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
            window.addEventListener( 'touchend', () => onMouseUp(setPicked), false );    
        }else {
            window.addEventListener( 'mousemove', (e) => onMouseMove(e, Scene.scene, camera, setPicked), false );
            window.addEventListener( 'mousedown', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
            window.addEventListener( 'mouseup', () => onMouseUp(setPicked), false );

        }
        window.addEventListener('resize', onResize);
        
        return (() => {
            if(isTouchDevice()){
                window.removeEventListener( 'touchmove', (e) => onMouseMove(e, Scene.scene, camera, setPicked), false );
                window.removeEventListener( 'touchstart', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
                window.removeEventListener( 'touchend', () => onMouseUp(setPicked), false );    
            }else {
                window.addEventListener( 'mousemove', (e) => onMouseMove(e, Scene.scene, camera, setPicked), false );
                window.removeEventListener( 'mousedown', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
                window.removeEventListener( 'mouseup', () => onMouseUp(setPicked), false );
            }
         
        })
        
    }, [])
    
    useEffect(() => {
        orientation === 'landscape' ? Scene.render(canvasREF.current) :  null;
    }, [orientation])

    return (
        <>  
            { orientation !== "" && 
                orientation !== "portrait" && 
                    <>
                        <canvas id="canvas" ref={canvasREF}></canvas>
                        <Synth pickedObject={picked}  canvas={canvasREF.current} />
                    </>
                ||
                <BackgroundOrientation /> 
            }
            
        </>
    )
}

export default Main