import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 引入 OrbitControls
import customTunnelMesh from './mesh/customTunnel'; // 引入自定义物体

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
camera.position.set(10, 10, 10); // 调整相机位置
camera.lookAt(0, 0, 0); // 确保相机朝向场景中心

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加 OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// 将自定义物体添加到场景中
scene.add(customTunnelMesh);

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 更新控制器
    renderer.render(scene, camera);
}
animate();
