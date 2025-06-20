import * as THREE from 'three';
import tunnelMesh from './mountain/tunnel';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(40, 40, 100); // 设置相机初始位置
camera.lookAt(0, 0, 0); // 确保相机朝向场景中心

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加隧道物体到场景中
scene.add(tunnelMesh);

// 创建点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(50, 50, 50);
scene.add(pointLight); // 将光源添加到场景中

//const tubePoints = path.getSpacedPoints(1000);

// 启用阴影
renderer.shadowMap.enabled = true;
tunnelMesh.castShadow = true;
pointLight.castShadow = true;

// 动画参数
let t = 0; // 用于控制相机在路径上的位置

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    
    // 计算相机在隧道路径上的位置
    const path = tunnelMesh.geometry.parameters.path; // 获取隧道路径
    const point = path.getPoint(t); // 获取路径上的点
    camera.position.copy(point); // 设置相机位置
    camera.lookAt(point.x, point.y, point.z); // 确保相机朝向路径的点

    // 更新 t 值以移动相机
    t += 0.001; // 控制相机移动速度
    if (t > 1) t = 0; // 循环相机位置

    renderer.render(scene, camera);
}
animate();

document.addEventListener('keydown', (e) => {
    if(e.code === 'ArrowDown') {
        i += 10;
    }
})