import React, {useEffect, useRef, useState} from 'react'
// import {TweenLite} from "gsap";
import SceneManager from './class/Scene'
import GridObject from './class/GridObject'
import Light from './class/Light'
import {pickedObject, onMouseMove, onMouseDown, onMouseUp} from './utils/handleEvents'
import Synth from './Components/Synth'

// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
// https://github.com/lachlantweedie/react-threejs-es6-boilerplate

// const ObjectContext = React.createContext({position: {x:0, y: 0}});

const Main = () => {
    const planeREF = useRef(<HTMLElement></HTMLElement>)
    const [picked, setPicked] = useState(null)
    const [Scene, setScene] = useState(new SceneManager())
    useEffect(() => {
        // const Scene = new SceneManager()
        const camera = Scene.camera
        const gridObject = new GridObject(camera).gridObject
        const light = new Light(gridObject).light
        
        
     
        Scene.add( gridObject );
        Scene.add( light );
        Scene.render(planeREF.current)
        
       
       console.log(Scene)
       
      //  window.addEventListener( 'mousemove', (e) => onMouseMove(e, gridObject, camera, setPicked), false );
        window.addEventListener( 'mousedown', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
        window.addEventListener( 'mouseup', () => onMouseUp(setPicked), false );

       return (() => {
        //    window.removeEventListener( 'mousemove', (e) => onMouseMove(e, gridObject, camera), false );
            window.removeEventListener( 'mousedown', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
            window.removeEventListener( 'mouseup', () => onMouseUp(setPicked), false );
       })
        
    }, [])

    return (
        <>
            <div id="plane" ref={planeREF}></div>
            <Synth pickedObject={picked} Scene={Scene} />
        </>
    )
}

export default Main