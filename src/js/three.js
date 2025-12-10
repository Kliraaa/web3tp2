import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

let modelSource = "./assets/models/bras-obj.obj";

const container = document.querySelector("#cyber-hand");

const viewer = document.createElement("div");
viewer.style.width = "100%";
viewer.style.height = "100%";
viewer.style.position = "relative";
container.appendChild(viewer);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
renderer.setClearColor(0x000000, 0);
viewer.appendChild(renderer.domElement);

// Lighting
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const ambient = new THREE.AmbientLight(0x666666, 1.2);
scene.add(ambient);

let model = null;
const loader = new OBJLoader();

loader.load(
    modelSource,
    (obj) => {
        model = obj;
        
        // Apply wireframe material to all meshes in the model
        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                side: THREE.DoubleSide,
                });
            }
        });

        model.position.set(0, -3.9, 0);
        model.scale.set(0.7, 0.7, 0.7);

        scene.add(model);
        animate();
    },
    (progress) => {},
    (error) => console.error(error)
);

function onWindowResize() {
    camera.aspect = viewer.clientWidth / viewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
}

window.addEventListener("resize", onWindowResize);

function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.005;
    renderer.render(scene, camera);
}
