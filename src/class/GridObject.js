import * as THREE from 'three';
import {visibleHeightAtZDepth, visibleWidthAtZDepth} from '../utils/visibleSize'
import {config} from '../config'

export default function GridObject(camera){
    if(!camera){
        throw new Error("Please provide a camera")
        return
    }
   
   
    this.gridObject = new THREE.Object3D();
    this.gridObject.name = "Grid"
    let cellWidth = visibleWidthAtZDepth(0.5, camera) / 10;
    let cellHeight = visibleHeightAtZDepth(0.5, camera) / 10;

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
        this.gridObject.add(plane);
    }
    var bb = new THREE.Box3()
    bb.setFromObject(this.gridObject);
    camera.position.x = ((bb.max.x - bb.min.x) / 2) - cellWidth/2;
    camera.position.y = (((bb.max.y - bb.min.y) / 2) - (cellHeight/2))  * -1; 

    return (null)
}

