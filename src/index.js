import * as THREE from 'three';
import addLabel from './canvasLabel';
import PaperTexture from './paper.jpg';

// document.documentElement.appendChild(canvasLabel);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 'salmon' );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2,  window.innerHeight / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// LIGHTS
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const material = new THREE.MeshPhongMaterial( {
  color: 0xF3FFE2,
  specular: 0xffffff,
  shininess: 30,
  map: new THREE.TextureLoader().load(PaperTexture),
  normalMap: new THREE.TextureLoader().load(PaperTexture)
} );

const cube = new THREE.Mesh( geometry, material );
console.log(cube);
const cubeWithLabel = addLabel(cube, 'Label text');
scene.add( cubeWithLabel );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();