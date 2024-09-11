import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene(); 

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  

const orbit = new OrbitControls( camera, renderer.domElement );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.set(-10,30,30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const box = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add( box );
box.position.set(0,10,0);

const planeGeometry = new THREE.PlaneGeometry( 30, 30 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.position.set(0,0,0);
plane.rotation.x=-0.5*Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30,100);
//scene.add( gridHelper ); adds a grid to the scene

const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial( { color:0xff0000, wireframe: false } );
//meshstandardmaterial, meshphongmaterial, meshlambertmaterial
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );

sphere.position.set(-10,0,0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
//scene.add(ambientLight); adds ambient light to the scene (like a light bulb)

const directionalLight = new THREE.DirectionalLight(0xffffff,10);  
scene.add(directionalLight); //adds a directional light to the scene (like the sun)
directionalLight.position.set(-30,50,0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom=-12;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLightHelper); //in order to see the light

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);//in order to see the shadow

const gui = new dat.GUI();

const options = {
    sphereColor: 0xff0000,
    wireframe: false,
    speed: 0.01
}

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphereMaterial.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphereMaterial.wireframe = e;
});

gui.add(options,'speed',0,0.1)


let step = 0;

box.rotation.x=7;

function animate()
{
    box.rotation.y += 0.01;

    step+=options.speed;
    sphere.position.y=10*Math.abs(Math.sin(step));

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );


