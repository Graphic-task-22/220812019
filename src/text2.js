import * as THREE from 'three';
import tubeMesh from './mesh/tube'; // 引入管道

// 创建场景
const scene = new THREE.Scene();

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5); // 调整相机位置以更好地观察管道
camera.lookAt(0, 0, 0); // 确保相机朝向场景中心

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 将管道添加到场景中
scene.add(tubeMesh);

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
