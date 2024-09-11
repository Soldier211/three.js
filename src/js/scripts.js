import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene(); 

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  

const orbit = new OrbitControls( camera, renderer.domElement );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.set(-10,30,30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const box = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add( box );
box.position.set(0,10,0);

const planeGeometry = new THREE.PlaneGeometry( 30, 30 );
const planeMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.position.set(0,-10,0);
plane.rotation.x=-0.5*Math.PI;

const gridHelper = new THREE.GridHelper(30,100);
scene.add( gridHelper );

const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );
sphere.position.set(10,10,10);

box.rotation.x=7;

function animate()
{
    box.rotation.y += 0.01;
    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );

