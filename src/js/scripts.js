import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

import norwat from '../img/norwat.jpg'; //importing an image
import moon from '../img/moon.png'; //importing an image
import castle from '../img/castle.jpg'; //importing an image

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

const planeGeometry = new THREE.PlaneGeometry( 50, 50 );
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

const ambientLight = new THREE.AmbientLight(0x333333,100);
scene.add(ambientLight); //adds ambient light to the scene (like a light bulb)

// const directionalLight = new THREE.DirectionalLight(0xffffff,10);  
// scene.add(directionalLight); //adds a directional light to the scene (like the sun)
// directionalLight.position.set(-30,50,0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom=-12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
// scene.add(dLightHelper); //in order to see the light

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);//in order to see the shadow

// const spotLight = new THREE.SpotLight(0xffffff);
// scene.add(spotLight); //adds a spot light to the scene (like a flashlight)
// spotLight.position.set(-100,100,0);
// spotLight.castShadow = true;
// spotLight.angle=0.2;

// const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper); //in order to see the light

scene.fog = new THREE.Fog(0x000000, 0, 200); // fog when the camera is far away
// scene.fog - new THREE.FogExp2(0x000000, 0.2); // fog when the camera is far away (doeesnt work)

// renderer.setClearColor(0x123545); //background color

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(norwat); //background image

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([ moon, moon, moon, moon, moon ,moon]); //background image

const box2Geometry = new THREE.BoxGeometry(10,10,10);
const box2Material = new THREE.MeshStandardMaterial( { 
    //map: textureLoader.load(castle),
} );
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(castle)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(moon)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(castle)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(moon)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(castle)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(moon)}),
]
const box2 = new THREE.Mesh( box2Geometry, box2MultiMaterial );
box2.position.set(10,10,10);
box2.material.map = textureLoader.load(castle);
scene.add( box2 );

const gui = new dat.GUI();

const options = {
    sphereColor: 0xff0000, //sphere color
    wireframe: false, // sphere wire
    speed: 0.01, // speed of the sphere
    angle: 47698 , // angle of the spot light 
    penumbra: 32556, // penumbra of the spot light
    intensity: 4435.9// intensity of the spot light
}

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphereMaterial.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphereMaterial.wireframe = e;
});

gui.add(options,'speed',0,1);
//gui.add(options, 'penumbra', 0, 100000)
//gui.add(options,'intensity',0,100000); 
//gui.add(options, 'angle', 0, 100000)

let step = 0;

box.rotation.x=7;

function animate()
{
    box.rotation.y += 0.01;

    step+=options.speed;
    sphere.position.y=10*Math.abs(Math.sin(step));

    //spotLight.angle=options.angle;
    //spotLight.penumbra=options.penumbra;
    //spotLight.intensity=options.intensity;
    //sLightHelper.update();

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );


