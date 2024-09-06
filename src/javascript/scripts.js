import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(0, 8, 25);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMeterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMeterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const circleGeometry = new THREE.SphereGeometry(4, 30, 30);
const circleMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: false,
});
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
scene.add(circle);

circle.position.y = 10;

const gui = new dat.GUI();
const option = {
  sphereColor: "#ffea00",
};

gui.addColor(option, "sphereColor").onChange(function (e) {
  circle.material.color.set(e);
});

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

controls.update();

box.rotation.x = 5;
box.rotation.y = 5;

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
