import * as THREE from 'three';
import {visibleHeightAtZDepth, visibleWidthAtZDepth} from '../utils/visibleSize'
import {config, cells} from '../config'
/* import * as dat from 'dat.gui';
import {isTouchDevice} from '../utils/isTouchDevice'; */
export default function GridObject(camera){
    if(!camera){
        throw new Error("Please provide a camera")
        return
    }
    
    let depthW = 0.8;
    let depthH = 0.8;
    let offsetW = 19;
    let offsetH = 11;

    this.gridObject = new THREE.Object3D();
    this.gridObject.name = "Grid"
    let cellWidth = visibleWidthAtZDepth(depthW, camera) / offsetW;
    let cellHeight = visibleHeightAtZDepth(depthH, camera) / offsetH;

    let y = 0;
    let x = 0;
    
    for(var i = 1; i <= config.bricksCount; i++){
        const geometry = new THREE.BoxGeometry( cellWidth, cellHeight, 0.4);
        const material = new THREE.MeshPhongMaterial( {color: config.color,   flatShading: true,} );
        const  plane = new THREE.Mesh( geometry, material )
        plane.position.x = (cellWidth + 0.03).toFixed(2) * x
        plane.position.y = (cellHeight + 0.01).toFixed(2) * y
        plane.name = "plane-"+x
        plane.sound = {note: cells-(cells-x), key: Math.floor((config.bricksCount/cells)+y)}
        x++
        if(i % cells === 0){
            x = 0
            y--
        }
        this.gridObject.add(plane);
    }
    var bb = new THREE.Box3()
    bb.setFromObject(this.gridObject);
    camera.position.x = ((bb.max.x - bb.min.x) / 2) - cellWidth/2;
    camera.position.y = (((bb.max.y - bb.min.y) / 2) - (cellHeight/2))  * -1; 
    
   
   
   /*  
    const gui = new dat.GUI();
    
    gui.add(camera.rotation, 'x', -10, 10);
    gui.add(camera.rotation, 'z', -10, 10);
    gui.add(camera.rotation, 'y', -10, 10);  */
    return (null)
}

