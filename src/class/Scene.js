import * as THREE from 'three';

export default function SceneManager(){
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 1;
    const far = 10000;
    // var geometry, mesh;
    this.camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    this.camera.position.z = 2.5;
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.scene = new THREE.Scene();
    return null
}

SceneManager.prototype.render = function(HTML_EL){
    this.renderer = new THREE.WebGLRenderer({ antialias: window.devicePixelRatio });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.render( this.scene, this.camera );
    HTML_EL.appendChild( this.renderer.domElement );
    
    const animate = (time) => {
        requestAnimationFrame( animate );
        this.renderer.render( this.scene, this.camera );
    };
    animate()
}

SceneManager.prototype.add = function(obj){
    this.scene.add(obj)
} 