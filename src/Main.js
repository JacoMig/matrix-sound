import React, {useEffect, useRef, useState} from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {TweenLite} from "gsap";
import SceneManager from './class/Scene'

// https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
// https://github.com/lachlantweedie/react-threejs-es6-boilerplate

const Main = () => {
   // const [mouse, setMouse] = useState({x:0, y:0})
    const planeREF = useRef(<HTMLElement></HTMLElement>)
   // const [scene, useScene] = useState()
   
    
    useEffect(() => {
        const Scene = new SceneManager()
        const camera = Scene.camera
       
        // console.log(Scene.camera)
        
        let isDown = false;
        let pickedObject = null;
        
        const onMouseMove = (e) => {
            if(isDown){
                mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
            
                /* camera.position.x = mouse.x  + 0.95
                camera.position.y = mouse.y -0.9
                gridObject.rotation.y = - mouse.x / 4
                */
                raycaster.setFromCamera( mouse, camera );
                var intersects = raycaster.intersectObjects( gridObject.children, true ); 
                
                if (pickedObject ) {
                    console.log(pickedObject)
                    const new_color = new THREE.Color(config.color)
                    TweenLite.to(pickedObject.material.color, 1, {
                        r: new_color.r,
                        g: new_color.g,
                        b: new_color.b,
                    }) 
                    // pickedObject.material.emissive.setHex(defaultHex);
                    pickedObject.position.z = 0
                    pickedObject = null
                } 

                if(intersects.length > 0){
                    console.log(pickedObject)
                    pickedObject = intersects[ 0 ].object;
                    const new_color = new THREE.Color(0xffffff)
                    TweenLite.to(pickedObject.material.color, 0.2, {
                        r: new_color.r,
                        g: new_color.g,
                        b: new_color.b,
                    }) 
                    pickedObject.position.z = -0.03
                    console.log(pickedObject)
                }    
            }
        }

        const onMouseDown = (e) => {
            isDown = true;
        }

        const onMouseUp = (e) => {
            isDown = false;
            if(pickedObject){
                pickedObject.position.z = 0
                pickedObject = null
            }
         }

        var config = {
            bricksCount: 100,
            color: 0xDD006C
        };
       
        var raycaster;
        let mouse = new THREE.Vector2(-100,-100);
       


        var gridObject = new THREE.Object3D();
        gridObject.name = "Grid"
       
        
        
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-3, 0, 7);
        light.target = gridObject
      
        const visibleHeightAtZDepth = ( depth, camera ) => {
            // compensate for cameras not positioned at z=0
            const cameraOffset = camera.position.z;
            if ( depth < cameraOffset ) depth -= cameraOffset;
            else depth += cameraOffset;
          
            // vertical fov in radians
            const vFOV = camera.fov * Math.PI / 180; 
          
            // Math.abs to ensure the result is always positive
            return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
          };
          const visibleWidthAtZDepth = ( depth, camera ) => {
            const height = visibleHeightAtZDepth( depth, camera );
            return height * camera.aspect;
          };
        
       
        let  cellWidth = visibleWidthAtZDepth(0.5, camera) / 10
        let cellHeight = visibleHeightAtZDepth(0.5, camera) / 10
      


        let y = 0;
        let x = 0;
        for(var i = 1; i <= config.bricksCount; i++){
            const geometry = new THREE.BoxGeometry( cellWidth, cellHeight, 0.4);
            const material = new THREE.MeshPhongMaterial( {color: config.color,   flatShading: true,} );
            const  plane = new THREE.Mesh( geometry, material )
            plane.position.x = (cellWidth + 0.01).toFixed(2) * x
            plane.position.y = (cellHeight + 0.01).toFixed(2) * y 
            plane.name = "plane-"+i
            x++
            if(i % 10 === 0){
                x = 0
                y--
            }
            gridObject.add(plane);
        }
        var bb = new THREE.Box3()
        bb.setFromObject(gridObject);
        camera.position.x = ((bb.max.x - bb.min.x) / 2) - cellWidth/2;
        camera.position.y = (((bb.max.y - bb.min.y) / 2) - (cellHeight/2))  * -1;   
        
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

        /* scene.add( gridObject );
        
        scene.add( light );
       
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio(window.devicePixelRatio); */
      
       
        //planeREF.current.appendChild( renderer.domElement );

        
        raycaster = new THREE.Raycaster();
       
        
       // console.log(intersects)
        window.addEventListener( 'mousemove', onMouseMove, false );
        window.addEventListener( 'mousedown', onMouseDown, false );
        window.addEventListener( 'mouseup', onMouseUp, false );

       

        /* var animate = function (time) {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
        animate() */
        
    }, [])

    return (
        <>
        <div id="plane" ref={planeREF}></div>
        </>
    )
}

export default Main