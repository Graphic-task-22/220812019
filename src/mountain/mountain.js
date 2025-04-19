import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
const noise2D = createNoise2D();

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100); // 提高相机位置以更好地观察地形

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建几何体
const geometry = new THREE.PlaneGeometry(300,300,100,100); // 设置分段
const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color('orange'),
  wireframe: true, // 显示网格线
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2; // 将平面旋转为水平
export default mesh;

// 更新顶点高度以生成山脉
function updatePosition(time) {
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    
    // 使用噪声生成高度，并添加波动效果
    const z = noise2D(x / 50, y / 50) * 20 + Math.sin(time * 0.5 + x * 0.1) * 10; // 添加波动
    positions.setZ(i, z);
  }
  positions.needsUpdate = true; // 标记为需要更新
}

scene.add(mesh);
updatePosition(0); // 初始更新顶点高度

// 渲染循环
function animate(time) {
  requestAnimationFrame(animate);
  updatePosition(time * 0.001); // 将时间转换为秒
  renderer.render(scene, camera);
}
animate(0);