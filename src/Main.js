import React, {useEffect, useRef, useState} from 'react'
// import {TweenLite} from "gsap";
import SceneManager from './class/Scene'
import GridObject from './class/GridObject'
import Light from './class/Light'
// import Gui from './class/Gui'
import {onMouseMove, onMouseDown, onMouseUp} from './utils/handleEvents'
import Synth from './Components/Synth'


// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
// https://github.com/lachlantweedie/react-threejs-es6-boilerplate

// const ObjectContext = React.createContext({position: {x:0, y: 0}});

const Main = () => {
    const canvasREF = useRef(<HTMLElement></HTMLElement>)
    const [picked, setPicked] = useState(null)
    const [Scene, setScene] = useState(new SceneManager())
    useEffect(() => {
        // const Scene = new SceneManager()
        const camera = Scene.camera
        const gridObject = new GridObject(camera).gridObject
        const light = new Light(gridObject).light
      //  const GUI = new Gui()
        
     
        Scene.add( gridObject );
        Scene.add( light );
        Scene.render(canvasREF.current)
        
       
       console.log(Scene)
       
        window.addEventListener( 'mousemove', (e) => onMouseMove(e, Scene.scene, camera, setPicked), false );
        window.addEventListener( 'mousedown', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
        window.addEventListener( 'mouseup', () => onMouseUp(setPicked), false );

       return (() => {
            window.removeEventListener( 'mousemove', (e) => onMouseMove(e, Scene.scene, camera), false );
            window.removeEventListener( 'mousedown', (e) => onMouseDown(e, Scene.scene, camera, setPicked), false );
            window.removeEventListener( 'mouseup', () => onMouseUp(setPicked), false );
       })
        
    }, [])

    return (
        <>
            <canvas id="canvas" ref={canvasREF}></canvas>
            <Synth pickedObject={picked}  canvas={canvasREF.current} />
        </>
    )
}

export default Main