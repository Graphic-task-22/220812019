import * as THREE from 'three';

// 创建路径
const path = new THREE.CurvePath();
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-6, 2, -1),
    new THREE.Vector3(-2, 2, 0),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(5, 2, -5)
]);
path.add(curve);

// 创建管道几何体
const tubeGeometry = new THREE.TubeGeometry(path, 30, 1, 20, false);
const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x5B9BD5, wireframe: true }); // 烟蓝色网格
const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);

// 导出管道网格
export default tubeMesh;
