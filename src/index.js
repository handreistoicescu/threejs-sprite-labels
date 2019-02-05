import * as THREE from 'three';
import addLabel from './canvasLabel';

const scene = new THREE.Scene();

scene.background = new THREE.Color( 'salmon' );

const ratio = window.clientWidth / window.clientHeight;
const camera = new THREE.OrthographicCamera( 5 / - 2, 5 / 2, 5 / 2, 5 / - 2, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 800, 800 );
document.body.appendChild( renderer.domElement );

const cube = new THREE.Mesh(
  new THREE.BoxGeometry( 0.5, 0.5, 0.5 ),
  new THREE.MeshBasicMaterial({color: 'teal'})
);

const cubeWithLabel = addLabel(cube, 'Label text that is very long');

scene.add( cubeWithLabel );

camera.position.z = 5;

console.log(camera);

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();